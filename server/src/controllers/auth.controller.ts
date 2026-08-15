import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { signAccessToken } from "../middleware/auth";
import { issueOtp, verifyOtp as checkOtp } from "../services/otp.service";
import { env } from "../lib/env";

function toSafeOwner(owner: {
  id: string;
  phone: string;
  name: string | null;
  payoutAccount: string | null;
  planTier: string;
  reminderTemplate: string;
  pinHash: string | null;
}) {
  return {
    id: owner.id,
    phone: owner.phone,
    name: owner.name,
    payoutAccount: owner.payoutAccount,
    planTier: owner.planTier,
    reminderTemplate: owner.reminderTemplate,
    hasPin: Boolean(owner.pinHash),
  };
}

export async function requestOtp(req: Request, res: Response) {
  const { phone, name } = req.body as { phone: string; name?: string };

  await prisma.owner.upsert({
    where: { phone },
    update: name ? { name } : {},
    create: { phone, name },
  });

  const code = issueOtp(phone);

  // No SMS provider wired up yet — log it and, in non-production, hand it
  // back in the response so the flow is testable end to end. Gate this
  // behind NODE_ENV before going live; plug a real provider (e.g. Termii,
  // Twilio) into this function once one is chosen.
  console.log(`[otp] ${phone} -> ${code}`);

  res.status(200).json({
    message: "OTP sent",
    ...(env.NODE_ENV !== "production" && { devCode: code }),
  });
}

export async function verifyOtp(req: Request, res: Response) {
  const { phone, code } = req.body as { phone: string; code: string };

  const result = checkOtp(phone, code);
  if (result === "expired") throw ApiError.badRequest("Code expired, request a new one");
  if (result === "too_many_attempts") throw ApiError.badRequest("Too many attempts, request a new code");
  if (result === "mismatch") throw ApiError.badRequest("Incorrect code");

  const owner = await prisma.owner.findUnique({ where: { phone } });
  if (!owner) throw ApiError.notFound("No account for this number");

  const token = signAccessToken(owner.id);
  res.status(200).json({ token, owner: toSafeOwner(owner) });
}

export async function setPin(req: Request, res: Response) {
  const { pin } = req.body as { pin: string };
  const pinHash = await bcrypt.hash(pin, 10);

  const owner = await prisma.owner.update({
    where: { id: req.ownerId },
    data: { pinHash },
  });

  res.status(200).json({ owner: toSafeOwner(owner) });
}

export async function verifyPin(req: Request, res: Response) {
  const { phone, pin } = req.body as { phone: string; pin: string };

  const owner = await prisma.owner.findUnique({ where: { phone } });
  if (!owner?.pinHash) throw ApiError.unauthorized("PIN not set for this number");

  const matches = await bcrypt.compare(pin, owner.pinHash);
  if (!matches) throw ApiError.unauthorized("Incorrect PIN");

  const token = signAccessToken(owner.id);
  res.status(200).json({ token, owner: toSafeOwner(owner) });
}

export async function getMe(req: Request, res: Response) {
  const owner = await prisma.owner.findUnique({ where: { id: req.ownerId } });
  if (!owner) throw ApiError.notFound("Account not found");
  res.status(200).json({ owner: toSafeOwner(owner) });
}

export async function updateMe(req: Request, res: Response) {
  const data = req.body as { name?: string; payoutAccount?: string };
  const owner = await prisma.owner.update({
    where: { id: req.ownerId },
    data,
  });
  res.status(200).json({ owner: toSafeOwner(owner) });
}
