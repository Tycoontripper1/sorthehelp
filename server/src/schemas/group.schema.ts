import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().trim().min(1).max(80),
});

export const updateGroupSchema = z.object({
  name: z.string().trim().min(1).max(80),
});

export const idParamSchema = z.object({
  id: z.string().min(1),
});
