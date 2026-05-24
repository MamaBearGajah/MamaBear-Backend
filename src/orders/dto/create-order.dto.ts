import { IsString, IsOptional, IsArray, ValidateNested, IsInt, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OrderItemDto {
  @ApiProperty({ description: 'Product UUID', example: 'uuid-here' })
  @IsUUID()
  productId!: string;

  @ApiPropertyOptional({ description: 'Variant UUID (if applicable)', example: 'uuid-here' })
  @IsOptional()
  @IsUUID()
  variantId?: string;

  @ApiProperty({ description: 'Quantity to order', example: 2, minimum: 1 })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Shipping address UUID (must belong to the authenticated user)', example: 'uuid-here' })
  @IsUUID()
  addressId!: string;

  @ApiProperty({ description: 'List of items to order', type: [OrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @ApiProperty({ description: 'Courier code (jne, tiki, pos)', example: 'jne' })
  @IsString()
  courier!: string;

  @ApiProperty({ description: 'Courier service type', example: 'REG' })
  @IsString()
  service!: string;

  @ApiPropertyOptional({ description: 'Additional notes for the order', example: 'Tolong dibungkus rapi.' })
  @IsOptional()
  @IsString()
  notes?: string;
}
