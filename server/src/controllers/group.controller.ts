import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { sendSuccess } from "../utils/apiResponse";
import { requireOwnedGroup } from "../services/ownership.service";
import { statusOf, type MemberStatus } from "../services/status.service";

const STATUS_PRIORITY: MemberStatus[] = ["lapsed", "due", "part", "pending"];

async function summarize(groupId: string) {
  const [members, plans, collected] = await Promise.all([
    prisma.member.findMany({ where: { groupId } }),
    prisma.plan.count({ where: { groupId } }),
    prisma.entry.aggregate({
      where: { member: { groupId }, type: { in: ["PAYMENT", "MARK_PAID"] } },
      _sum: { amount: true },
    }),
  ]);

  const statuses = members.map(statusOf);
  const cycle = members.length > 0 && members.every((m) => m.type === "ONE_TIME") ? "ONE_TIME" : "RECURRING";

  let statusNote = "all settled";
  for (const s of STATUS_PRIORITY) {
    const count = statuses.filter((st) => st === s).length;
    if (count > 0) {
      statusNote = `${count} ${s}`;
      break;
    }
  }

  return {
    memberCount: members.length,
    planCount: plans,
    collected: collected._sum.amount ?? 0,
    cycle,
    statusNote,
  };
}

export async function listGroups(req: Request, res: Response) {
  const groups = await prisma.group.findMany({
    where: { ownerId: req.ownerId },
    orderBy: { createdAt: "asc" },
  });

  const withSummary = await Promise.all(
    groups.map(async (g) => ({ ...g, ...(await summarize(g.id)) })),
  );

  sendSuccess(res, 200, "Groups fetched successfully", { groups: withSummary });
}

export async function createGroup(req: Request, res: Response) {
  const { name } = req.body as { name: string };
  const group = await prisma.group.create({
    data: { name, ownerId: req.ownerId! },
  });
  sendSuccess(res, 201, "Group created successfully", {
    group: { ...group, memberCount: 0, planCount: 0, collected: 0 },
  });
}

export async function getGroup(req: Request, res: Response) {
  const group = await requireOwnedGroup(req.ownerId!, req.params.id);
  const [plans, summary] = await Promise.all([
    prisma.plan.findMany({ where: { groupId: group.id }, orderBy: { createdAt: "asc" } }),
    summarize(group.id),
  ]);
  sendSuccess(res, 200, "Group fetched successfully", { group: { ...group, ...summary, plans } });
}

export async function updateGroup(req: Request, res: Response) {
  const existing = await requireOwnedGroup(req.ownerId!, req.params.id);
  const { name, telegramChatId } = req.body as { name?: string; telegramChatId?: string | null };
  const group = await prisma.group.update({
    where: { id: existing.id },
    data: { name, telegramChatId },
  });
  sendSuccess(res, 200, "Group updated successfully", { group });
}

export async function deleteGroup(req: Request, res: Response) {
  const existing = await requireOwnedGroup(req.ownerId!, req.params.id);
  await prisma.group.delete({ where: { id: existing.id } });
  res.status(204).send();
}
