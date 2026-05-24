import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiPropertyOptional,
} from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service.js';
import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { Public } from '../auth/decorators/index.js';
import { ChatbotResponseDto } from './dto/chatbot-response.dto.js';
import { BadRequestResponseDto } from '../common/dto/response.dto.js';

class ChatMessageDto {
  @ApiPropertyOptional({
    description: 'Free-text message from user. Either message or payload must be provided.',
    example: 'apa manfaat almonmix?',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    description: 'Payload from a quickReply button click. Takes priority over message.',
    example: 'ALMONMIX',
  })
  @IsOptional()
  @IsString()
  payload?: string;

  @ValidateIf((o: ChatMessageDto) => !o.payload)
  @IsString()
  get _requireOne(): string | undefined { return this.message; }
}

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Public()
  @Get('start')
  @ApiOkResponse({ description: 'Returns the initial greeting message with main menu quick-reply buttons.', type: ChatbotResponseDto })
  start() {
    return this.chatbotService.getStart();
  }

  @Public()
  @Post('message')
  @Throttle({ default: { ttl: 60000, limit: 10 } })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Returns a chatbot response with optional quick-reply buttons.', type: ChatbotResponseDto })
  @ApiBadRequestResponse({ description: 'message or payload is required.', type: BadRequestResponseDto })
  respond(@Body() dto: ChatMessageDto) {
    return this.chatbotService.respond(dto.message, dto.payload);
  }
}
