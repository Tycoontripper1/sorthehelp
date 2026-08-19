export enum ApiMethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

/** Mirrors the Express backend's success envelope: `sendSuccess()` in server/src/utils/apiResponse.ts. */
export interface IResponseAPI<T> {
  success: true;
  message: string;
  data: T;
}

/** Mirrors the Express backend's error envelope: `errorHandler` in server/src/middleware/errorHandler.ts. */
export interface IResponseError {
  success: false;
  message: string;
  errors?: unknown;
}

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };
