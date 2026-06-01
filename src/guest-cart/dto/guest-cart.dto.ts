import { IsInt, IsOptional, Min, IsUUID, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGuestCartDto {
  @ApiProperty({ description: 'Session identifier unik untuk guest cart', example: 'sess_abc123' })
  @IsString()
  sessionId!: string;
}

export class GuestAddToCartDto {
  @ApiProperty({ description: 'Guest session identifier (UUID or custom string)', example: 'sess_abc123' })
  @IsString()
  sessionId!: string;

  @ApiProperty({ description: 'Product UUID', example: 'uuid-here' })
  @IsUUID()
  productId!: string;

  @ApiPropertyOptional({ description: 'Product variant UUID (if applicable)', example: 'uuid-here' })
  @IsOptional()
  @IsUUID()
  variantId?: string;

  @ApiProperty({ description: 'Quantity to add', example: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class GuestUpdateCartItemDto {
  @ApiProperty({ description: 'New quantity for the cart item', example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;
}