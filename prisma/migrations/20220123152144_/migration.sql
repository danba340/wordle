/*
  Warnings:

  - You are about to drop the column `battleId` on the `Result` table. All the data in the column will be lost.
  - You are about to drop the `Battle` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `matchId` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_battleId_fkey";

-- AlterTable
ALTER TABLE "Result" DROP COLUMN "battleId",
ADD COLUMN     "matchId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Battle";

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL DEFAULT E'',
    "players" TEXT[],

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
