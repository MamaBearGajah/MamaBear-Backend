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
exports.SiteSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const decorators_1 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
const site_settings_service_1 = require("./site-settings.service");
const update_site_settings_dto_1 = require("./dto/update-site-settings.dto");
let SiteSettingsController = class SiteSettingsController {
    siteSettingsService;
    constructor(siteSettingsService) {
        this.siteSettingsService = siteSettingsService;
    }
    get() {
        return this.siteSettingsService.get();
    }
    update(dto) {
        return this.siteSettingsService.update(dto);
    }
};
exports.SiteSettingsController = SiteSettingsController;
__decorate([
    (0, common_1.Get)(),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Ambil konfigurasi site settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Settings berhasil diambil' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "get", null);
__decorate([
    (0, common_1.Patch)(),
    (0, decorators_1.Roles)(enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Super Admin] Update konfigurasi site settings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Settings berhasil disimpan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_site_settings_dto_1.UpdateSiteSettingsDto]),
    __metadata("design:returntype", void 0)
], SiteSettingsController.prototype, "update", null);
exports.SiteSettingsController = SiteSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Site Settings'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('admin/settings'),
    __metadata("design:paramtypes", [site_settings_service_1.SiteSettingsService])
], SiteSettingsController);
//# sourceMappingURL=site-settings.controller.js.map