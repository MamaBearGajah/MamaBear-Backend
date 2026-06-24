"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_consultations_controller_1 = require("./admin-consultations/admin-consultations.controller");
const admin_consultations_service_1 = require("./admin-consultations/admin-consultations.service");
const admin_products_controller_1 = require("./admin-products/admin-products.controller");
const admin_products_service_1 = require("./admin-products/admin-products.service");
const admin_categories_controller_1 = require("./admin-categories/admin-categories.controller");
const admin_categories_service_1 = require("./admin-categories/admin-categories.service");
const admin_customers_controller_1 = require("./admin-customers/admin-customers.controller");
const admin_customers_service_1 = require("./admin-customers/admin-customers.service");
const orders_module_1 = require("../orders/orders.module");
const admin_orders_controller_1 = require("./admin-orders/admin-orders.controller");
const admin_users_controller_1 = require("./admin-users/admin-users.controller");
const admin_users_service_1 = require("./admin-users/admin-users.service");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            orders_module_1.OrdersModule,
        ],
        controllers: [
            admin_controller_1.AdminController,
            admin_consultations_controller_1.AdminConsultationsController,
            admin_products_controller_1.AdminProductsController,
            admin_categories_controller_1.AdminCategoriesController,
            admin_customers_controller_1.AdminCustomersController,
            admin_orders_controller_1.AdminOrdersController,
            admin_users_controller_1.AdminUsersController,
        ],
        providers: [
            admin_customers_service_1.AdminCustomersService,
            admin_consultations_service_1.AdminConsultationsService,
            admin_products_service_1.AdminProductsService,
            admin_categories_service_1.AdminCategoriesService,
            admin_users_service_1.AdminUsersService,
        ],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map