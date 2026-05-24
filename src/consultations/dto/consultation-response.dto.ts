import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ConsultationDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Siti Rahayu' })
  name!: string;

  @ApiProperty({ example: 'siti@example.com' })
  email!: string;

  @ApiPropertyOptional({ example: '081234567890', nullable: true })
  phone!: string | null;

  @ApiProperty({ example: 'Produk apa yang cocok untuk bayi usia 3 bulan?' })
  message!: string;

  @ApiProperty({ example: 'new', enum: ['new', 'in_progress', 'closed'] })
  status!: string;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}
