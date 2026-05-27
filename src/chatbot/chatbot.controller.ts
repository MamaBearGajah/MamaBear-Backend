import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @ApiOperation({ summary: 'Kirim pesan ke chatbot' })
  @ApiResponse({ status: 200, description: 'Respon chatbot berhasil' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 429, description: 'Terlalu banyak request' })
  @Post('query')
  query(@Body() dto: ChatbotQueryDto) {
    return this.chatbotService.query(dto);
  }
}