import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ example: 'uuid', description: 'Order ID — untuk verifikasi pembelian' })
  @IsUUID()
  orderId!: string;

  @ApiPropertyOptional({ example: 5, description: 'Rating 1–5 (opsional, tapi rating atau review harus ada)', minimum: 1, maximum: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @ApiPropertyOptional({ example: 'Produk bagus!', description: 'Teks ulasan (opsional, tapi rating atau review harus ada)' })
  @IsOptional()
  @IsString()
  review?: string;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {}

export class ToggleHelpfulDto {
  @ApiProperty({ example: true, description: 'Whether the review is helpful' })
  @IsBoolean()
  isHelpful!: boolean;
}
