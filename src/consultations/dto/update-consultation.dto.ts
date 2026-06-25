import { ApiProperty } from '@nestjs/swagger';
import { ConsultationStatus } from 'generated/prisma/enums';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateConsultationDto {
  @ApiProperty({
    enum: ConsultationStatus,
    example: ConsultationStatus.in_progress,
  })
  @IsEnum(ConsultationStatus)
  status!: ConsultationStatus;

  @ApiProperty({
    required: false,
    example:
      'Terima kasih telah menghubungi kami. Tim kami akan segera menghubungi Anda.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(5000)
  response?: string;
}