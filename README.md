# Sorthehelp

A Naira-priced, WhatsApp-native ledger for payment and access tracking — built for African creators and community owners.

**Live:** [sorthehelp.com](https://sorthehelp.com)
Submitted to the **AI Academy Nigeria Pitchathon 2026**.

## What it does

Nigerian creators and community owners — coaches, cohort admins, course creators — run their businesses through WhatsApp but track payment and access manually. Sorthehelp replaces the spreadsheet and the screenshotted bank alert with one book for one-time sales and recurring memberships: log a payment, mark as paid, and access delivers automatically.

## Stack

**Backend** — Express, TypeScript, Prisma, PostgreSQL
- Auth: email/phone + password, Google sign-in, email verification, password reset, PIN unlock, JWT (ownership-scoped)
- Core ledger model: `Owner → Group → Plan → Member → Entry`, full CRUD + history log
- Telegram integration for access delivery (single-use invite on settlement, revoked on removal)
- WhatsApp reminders via deep link; email broadcasts via Zeptomail

**Frontend** — Next.js 16, React 19
- Auth flow wired to the live API (splash → signup/login → onboarding → PIN unlock → recovery)
- Full product UI: groups, ledger, member detail, plans, pay/mark-paid, reminder templates, bulk member add

## Status

Backend API is complete. Frontend UI is fully built and currently running on mock state pending final wiring to the live backend, ahead of public launch.

## Roadmap

1. **Now** — payment & access tracking (this repo)
2. **Next** — AI-powered collections: context-aware WhatsApp reminders and natural-language ledger queries, built on Meta's Llama models
3. **Then** — full creator-monetization platform: native memberships, content delivery, payouts
