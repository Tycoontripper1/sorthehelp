import crypto from "node:crypto";

type Purpose = "EMAIL_VERIFY" | "PASSWORD_RESET";

interface StoredToken {
  tokenHash: string;
  expiresAt: number;
}

const TTL_MS: Record<Purpose, number> = {
  EMAIL_VERIFY: 24 * 60 * 60 * 1000,
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
