import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHealthDto } from './dto/create-health.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
import { PrismaService } from '../prisma/prisma.service';
import { timestamp } from 'rxjs';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  async checkHealth() {
    try {
      await this.prisma.$queryRaw`SELECT 1`

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
      }
    }
    catch (error) {
      throw new InternalServerErrorException({
        status: 'error',
        database: 'disconnected',
        timestamp: new Date().toISOString(),
      })
    }
  }
}
