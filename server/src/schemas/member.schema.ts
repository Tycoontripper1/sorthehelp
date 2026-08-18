import { z } from "zod";
import { memberTypeSchema } from "./plan.schema";

const phoneSchema = z.string().trim().max(20).optional().default("");

export const createMemberSchema = z.object({
  name: z.string().trim().min(1).max(80),
  phone: phoneSchema,
  planId: z.string().min(1).optional(),
  amount: z.number().int().positive().optional(),
  type: memberTypeSchema.optional(),
});

export const updateMemberSchema = z.object({
  link: z.string().trim().max(300).optional(),
  earlyAccess: z.boolean().optional(),
});

export const assignPlanSchema = z.object({
  planId: z.string().min(1).nullable(),
});

export const logPaymentSchema = z.object({
  amount: z.number().int().positive(),
});

export const listMembersQuerySchema = z.object({
  type: memberTypeSchema.optional(),
  status: z.enum(["active", "pending", "part", "due", "lapsed"]).optional(),
  planId: z.string().min(1).optional(),
  q: z.string().trim().max(100).optional(),
});

export const memberIdParamSchema = z.object({
  id: z.string().min(1),
});
