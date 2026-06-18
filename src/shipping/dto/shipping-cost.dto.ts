import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ShippingCostDto {
  @ApiProperty({ example: '10', description: 'ID kota asal dari RajaOngkir' })
  @IsString()
  @IsNotEmpty()
  originCityId!: string;

  @ApiProperty({ example: '23', description: 'ID kota tujuan dari RajaOngkir' })
  @IsString()
  @IsNotEmpty()
  destinationCityId!: string;

  @ApiProperty({ example: 1000, description: 'Berat paket dalam gram' })
  @IsNumber()
  @Min(1)
  weight!: number;

  @ApiProperty({ example: 'jne', description: 'Kode kurir (jne, tiki, pos)' })
  @IsString()
  @IsNotEmpty()
  courier!: string;
}