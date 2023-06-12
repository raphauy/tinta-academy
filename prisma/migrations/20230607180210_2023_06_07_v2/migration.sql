/*
  Warnings:

  - You are about to drop the column `sanityId` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Course_sanityId_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "sanityId",
ALTER COLUMN "userId" DROP NOT NULL;
