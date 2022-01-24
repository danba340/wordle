/*
  Warnings:

  - You are about to drop the column `players` on the `Match` table. All the data in the column will be lost.
  - Added the required column `playerName` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "players";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "playerName" TEXT NOT NULL;
