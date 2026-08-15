import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

/** Confirms the group belongs to this owner and returns it, or 404s. */
export async function requireOwnedGroup(ownerId: string, groupId: string) {
  const group = await prisma.group.findFirst({ where: { id: groupId, ownerId } });
  if (!group) throw ApiError.notFound("Group not found");
  return group;
}

/** Confirms the plan's group belongs to this owner and returns it, or 404s. */
export async function requireOwnedPlan(ownerId: string, planId: string) {
  const plan = await prisma.plan.findFirst({
    where: { id: planId, group: { ownerId } },
  });
  if (!plan) throw ApiError.notFound("Plan not found");
  return plan;
}

/** Confirms the member's group belongs to this owner and returns it, or 404s. */
export async function requireOwnedMember(ownerId: string, memberId: string) {
  const member = await prisma.member.findFirst({
    where: { id: memberId, group: { ownerId } },
  });
  if (!member) throw ApiError.notFound("Member not found");
  return member;
}
