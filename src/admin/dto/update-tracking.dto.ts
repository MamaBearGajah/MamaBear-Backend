import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTrackingDto {
  @ApiProperty({ example: 'JNE123456789', description: 'Nomor resi pengiriman' })
  @IsString()
  @IsNotEmpty()
  trackingNumber!: string;

  @ApiPropertyOptional({
    example: 'Dikirim via JNE REG',
    description: 'Catatan opsional',
  })
  @IsOptional()
  @IsString()
  note?: string;
}
