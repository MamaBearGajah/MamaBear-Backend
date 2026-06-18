import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChatbotQueryDto {
  @ApiProperty({ example: 'Berapa lama pengiriman ke Jakarta?' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  message!: string;
}