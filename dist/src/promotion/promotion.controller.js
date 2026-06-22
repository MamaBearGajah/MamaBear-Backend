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
exports.PromotionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const promotion_service_1 = require("./promotion.service");
const create_promotion_dto_1 = require("./dto/create-promotion.dto");
const decorators_1 = require("../auth/decorators");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enums_1 = require("../../generated/prisma/enums");
let PromotionController = class PromotionController {
    promotionService;
    constructor(promotionService) {
        this.promotionService = promotionService;
    }
    getActive() {
        return this.promotionService.findActive();
    }
    getBySlug(slug) {
        return this.promotionService.findBySlug(slug);
    }
    findAll() {
        return this.promotionService.findAll();
    }
    findOne(id) {
        return this.promotionService.findOne(id);
    }
    create(dto) {
        return this.promotionService.create(dto);
    }
    update(id, dto) {
        return this.promotionService.update(id, dto);
    }
    remove(id) {
        return this.promotionService.remove(id);
    }
};
exports.PromotionController = PromotionController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Ambil promo aktif saat ini (untuk halaman /promotion)',
        description: 'Mengembalikan satu promosi yang sedang aktif beserta hero bundle & koleksi bundle aktif.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data promo aktif' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Tidak ada promo aktif' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "getActive", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Detail promosi by slug (public)' }),
    (0, swagger_1.ApiParam)({ name: 'slug', example: 'mothers-day-2025' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail promosi' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Promosi tidak ditemukan' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "getBySlug", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List semua promosi' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Get)('admin/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Detail promosi by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: '[Admin] Buat halaman promosi baru',
        description: `
      Membuat landing page promosi dengan:
      - Title, slug, badgeText untuk hero section
      - Sections (sub-section konten)
      - Benefits (keunggulan, misal "Premium Quality", "Elegant Packaging")
      - heroBundleId (opsional — jika null, dipilih otomatis bundle discountPrice tertinggi)
      - status: draft | active | ended
    `,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Promosi berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Slug sudah digunakan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_promotion_dto_1.CreatePromotionDto]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: '[Admin] Update promosi',
        description: 'Partial update. Jika sections atau benefits dikirim, seluruh data lama akan diganti.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Promosi berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Promosi tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_promotion_dto_1.UpdatePromotionDto]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Hapus promosi' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Promosi berhasil dihapus' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PromotionController.prototype, "remove", null);
exports.PromotionController = PromotionController = __decorate([
    (0, swagger_1.ApiTags)('Promotion Landing Page'),
    (0, common_1.Controller)('promotions'),
    __metadata("design:paramtypes", [promotion_service_1.PromotionService])
], PromotionController);
//# sourceMappingURL=promotion.controller.js.map