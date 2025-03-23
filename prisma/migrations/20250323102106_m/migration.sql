/*
  Warnings:

  - You are about to drop the column `isConfirm` on the `User` table. All the data in the column will be lost.
  - Added the required column `isConfirm` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrConfirm" AS ENUM ('PENDING', 'ACTIVE', 'DECLARED');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isConfirm" "PrConfirm" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isConfirm";
