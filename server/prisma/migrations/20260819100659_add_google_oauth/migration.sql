-- AlterTable
ALTER TABLE "owners" ALTER COLUMN "passwordHash" DROP NOT NULL;
ALTER TABLE "owners" ADD COLUMN "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "owners_googleId_key" ON "owners"("googleId");
