import { Router } from "express";
import { healthRouter } from "./health.route";
import { authRouter } from "./auth.route";
import { groupRouter } from "./group.route";
import { groupPlansRouter, planRouter } from "./plan.route";
import { groupMembersRouter, memberRouter } from "./member.route";
import { broadcastRouter } from "./broadcast.route";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/groups/:groupId/plans", groupPlansRouter);
apiRouter.use("/groups/:groupId/members", groupMembersRouter);
apiRouter.use("/groups", groupRouter);
apiRouter.use("/plans", planRouter);
apiRouter.use("/members", memberRouter);
apiRouter.use("/broadcasts", broadcastRouter);
