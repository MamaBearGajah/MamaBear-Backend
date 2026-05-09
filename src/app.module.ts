import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SearchModule } from './search/search.module';
import { CartModule } from './cart/cart.module';
import { ShippingModule } from './shipping/shipping.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AdminModule } from './admin/admin.module';
import { FaqModule } from './faq/faq.module';
import { BlogModule } from './blog/blog.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { MembershipModule } from './membership/membership.module';
import { MediaModule } from './media/media.module';
import { HealthModule } from './health/health.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    AuthModule,
    ProductsModule,
    CategoriesModule,
    SearchModule,
    CartModule,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}