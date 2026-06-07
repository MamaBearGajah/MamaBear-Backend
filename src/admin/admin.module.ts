import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
