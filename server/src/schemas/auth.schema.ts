import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9]{7,15}$/, "Enter a valid phone number");

export const requestOtpSchema = z.object({
  phone: phoneSchema,
  name: z.string().trim().min(1).max(80).optional(),
});

export const verifyOtpSchema = z.object({
  phone: phoneSchema,
  code: z.string().trim().length(6, "Code must be 6 digits"),
});

export const setPinSchema = z.object({
  pin: z.string().trim().length(4, "PIN must be 4 digits"),
});

export const verifyPinSchema = z.object({
  phone: phoneSchema,
  pin: z.string().trim().length(4, "PIN must be 4 digits"),
});

export const updateMeSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  payoutAccount: z.string().trim().max(200).optional(),
});
