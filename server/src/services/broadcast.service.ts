import { prisma } from "../lib/prisma";
import { requireOwnedGroup } from "./ownership.service";
import { sendBroadcastEmail } from "./email.service";

interface SendBroadcastInput {
  ownerId: string;
  groupId?: string | null;
  subject: string;
  body: string;
}

/**
 * Resolves the audience (a specific group, or every group the owner has),
 * sends one email per member who has an address on file, and records the
 * broadcast regardless of how many actually had an email — recipientCount
 * reflects real sends, not the audience size, so a creator can see if most
 * of a group is missing email data.
 */
export async function sendBroadcast({ ownerId, groupId, subject, body }: SendBroadcastInput) {
  if (groupId) {
    await requireOwnedGroup(ownerId, groupId);
  }

  const members = await prisma.member.findMany({
    where: {
      email: { not: null },
      group: { ownerId, ...(groupId ? { id: groupId } : {}) },
    },
    select: { name: true, email: true },
  });

  const recipients = members.filter(
    (m): m is { name: string; email: string } => !!m.email && m.email.trim().length > 0,
  );

  await Promise.all(
    recipients.map((m) => sendBroadcastEmail(m.email, m.name, subject, body)),
  );

  const broadcast = await prisma.broadcast.create({
    data: {
      ownerId,
      groupId: groupId ?? null,
      subject,
      body,
      recipientCount: recipients.length,
    },
  });

  return broadcast;
}

export async function listBroadcasts(ownerId: string, groupId?: string) {
  return prisma.broadcast.findMany({
    where: { ownerId, ...(groupId ? { groupId } : {}) },
    orderBy: { sentAt: "desc" },
  });
}

/** Audience size preview (members with an email) without actually sending —
 * used so the composer can show a live recipient count. */
export async function countAudience(ownerId: string, groupId?: string | null) {
  if (groupId) {
    await requireOwnedGroup(ownerId, groupId);
  }
  return prisma.member.count({
    where: {
      email: { not: null },
      group: { ownerId, ...(groupId ? { id: groupId } : {}) },
    },
  });
}
