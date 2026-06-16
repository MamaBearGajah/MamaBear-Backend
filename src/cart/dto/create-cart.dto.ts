import { IsInt, IsOptional, Min, IsUUID, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddToCartDto {
  @ApiProperty({ description: 'Product UUID', example: 'uuid-here' })
  @IsUUID()
  productId!: string;

  @ApiPropertyOptional({ description: 'Product variant UUID (if applicable)', example: 'uuid-here' })
  @IsOptional()
  @IsUUID()
  variantId?: string;

  @ApiProperty({ description: 'Quantity to add', example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({ description: 'Catatan untuk item ini, misal "Tolong bungkus kado"', example: 'Tolong bungkus kado' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ description: 'New quantity for the cart item', example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;

  @ApiPropertyOptional({ description: 'Catatan untuk item ini, misal "Tolong bungkus kado"', example: 'Tolong bungkus kado' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class MergeGuestCartDto {
  @ApiProperty({ description: 'Guest session ID to merge from', example: 'guest-session-abc123' })
  @IsString()
  sessionId!: string;
}