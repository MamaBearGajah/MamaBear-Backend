/*
  Warnings:

  - You are about to drop the column `mainImage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `priceAdjustment` on the `ProductVariant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sku]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `basePrice` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('main', 'nutrition', 'ingredients', 'usage', 'other');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "mainImage";

-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN "imageType" "ImageType" NOT NULL DEFAULT 'main';

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN "basePrice" DECIMAL(65,30);
ALTER TABLE "ProductVariant" ADD COLUMN "discountPrice" DECIMAL(65,30);
ALTER TABLE "ProductVariant" ALTER COLUMN "priceAdjustment" SET DEFAULT 0;

UPDATE "ProductVariant" pv
SET "basePrice" = (SELECT "basePrice" FROM "Product" p WHERE p.id = pv."productId");

ALTER TABLE "ProductVariant" ALTER COLUMN "basePrice" SET NOT NULL;
ALTER TABLE "ProductVariant" DROP COLUMN IF EXISTS "priceAdjustment";

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "rating" INTEGER,
    "review" TEXT,
    "isVerifiedPurchase" BOOLEAN NOT NULL DEFAULT true,
    "helpfulCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductReviewHelpful" (
    "id" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isHelpful" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductReviewHelpful_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductReview_userId_productId_orderId_key" ON "ProductReview"("userId", "productId", "orderId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductReviewHelpful_reviewId_userId_key" ON "ProductReviewHelpful"("reviewId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReviewHelpful" ADD CONSTRAINT "ProductReviewHelpful_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "ProductReview"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReviewHelpful" ADD CONSTRAINT "ProductReviewHelpful_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;