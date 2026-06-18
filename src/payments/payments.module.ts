import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { XenditService } from './providers/xendit.service';
import { MidtransService } from './providers/midtrans.service';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [MailModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    XenditService,
    MidtransService,
  ],
})
export class PaymentsModule {}