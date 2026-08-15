import { env } from "../lib/env";

const TELEGRAM_API = "https://api.telegram.org";

interface TelegramResponse<T> {
  ok: boolean;
  result?: T;
  description?: string;
}

/**
 * Creates a single-use Telegram invite link (member_limit: 1) — Telegram
 * itself invalidates it the moment one person joins, so no separate
 * "already used" tracking is needed on our side.
 *
 * With no TELEGRAM_BOT_TOKEN configured (the default in dev), this logs the
 * request and returns a stub link instead of calling the real API, so the
 * payment-completion flow stays testable without a real bot. Create one via
 * @BotFather and add it as admin (with "invite users via link") to a group
 * to go live.
 */
export async function createSingleUseInvite(
  chatId: string,
  memberName: string,
): Promise<string | null> {
  if (!env.TELEGRAM_BOT_TOKEN) {
    const stub = `https://t.me/+dev-stub-${Date.now()}`;
    console.log(`[telegram:dev] invite for chat=${chatId} member="${memberName}" -> ${stub}`);
    return stub;
  }

  const res = await fetch(`${TELEGRAM_API}/bot${env.TELEGRAM_BOT_TOKEN}/createChatInviteLink`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      member_limit: 1,
      name: memberName.slice(0, 32),
    }),
  });

  const body = (await res.json()) as TelegramResponse<{ invite_link: string }>;
  if (!body.ok || !body.result) {
    console.error(`[telegram] createChatInviteLink failed: ${body.description ?? res.status}`);
    return null;
  }
  return body.result.invite_link;
}

/** Invalidates a previously issued invite link — e.g. when access should be revoked. */
export async function revokeInvite(chatId: string, inviteLink: string): Promise<void> {
  if (!env.TELEGRAM_BOT_TOKEN) {
    console.log(`[telegram:dev] would revoke ${inviteLink} in chat=${chatId}`);
    return;
  }

  const res = await fetch(`${TELEGRAM_API}/bot${env.TELEGRAM_BOT_TOKEN}/revokeChatInviteLink`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, invite_link: inviteLink }),
  });

  const body = (await res.json()) as TelegramResponse<unknown>;
  if (!body.ok) {
    console.error(`[telegram] revokeChatInviteLink failed: ${body.description ?? res.status}`);
  }
}
