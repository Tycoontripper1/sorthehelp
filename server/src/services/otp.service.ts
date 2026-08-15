import crypto from "node:crypto";

interface Challenge {
  codeHash: string;
  expiresAt: number;
  attempts: number;
}

const OTP_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

/**
 * In-memory OTP store — fine for a single dev instance. Swap for a shared
 * store (Redis, DB table) before running more than one server process.
 */
const challenges = new Map<string, Challenge>();

function hashCode(phone: string, code: string): string {
  return crypto.createHash("sha256").update(`${phone}:${code}`).digest("hex");
}

/** Generates and stores a fresh OTP for `phone`, returning the plaintext code. */
export function issueOtp(phone: string): string {
  const code = crypto.randomInt(100000, 1000000).toString();
  challenges.set(phone, {
    codeHash: hashCode(phone, code),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });
  return code;
}

export type OtpVerifyResult = "ok" | "expired" | "mismatch" | "too_many_attempts";

export function verifyOtp(phone: string, code: string): OtpVerifyResult {
  const challenge = challenges.get(phone);
  if (!challenge) return "expired";
  if (Date.now() > challenge.expiresAt) {
    challenges.delete(phone);
    return "expired";
  }
  if (challenge.attempts >= MAX_ATTEMPTS) {
    challenges.delete(phone);
    return "too_many_attempts";
  }

  if (hashCode(phone, code) !== challenge.codeHash) {
    challenge.attempts += 1;
    return "mismatch";
  }

  challenges.delete(phone);
  return "ok";
}
