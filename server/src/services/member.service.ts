import { Prisma, type Member, type Plan } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

const DAY_MS = 86_400_000;
const CYCLE_MS = 30 * DAY_MS;

/** Logs a payment toward a member's balance. Recurring members that clear
 * their cycle roll over: paidAmount resets to 0 and dueDate pushes 30 days
 * out. Mirrors the frontend's confirmPay(). */
export async function applyPayment(memberId: string, amount: number): Promise<Member> {
  if (amount <= 0) throw ApiError.badRequest("Amount must be greater than zero");

  return prisma.$transaction(async (tx) => {
    const member = await tx.member.findUnique({ where: { id: memberId } });
    if (!member) throw ApiError.notFound("Member not found");

    const cycleDone = member.type === "RECURRING" && member.paidAmount + amount >= member.amount;
    const updated = await tx.member.update({
      where: { id: memberId },
      data: {
        paidAmount: cycleDone ? 0 : Math.min(member.paidAmount + amount, member.amount),
        dueDate: cycleDone ? new Date(Date.now() + CYCLE_MS) : member.dueDate,
      },
    });

    await tx.entry.create({
      data: { memberId, type: "PAYMENT", amount },
    });

    return updated;
  });
}

/** Marks a member as fully paid. One-time: paid in full. Recurring: cycle
 * settled, rolls to a fresh 30-day period. Mirrors the frontend's markPaid(). */
export async function markPaid(memberId: string): Promise<Member> {
  return prisma.$transaction(async (tx) => {
    const member = await tx.member.findUnique({ where: { id: memberId } });
    if (!member) throw ApiError.notFound("Member not found");

    const updated = await tx.member.update({
      where: { id: memberId },
      data:
        member.type === "ONE_TIME"
          ? { paidAmount: member.amount }
          : { paidAmount: 0, dueDate: new Date(Date.now() + CYCLE_MS) },
    });

    await tx.entry.create({
      data: { memberId, type: "MARK_PAID", amount: member.amount },
    });

    return updated;
  });
}

/** Reassigns a member to a plan (deriving amount/type from it) or to "custom"
 * pricing (planId: null, keeping their current amount/type). Mirrors the
 * frontend's assignMemberPlan(). */
export async function assignPlan(memberId: string, planId: string | null): Promise<Member> {
  return prisma.$transaction(async (tx) => {
    const member = await tx.member.findUnique({ where: { id: memberId } });
    if (!member) throw ApiError.notFound("Member not found");

    if (planId === null) {
      return tx.member.update({ where: { id: memberId }, data: { planId: null } });
    }

    const plan = await tx.plan.findUnique({ where: { id: planId } });
    if (!plan || plan.groupId !== member.groupId) {
      throw ApiError.badRequest("Plan does not belong to this member's group");
    }

    return tx.member.update({
      where: { id: memberId },
      data: {
        planId: plan.id,
        amount: plan.price,
        type: plan.type,
        dueDate:
          plan.type === "RECURRING"
            ? member.dueDate ?? new Date(Date.now() + CYCLE_MS)
            : null,
      },
    });
  });
}

interface CreateMemberInput {
  groupId: string;
  name: string;
  phone: string;
  planId?: string | null;
  amount?: number;
  type?: "ONE_TIME" | "RECURRING";
}

/** Creates a member either from a plan (amount/type derived) or custom
 * pricing. Mirrors the frontend's confirmAdd(). */
export async function createMember(input: CreateMemberInput): Promise<Member> {
  return prisma.$transaction(async (tx) => {
    let plan: Plan | null = null;
    if (input.planId) {
      plan = await tx.plan.findUnique({ where: { id: input.planId } });
      if (!plan || plan.groupId !== input.groupId) {
        throw ApiError.badRequest("Plan does not belong to this group");
      }
    }

    const amount = plan ? plan.price : input.amount;
    const type = plan ? plan.type : input.type;
    if (amount === undefined || amount <= 0) {
      throw ApiError.badRequest("Set an amount, or pick a plan");
    }
    if (!type) {
      throw ApiError.badRequest("Set a plan type, or pick a plan");
    }

    const member = await tx.member.create({
      data: {
        groupId: input.groupId,
        planId: plan?.id ?? null,
        name: input.name,
        phone: input.phone,
        amount,
        type,
        paidAmount: 0,
        dueDate: type === "RECURRING" ? new Date(Date.now() + CYCLE_MS) : null,
      },
    });

    await tx.entry.create({
      data: { memberId: member.id, type: "ADDED" },
    });

    return member;
  });
}

/** Applied when a plan's price/type changes — keeps every member still on
 * that plan in sync. Mirrors the frontend's savePlan() cascade. */
export async function cascadePlanUpdate(
  planId: string,
  data: { price: number; type: "ONE_TIME" | "RECURRING" },
): Promise<Prisma.BatchPayload> {
  const members = await prisma.member.findMany({ where: { planId } });

  return prisma.$transaction(
    members.map((m) =>
      prisma.member.update({
        where: { id: m.id },
        data: {
          amount: data.price,
          type: data.type,
          dueDate:
            data.type === "RECURRING" && !m.dueDate
              ? new Date(Date.now() + CYCLE_MS)
              : data.type === "ONE_TIME"
                ? m.dueDate
                : m.dueDate,
        },
      }),
    ),
  ).then((results) => ({ count: results.length }));
}
