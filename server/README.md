# Sorthehelp API

Express + TypeScript + Prisma backend for Sorthehelp.

## Stack

- **Express** for routing/middleware
- **Prisma** ORM, SQLite for local dev (swap the `provider`/`DATABASE_URL` in
  `prisma/schema.prisma` for Postgres/MySQL in production — nothing else in
  the schema is SQLite-specific)
- **Zod** for request validation
- **JWT** (via `jsonwebtoken`) for auth: email/phone + password, or a 4-digit
  PIN for quick re-login on a trusted device
- **bcryptjs** for password/PIN hashing
- **Zeptomail** (Zoho) for verification and password-reset emails

## Response shape

Every route except `/health` (kept flat for uptime/monitoring tools) responds
with the same envelope, on success and on failure alike:

```jsonc
// success
{ "success": true, "message": "Group created successfully", "data": { "group": { ... } } }

// failure — same shape, note `errors` instead of `data`
{ "success": false, "message": "Validation failed", "errors": { "fieldErrors": { ... } } }
```

Build these with `sendSuccess(res, status, message, data?)` from
`utils/apiResponse.ts` — don't call `res.json()` directly in a controller, so
the shape can't drift route to route. Failures go through the shared
`errorHandler` middleware (just `throw ApiError.xxx(...)` or let Zod/Prisma
errors propagate) rather than building the envelope by hand.

Status codes are meaningful, not just 200-with-a-flag:

| Code | Meaning |
|---|---|
| 200 | successful request |
| 201 | resource created |
| 204 | successful request, no body (deletes) |
| 400 | bad request / validation error |
| 401 | not authenticated |
| 403 | authenticated but not authorized |
| 404 | resource not found |
| 409 | conflict (e.g. duplicate email/phone) |
| 500 | internal server error |

## Structure

```
src/
  app.ts            express app: middleware + route mounting
  server.ts          entrypoint: listen + graceful shutdown
  lib/                env validation, prisma client singleton
  middleware/        auth, validation, error handling
  routes/             one file per resource, mounted under /api
  controllers/        request/response glue
  services/            business logic (payment/cycle rules, ownership
                        checks, reminder templating) — kept separate from
                        controllers so the rules are unit-testable and
                        can't drift between endpoints
  schemas/             zod request schemas
  types/               express Request augmentation (req.ownerId)
prisma/
  schema.prisma        Owner, Group, Plan, Member, Entry
  migrations/
```

## Getting started

```bash
cp .env.example .env      # then edit JWT_SECRET etc.
npm install
npm run prisma:migrate    # creates/updates dev.db
npm run dev                # tsx watch, http://localhost:4000
```

`GET /api/health` should return `{"status":"ok","db":"connected",...}`.

## Auth flow

Identity is **email and/or phone + password** — at least one of email/phone
is required at signup, both are optional individually, and either can be
used to log in.

1. `POST /api/auth/signup { email?, phone?, name?, password }` → `data: { token, owner }`.
   If an email was given, a verification link is emailed via Zeptomail
   (`POST /api/auth/email/verify { token }` to consume it; `POST
   /api/auth/email/resend`, authed, to get a new one). Signup doesn't block
   on verification — the token is usable immediately.
2. `POST /api/auth/login { identifier, password }` — `identifier` is either
   the email or the phone number → `data: { token, owner }`.
3. Forgot password: `POST /api/auth/password/forgot { email }` always
   returns the same generic message whether or not the account exists (no
   email enumeration), and emails a reset link if it does. `POST
   /api/auth/password/reset { token, password }` consumes it (single-use,
   1 hour) and returns a fresh `data: { token, owner }`.
4. Once a PIN is set (`POST /api/auth/pin { pin }`, authed), returning users
   can skip the password via `POST /api/auth/pin/verify { identifier, pin }`
   → `data: { token, owner }` — meant for a quick re-unlock on a trusted
   device, not as the primary login.

**Zeptomail**: with `ZEPTOMAIL_API_KEY` unset (the default), verification
and reset emails are logged to the console instead of sent, so the whole
flow is testable with no account. Get a key from
[zoho.com/zeptomail](https://www.zoho.com/zeptomail/) to send for real.

Send `Authorization: Bearer <token>` on every other route.

## Resource routes

All under `/api`, all requiring auth except `/health`, `/auth/signup`,
`/auth/login`, `/auth/password/*`, `/auth/email/verify`, and `/auth/pin/verify`.

| Method | Path | Notes |
|---|---|---|
| GET/POST | `/groups` | list includes live member/plan counts, collected total, status summary |
| GET/PATCH/DELETE | `/groups/:id` | |
| GET/POST | `/groups/:groupId/plans` | |
| PATCH/DELETE | `/plans/:id` | editing price/type cascades to every member still on that plan; deleting one unlinks its members (they fall back to custom pricing) rather than deleting them |
| GET/POST | `/groups/:groupId/members` | supports `?type=&status=&planId=&q=` |
| GET/PATCH/DELETE | `/members/:id` | GET includes entry history |
| PATCH | `/members/:id/plan` | `{ planId }` or `{ planId: null }` for custom |
| POST | `/members/:id/payments` | `{ amount }` — recurring members that clear their cycle roll paidAmount back to 0 and push dueDate 30 days out |
| POST | `/members/:id/mark-paid` | one-time: paid in full; recurring: cycle settled + rolls over |
| POST | `/members/:id/remind` | renders the owner's reminder template and returns a `wa.me` link; doesn't send anything itself |
| GET | `/members/:id/entries` | payment/reminder/history log |
| GET/PATCH | `/auth/me` | owner profile, including `reminderTemplate` and `payoutAccount` — this doubles as the settings endpoint |

Every group/plan/member route is scoped to the authenticated owner —
cross-owner access 404s rather than leaking data.

## Scripts

- `npm run dev` — watch mode
- `npm run build` / `npm start` — compile then run
- `npm run typecheck`
- `npm run prisma:studio` — browse the dev database
- `npm run db:seed` — (not yet implemented; add `prisma/seed.ts` if you want
  the demo data from the frontend's mock hook seeded here too)
