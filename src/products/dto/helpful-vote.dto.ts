import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class HelpfulVoteDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  isHelpful!: boolean;
}