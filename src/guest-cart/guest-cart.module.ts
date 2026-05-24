import { Module } from '@nestjs/common';
import { GuestCartService } from './guest-cart.service.js';
import { GuestCartController } from './guest-cart.controller.js';

@Module({
  controllers: [GuestCartController],
  providers: [GuestCartService],
})
export class GuestCartModule {}
