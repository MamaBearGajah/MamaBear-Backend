import { ApiProperty } from '@nestjs/swagger';

export class ProvinceDto {
  @ApiProperty({ example: '9' })
  province_id!: string;

  @ApiProperty({ example: 'DKI Jakarta' })
  province!: string;
}

export class CityDto {
  @ApiProperty({ example: '501' })
  city_id!: string;

  @ApiProperty({ example: '9' })
  province_id!: string;

  @ApiProperty({ example: 'DKI Jakarta' })
  province!: string;

  @ApiProperty({ example: 'Kota', description: 'City type (Kota or Kabupaten)' })
  type!: string;

  @ApiProperty({ example: 'Jakarta Selatan' })
  city_name!: string;

  @ApiProperty({ example: '12240' })
  postal_code!: string;
}

class ShippingCostValueDto {
  @ApiProperty({ example: 9000, description: 'Shipping cost in IDR' })
  value!: number;

  @ApiProperty({ example: '1-2', description: 'Estimated delivery in days' })
  etd!: string;

  @ApiProperty({ example: '' })
  note!: string;
}

class ShippingCostResultDto {
  @ApiProperty({ example: 'REG' })
  service!: string;

  @ApiProperty({ example: 'Layanan Reguler' })
  description!: string;

  @ApiProperty({ type: ShippingCostValueDto })
  cost!: ShippingCostValueDto;
}

export class ShippingCostResponseDto {
  @ApiProperty({ example: 'jne' })
  code!: string;

  @ApiProperty({ example: 'Jalur Nugraha Ekakurir (JNE)' })
  name!: string;

  @ApiProperty({ type: [ShippingCostResultDto] })
  costs!: ShippingCostResultDto[];
}
