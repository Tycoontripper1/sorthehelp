import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../lib/env";
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
