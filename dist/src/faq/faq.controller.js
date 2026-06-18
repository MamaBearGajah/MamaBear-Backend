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
exports.FaqController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const faq_service_1 = require("./faq.service");
const create_faq_dto_1 = require("./dto/create-faq.dto");
const update_faq_dto_1 = require("./dto/update-faq.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const decorators_1 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
let FaqController = class FaqController {
    faqService;
    constructor(faqService) {
        this.faqService = faqService;
    }
    findAll() {
        return this.faqService.findAll();
    }
    findOne(id) {
        return this.faqService.findOne(id);
    }
    create(dto) {
        return this.faqService.create(dto);
    }
    update(id, dto) {
        return this.faqService.update(id, dto);
    }
    remove(id) {
        return this.faqService.remove(id);
    }
};
exports.FaqController = FaqController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get semua FAQ aktif (public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List FAQ berhasil diambil' }),
    (0, common_1.Get)(),
    (0, decorators_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get FAQ by ID (public)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'FAQ ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQ ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ tidak ditemukan' }),
    (0, common_1.Get)(':id'),
    (0, decorators_1.Public)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Buat FAQ baru (admin)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'FAQ berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validasi gagal' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_faq_dto_1.CreateFaqDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update FAQ (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'FAQ ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'FAQ berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_faq_dto_1.UpdateFaqDto]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Hapus FAQ (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'FAQ ID' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'FAQ berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'FAQ tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FaqController.prototype, "remove", null);
exports.FaqController = FaqController = __decorate([
    (0, swagger_1.ApiTags)('FAQ'),
    (0, common_1.Controller)('faq'),
    __metadata("design:paramtypes", [faq_service_1.FaqService])
], FaqController);
//# sourceMappingURL=faq.controller.js.map