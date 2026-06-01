import { IsInt, IsOptional, Min, IsUUID } from 'class-validator';
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
}

export class UpdateCartItemDto {
  @ApiProperty({ description: 'New quantity for the cart item', example: 3, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

import { IsString } from 'class-validator';

export class MergeGuestCartDto {
  @ApiProperty({ description: 'Guest session ID to merge from', example: 'guest-session-abc123' })
  @IsString()
  sessionId!: string;
}