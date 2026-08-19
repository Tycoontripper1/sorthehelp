/**
 * Raw calls to the backend's auth routes (server/src/routes/auth.route.ts).
 * Server-only — always called from actions/auth/server-actions.ts, never
 * imported directly by client components.
 */
import { apiRequest } from "@/actions/api-request";
import { ApiMethodEnum } from "@/actions/common";

import type { IAuthResponseData, IOwner } from "./response";
import type {
  TSignupPayload,
  TLoginPayload,
  TForgotPasswordPayload,
  TResetPasswordPayload,
  TVerifyPinPayload,
  TSetPinPayload,
  TUpdateMePayload,
} from "./zod-schema";

export function signupRequest(payload: TSignupPayload) {
  return apiRequest<IAuthResponseData>({
    path: "/auth/signup",
    method: ApiMethodEnum.POST,
    body: payload,
  });
}

export function loginRequest(payload: TLoginPayload) {
  return apiRequest<IAuthResponseData>({
    path: "/auth/login",
    method: ApiMethodEnum.POST,
    body: payload,
  });
}

export function forgotPasswordRequest(payload: TForgotPasswordPayload) {
  return apiRequest<null>({
    path: "/auth/password/forgot",
    method: ApiMethodEnum.POST,
    body: payload,
  });
}

export function resetPasswordRequest(payload: TResetPasswordPayload) {
  return apiRequest<IAuthResponseData>({
    path: "/auth/password/reset",
    method: ApiMethodEnum.POST,
    body: payload,
  });
}

export function verifyPinRequest(payload: TVerifyPinPayload) {
  return apiRequest<IAuthResponseData>({
    path: "/auth/pin/verify",
    method: ApiMethodEnum.POST,
    body: payload,
  });
}

export function setPinRequest(payload: TSetPinPayload, token: string) {
  return apiRequest<{ owner: IOwner }>({
    path: "/auth/pin",
    method: ApiMethodEnum.POST,
    body: payload,
    token,
  });
}

export function getMeRequest(token: string) {
  return apiRequest<{ owner: IOwner }>({ path: "/auth/me", token });
}

export function updateMeRequest(payload: TUpdateMePayload, token: string) {
  return apiRequest<{ owner: IOwner }>({
    path: "/auth/me",
    method: ApiMethodEnum.PATCH,
    body: payload,
    token,
  });
}
