import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ConsultationStatus } from '../../../generated/prisma/client';
import { Type } from 'class-transformer';

export class AdminConsultationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsEnum(ConsultationStatus)
  status?: ConsultationStatus;
}

export class UpdateConsultationStatusDto {
  @IsEnum(ConsultationStatus)
  @IsNotEmpty()
  status!: ConsultationStatus;

  @IsOptional()
  @IsString()
  response?: string;
}
