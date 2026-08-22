import { env } from "../lib/env";

interface SendEmailInput {
  to: string;
  toName?: string;
  subject: string;
  html: string;
}

/**
 * Sends via Zeptomail's HTTP API (https://api.zeptomail.com/v1.1/email).
 * With no ZEPTOMAIL_API_KEY configured (the default in dev), this logs the
 * email instead of sending it, so the auth flow stays testable without a
 * real account. Wire up a key from https://www.zoho.com/zeptomail/ to go live.
 */
async function sendEmail({ to, toName, subject, html }: SendEmailInput): Promise<void> {
  if (!env.ZEPTOMAIL_API_KEY) {
    console.log(`[email:dev] to=${to} subject="${subject}"\n${html}`);
    return;
  }

  const res = await fetch("https://api.zeptomail.com/v1.1/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: env.ZEPTOMAIL_API_KEY,
    },
    body: JSON.stringify({
      from: { address: env.ZEPTOMAIL_FROM_EMAIL, name: env.ZEPTOMAIL_FROM_NAME },
      to: [{ email_address: { address: to, name: toName ?? to } }],
      subject,
      htmlbody: html,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error(`[email] Zeptomail send failed (${res.status}): ${body}`);
    // Don't throw — a delivery failure shouldn't break signup/login. The
    // token is still valid and the user can request a resend.
  }
}

export function sendVerificationOtpEmail(to: string, name: string | null, code: string) {
  return sendEmail({
    to,
    toName: name ?? undefined,
    subject: `${code} is your Sorthehelp verification code`,
    html: `<p>Hi ${name ?? "there"},</p><p>Your verification code is:</p><p style="font-size:28px;font-weight:700;letter-spacing:.15em">${code}</p><p>This code expires in 10 minutes.</p>`,
  });
}

export function sendPasswordResetEmail(to: string, name: string | null, link: string) {
  return sendEmail({
    to,
    toName: name ?? undefined,
    subject: "Reset your Sorthehelp password",
    html: `<p>Hi ${name ?? "there"},</p><p>Reset your password here:</p><p><a href="${link}">${link}</a></p><p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>`,
  });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Plain text, one paragraph per blank-line-separated block — creators type
 * a normal message, not HTML. */
function textToHtml(body: string): string {
  return body
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

/** Sends one broadcast email to one recipient. The caller (broadcast.service)
 * loops this per-recipient rather than a single multi-recipient send, so
 * each member only ever sees their own address. */
export function sendBroadcastEmail(
  to: string,
  toName: string | null,
  subject: string,
  body: string,
) {
  return sendEmail({ to, toName: toName ?? undefined, subject, html: textToHtml(body) });
}
