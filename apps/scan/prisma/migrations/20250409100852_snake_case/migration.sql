/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Scan` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Scan` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Scan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Scan` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Scan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Scan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scan" DROP COLUMN "createdAt",
DROP COLUMN "photoUrl",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "photo_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;
