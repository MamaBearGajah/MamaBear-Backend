"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareExampleModule = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("./common/middleware/auth.middleware");
const request_validation_middleware_1 = require("./common/middleware/request-validation.middleware");
let MiddlewareExampleModule = class MiddlewareExampleModule {
    configure(consumer) {
        consumer
            .apply(request_validation_middleware_1.RequestValidationMiddleware)
            .forRoutes('*');
        consumer
            .apply(auth_middleware_1.OptionalAuthMiddleware)
            .forRoutes({ path: 'products', method: common_1.RequestMethod.GET }, { path: 'products/:id', method: common_1.RequestMethod.GET });
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude({ path: 'auth/register', method: common_1.RequestMethod.POST }, { path: 'auth/login', method: common_1.RequestMethod.POST }, { path: 'auth/verify-email', method: common_1.RequestMethod.GET }, { path: 'auth/resend-verification', method: common_1.RequestMethod.POST }, { path: 'auth/forgot-password', method: common_1.RequestMethod.POST }, { path: 'auth/reset-password', method: common_1.RequestMethod.POST }, { path: 'products', method: common_1.RequestMethod.GET }, { path: 'products/:id', method: common_1.RequestMethod.GET })
            .forRoutes('*');
        consumer
            .apply(auth_middleware_1.AdminMiddleware)
            .forRoutes({ path: 'products', method: common_1.RequestMethod.POST }, { path: 'products/:id', method: common_1.RequestMethod.PATCH }, { path: 'products/:id', method: common_1.RequestMethod.DELETE }, { path: 'categories', method: common_1.RequestMethod.POST }, { path: 'categories/:id', method: common_1.RequestMethod.PATCH }, { path: 'categories/:id', method: common_1.RequestMethod.DELETE });
    }
};
exports.MiddlewareExampleModule = MiddlewareExampleModule;
exports.MiddlewareExampleModule = MiddlewareExampleModule = __decorate([
    (0, common_1.Module)({})
], MiddlewareExampleModule);
//# sourceMappingURL=middleware-setup.example.js.map