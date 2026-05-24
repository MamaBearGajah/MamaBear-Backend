import { IsString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetCityDto {
  @ApiPropertyOptional({ description: 'Filter cities by Raja Ongkir province ID', example: '9' })
  @IsOptional()
  @IsString()
  provinceId?: string;
}

export class GetShippingCostDto {
  @ApiProperty({ description: 'Raja Ongkir origin city ID', example: '501' })
  @IsString()
  origin!: string;

  @ApiProperty({ description: 'Raja Ongkir destination city ID', example: '114' })
  @IsString()
  destination!: string;

  @ApiProperty({ description: 'Package weight in grams', example: 500, minimum: 1 })
  @IsInt()
  @Min(1)
  weight!: number;

  @ApiProperty({ description: 'Courier code (jne, tiki, pos)', example: 'jne' })
  @IsString()
  courier!: string;
}
