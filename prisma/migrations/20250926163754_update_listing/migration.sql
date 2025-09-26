/*
  Warnings:

  - Added the required column `category` to the `BookListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BookListing" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "isBundle" BOOLEAN NOT NULL DEFAULT false;
