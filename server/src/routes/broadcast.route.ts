import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import {
  sendBroadcastSchema,
  listBroadcastsQuerySchema,
  audienceQuerySchema,
} from "../schemas/broadcast.schema";
import {
  createBroadcast,
  getBroadcasts,
  getAudienceCount,
} from "../controllers/broadcast.controller";

export const broadcastRouter = Router();

broadcastRouter.use(requireAuth);

broadcastRouter.get(
  "/",
  validate({ query: listBroadcastsQuerySchema }),
  asyncHandler(getBroadcasts),
);
broadcastRouter.post("/", validate({ body: sendBroadcastSchema }), asyncHandler(createBroadcast));
broadcastRouter.get(
  "/audience",
  validate({ query: audienceQuerySchema }),
  asyncHandler(getAudienceCount),
);
