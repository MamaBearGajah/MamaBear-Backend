import { Module } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { ProductsController } from './products.controller.js';
import { ReviewsService } from './reviews.service.js';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ReviewsService],
})
export class ProductsModule {}
