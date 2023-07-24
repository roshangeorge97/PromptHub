/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `chatprompts` will be added. If there are existing duplicate values, this will fail.

*/

-- AlterTable
ALTER TABLE "chatprompts" ADD COLUMN IF NOT EXISTS "slug" TEXT;

-- DropTable
DROP TABLE IF EXISTS "Post";

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "chatprompts_slug_key" ON "chatprompts"("slug");
