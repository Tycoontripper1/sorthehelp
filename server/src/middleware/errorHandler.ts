import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError";
import { env } from "../lib/env";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      error: { message: err.message, details: err.details },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: { message: "Validation failed", details: err.flatten() },
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({
        error: { message: "A record with these details already exists" },
      });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: { message: "Not found" } });
    }
  }

  console.error(err);
  return res.status(500).json({
    error: {
      message: "Something went wrong",
      ...(env.NODE_ENV === "development" && {
        raw: err instanceof Error ? err.message : String(err),
      }),
    },
  });
}
