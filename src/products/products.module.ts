import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CacheService } from 'src/cache/cache.service';
import { VariantsModule } from './variants/variants.module';
import { ImagesModule } from './images/images.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [VariantsModule, ImagesModule, ReviewsModule],
  controllers: [ProductsController],
  providers: [ProductsService, CacheService],
  exports: [ProductsService],
})
export class ProductsModule {}