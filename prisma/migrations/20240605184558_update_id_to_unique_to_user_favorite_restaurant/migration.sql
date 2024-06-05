/*
  Warnings:

  - The primary key for the `UserFavoriteRestaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,restaurantId]` on the table `UserFavoriteRestaurant` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `UserFavoriteRestaurant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "UserFavoriteRestaurant" DROP CONSTRAINT "UserFavoriteRestaurant_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserFavoriteRestaurant_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteRestaurant_userId_restaurantId_key" ON "UserFavoriteRestaurant"("userId", "restaurantId");
