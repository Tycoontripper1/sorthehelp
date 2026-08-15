import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const startedAt = Date.now();

export async function getHealth(_req: Request, res: Response) {
  let db: "connected" | "error" = "connected";
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch {
    db = "error";
  }

  const status = db === "connected" ? "ok" : "degraded";
  res.status(status === "ok" ? 200 : 503).json({
    status,
    db,
    uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
    timestamp: new Date().toISOString(),
  });
}
