-- CreateEnum
CREATE TYPE "PromotionStatus" AS ENUM ('draft', 'active', 'ended');

-- AlterTable
ALTER TABLE "Banner" ADD COLUMN     "extraText" TEXT;

-- CreateTable
CREATE TABLE "PromotionLanding" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "badgeText" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "PromotionStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "heroBundleId" TEXT,

    CONSTRAINT "PromotionLanding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionSection" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionBenefit" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PromotionBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PromotionLanding_slug_key" ON "PromotionLanding"("slug");

-- CreateIndex
CREATE INDEX "PromotionLanding_status_idx" ON "PromotionLanding"("status");

-- CreateIndex
CREATE INDEX "PromotionLanding_slug_idx" ON "PromotionLanding"("slug");

-- CreateIndex
CREATE INDEX "PromotionSection_promotionId_sortOrder_idx" ON "PromotionSection"("promotionId", "sortOrder");

-- CreateIndex
CREATE INDEX "PromotionBenefit_promotionId_idx" ON "PromotionBenefit"("promotionId");

-- AddForeignKey
ALTER TABLE "PromotionSection" ADD CONSTRAINT "PromotionSection_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "PromotionLanding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionBenefit" ADD CONSTRAINT "PromotionBenefit_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "PromotionLanding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
