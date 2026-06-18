import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthMiddleware, AdminMiddleware, OptionalAuthMiddleware } from './common/middleware/auth.middleware';
import { RequestValidationMiddleware } from './common/middleware/request-validation.middleware';

/**
 * Apply middlewares in AppModule (or any feature module).
 *
 * Middleware order matters:
 *   1. RequestValidationMiddleware — sanitize/validate all incoming requests first
 *   2. AuthMiddleware / OptionalAuthMiddleware — then authenticate
 *   3. AdminMiddleware — then authorize (requires req.user from step 2)
 *
 * Copy the implements NestModule + configure() block into your AppModule.
 */
@Module({})
export class MiddlewareExampleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // ── 1. Validate all incoming requests ──────────────────
    consumer
      .apply(RequestValidationMiddleware)
      .forRoutes('*');

    // ── 2. Optional auth — public routes that can show more when logged in ──
    consumer
      .apply(OptionalAuthMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.GET },
        { path: 'products/:id', method: RequestMethod.GET },
      );

    // ── 3. Required auth — all /cart and /orders routes ──
    consumer
      .apply(AuthMiddleware)
      .exclude(
        // Public auth routes — do NOT protect these
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/verify-email', method: RequestMethod.GET },
        { path: 'auth/resend-verification', method: RequestMethod.POST },
        { path: 'auth/forgot-password', method: RequestMethod.POST },
        { path: 'auth/reset-password', method: RequestMethod.POST },
        // Public product browsing
        { path: 'products', method: RequestMethod.GET },
        { path: 'products/:id', method: RequestMethod.GET },
      )
      .forRoutes('*');

    // ── 4. Admin-only — product mutations ──
    consumer
      .apply(AdminMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        { path: 'products/:id', method: RequestMethod.PATCH },
        { path: 'products/:id', method: RequestMethod.DELETE },
        { path: 'categories', method: RequestMethod.POST },
        { path: 'categories/:id', method: RequestMethod.PATCH },
        { path: 'categories/:id', method: RequestMethod.DELETE },
      );
  }
}