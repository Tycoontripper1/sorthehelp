import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

interface AccessTokenPayload {
  ownerId: string;
}

export function signAccessToken(ownerId: string): string {
  return jwt.sign({ ownerId } satisfies AccessTokenPayload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

/** Requires a valid `Authorization: Bearer <token>` header; sets `req.ownerId`. */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw ApiError.unauthorized("Missing or malformed Authorization header");
  }

  const token = header.slice("Bearer ".length);
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
    req.ownerId = payload.ownerId;
    next();
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }
}

/**
 * Blocks access for owners who signed up with an email and haven't
 * confirmed it yet. Phone-only accounts (no email on file) have nothing to
 * verify, so they pass through. Must run after `requireAuth`.
 */
export async function requireVerifiedEmail(req: Request, _res: Response, next: NextFunction) {
  const owner = await prisma.owner.findUnique({ where: { id: req.ownerId } });
  if (!owner) throw ApiError.unauthorized("Invalid or expired token");

  if (owner.email && !owner.emailVerifiedAt) {
    throw ApiError.forbidden(
      "Verify your email before continuing — check your inbox, or resend the link from your profile",
    );
  }

  next();
}
