import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddWishlistDto {
  @ApiProperty({ description: 'Product ID yang di-wishlist', example: 'uuid-here' })
  @IsUUID()
  productId!: string;
}