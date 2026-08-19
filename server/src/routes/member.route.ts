import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { requireAuth, requireVerifiedEmail } from "../middleware/auth";
import { groupIdParamSchema } from "../schemas/plan.schema";
import {
  createMemberSchema,
  updateMemberSchema,
  assignPlanSchema,
  logPaymentSchema,
  listMembersQuerySchema,
  memberIdParamSchema,
} from "../schemas/member.schema";
import {
  listMembers,
  createMember,
  getMember,
  updateMember,
  assignMemberPlan,
  deleteMember,
  logPayment,
  markMemberPaid,
  remindMember,
  listMemberEntries,
} from "../controllers/member.controller";

/** Nested under /groups/:groupId/members */
export const groupMembersRouter = Router({ mergeParams: true });
groupMembersRouter.use(requireAuth, requireVerifiedEmail);
groupMembersRouter.get(
  "/",
  validate({ params: groupIdParamSchema, query: listMembersQuerySchema }),
  asyncHandler(listMembers),
);
groupMembersRouter.post(
  "/",
  validate({ params: groupIdParamSchema, body: createMemberSchema }),
  asyncHandler(createMember),
);

/** Top-level /members/:id */
export const memberRouter = Router();
memberRouter.use(requireAuth, requireVerifiedEmail);
memberRouter.get("/:id", validate({ params: memberIdParamSchema }), asyncHandler(getMember));
memberRouter.patch(
  "/:id",
  validate({ params: memberIdParamSchema, body: updateMemberSchema }),
  asyncHandler(updateMember),
);
memberRouter.delete("/:id", validate({ params: memberIdParamSchema }), asyncHandler(deleteMember));
memberRouter.patch(
  "/:id/plan",
  validate({ params: memberIdParamSchema, body: assignPlanSchema }),
  asyncHandler(assignMemberPlan),
);
memberRouter.post(
  "/:id/payments",
  validate({ params: memberIdParamSchema, body: logPaymentSchema }),
  asyncHandler(logPayment),
);
memberRouter.post(
  "/:id/mark-paid",
  validate({ params: memberIdParamSchema }),
  asyncHandler(markMemberPaid),
);
memberRouter.post("/:id/remind", validate({ params: memberIdParamSchema }), asyncHandler(remindMember));
memberRouter.get(
  "/:id/entries",
  validate({ params: memberIdParamSchema }),
  asyncHandler(listMemberEntries),
);
