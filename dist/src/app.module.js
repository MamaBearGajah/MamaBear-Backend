"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const cache_module_1 = require("./cache/cache.module");
const auth_module_1 = require("./auth/auth.module");
const products_module_1 = require("./products/products.module");
const categories_module_1 = require("./categories/categories.module");
const search_module_1 = require("./search/search.module");
const cart_module_1 = require("./cart/cart.module");
const shipping_module_1 = require("./shipping/shipping.module");
const orders_module_1 = require("./orders/orders.module");
const payments_module_1 = require("./payments/payments.module");
const admin_module_1 = require("./admin/admin.module");
const faq_module_1 = require("./faq/faq.module");
const blog_module_1 = require("./blog/blog.module");
const consultations_module_1 = require("./consultations/consultations.module");
const chatbot_module_1 = require("./chatbot/chatbot.module");
const membership_module_1 = require("./membership/membership.module");
const media_module_1 = require("./media/media.module");
const health_module_1 = require("./health/health.module");
const roles_guard_1 = require("./auth/guards/roles.guard");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const users_module_1 = require("./users/users.module");
const throttler_guard_1 = require("./common/guards/throttler.guard");
const reviews_module_1 = require("./products/reviews/reviews.module");
const guest_cart_module_1 = require("./guest-cart/guest-cart.module");
const banner_module_1 = require("./banner/banner.module");
const voucher_module_1 = require("./voucher/voucher.module");
const bundle_module_1 = require("./bundle/bundle.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const reports_module_1 = require("./reports/reports.module");
const promotion_module_1 = require("./promotion/promotion.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
            cache_module_1.RedisCacheModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            search_module_1.SearchModule,
            cart_module_1.CartModule,
            shipping_module_1.ShippingModule,
            orders_module_1.OrdersModule,
            payments_module_1.PaymentsModule,
            admin_module_1.AdminModule,
            faq_module_1.FaqModule,
            blog_module_1.BlogModule,
            consultations_module_1.ConsultationsModule,
            chatbot_module_1.ChatbotModule,
            membership_module_1.MembershipModule,
            media_module_1.MediaModule,
            health_module_1.HealthModule,
            users_module_1.UsersModule,
            reviews_module_1.ReviewsModule,
            guest_cart_module_1.GuestCartModule,
            banner_module_1.BannerModule,
            voucher_module_1.VoucherModule,
            bundle_module_1.BundleModule,
            wishlist_module_1.WishlistModule,
            reports_module_1.ReportsModule,
            promotion_module_1.PromotionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_GUARD, useClass: throttler_guard_1.CustomThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map