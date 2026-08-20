import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/apiResponse";
import { requireOwnedGroup, requireOwnedMember } from "../services/ownership.service";
import { statusOf } from "../services/status.service";
import {
  applyPayment,
  assignPlan,
  createMember as createMemberService,
  markPaid,
} from "../services/member.service";
import { renderReminder, whatsappLink } from "../services/reminder.service";
import { revokeTelegramAccess } from "../services/access.service";
import type { Member } from "@prisma/client";

function withStatus(member: Member) {
  return { ...member, status: statusOf(member) };
}

export async function listMembers(req: Request, res: Response) {
  const group = await requireOwnedGroup(req.ownerId!, req.params.groupId);
  const { type, status, planId, q } = req.query as {
    type?: "ONE_TIME" | "RECURRING";
    status?: ReturnType<typeof statusOf>;
    planId?: string;
    q?: string;
  };

  const members = await prisma.member.findMany({
    where: {
      groupId: group.id,
      ...(type && { type }),
      ...(planId && { planId }),
      ...(q && {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { phone: { contains: q, mode: "insensitive" } },
        ],
      }),
    },
    orderBy: { createdAt: "asc" },
  });

  const withStatuses = members.map(withStatus);
  const filtered = status ? withStatuses.filter((m) => m.status === status) : withStatuses;

  sendSuccess(res, 200, "Members fetched successfully", { members: filtered });
}

export async function createMember(req: Request, res: Response) {
  const group = await requireOwnedGroup(req.ownerId!, req.params.groupId);
  const { name, phone, email, planId, amount, type } = req.body as {
    name: string;
    phone: string;
    email?: string;
    planId?: string;
    amount?: number;
    type?: "ONE_TIME" | "RECURRING";
  };

  const member = await createMemberService({
    groupId: group.id,
    name,
    phone,
    email,
    planId: planId ?? null,
    amount,
    type,
  });

  sendSuccess(res, 201, "Member added successfully", { member: withStatus(member) });
}

export async function getMember(req: Request, res: Response) {
  const member = await requireOwnedMember(req.ownerId!, req.params.id);
  const [plan, group, entries] = await Promise.all([
    member.planId ? prisma.plan.findUnique({ where: { id: member.planId } }) : null,
    prisma.group.findUnique({ where: { id: member.groupId } }),
    prisma.entry.findMany({ where: { memberId: member.id }, orderBy: { createdAt: "desc" } }),
  ]);

  sendSuccess(res, 200, "Member fetched successfully", {
    member: { ...withStatus(member), planName: plan?.name ?? null, groupName: group?.name ?? null },
    entries,
  });
}

export async function updateMember(req: Request, res: Response) {
  const existing = await requireOwnedMember(req.ownerId!, req.params.id);
  const { link, earlyAccess, email } = req.body as {
    link?: string;
    earlyAccess?: boolean;
    email?: string;
  };

  const member = await prisma.member.update({
    where: { id: existing.id },
    data: { link, earlyAccess, email },
  });

  sendSuccess(res, 200, "Member updated successfully", { member: withStatus(member) });
}

export async function assignMemberPlan(req: Request, res: Response) {
  const existing = await requireOwnedMember(req.ownerId!, req.params.id);
  const { planId } = req.body as { planId: string | null };

  const member = await assignPlan(existing.id, planId);
  sendSuccess(res, 200, "Member's plan updated successfully", { member: withStatus(member) });
}

export async function deleteMember(req: Request, res: Response) {
  const existing = await requireOwnedMember(req.ownerId!, req.params.id);
  await revokeTelegramAccess(existing);
  await prisma.member.delete({ where: { id: existing.id } });
  res.status(204).send();
}

export async function logPayment(req: Request, res: Response) {
  const existing = await requireOwnedMember(req.ownerId!, req.params.id);
  const { amount } = req.body as { amount: number };

  const member = await applyPayment(existing.id, amount);
  sendSuccess(res, 200, "Payment logged successfully", { member: withStatus(member) });
}

export async function markMemberPaid(req: Request, res: Response) {
  const existing = await requireOwnedMember(req.ownerId!, req.params.id);
  const member = await markPaid(existing.id);
  sendSuccess(res, 200, "Member marked as paid", { member: withStatus(member) });
}

export async function remindMember(req: Request, res: Response) {
  const member = await requireOwnedMember(req.ownerId!, req.params.id);
  const [owner, group] = await Promise.all([
    prisma.owner.findUnique({ where: { id: req.ownerId } }),
    prisma.group.findUnique({ where: { id: member.groupId } }),
  ]);
  if (!owner || !group) throw ApiError.notFound("Owner or group not found");

  const text = renderReminder(owner.reminderTemplate, member, group.name);
  const url = whatsappLink(member.phone, text);
  if (!url) throw ApiError.badRequest("No WhatsApp number saved for this member");

  await prisma.entry.create({ data: { memberId: member.id, type: "REMINDER", note: text } });

  sendSuccess(res, 200, "Reminder ready to send", { text, whatsappUrl: url });
}

export async function listMemberEntries(req: Request, res: Response) {
  const member = await requireOwnedMember(req.ownerId!, req.params.id);
  const entries = await prisma.entry.findMany({
    where: { memberId: member.id },
    orderBy: { createdAt: "desc" },
  });
  sendSuccess(res, 200, "Entries fetched successfully", { entries });
}
