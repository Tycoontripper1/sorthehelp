import type { Member } from "@prisma/client";

export const DEFAULT_REMINDER_TEMPLATE =
  "Hi {name}, friendly reminder from {group} — {amount} is still outstanding. Kindly make payment to keep your access active. Thank you!";

export function naira(n: number): string {
  return "₦" + Number(n).toLocaleString("en-NG");
}

/** Fills {name}/{group}/{amount} placeholders — keep in sync with the frontend's reminderMessage(). */
export function renderReminder(
  template: string,
  member: Pick<Member, "name" | "amount" | "paidAmount">,
  groupName: string,
): string {
  const balance = member.amount - member.paidAmount;
  return (template.trim() || DEFAULT_REMINDER_TEMPLATE)
    .replace(/\{name\}/g, member.name)
    .replace(/\{group\}/g, groupName)
    .replace(/\{amount\}/g, naira(balance));
}

/** Builds a wa.me deep link for a Nigerian-formatted local number (mirrors the frontend's waLink()). */
export function whatsappLink(phone: string, message: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  const intl = digits.startsWith("234") ? digits : "234" + digits.replace(/^0/, "");
  return `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
}
