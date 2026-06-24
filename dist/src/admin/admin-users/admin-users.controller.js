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
exports.AdminUsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const decorators_1 = require("../../auth/decorators");
const decorators_2 = require("../../auth/decorators");
const enums_1 = require("../../../generated/prisma/enums");
const admin_users_service_1 = require("./admin-users.service");
const admin_users_dto_1 = require("./admin-users.dto");
let AdminUsersController = class AdminUsersController {
    adminUsersService;
    constructor(adminUsersService) {
        this.adminUsersService = adminUsersService;
    }
    findAll() {
        return this.adminUsersService.findAll();
    }
    create(dto) {
        return this.adminUsersService.create(dto);
    }
    updateRole(targetId, dto, requesterId) {
        return this.adminUsersService.updateRole(targetId, dto, requesterId);
    }
    deactivate(targetId, requesterId) {
        return this.adminUsersService.deactivate(targetId, requesterId);
    }
    reactivate(targetId) {
        return this.adminUsersService.reactivate(targetId);
    }
};
exports.AdminUsersController = AdminUsersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '[Super Admin] List semua akun admin' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List admin berhasil diambil' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: '[Super Admin] Buat akun admin baru' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Admin berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email sudah digunakan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_users_dto_1.CreateAdminUserDto]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/role'),
    (0, swagger_1.ApiOperation)({ summary: '[Super Admin] Ubah role admin' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID admin yang akan diubah rolenya' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Role berhasil diubah' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_2.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_users_dto_1.UpdateAdminUserRoleDto, String]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, swagger_1.ApiOperation)({ summary: '[Super Admin] Nonaktifkan akun admin' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID admin yang akan dinonaktifkan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin berhasil dinonaktifkan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, decorators_2.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/reactivate'),
    (0, swagger_1.ApiOperation)({ summary: '[Super Admin] Aktifkan kembali akun admin' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User ID admin yang akan diaktifkan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Admin berhasil diaktifkan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminUsersController.prototype, "reactivate", null);
exports.AdminUsersController = AdminUsersController = __decorate([
    (0, swagger_1.ApiTags)('Admin Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.super_admin),
    (0, common_1.Controller)('admin/users'),
    __metadata("design:paramtypes", [admin_users_service_1.AdminUsersService])
], AdminUsersController);
//# sourceMappingURL=admin-users.controller.js.map