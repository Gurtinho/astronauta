/*
  Warnings:

  - Added the required column `channel` to the `punishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "punishment" ADD COLUMN     "channel" TEXT NOT NULL;
