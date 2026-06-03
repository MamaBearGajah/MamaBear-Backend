-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "reservedStock" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "altText" TEXT,
ADD COLUMN     "reservedStock" INTEGER NOT NULL DEFAULT 0;
