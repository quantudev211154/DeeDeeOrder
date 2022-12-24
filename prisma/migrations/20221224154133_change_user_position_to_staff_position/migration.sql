/*
  Warnings:

  - The `position` column on the `staffs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "StaffPosition" AS ENUM ('MANAGER', 'STAFF');

-- AlterTable
ALTER TABLE "staffs" DROP COLUMN "position",
ADD COLUMN     "position" "StaffPosition" NOT NULL DEFAULT 'STAFF';

-- DropEnum
DROP TYPE "UserPosition";
