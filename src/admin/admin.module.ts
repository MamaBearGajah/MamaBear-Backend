import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

import { AdminConsultationsController } from './admin-consultations/admin-consultations.controller';
import { AdminConsultationsService } from './admin-consultations/admin-consultations.service';

import { AdminProductsController } from './admin-products/admin-products.controller';
import { AdminProductsService } from './admin-products/admin-products.service';

import { AdminCategoriesController } from './admin-categories/admin-categories.controller';
import { AdminCategoriesService } from './admin-categories/admin-categories.service';

import { AdminCustomersController } from './admin-customers/admin-customers.controller';
import { AdminCustomersService } from './admin-customers/admin-customers.service';

// import { AdminOrdersController } from './admin-orders/admin-orders.controller';
// import { AdminOrdersService } from './admin-orders/admin-orders.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    AdminConsultationsController,
    AdminProductsController,
    AdminCategoriesController,
    AdminCustomersController,
    // AdminOrdersController,
  ],
  providers: [
    AdminConsultationsService,
    AdminProductsService,
    AdminCategoriesService,
    AdminCustomersService,
    // AdminOrdersService,
  ],
})
export class AdminModule {}