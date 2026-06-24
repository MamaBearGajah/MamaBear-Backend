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
import { AdminOrdersController } from './admin-orders/admin-orders.controller';
// ── BARU ──
import { AdminUsersController } from './admin-users/admin-users.controller';
import { AdminUsersService } from './admin-users/admin-users.service';

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
    AdminOrdersController,
    AdminUsersController,   // ← BARU
  ],
  providers: [
    AdminCustomersService,
    AdminConsultationsService,
    AdminProductsService,
    AdminCategoriesService,
    AdminUsersService,
  ],
})
export class AdminModule {}