import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { VariantsModule } from './variants/variants.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [PrismaModule, VariantsModule, ImagesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
