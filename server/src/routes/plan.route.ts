import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { requireAuth, requireVerifiedEmail } from "../middleware/auth";
import { createPlanSchema, updatePlanSchema, groupIdParamSchema } from "../schemas/plan.schema";
import { idParamSchema } from "../schemas/group.schema";
import { listPlans, createPlan, updatePlan, deletePlan } from "../controllers/plan.controller";

/** Nested under /groups/:groupId/plans */
export const groupPlansRouter = Router({ mergeParams: true });
groupPlansRouter.use(requireAuth, requireVerifiedEmail);
groupPlansRouter.get("/", validate({ params: groupIdParamSchema }), asyncHandler(listPlans));
groupPlansRouter.post(
  "/",
  validate({ params: groupIdParamSchema, body: createPlanSchema }),
  asyncHandler(createPlan),
);

/** Top-level /plans/:id */
export const planRouter = Router();
planRouter.use(requireAuth, requireVerifiedEmail);
planRouter.patch(
  "/:id",
  validate({ params: idParamSchema, body: updatePlanSchema }),
  asyncHandler(updatePlan),
);
planRouter.delete("/:id", validate({ params: idParamSchema }), asyncHandler(deletePlan));
