import { ApiProperty } from '@nestjs/swagger';

export class FaqDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Apakah produk ini aman untuk bayi baru lahir?' })
  question!: string;

  @ApiProperty({ example: 'Ya, semua produk kami telah melalui uji klinis dermatologis.' })
  answer!: string;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
