import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../../../generated/prisma/enums';

export class UpdateOrderDto {
  @ApiProperty({ enum: OrderStatus, description: 'Status order baru' })
  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @ApiPropertyOptional({ example: 'JNE123456789', description: 'Nomor resi (wajib saat status = shipped)' })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @ApiPropertyOptional({ example: 'Customer request', description: 'Catatan perubahan status / alasan cancel' })
  @IsOptional()
  @IsString()
  note?: string;
}