import type { Member, MemberType } from "@prisma/client";

export type MemberStatus = "active" | "pending" | "part" | "due" | "lapsed";

const DAY_MS = 86_400_000;

type StatusInput = Pick<Member, "type" | "amount" | "paidAmount" | "dueDate">;

/** Mirrors the frontend's statusOf() — keep these in sync. */
export function statusOf(m: StatusInput): MemberStatus {
  if (m.type === "ONE_TIME" as MemberType) {
    if (m.paidAmount >= m.amount) return "active";
    if (m.paidAmount > 0) return "part";
    return "pending";
  }
  if (!m.dueDate) return "active";
  const daysUntil = Math.round((m.dueDate.getTime() - Date.now()) / DAY_MS);
  if (daysUntil < 0) return "lapsed";
  if (daysUntil <= 3) return "due";
  return "active";
}
