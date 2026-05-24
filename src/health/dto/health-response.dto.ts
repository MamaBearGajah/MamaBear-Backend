import { ApiProperty } from '@nestjs/swagger';

class DatabaseHealthDto {
  @ApiProperty({ example: 'ok', enum: ['ok', 'error'] })
  status!: string;

  @ApiProperty({ example: 12, description: 'Database query response time in milliseconds' })
  responseTimeMs!: number;
}

export class HealthResponseDto {
  @ApiProperty({ example: 'ok', enum: ['ok', 'degraded', 'error'] })
  status!: string;

  @ApiProperty({ example: 3600.5, description: 'Process uptime in seconds' })
  uptimeSeconds!: number;

  @ApiProperty({ type: DatabaseHealthDto })
  database!: DatabaseHealthDto;

  @ApiProperty({ example: '2026-05-24T12:00:00.000Z' })
  timestamp!: string;
}
