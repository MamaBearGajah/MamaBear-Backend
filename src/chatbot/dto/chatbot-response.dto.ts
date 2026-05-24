import { ApiProperty } from '@nestjs/swagger';

export class QuickReplyDto {
  @ApiProperty({ example: 'ALMONMIX' })
  id!: string;

  @ApiProperty({ example: '🥛 AlmonMix' })
  label!: string;

  @ApiProperty({ example: 'ALMONMIX', description: 'Send this value back as the payload field on the next request' })
  payload!: string;
}

export class ChatbotResponseDto {
  @ApiProperty({ example: 'menu', enum: ['menu', 'answer', 'faq', 'fallback'] })
  type!: string;

  @ApiProperty({ example: 'Halo! 👋 Pilih topik yang ingin kamu tanyakan:' })
  message!: string;

  @ApiProperty({ type: [QuickReplyDto], description: 'Buttons/options to show the user. Send the chosen payload back on the next request.' })
  quickReplies!: QuickReplyDto[];
}
