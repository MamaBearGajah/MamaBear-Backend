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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payments_service_1 = require("./payments.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const decorators_1 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    create(dto) {
        return this.paymentsService.create(dto);
    }
    requestRefund(orderId, reason) {
        return this.paymentsService.requestRefund(orderId, reason);
    }
    xenditWebhook(callbackToken, body) {
        return this.paymentsService.handleXenditWebhook(callbackToken, body);
    }
    midtransWebhook(body) {
        return this.paymentsService.handleMidtransWebhook(body);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('checkout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Buat payment untuk order (Xendit / Midtrans)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payment berhasil dibuat, dapat paymentUrl' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':orderId/refund'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({
        summary: '[Admin] Proses refund order',
        description: 'Memicu refund aktif ke Xendit/Midtrans sesuai provider yang dipakai order ini.',
    }),
    (0, swagger_1.ApiParam)({ name: 'orderId' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Refund berhasil diajukan' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Payment belum paid / tidak bisa di-refund' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order/payment tidak ditemukan' }),
    __param(0, (0, common_1.Param)('orderId')),
    __param(1, (0, common_1.Body)('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "requestRefund", null);
__decorate([
    (0, common_1.Post)('webhook/xendit'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Xendit payment webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook diproses' }),
    __param(0, (0, common_1.Headers)('x-callback-token')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "xenditWebhook", null);
__decorate([
    (0, common_1.Post)('webhook/midtrans'),
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Midtrans payment notification webhook' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Webhook diproses' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "midtransWebhook", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, swagger_1.ApiTags)('Payments'),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map