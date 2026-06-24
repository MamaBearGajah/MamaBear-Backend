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
exports.AdminOrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const decorators_1 = require("../../auth/decorators");
const enums_1 = require("../../../generated/prisma/enums");
const orders_service_1 = require("../../orders/orders.service");
const update_order_dto_1 = require("../../orders/dto/update-order.dto");
const update_tracking_dto_1 = require("../dto/update-tracking.dto");
let AdminOrdersController = class AdminOrdersController {
    ordersService;
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    findAll(page, limit, status, q) {
        return this.ordersService.findAllAdmin(status, q ?? '', page, limit);
    }
    async exportCsv(res) {
        const csv = await this.ordersService.exportOrdersToCsv();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=orders_export.csv');
        return res.status(200).send(csv);
    }
    async getInvoice(id) {
        const order = await this.ordersService.findOneAdmin(id);
        return {
            invoiceNumber: `INV-${order.orderNumber}`,
            orderNumber: order.orderNumber,
            orderDate: order.createdAt,
            customer: {
                name: order.user?.name,
                email: order.user?.email,
                phone: order.user?.phone,
            },
            shippingAddress: order.address
                ? {
                    receiverName: order.address.receiverName,
                    phone: order.address.phone,
                    address: order.address.address,
                    cityId: order.address.cityId,
                    provinceId: order.address.provinceId,
                    postalCode: order.address.postalCode,
                }
                : null,
            items: order.items.map((item) => ({
                productName: item.productName,
                variantName: item.variantName,
                quantity: item.quantity,
                price: Number(item.price),
                subtotal: Number(item.price) * item.quantity,
            })),
            subtotal: Number(order.subtotal),
            shippingCost: Number(order.shippingCost),
            discountAmount: Number(order.discountAmount),
            total: Number(order.total),
            courier: order.courier,
            service: order.service,
            trackingNumber: order.trackingNumber,
            paymentStatus: order.paymentStatus,
            status: order.status,
            voucher: order.voucher
                ? { code: order.voucher.code, type: order.voucher.type, value: Number(order.voucher.value) }
                : null,
        };
    }
    updateStatus(id, dto) {
        return this.ordersService.updateStatus(id, dto);
    }
    updateTracking(id, dto) {
        return this.ordersService.updateStatus(id, {
            status: enums_1.OrderStatus.shipped,
            trackingNumber: dto.trackingNumber,
            note: dto.note,
        });
    }
};
exports.AdminOrdersController = AdminOrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List semua order dengan filter & pagination' }),
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
], AdminOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Export semua order ke CSV' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'File CSV order' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminOrdersController.prototype, "exportCsv", null);
__decorate([
    (0, common_1.Get)(':id/invoice'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Ambil data invoice terstruktur untuk print di browser' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data invoice berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminOrdersController.prototype, "getInvoice", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Update status order (termasuk tracking number jika shipped)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Status order berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], AdminOrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Patch)(':id/tracking'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Set tracking number + trigger email notifikasi pengiriman' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tracking number berhasil diset' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tracking_dto_1.UpdateTrackingDto]),
    __metadata("design:returntype", void 0)
], AdminOrdersController.prototype, "updateTracking", null);
exports.AdminOrdersController = AdminOrdersController = __decorate([
    (0, swagger_1.ApiTags)('Admin Orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Controller)('admin/orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], AdminOrdersController);
//# sourceMappingURL=admin-orders.controller.js.map