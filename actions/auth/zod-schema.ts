/**
 * Mirrors server/src/schemas/auth.schema.ts exactly, so a payload that
 * passes validation here won't get rejected once it reaches the backend.
 */
import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number");

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72);

export const signupSchema = z
  .object({
    email: emailSchema.optional(),
    phone: phoneSchema.optional(),
    name: z.string().trim().min(1).max(80).optional(),
    password: passwordSchema,
  })
  .refine((data) => data.email || data.phone, {
    message: "Provide an email or a phone number",
    path: ["email"],
  });
export type TSignupPayload = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your email or phone number"),
  password: z.string().min(1, "Enter your password"),
});
export type TLoginPayload = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
export type TForgotPasswordPayload = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});
export type TResetPasswordPayload = z.infer<typeof resetPasswordSchema>;

export const verifyPinSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your email or phone number"),
  pin: z.string().trim().length(4, "PIN must be 4 digits"),
});
export type TVerifyPinPayload = z.infer<typeof verifyPinSchema>;

export const setPinSchema = z.object({
  pin: z.string().trim().length(4, "PIN must be 4 digits"),
});
export type TSetPinPayload = z.infer<typeof setPinSchema>;

export const updateMeSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  payoutAccount: z.string().trim().max(200).optional(),
});
export type TUpdateMePayload = z.infer<typeof updateMeSchema>;
