/*
  Warnings:

  - Added the required column `passwordHash` to the `owners` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_owners" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "emailVerifiedAt" DATETIME,
    "pinHash" TEXT,
    "payoutAccount" TEXT,
    "planTier" TEXT NOT NULL DEFAULT 'FREE',
    "reminderTemplate" TEXT NOT NULL DEFAULT 'Hi {name}, friendly reminder from {group} — {amount} is still outstanding. Kindly make payment to keep your access active. Thank you!',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_owners" ("createdAt", "id", "name", "payoutAccount", "phone", "pinHash", "planTier", "reminderTemplate", "updatedAt") SELECT "createdAt", "id", "name", "payoutAccount", "phone", "pinHash", "planTier", "reminderTemplate", "updatedAt" FROM "owners";
DROP TABLE "owners";
ALTER TABLE "new_owners" RENAME TO "owners";
CREATE UNIQUE INDEX "owners_email_key" ON "owners"("email");
CREATE UNIQUE INDEX "owners_phone_key" ON "owners"("phone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
