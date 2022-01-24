/*
  Warnings:

  - The primary key for the `Battle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Result` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Result" DROP CONSTRAINT "Result_battleId_fkey";

-- AlterTable
ALTER TABLE "Battle" DROP CONSTRAINT "Battle_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Battle_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Battle_id_seq";

-- AlterTable
ALTER TABLE "Result" DROP CONSTRAINT "Result_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "battleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Result_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Result_id_seq";

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
