/*
  Warnings:

  - A unique constraint covering the columns `[orderNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderNumber` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuestCart" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- AlterTable: tambah sebagai nullable dulu, isi default, baru set NOT NULL
ALTER TABLE "Order" ADD COLUMN "orderNumber" TEXT;
UPDATE "Order" o SET "orderNumber" = sub.generated
FROM (
  SELECT id, 'ORB-' || TO_CHAR("createdAt", 'YYYYMMDD') || '-' || LPAD(CAST(ROW_NUMBER() OVER (ORDER BY "createdAt") AS TEXT), 4, '0') AS generated
  FROM "Order"
) sub
WHERE o.id = sub.id;
ALTER TABLE "Order" ALTER COLUMN "orderNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN "productName" TEXT,
ADD COLUMN "variantName" TEXT;
UPDATE "OrderItem" oi SET "productName" = p.name FROM "Product" p WHERE oi."productId" = p.id;
ALTER TABLE "OrderItem" ALTER COLUMN "productName" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "weight" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_orderNumber_idx" ON "Order"("orderNumber");