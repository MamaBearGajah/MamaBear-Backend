import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminConsultationsController } from './admin-consultations/admin-consultations.controller';
import { AdminConsultationsService } from './admin-consultations/admin-consultations.service';
import { AdminProductsController } from './admin-products/admin-products.controller';
import { AdminProductsService } from './admin-products/admin-products.service';
import { AdminCategoriesController } from './admin-categories/admin-categories.controller';
import { AdminCategoriesService } from './admin-categories/admin-categories.service';
import { AdminCustomersController } from './admin-customers/admin-customers.controller';
import { AdminCustomersService } from './admin-customers/admin-customers.service';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    OrdersModule,
  ],
  controllers: [
    AdminController,
    AdminConsultationsController,
    AdminProductsController,
    AdminCategoriesController,
    AdminCustomersController,
  ],
  providers: [
    AdminCustomersService,
    AdminConsultationsService,
    AdminProductsService,
    AdminCategoriesService,
  ],
})
export class AdminModule {}