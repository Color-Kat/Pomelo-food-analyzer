/*
  Warnings:

  - You are about to drop the column `photo_url` on the `Scan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Scan" DROP COLUMN "photo_url",
ADD COLUMN     "photoUrl" TEXT;
