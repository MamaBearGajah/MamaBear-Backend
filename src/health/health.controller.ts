import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { Public } from 'src/auth/decorators';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @ApiOperation({ summary: 'Check overall system health' })
  @ApiResponse({ status: 200, description: 'System healthy' })
  @ApiResponse({ status: 503, description: 'System unhealthy' })
  @Get()
  check() {
    return this.healthService.check();
  }

  @Public()
  @ApiOperation({ summary: 'Check database connection' })
  @ApiResponse({ status: 200, description: 'Database connected' })
  @ApiResponse({ status: 503, description: 'Database unreachable' })
  @Get('db')
  checkDatabase() {
    return this.healthService.checkDatabase();
  }
}