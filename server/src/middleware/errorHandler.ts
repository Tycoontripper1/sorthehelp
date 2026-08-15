import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";
import { env } from "../lib/env";

function fail(res: Response, status: number, message: string, errors: unknown = null) {
  return res.status(status).json({ success: false, message, errors });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    return fail(res, err.status, err.message, err.details ?? null);
  }

  if (err instanceof ZodError) {
    return fail(res, 400, "Validation failed", err.flatten());
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return fail(res, 409, "A record with these details already exists");
    }
    if (err.code === "P2025") {
      return fail(res, 404, "Not found");
    }
  }

  console.error(err);
  return fail(
    res,
    500,
    "Something went wrong",
    env.NODE_ENV === "development" ? { raw: err instanceof Error ? err.message : String(err) } : null,
  );
}
