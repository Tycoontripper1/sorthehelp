import { PrismaClient } from "@prisma/client";
import { env } from "./env";

// Reuse the client across module reloads in dev (tsx watch) to avoid
// exhausting database connections.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
