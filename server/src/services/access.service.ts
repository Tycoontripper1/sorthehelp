import type { Member } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { createSingleUseInvite, revokeInvite } from "./telegram.service";

/**
 * Called right after a member's balance clears (a payment completes it, or
 * they're marked paid). Generates a single-use Telegram invite link and
 * saves it as the member's access link — but only if:
 *   - their group is actually connected to a Telegram chat, and
 *   - they don't already have a link (manual entry, or a previous grant).
 *
 * That second check matters for recurring members: a cycle renewal calls
 * this again, but since they already have a link from when access was first
 * granted, this is a no-op — recurring members don't need a fresh
 * single-use invite every 30 days, they're already in the group.
 *
 * Runs outside the payment's DB transaction (it's called after that commits)
 * since it makes an external HTTP call — a slow/failed Telegram request
 * should never roll back a successfully recorded payment. Failures here are
 * logged, not thrown, for the same reason.
 */
export async function maybeGrantTelegramAccess(memberId: string): Promise<void> {
  try {
    const member = await prisma.member.findUnique({ where: { id: memberId } });
    if (!member || member.link.trim()) return;

    const group = await prisma.group.findUnique({ where: { id: member.groupId } });
    if (!group?.telegramChatId) return;

    const invite = await createSingleUseInvite(group.telegramChatId, member.name);
    if (!invite) return;

    await prisma.member.update({ where: { id: member.id }, data: { link: invite } });
    await prisma.entry.create({
      data: { memberId: member.id, type: "NOTE", note: "Telegram access link generated" },
    });
  } catch (err) {
    console.error(`[access] Telegram grant failed for member ${memberId}:`, err);
  }
}

/**
 * Called right before a member is deleted — invalidates their invite link
 * if they had one, so a removed member can't still join later on an
 * unrevoked link. Best-effort: a failed revoke shouldn't block the delete
 * itself (the member's leaving the ledger either way).
 */
export async function revokeTelegramAccess(member: Pick<Member, "id" | "groupId" | "link">): Promise<void> {
  if (!member.link.trim()) return;

  try {
    const group = await prisma.group.findUnique({ where: { id: member.groupId } });
    if (!group?.telegramChatId) return;

    await revokeInvite(group.telegramChatId, member.link);
  } catch (err) {
    console.error(`[access] Telegram revoke failed for member ${member.id}:`, err);
  }
}
