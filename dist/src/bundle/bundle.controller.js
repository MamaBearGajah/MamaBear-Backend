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
exports.BundleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const bundle_service_1 = require("./bundle.service");
const create_bundle_dto_1 = require("./dto/create-bundle.dto");
const decorators_1 = require("../auth/decorators");
const roles_guard_1 = require("../auth/guards/roles.guard");
const enums_1 = require("../../generated/prisma/enums");
let BundleController = class BundleController {
    bundleService;
    constructor(bundleService) {
        this.bundleService = bundleService;
    }
    getActive() {
        return this.bundleService.findAll(true);
    }
    getBySlug(slug) {
        return this.bundleService.findBySlug(slug);
    }
    findAll() {
        return this.bundleService.findAll(false);
    }
    create(dto) {
        return this.bundleService.create(dto);
    }
    update(id, dto) {
        return this.bundleService.update(id, dto);
    }
    remove(id) {
        return this.bundleService.remove(id);
    }
};
exports.BundleController = BundleController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List bundle aktif (public)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BundleController.prototype, "getActive", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Detail bundle by slug (public)' }),
    (0, swagger_1.ApiParam)({ name: 'slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BundleController.prototype, "getBySlug", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Get)('admin/all'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List semua bundle' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BundleController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Buat bundle/hampers baru' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bundle_dto_1.CreateBundleDto]),
    __metadata("design:returntype", void 0)
], BundleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Update bundle' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bundle_service_1.UpdateBundleDto]),
    __metadata("design:returntype", void 0)
], BundleController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Hapus bundle' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BundleController.prototype, "remove", null);
exports.BundleController = BundleController = __decorate([
    (0, swagger_1.ApiTags)('Bundle / Hampers'),
    (0, common_1.Controller)('bundles'),
    __metadata("design:paramtypes", [bundle_service_1.BundleService])
], BundleController);
//# sourceMappingURL=bundle.controller.js.map