-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discountShipping" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "voucherShippingId" TEXT;

-- CreateIndex
CREATE INDEX "Order_voucherShippingId_idx" ON "Order"("voucherShippingId");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_voucherShippingId_fkey" FOREIGN KEY ("voucherShippingId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
