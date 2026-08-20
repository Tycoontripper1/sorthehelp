import { z } from "zod";

export const sendBroadcastSchema = z.object({
  groupId: z.string().min(1).optional(),
  subject: z.string().trim().min(1).max(150),
  body: z.string().trim().min(1).max(20_000),
});

export const listBroadcastsQuerySchema = z.object({
  groupId: z.string().min(1).optional(),
});

export const audienceQuerySchema = z.object({
  groupId: z.string().min(1).optional(),
});
