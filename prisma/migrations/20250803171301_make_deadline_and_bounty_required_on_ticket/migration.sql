/*
  Warnings:

  - Made the column `bounty` on table `Ticket` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deadline` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "bounty" SET NOT NULL,
ALTER COLUMN "deadline" SET NOT NULL;
