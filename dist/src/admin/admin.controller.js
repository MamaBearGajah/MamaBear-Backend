"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const decorators_1 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
const admin_customers_service_1 = require("./admin-customers/admin-customers.service");
const orders_service_1 = require("../orders/orders.service");
const update_order_dto_1 = require("../orders/dto/update-order.dto");
let AdminController = class AdminController {
    adminCustomersService;
    ordersService;
    constructor(adminCustomersService, ordersService) {
        this.adminCustomersService = adminCustomersService;
        this.ordersService = ordersService;
    }
    getCustomers(page, limit, search) {
        return this.adminCustomersService.findAll({ page, limit, search });
    }
    getCustomerById(id) {
        return this.adminCustomersService.findAll({ page: 1, limit: 1, search: id });
    }
    getOrders(page, limit, status, q) {
        return this.ordersService.findAllAdmin(status, q ?? '', page, limit);
    }
    updateOrderStatus(id, dto) {
        return this.ordersService.updateStatus(id, dto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('customers'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List customers dengan pagination & search' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List customers berhasil diambil' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getCustomers", null);
__decorate([
    (0, common_1.Get)('customers/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Detail customer by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail customer berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getCustomerById", null);
__decorate([
    (0, common_1.Get)('orders'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List semua order — gunakan GET /orders/admin untuk fitur lengkap' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: enums_1.OrderStatus }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: false, description: 'Cari by orderNumber / nama / email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List order berhasil diambil' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Patch)('orders/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Update status order — gunakan PATCH /orders/:id/status untuk fitur lengkap' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status order berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateOrderStatus", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_customers_service_1.AdminCustomersService,
        orders_service_1.OrdersService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map