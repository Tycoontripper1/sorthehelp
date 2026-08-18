import { z } from "zod";

export const memberTypeSchema = z.enum(["ONE_TIME", "RECURRING"]);

export const createPlanSchema = z.object({
  name: z.string().trim().min(1).max(60),
  price: z.number().int().positive(),
  type: memberTypeSchema,
});

export const updatePlanSchema = z.object({
  name: z.string().trim().min(1).max(60).optional(),
  price: z.number().int().positive().optional(),
  type: memberTypeSchema.optional(),
});

export const groupIdParamSchema = z.object({
  groupId: z.string().min(1),
});
