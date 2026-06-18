import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';

// Catatan: altText tidak ada di ProductVariant schema — hanya ProductImage yang punya altText
class VariantImageItem {
  @ApiProperty({ example: 'uuid-variant' })
  @IsUUID()
  @IsNotEmpty()
  variantId!: string;

  @ApiProperty({ example: 'https://res.cloudinary.com/example/image.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;
}

export class UpdateVariantImagesBatchDto {
  @ApiProperty({ type: [VariantImageItem] })
  @Type(() => VariantImageItem)
  @IsArray()
  @ValidateNested({ each: true })
  variants!: VariantImageItem[];
}