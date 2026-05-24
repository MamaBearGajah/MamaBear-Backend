import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { PartialType, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({ description: 'The FAQ question', example: 'Apakah produk ini aman untuk bayi baru lahir?' })
  @IsString()
  question!: string;

  @ApiProperty({ description: 'The answer to the question', example: 'Ya, semua produk kami telah melalui uji klinis.' })
  @IsString()
  answer!: string;

  @ApiPropertyOptional({ description: 'Whether this FAQ is visible to customers', example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateFaqDto extends PartialType(CreateFaqDto) {}
