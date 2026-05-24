import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class MemberUserDto {
  @ApiProperty({ example: 'uuid-here' })
  id!: string;

  @ApiProperty({ example: 'Budi Santoso' })
  name!: string;

  @ApiProperty({ example: 'budi@example.com' })
  email!: string;
}

export class MembershipDto {
  @ApiProperty({ example: 'uuid-here', description: 'Same as userId (primary key)' })
  userId!: string;

  @ApiProperty({ example: 150, description: 'Total accumulated points' })
  points!: number;

  @ApiPropertyOptional({ example: '2026-05-24T00:00:00.000Z', nullable: true, description: 'Timestamp of last daily login bonus claim' })
  lastDailyLoginAt!: Date | null;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updatedAt!: Date;
}

export class MembershipWithUserDto extends MembershipDto {
  @ApiProperty({ type: MemberUserDto })
  user!: MemberUserDto;
}

export class DailyLoginResponseDto {
  @ApiProperty({ example: 'Daily login bonus claimed.' })
  message!: string;

  @ApiProperty({ example: 155, description: 'Updated points total after bonus' })
  points!: number;

  @ApiProperty({ example: '2026-05-24T00:00:00.000Z' })
  lastDailyLoginAt!: Date;
}
