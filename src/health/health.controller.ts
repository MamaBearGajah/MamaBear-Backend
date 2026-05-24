import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { HealthService } from './health.service.js';
import { Public } from '../auth/decorators/index.js';
import { HealthResponseDto } from './dto/health-response.dto.js';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  @ApiOkResponse({ description: 'Returns service health status, uptime, and database response time.', type: HealthResponseDto })
  check() {
    return this.healthService.check();
  }
}
