import crypto from "node:crypto";

type Purpose = "PASSWORD_RESET";

interface StoredToken {
  tokenHash: string;
  expiresAt: number;
}

const TTL_MS: Record<Purpose, number> = {
  PASSWORD_RESET: 60 * 60 * 1000,
};

/**
 * In-memory token store — fine for a single dev instance. Swap for a shared
 * store (Redis, DB table) before running more than one server process.
 */
const tokens = new Map<string, StoredToken>();

function key(purpose: Purpose, ownerId: string): string {
  return `${purpose}:${ownerId}`;
}

function hash(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/** Generates and stores a fresh token for (purpose, ownerId), returning the plaintext. */
export function issueToken(purpose: Purpose, ownerId: string): string {
  const token = crypto.randomBytes(32).toString("hex");
  tokens.set(key(purpose, ownerId), {
    tokenHash: hash(token),
    expiresAt: Date.now() + TTL_MS[purpose],
  });
  return token;
}

/** Verifies a token against every pending request for this purpose (the
 * caller doesn't know the ownerId up front — it comes from the link). */
export function consumeToken(purpose: Purpose, token: string): string | null {
  const tokenHash = hash(token);
  for (const [k, stored] of tokens.entries()) {
    if (!k.startsWith(`${purpose}:`)) continue;
    if (stored.tokenHash !== tokenHash) continue;

    tokens.delete(k);
    if (Date.now() > stored.expiresAt) return null;
    return k.slice(purpose.length + 1);
  }
  return null;
}

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;

interface StoredOtp {
  codeHash: string;
  expiresAt: number;
  attempts: number;
}

/**
 * Email verification codes, keyed directly by ownerId — unlike the link
 * token above, the owner is already authenticated (JWT from signup/login)
 * by the time they're typing a code in, so there's no need to scan every
 * pending entry to find out whose it is.
 */
const emailOtps = new Map<string, StoredOtp>();

/** Generates, stores, and returns a fresh 6-digit code for this owner. */
export function issueEmailOtp(ownerId: string): string {
  const code = crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
  emailOtps.set(ownerId, { codeHash: hash(code), expiresAt: Date.now() + OTP_TTL_MS, attempts: 0 });
  return code;
}

/**
 * Checks `code` against the owner's stored OTP. Consumes the attempt (and
 * the code itself, on success or once attempts run out) so a code can't be
 * brute-forced or reused.
 */
export function verifyEmailOtp(ownerId: string, code: string): boolean {
  const stored = emailOtps.get(ownerId);
  if (!stored) return false;
  if (Date.now() > stored.expiresAt) {
    emailOtps.delete(ownerId);
    return false;
  }

  stored.attempts += 1;
  if (stored.attempts > OTP_MAX_ATTEMPTS) {
    emailOtps.delete(ownerId);
    return false;
  }

  if (stored.codeHash !== hash(code)) return false;

  emailOtps.delete(ownerId);
  return true;
}
