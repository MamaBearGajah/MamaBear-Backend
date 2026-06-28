import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Route test Sentry — hapus setelah memverifikasi error muncul di dashboard
  @Get('debug-sentry')
  @Public()
  getError() {
    throw new Error('My first Sentry error!');
  }
}