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
exports.VoucherController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const voucher_service_1 = require("./voucher.service");
const create_voucher_dto_1 = require("./dto/create-voucher.dto");
const validate_voucher_dto_1 = require("./dto/validate-voucher.dto");
const apply_voucher_dto_1 = require("./dto/apply-voucher.dto");
const decorators_1 = require("../auth/decorators");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enums_1 = require("../../generated/prisma/enums");
let VoucherController = class VoucherController {
    voucherService;
    constructor(voucherService) {
        this.voucherService = voucherService;
    }
    getMyVouchers(userId) {
        return this.voucherService.getMyVouchers(userId);
    }
    validate(dto, userId) {
        return this.voucherService.validate(dto.code, dto.totalAmount, dto.shippingCost ?? 0, userId);
    }
    applyVoucher(dto, userId) {
        return this.voucherService.apply(dto.code, dto.totalAmount, userId);
    }
    findAll(page, limit) {
        return this.voucherService.findAll(page, limit);
    }
    create(dto) {
        return this.voucherService.create(dto);
    }
    update(id, dto) {
        return this.voucherService.update(id, dto);
    }
    deactivate(id) {
        return this.voucherService.deactivate(id);
    }
};
exports.VoucherController = VoucherController;
__decorate([
    (0, common_1.Get)('my'),
    (0, swagger_1.ApiOperation)({
        summary: 'Daftar voucher milik saya (aktif)',
        description: 'Menampilkan voucher personal (dari redeem point atau tier benefit) yang masih aktif dan belum kadaluarsa.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List voucher berhasil diambil' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "getMyVouchers", null);
__decorate([
    (0, common_1.Post)('validate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Validasi kode voucher sebelum checkout',
        description: `
      Cek apakah voucher valid dan hitung nilai diskonnya.
      Tidak mengubah state DB (tidak mengurangi usedCount).

      Kirim totalAmount dan shippingCost untuk mendapat kalkulasi diskon yang akurat.
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Voucher valid',
        schema: {
            example: {
                valid: true,
                voucher: { code: 'HEMAT25K', type: 'fixed', value: 25000 },
                discountAmount: 25000,
                finalShippingCost: 15000,
                usedCount: 3,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Voucher tidak valid / kadaluarsa / tidak cukup belanja' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Voucher tidak ditemukan' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [validate_voucher_dto_1.ValidateVoucherDto, String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)('apply'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Apply voucher untuk cart atau ringkasan order',
        description: `
      Menerapkan voucher ke subtotal produk untuk kebutuhan cart atau preview order.
      Endpoint ini tidak mengubah state DB dan tidak memengaruhi ongkir.
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Voucher berhasil diapply',
        schema: {
            example: {
                valid: true,
                voucher: { id: 'clx1abc2def3ghi4jkl5', code: 'HEMAT25K', type: 'fixed', value: 25000 },
                discountAmount: 25000,
                finalShippingCost: 0,
                usedCount: 3,
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Voucher tidak aktif atau tidak memenuhi syarat' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Voucher tidak ditemukan' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [apply_voucher_dto_1.ApplyVoucherDto, String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "applyVoucher", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List semua voucher dengan pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List voucher berhasil diambil' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({
        summary: '[Admin] Buat voucher baru',
        description: `
      Tipe voucher:
      - **percentage** — diskon % dari subtotal (gunakan maxDiscount untuk batasi nominal)
      - **fixed** — potongan nominal tetap dari subtotal
      - **free_shipping** — potongan ongkir sebesar value

      Jika ownerId diisi, voucher hanya bisa dipakai user tersebut.
    `,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Voucher berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Kode voucher sudah digunakan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voucher_dto_1.CreateVoucherDto]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Update voucher' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Voucher berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Voucher tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_voucher_dto_1.CreateVoucherDto]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({
        summary: '[Admin] Nonaktifkan voucher (soft deactivate)',
        description: 'Tidak menghapus voucher dari DB, hanya set isActive = false.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Voucher dinonaktifkan' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Voucher tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VoucherController.prototype, "deactivate", null);
exports.VoucherController = VoucherController = __decorate([
    (0, swagger_1.ApiTags)('Voucher'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('vouchers'),
    __metadata("design:paramtypes", [voucher_service_1.VoucherService])
], VoucherController);
//# sourceMappingURL=voucher.controller.js.map