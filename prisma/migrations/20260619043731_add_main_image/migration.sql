/*
  Warnings:

  - Added the required column `mainImage` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN "mainImage" TEXT;

-- Backfill existing products with the first main image URL if available, otherwise fallback to empty string.
UPDATE "Product" p
SET "mainImage" = COALESCE(
  (
    SELECT "imageUrl"
    FROM "ProductImage" pi
    WHERE pi."productId" = p."id" AND pi."imageType" = 'main'
    ORDER BY pi."sortOrder" ASC
    LIMIT 1
  ),
  ''
);

ALTER TABLE "Product" ALTER COLUMN "mainImage" SET NOT NULL;
