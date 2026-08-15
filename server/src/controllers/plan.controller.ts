import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { sendSuccess } from "../utils/apiResponse";
import { requireOwnedGroup, requireOwnedPlan } from "../services/ownership.service";
import { cascadePlanUpdate } from "../services/member.service";

export async function listPlans(req: Request, res: Response) {
  const group = await requireOwnedGroup(req.ownerId!, req.params.groupId);
  const plans = await prisma.plan.findMany({
    where: { groupId: group.id },
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { members: true } } },
  });
  sendSuccess(res, 200, "Plans fetched successfully", {
    plans: plans.map((p) => ({ ...p, memberCount: p._count.members, _count: undefined })),
  });
}

export async function createPlan(req: Request, res: Response) {
  const group = await requireOwnedGroup(req.ownerId!, req.params.groupId);
  const { name, price, type } = req.body as { name: string; price: number; type: "ONE_TIME" | "RECURRING" };
  const plan = await prisma.plan.create({ data: { groupId: group.id, name, price, type } });
  sendSuccess(res, 201, "Plan created successfully", { plan: { ...plan, memberCount: 0 } });
}

export async function updatePlan(req: Request, res: Response) {
  const existing = await requireOwnedPlan(req.ownerId!, req.params.id);
  const { name, price, type } = req.body as { name?: string; price?: number; type?: "ONE_TIME" | "RECURRING" };

  const plan = await prisma.plan.update({
    where: { id: existing.id },
    data: { name, price, type },
  });

  if (price !== undefined || type !== undefined) {
    await cascadePlanUpdate(plan.id, { price: plan.price, type: plan.type });
  }

  sendSuccess(res, 200, "Plan updated successfully", { plan });
}

export async function deletePlan(req: Request, res: Response) {
  const existing = await requireOwnedPlan(req.ownerId!, req.params.id);
  // Member.planId -> Plan is ON DELETE SET NULL at the DB level, so members
  // on this plan fall back to "custom" pricing automatically, non-destructively.
  await prisma.plan.delete({ where: { id: existing.id } });
  res.status(204).send();
}
