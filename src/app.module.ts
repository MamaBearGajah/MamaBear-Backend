import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { SearchModule } from './search/search.module.js';
import { CartModule } from './cart/cart.module.js';
import { GuestCartModule } from './guest-cart/guest-cart.module.js';
import { ShippingModule } from './shipping/shipping.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { AdminModule } from './admin/admin.module.js';
import { FaqModule } from './faq/faq.module.js';
import { BlogModule } from './blog/blog.module.js';
import { ConsultationsModule } from './consultations/consultations.module.js';
import { ChatbotModule } from './chatbot/chatbot.module.js';
import { MembershipModule } from './membership/membership.module.js';
import { MediaModule } from './media/media.module.js';
import { HealthModule } from './health/health.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { UsersModule } from './users/users.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard.js';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    PrismaModule,
    AuthModule,
    ProductsModule,
    CategoriesModule,
    SearchModule,
    CartModule,
    GuestCartModule,
    ShippingModule,
    OrdersModule,
    PaymentsModule,
    AdminModule,
    FaqModule,
    BlogModule,
    ConsultationsModule,
    ChatbotModule,
    MembershipModule,
    MediaModule,
    HealthModule,
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
