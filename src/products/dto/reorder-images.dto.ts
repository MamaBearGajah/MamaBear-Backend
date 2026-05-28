import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID, ArrayMinSize } from 'class-validator';

export class ReorderImagesDto {
  @ApiProperty({
    description: 'Array of image IDs in new order (index = sortOrder)',
    example: ['uuid1', 'uuid2', 'uuid3'],
    type: [String],
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID('4', { each: true })
  imageIds!: string[];
}