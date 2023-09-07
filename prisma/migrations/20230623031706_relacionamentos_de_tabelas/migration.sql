/*
  Warnings:

  - You are about to drop the column `bag_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `money_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `bag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `money` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `bag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `money` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bag" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "money" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bag_id",
DROP COLUMN "money_id";

-- CreateIndex
CREATE UNIQUE INDEX "bag_user_id_key" ON "bag"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "money_user_id_key" ON "money"("user_id");

-- AddForeignKey
ALTER TABLE "money" ADD CONSTRAINT "money_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bag" ADD CONSTRAINT "bag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
