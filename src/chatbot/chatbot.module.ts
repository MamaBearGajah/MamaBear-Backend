import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service.js';
import { ChatbotController } from './chatbot.controller.js';

@Module({
  controllers: [ChatbotController],
  providers: [ChatbotService],
})
export class ChatbotModule {}
