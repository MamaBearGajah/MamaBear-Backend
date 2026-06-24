import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, IsUUID, Min, IsOptional } from 'class-validator';

export class AdminAdjustPointsDto {
  @ApiProperty({ example: 'user-uuid-xxx', description: 'ID user yang akan disesuaikan poinnya' })
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({
    example: 100,
    description: 'Jumlah point. Positif = tambah, negatif = kurangi.',
  })
  @IsInt()
  points!: number;

  @ApiPropertyOptional({ example: 'Kompensasi delay pengiriman' })
  @IsString()
  @IsOptional()
  description?: string;
}