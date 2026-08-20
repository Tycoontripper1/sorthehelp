import { ApiMethodEnum, IResponseAPI, IResponseError } from "@/actions/common";

/**
 * Talks to the standalone Express + Prisma API in `server/` (see
 * server/src/app.ts — everything is mounted under `/api`). That server is
 * not part of this Next.js build (excluded in tsconfig.json) and runs on
 * its own port; point API_URL at wherever it's deployed.
 */
const API_BASE_URL = (process.env.API_URL || "http://localhost:4000/api").replace(/\/$/, "");

export class ApiRequestError extends Error {
  status: number;
  errors?: unknown;

  constructor(status: number, message: string, errors?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.errors = errors;
  }
}

interface TApiRequest {
  path: string;
  method?: ApiMethodEnum;
  body?: unknown;
  /** Bearer token for routes behind `requireAuth` on the backend. */
  token?: string;
}

/** Calls the backend and unwraps `{ success, message, data }` into `data`, throwing `ApiRequestError` on failure. */
export async function apiRequest<T>({
  path,
  method = ApiMethodEnum.GET,
  body,
  token,
}: TApiRequest): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiRequestError(0, "Can't reach the server — check your connection and try again");
  }

  const json = (await res.json().catch(() => null)) as
    | IResponseAPI<T>
    | IResponseError
    | null;

  if (!res.ok || !json || json.success === false) {
    throw new ApiRequestError(
      res.status,
      json?.message ?? "Something went wrong",
      json && "errors" in json ? json.errors : undefined,
    );
  }

  return json.data;
}
