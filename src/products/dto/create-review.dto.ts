import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'uuid-order-123', description: 'Order ID — harus status delivered dan mengandung produk ini' })
  @IsUUID()
  orderId!: string;

  @ApiPropertyOptional({ example: 5, description: 'Rating 1–5. Rating atau review minimal satu harus diisi', minimum: 1, maximum: 5 })
  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: 'Produk bagus, pengiriman cepat!', description: 'Teks ulasan. Rating atau review minimal satu harus diisi' })
  @IsString()
  @IsOptional()
  review?: string;
}