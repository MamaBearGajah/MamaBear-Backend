import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ShippingModule } from '../shipping/shipping.module';
import { MailModule } from '../mail/mail.module';
import { MembershipModule } from '../membership/membership.module';
import { VoucherModule } from '../voucher/voucher.module';

@Module({
  imports: [ShippingModule, MailModule, MembershipModule, VoucherModule],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
