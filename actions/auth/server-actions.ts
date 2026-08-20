"use server";

import { cookies } from "next/headers";

import { ApiRequestError } from "@/actions/api-request";
import type { ActionResult } from "@/actions/common";

import {
  signupRequest,
  loginRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  verifyPinRequest,
  setPinRequest,
  getMeRequest,
  updateMeRequest,
  googleSignInRequest,
} from "./api";
import type { IOwner } from "./response";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyPinSchema,
  setPinSchema,
  updateMeSchema,
  googleSignInSchema,
} from "./zod-schema";

const COOKIE_NAME = "sth_token";

async function setAuthCookie(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days — matches the backend's JWT_EXPIRES_IN default
  });
}

export async function getAuthToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}

export async function logoutAction(): Promise<ActionResult<null>> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
  return { ok: true, data: null };
}

function fail(error: unknown, fallback: string): { ok: false; message: string } {
  if (error instanceof ApiRequestError) return { ok: false, message: error.message };
  return { ok: false, message: fallback };
}

export async function signupAction(
  input: unknown,
): Promise<ActionResult<{ owner: IOwner }>> {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the details you entered" };
  }
  try {
    const { token, owner } = await signupRequest(parsed.data);
    await setAuthCookie(token);
    return { ok: true, data: { owner } };
  } catch (error) {
    return fail(error, "Could not create your account");
  }
}

export async function loginAction(
  input: unknown,
): Promise<ActionResult<{ owner: IOwner }>> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check your details" };
  }
  try {
    const { token, owner } = await loginRequest(parsed.data);
    await setAuthCookie(token);
    return { ok: true, data: { owner } };
  } catch (error) {
    return fail(error, "Could not log you in");
  }
}

export async function googleSignInAction(
  input: unknown,
): Promise<ActionResult<{ owner: IOwner; isNewOwner: boolean }>> {
  const parsed = googleSignInSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Missing Google credential" };
  }
  try {
    const { token, owner, isNewOwner } = await googleSignInRequest(parsed.data);
    await setAuthCookie(token);
    return { ok: true, data: { owner, isNewOwner: Boolean(isNewOwner) } };
  } catch (error) {
    return fail(error, "Could not sign in with Google");
  }
}

export async function forgotPasswordAction(
  input: unknown,
): Promise<ActionResult<null>> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Enter a valid email" };
  }
  try {
    await forgotPasswordRequest(parsed.data);
    return { ok: true, data: null };
  } catch (error) {
    return fail(error, "Could not send the reset link");
  }
}

export async function resetPasswordAction(
  input: unknown,
): Promise<ActionResult<{ owner: IOwner }>> {
  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the details you entered" };
  }
  try {
    const { token, owner } = await resetPasswordRequest(parsed.data);
    await setAuthCookie(token);
    return { ok: true, data: { owner } };
  } catch (error) {
    return fail(error, "Could not reset your password");
  }
}

export async function verifyPinAction(
  input: unknown,
): Promise<ActionResult<{ owner: IOwner }>> {
  const parsed = verifyPinSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Enter your PIN" };
  }
  try {
    const { token, owner } = await verifyPinRequest(parsed.data);
    await setAuthCookie(token);
    return { ok: true, data: { owner } };
  } catch (error) {
    return fail(error, "Incorrect PIN");
  }
}

export async function setPinAction(
  input: unknown,
): Promise<ActionResult<{ owner: IOwner }>> {
  const parsed = setPinSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Enter a 4-digit PIN" };
  }
  const token = await getAuthToken();
  if (!token) return { ok: false, message: "Session expired — log in again" };
  try {
    const { owner } = await setPinRequest(parsed.data, token);
    return { ok: true, data: { owner } };
  } catch (error) {
    return fail(error, "Could not set your PIN");
  }
}

export async function getSessionAction(): Promise<ActionResult<{ owner: IOwner }>> {
  const token = await getAuthToken();
  if (!token) return { ok: false, message: "Not signed in" };
  try {
    const { owner } = await getMeRequest(token);
    return { ok: true, data: { owner } };
  } catch (error) {
    return fail(error, "Session expired — log in again");
  }
}

export async function updateMeAction(
  input: unknown,
): Promise<ActionResult<{ owner: IOwner }>> {
  const parsed = updateMeSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Check the details you entered" };
  }
  const token = await getAuthToken();
  if (!token) return { ok: false, message: "Session expired — log in again" };
  try {
    const { owner } = await updateMeRequest(parsed.data, token);
    return { ok: true, data: { owner } };
  } catch (error) {
    return fail(error, "Could not update your profile");
  }
}
