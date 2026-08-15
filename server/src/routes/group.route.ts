import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import { createGroupSchema, updateGroupSchema, idParamSchema } from "../schemas/group.schema";
import {
  listGroups,
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
} from "../controllers/group.controller";

export const groupRouter = Router();

groupRouter.use(requireAuth);

groupRouter.get("/", asyncHandler(listGroups));
groupRouter.post("/", validate({ body: createGroupSchema }), asyncHandler(createGroup));
groupRouter.get("/:id", validate({ params: idParamSchema }), asyncHandler(getGroup));
groupRouter.patch(
  "/:id",
  validate({ params: idParamSchema, body: updateGroupSchema }),
  asyncHandler(updateGroup),
);
groupRouter.delete("/:id", validate({ params: idParamSchema }), asyncHandler(deleteGroup));
