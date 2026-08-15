# Sorthehelp API

Express + TypeScript + Prisma backend for Sorthehelp.

## Stack

- **Express** for routing/middleware
- **Prisma** ORM, SQLite for local dev (swap the `provider`/`DATABASE_URL` in
  `prisma/schema.prisma` for Postgres/MySQL in production — nothing else in
  the schema is SQLite-specific)
- **Zod** for request validation
- **JWT** (via `jsonwebtoken`) for auth, phone + OTP or 4-digit PIN
- **bcryptjs** for PIN hashing

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

1. `POST /api/auth/otp/request { phone, name? }` — creates/updates the Owner,
   issues a one-time code. No SMS provider is wired up yet: in non-production
   the code comes back as `devCode` in the response body, and is logged to
   the console. Swap `console.log` in `auth.controller.ts` for a real
   provider (Termii, Twilio, etc.) before shipping, and drop the `devCode`
   field once one exists.
2. `POST /api/auth/otp/verify { phone, code }` → `{ token, owner }`
3. Or, once a PIN is set (`POST /api/auth/pin`, authed), returning users can
   skip OTP via `POST /api/auth/pin/verify { phone, pin }` → `{ token, owner }`

Send `Authorization: Bearer <token>` on every other route.

## Resource routes

All under `/api`, all requiring auth except `/health` and `/auth/otp/*` +
`/auth/pin/verify`.

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
