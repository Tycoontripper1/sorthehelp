import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";
import {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  setPinSchema,
  verifyPinSchema,
  updateMeSchema,
  googleSignInSchema,
} from "../schemas/auth.schema";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification,
  setPin,
  verifyPin,
  getMe,
  updateMe,
  googleSignIn,
} from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/signup", validate({ body: signupSchema }), asyncHandler(signup));
authRouter.post("/login", validate({ body: loginSchema }), asyncHandler(login));
authRouter.post("/google", validate({ body: googleSignInSchema }), asyncHandler(googleSignIn));
authRouter.post(
  "/password/forgot",
  validate({ body: forgotPasswordSchema }),
  asyncHandler(forgotPassword),
);
authRouter.post(
  "/password/reset",
  validate({ body: resetPasswordSchema }),
  asyncHandler(resetPassword),
);
authRouter.post("/email/verify", validate({ body: verifyEmailSchema }), asyncHandler(verifyEmail));
authRouter.post("/email/resend", requireAuth, asyncHandler(resendVerification));

authRouter.post("/pin/verify", validate({ body: verifyPinSchema }), asyncHandler(verifyPin));
authRouter.post("/pin", requireAuth, validate({ body: setPinSchema }), asyncHandler(setPin));

authRouter.get("/me", requireAuth, asyncHandler(getMe));
authRouter.patch("/me", requireAuth, validate({ body: updateMeSchema }), asyncHandler(updateMe));
