/*
  Warnings:

  - You are about to drop the column `rootId` on the `restaurants` table. All the data in the column will be lost.
  - You are about to drop the `roots` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rootUserId` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_rootId_fkey";

-- AlterTable
ALTER TABLE "restaurants" DROP COLUMN "rootId",
ADD COLUMN     "rootUserId" TEXT NOT NULL;

-- DropTable
DROP TABLE "roots";

-- CreateTable
CREATE TABLE "root-users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "root-users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_rootUserId_fkey" FOREIGN KEY ("rootUserId") REFERENCES "root-users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
