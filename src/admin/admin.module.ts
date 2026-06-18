import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { AuthModule } from '../auth/auth.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    AuthModule, 
    PrismaModule,
    OrdersModule
  ],
  controllers: [AdminController],
  providers: [AdminService],
=======
import { AdminConsultationsService } from './admin-consultations/admin-consultations.service';
import { AdminConsultationsController } from './admin-consultations/admin-consultations.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminProductsController } from './admin-products/admin-products.controller';
import { AdminProductsService } from './admin-products/admin-products.service';
import { AdminCategoriesController } from './admin-categories/admin-categories.controller';
import { AdminCategoriesService } from './admin-categories/admin-categories.service';
import { AdminCustomersController } from './admin-customers/admin-customers.controller';
import { AdminCustomersService } from './admin-customers/admin-customers.service';

@Module({
  imports: [PrismaModule],
  controllers: [AdminConsultationsController, AdminProductsController, AdminCategoriesController, AdminCustomersController],
  providers: [AdminConsultationsService, AdminProductsService, AdminCategoriesService, AdminCustomersService],
>>>>>>> 7de9bcda2c8769692076d8821eb7ba8a45c48a20
})
export class AdminModule {}
