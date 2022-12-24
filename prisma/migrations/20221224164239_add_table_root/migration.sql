/*
  Warnings:

  - Added the required column `rootId` to the `restaurants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurants" ADD COLUMN     "rootId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "roots" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roots_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_rootId_fkey" FOREIGN KEY ("rootId") REFERENCES "roots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
