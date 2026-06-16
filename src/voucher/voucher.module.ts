// src/voucher/voucher.module.ts

import { Module } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherController } from './voucher.controller';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService],
  exports: [VoucherService], // di-export agar OrdersModule bisa pakai applyVoucher
})
export class VoucherModule {}
