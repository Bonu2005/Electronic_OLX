/*
  Warnings:

  - Added the required column `isConfirm` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isConfirm" BOOLEAN NOT NULL;
