import {
  Injectable,
  ServiceUnavailableException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async check() {
    const db = await this.checkDatabase();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      services: { db },
    };
  }

  async checkDatabase() {
    const start = Date.now();

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      const latency = Date.now() - start;

      return {
        status: 'ok',
        latency: `${latency}ms`,
      };
    } catch (error) {
      this.logger.error('Database health check failed', (error as Error).message);
      throw new ServiceUnavailableException({
        status: 'error',
        message: 'Database tidak dapat dijangkau',
        timestamp: new Date().toISOString(),
      });
    }
  }
}