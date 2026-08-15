import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
  JWT_EXPIRES_IN: z.string().default("30d"),
  PORT: z.coerce.number().int().positive().default(4000),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  // Zeptomail — leave unset in dev; emails fall back to console logging.
  ZEPTOMAIL_API_KEY: z.string().optional(),
  ZEPTOMAIL_FROM_EMAIL: z.string().default("noreply@sorthehelp.app"),
  ZEPTOMAIL_FROM_NAME: z.string().default("Sorthehelp"),
  APP_URL: z.string().default("http://localhost:3000"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration:");
  console.error(parsed.error.flatten().fieldErrors);
  throw new Error("Environment validation failed — check server/.env against .env.example");
}

export const env = parsed.data;
