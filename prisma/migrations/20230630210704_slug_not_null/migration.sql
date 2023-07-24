/*
  Warnings:

  - Made the column `slug` on table `chatprompts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "chatprompts" ALTER COLUMN "slug" SET NOT NULL;
