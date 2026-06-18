import { Module } from '@nestjs/common';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { FaqModule } from '../faq/faq.module';

@Module({
  imports: [FaqModule],
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}