import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'generated/prisma/enums';

export class UpdateOrderDto {
  @ApiProperty({ enum: OrderStatus, description: 'Status order baru' })
  @IsEnum(OrderStatus)
  status!: OrderStatus;

  @ApiPropertyOptional({ description: 'Nomor resi pengiriman (wajib jika status shipped)' })
  @IsString()
  @IsOptional()
  trackingNumber?: string;

  @ApiPropertyOptional({ description: 'Catatan perubahan status' })
  @IsString()
  @IsOptional()
  note?: string;
}