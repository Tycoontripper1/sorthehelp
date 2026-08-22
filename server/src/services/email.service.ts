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

/**
 * Wraps a transactional email's content in Sorthehelp's branded shell — a
 * plain centered card with a wordmark header and a footer, built as
 * table-based HTML with inline styles (the only markup email clients like
 * Gmail/Outlook render reliably; no <style> blocks, no flex/grid).
 */
function emailLayout(bodyHtml: string): string {
  const year = new Date().getFullYear();
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#EFE7D3;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFE7D3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#FBF7EC;border:1px solid #D6C69A;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:28px 32px 20px;border-bottom:1px solid #D6C69A;">
                <span style="font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700;color:#202A33;">Sorthe<span style="color:#A6314A;font-style:italic;">help</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;color:#202A33;font-size:14.5px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px;background:#F3E7CB;border-top:1px solid #D6C69A;">
                <p style="margin:0;font-size:11.5px;color:#6b6455;line-height:1.6;">
                  Sorthehelp &mdash; know who&rsquo;s paid, who&rsquo;s due, and who gets access.<br>
                  This is an automated message; please don&rsquo;t reply directly to this email.
                </p>
                <p style="margin:10px 0 0;font-size:11px;color:#9c9484;">
                  &copy; ${year} Sorthehelp. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function sendVerificationOtpEmail(to: string, name: string | null, code: string) {
  const body = `
    <p style="margin:0 0 12px;">Hi ${name ?? "there"},</p>
    <p style="margin:0 0 20px;">Use this code to verify your email and finish setting up Sorthehelp:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
      <tr>
        <td style="background:#EFE7D3;border:1px solid #D6C69A;border-radius:6px;padding:16px 24px;">
          <code style="font-family:'Courier New',monospace;font-size:32px;font-weight:700;letter-spacing:.08em;color:#202A33;user-select:all;">${code}</code>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 20px;color:#9c9484;font-size:11.5px;">Tap and hold the code to copy it.</p>
    <p style="margin:0;color:#6b6455;font-size:13px;">This code expires in 10 minutes. If you didn&rsquo;t request it, you can safely ignore this email.</p>
  `;
  return sendEmail({
    to,
    toName: name ?? undefined,
    subject: `${code} is your Sorthehelp verification code`,
    html: emailLayout(body),
  });
}

export function sendPasswordResetEmail(to: string, name: string | null, link: string) {
  const body = `
    <p style="margin:0 0 12px;">Hi ${name ?? "there"},</p>
    <p style="margin:0 0 20px;">Click below to choose a new password for your Sorthehelp account:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      <tr>
        <td style="background:#202A33;border-radius:5px;">
          <a href="${link}" style="display:inline-block;padding:13px 22px;font-size:14px;font-weight:700;color:#EFE7D3;text-decoration:none;">Reset password</a>
        </td>
      </tr>
    </table>
    <p style="margin:0 0 8px;color:#6b6455;font-size:12.5px;word-break:break-all;">Or paste this link into your browser:<br><a href="${link}" style="color:#8C4A3A;">${link}</a></p>
    <p style="margin:16px 0 0;color:#6b6455;font-size:13px;">This link expires in 1 hour. If you didn&rsquo;t request this, you can safely ignore this email.</p>
  `;
  return sendEmail({
    to,
    toName: name ?? undefined,
    subject: "Reset your Sorthehelp password",
    html: emailLayout(body),
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
    .map((block) => `<p style="margin:0 0 14px;">${escapeHtml(block).replace(/\n/g, "<br>")}</p>`)
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
  return sendEmail({ to, toName: toName ?? undefined, subject, html: emailLayout(textToHtml(body)) });
}
