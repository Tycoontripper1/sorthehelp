import type { Response } from "express";

/** Standard success envelope: { success: true, message, data }. */
export function sendSuccess<T>(res: Response, status: number, message: string, data: T | null = null) {
  return res.status(status).json({ success: true, message, data });
}
