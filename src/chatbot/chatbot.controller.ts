import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { ChatbotService } from './chatbot.service';
import { ChatbotQueryDto } from './dto/chatbot-query.dto';
import { Public } from '../auth/decorators';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  // FIX: tambah @Public() agar endpoint bisa diakses tanpa login
  // (sebelumnya tidak ada @Public() sehingga global JwtAuthGuard memblokir request dari user yang belum login)
  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @ApiOperation({ summary: 'Kirim pesan ke chatbot' })
  @ApiResponse({ status: 200, description: 'Respon chatbot berhasil' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 429, description: 'Terlalu banyak request' })
  @Post('query')
  query(@Body() dto: ChatbotQueryDto) {
    return this.chatbotService.query(dto);
  }
}