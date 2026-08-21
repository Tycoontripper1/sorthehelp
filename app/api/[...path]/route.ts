import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/actions/auth/server-actions";

/**
 * Proxies /api/* to the Express backend, attaching the owner's JWT from the
 * httpOnly session cookie. Keeps the token out of client-side JS (no XSS
 * exfiltration) while still letting the frontend call plain REST endpoints
 * with a normal fetch + baseURL, instead of every request going through a
 * Server Action.
 */
const API_BASE_URL = (process.env.API_URL || "http://localhost:4000/api").replace(/\/$/, "");

async function proxy(req: NextRequest, params: { path: string[] }) {
  const token = await getAuthToken();
  const path = params.path.join("/");
  const url = `${API_BASE_URL}/${path}${req.nextUrl.search}`;

  const hasBody = !["GET", "HEAD", "DELETE"].includes(req.method);
  const body = hasBody ? await req.text() : undefined;

  let res: Response;
  try {
    res = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body || undefined,
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Can't reach the server — check your connection and try again" },
      { status: 502 },
    );
  }

  if (res.status === 204) return new NextResponse(null, { status: 204 });

  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") ?? "application/json" },
  });
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await ctx.params);
}
export async function POST(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await ctx.params);
}
export async function PATCH(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await ctx.params);
}
export async function DELETE(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  return proxy(req, await ctx.params);
}
