import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

enum ConsultationStatus {
  new = 'new',
  in_progress = 'in_progress',
  closed = 'closed',
}

export class UpdateConsultationDto {
  @ApiProperty({ enum: ConsultationStatus, example: ConsultationStatus.in_progress })
  @IsEnum(ConsultationStatus)
  @IsNotEmpty()
  status!: ConsultationStatus;
}