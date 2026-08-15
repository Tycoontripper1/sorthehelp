import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().trim().min(1).max(80),
});

export const updateGroupSchema = z
  .object({
    name: z.string().trim().min(1).max(80).optional(),
    // The Telegram group's chat ID (e.g. "-1001234567890"), used to
    // auto-generate single-use invite links when a member's balance clears.
    // Pass null to disconnect.
    telegramChatId: z.string().trim().min(1).nullable().optional(),
  })
  .refine((data) => data.name !== undefined || data.telegramChatId !== undefined, {
    message: "Provide a name or a telegramChatId to update",
  });

export const idParamSchema = z.object({
  id: z.string().min(1),
});
