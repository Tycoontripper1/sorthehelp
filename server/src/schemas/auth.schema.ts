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

export const loginSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your email or phone number"),
  password: z.string().min(1, "Enter your password"),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
});

export const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

export const setPinSchema = z.object({
  pin: z.string().trim().length(4, "PIN must be 4 digits"),
});

export const verifyPinSchema = z.object({
  identifier: z.string().trim().min(1, "Enter your email or phone number"),
  pin: z.string().trim().length(4, "PIN must be 4 digits"),
});

export const googleSignInSchema = z.object({
  idToken: z.string().min(1, "Missing Google credential"),
});

export const updateMeSchema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  payoutAccount: z.string().trim().max(200).optional(),
});
