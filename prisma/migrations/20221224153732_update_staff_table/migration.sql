/*
  Warnings:

  - Added the required column `password` to the `staffs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "staffs" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "tokenVersion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "username" TEXT NOT NULL;
