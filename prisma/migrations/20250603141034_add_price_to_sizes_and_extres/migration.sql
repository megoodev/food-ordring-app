/*
  Warnings:

  - Added the required column `price` to the `Extra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Extra" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Size" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
