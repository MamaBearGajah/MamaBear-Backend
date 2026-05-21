-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "soldCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "priceAdjustment" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "Product_soldCount_idx" ON "Product"("soldCount" DESC);

-- CreateIndex
CREATE INDEX "Product_status_soldCount_idx" ON "Product"("status", "soldCount" DESC);
