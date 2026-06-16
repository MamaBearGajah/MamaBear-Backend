// src/membership/dto/redeem-points.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class RedeemPointsDto {
  @ApiProperty({
    example: 50,
    description: `Jumlah point yang ingin di-redeem. 
    1 point = Rp 1.000 potongan harga. 
    Minimal ${10} point.`,
  })
  @IsInt()
  @Min(10)
  points!: number;
}
