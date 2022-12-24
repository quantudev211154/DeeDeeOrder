/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `root-users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "root-users_username_key" ON "root-users"("username");
