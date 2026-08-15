import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import {
  requestOtpSchema,
  verifyOtpSchema,
  setPinSchema,
  verifyPinSchema,
  updateMeSchema,
} from "../schemas/auth.schema";
import {
  requestOtp,
  verifyOtp,
  setPin,
  verifyPin,
  getMe,
  updateMe,
} from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/otp/request", validate({ body: requestOtpSchema }), asyncHandler(requestOtp));
authRouter.post("/otp/verify", validate({ body: verifyOtpSchema }), asyncHandler(verifyOtp));
authRouter.post("/pin/verify", validate({ body: verifyPinSchema }), asyncHandler(verifyPin));

authRouter.post("/pin", requireAuth, validate({ body: setPinSchema }), asyncHandler(setPin));
authRouter.get("/me", requireAuth, asyncHandler(getMe));
authRouter.patch("/me", requireAuth, validate({ body: updateMeSchema }), asyncHandler(updateMe));
