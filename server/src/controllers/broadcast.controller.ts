import type { Request, Response } from "express";
import { sendSuccess } from "../utils/apiResponse";
import { sendBroadcast, listBroadcasts, countAudience } from "../services/broadcast.service";

export async function createBroadcast(req: Request, res: Response) {
  const { groupId, subject, body } = req.body as {
    groupId?: string;
    subject: string;
    body: string;
  };

  const broadcast = await sendBroadcast({ ownerId: req.ownerId!, groupId, subject, body });

  sendSuccess(res, 201, `Sent to ${broadcast.recipientCount} member${broadcast.recipientCount === 1 ? "" : "s"}`, {
    broadcast,
  });
}

export async function getBroadcasts(req: Request, res: Response) {
  const { groupId } = req.query as { groupId?: string };
  const broadcasts = await listBroadcasts(req.ownerId!, groupId);
  sendSuccess(res, 200, "Broadcasts fetched successfully", { broadcasts });
}

export async function getAudienceCount(req: Request, res: Response) {
  const { groupId } = req.query as { groupId?: string };
  const count = await countAudience(req.ownerId!, groupId);
  sendSuccess(res, 200, "Audience count fetched successfully", { count });
}
