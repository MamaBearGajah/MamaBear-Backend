import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ShippingModule } from '../shipping/shipping.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [ShippingModule, MailModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}