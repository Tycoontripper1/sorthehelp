import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/apiResponse";
import { signAccessToken } from "../middleware/auth";
import { issueToken, consumeToken } from "../services/verificationToken.service";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/email.service";
import { env } from "../lib/env";

const PASSWORD_ROUNDS = 10;

function toSafeOwner(owner: {
  id: string;
  email: string | null;
  phone: string | null;
  name: string | null;
  payoutAccount: string | null;
  planTier: string;
  reminderTemplate: string;
  pinHash: string | null;
  emailVerifiedAt: Date | null;
}) {
  return {
    id: owner.id,
    email: owner.email,
    phone: owner.phone,
    name: owner.name,
    payoutAccount: owner.payoutAccount,
    planTier: owner.planTier,
    reminderTemplate: owner.reminderTemplate,
    hasPin: Boolean(owner.pinHash),
    emailVerified: Boolean(owner.emailVerifiedAt),
  };
}

export async function signup(req: Request, res: Response) {
  const { email, phone, name, password } = req.body as {
    email?: string;
    phone?: string;
    name?: string;
    password: string;
  };

  const passwordHash = await bcrypt.hash(password, PASSWORD_ROUNDS);
  const owner = await prisma.owner.create({
    data: { email, phone, name, passwordHash },
  });

  if (email) {
    const token = issueToken("EMAIL_VERIFY", owner.id);
    await sendVerificationEmail(email, name ?? null, `${env.APP_URL}/verify-email?token=${token}`);
  }

  const jwt = signAccessToken(owner.id);
  sendSuccess(res, 201, "Account created successfully", { token: jwt, owner: toSafeOwner(owner) });
}

export async function login(req: Request, res: Response) {
  const { identifier, password } = req.body as { identifier: string; password: string };
  const idLower = identifier.toLowerCase();

  const owner = await prisma.owner.findFirst({
    where: { OR: [{ email: idLower }, { phone: identifier }] },
  });

  if (!owner || !(await bcrypt.compare(password, owner.passwordHash))) {
    throw ApiError.unauthorized("Incorrect email/phone or password");
  }

  const token = signAccessToken(owner.id);
  sendSuccess(res, 200, "Logged in successfully", { token, owner: toSafeOwner(owner) });
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body as { email: string };
  const owner = await prisma.owner.findUnique({ where: { email } });

  // Same response whether or not the account exists, so this can't be used
  // to enumerate registered emails.
  if (owner) {
    const token = issueToken("PASSWORD_RESET", owner.id);
    await sendPasswordResetEmail(email, owner.name, `${env.APP_URL}/reset-password?token=${token}`);
  }

  sendSuccess(res, 200, "If an account exists for this email, a reset link has been sent.");
}

export async function resetPassword(req: Request, res: Response) {
  const { token, password } = req.body as { token: string; password: string };

  const ownerId = consumeToken("PASSWORD_RESET", token);
  if (!ownerId) throw ApiError.badRequest("This reset link is invalid or has expired");

  const passwordHash = await bcrypt.hash(password, PASSWORD_ROUNDS);
  const owner = await prisma.owner.update({ where: { id: ownerId }, data: { passwordHash } });

  const jwt = signAccessToken(owner.id);
  sendSuccess(res, 200, "Password reset successfully", { token: jwt, owner: toSafeOwner(owner) });
}

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.body as { token: string };

  const ownerId = consumeToken("EMAIL_VERIFY", token);
  if (!ownerId) throw ApiError.badRequest("This verification link is invalid or has expired");

  const owner = await prisma.owner.update({
    where: { id: ownerId },
    data: { emailVerifiedAt: new Date() },
  });
  sendSuccess(res, 200, "Email verified successfully", { owner: toSafeOwner(owner) });
}

export async function resendVerification(req: Request, res: Response) {
  const owner = await prisma.owner.findUnique({ where: { id: req.ownerId } });
  if (!owner) throw ApiError.notFound("Account not found");
  if (!owner.email) throw ApiError.badRequest("No email on file for this account");
  if (owner.emailVerifiedAt) {
    return sendSuccess(res, 200, "Email already verified");
  }

  const token = issueToken("EMAIL_VERIFY", owner.id);
  await sendVerificationEmail(owner.email, owner.name, `${env.APP_URL}/verify-email?token=${token}`);
  return sendSuccess(res, 200, "Verification email sent");
}

export async function setPin(req: Request, res: Response) {
  const { pin } = req.body as { pin: string };
  const pinHash = await bcrypt.hash(pin, PASSWORD_ROUNDS);

  const owner = await prisma.owner.update({
    where: { id: req.ownerId },
    data: { pinHash },
  });

  sendSuccess(res, 200, "PIN set successfully", { owner: toSafeOwner(owner) });
}

export async function verifyPin(req: Request, res: Response) {
  const { identifier, pin } = req.body as { identifier: string; pin: string };
  const idLower = identifier.toLowerCase();

  const owner = await prisma.owner.findFirst({
    where: { OR: [{ email: idLower }, { phone: identifier }] },
  });
  if (!owner?.pinHash) throw ApiError.unauthorized("PIN not set for this account");

  const matches = await bcrypt.compare(pin, owner.pinHash);
  if (!matches) throw ApiError.unauthorized("Incorrect PIN");

  const token = signAccessToken(owner.id);
  sendSuccess(res, 200, "PIN verified successfully", { token, owner: toSafeOwner(owner) });
}

export async function getMe(req: Request, res: Response) {
  const owner = await prisma.owner.findUnique({ where: { id: req.ownerId } });
  if (!owner) throw ApiError.notFound("Account not found");
  sendSuccess(res, 200, "Profile fetched successfully", { owner: toSafeOwner(owner) });
}

export async function updateMe(req: Request, res: Response) {
  const data = req.body as { name?: string; payoutAccount?: string };
  const owner = await prisma.owner.update({
    where: { id: req.ownerId },
    data,
  });
  sendSuccess(res, 200, "Profile updated successfully", { owner: toSafeOwner(owner) });
}
