export class ApiClientError extends Error {
  status: number;
  errors?: unknown;

  constructor(status: number, message: string, errors?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
  }
}

type ApiEnvelope<T> =
  | { success: true; message: string; data: T }
  | { success: false; message: string; errors?: unknown };

/** Calls our /api/* proxy (see app/api/[...path]/route.ts), which forwards to the Express backend with the session's Bearer token attached. */
export async function apiClient<T>(
  path: string,
  options: { method?: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown } = {},
): Promise<T> {
  const { method = "GET", body } = options;

  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiClientError(0, "Can't reach the server — check your connection and try again");
  }

  if (res.status === 204) return undefined as T;

  const json = (await res.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!res.ok || !json || json.success === false) {
    throw new ApiClientError(
      res.status,
      json?.message ?? "Something went wrong",
      json && "errors" in json ? json.errors : undefined,
    );
  }

  return json.data;
}
