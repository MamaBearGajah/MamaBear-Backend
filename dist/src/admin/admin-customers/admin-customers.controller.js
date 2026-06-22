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
exports.AdminCustomersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../../auth/guards/roles.guard");
const decorators_1 = require("../../auth/decorators");
const enums_1 = require("../../../generated/prisma/enums");
const admin_customers_service_1 = require("./admin-customers.service");
const admin_query_dto_1 = require("../dto/admin-query.dto");
let AdminCustomersController = class AdminCustomersController {
    adminCustomersService;
    constructor(adminCustomersService) {
        this.adminCustomersService = adminCustomersService;
    }
    getAll(query) {
        return this.adminCustomersService.findAll(query);
    }
    getById(id) {
        return this.adminCustomersService.findById(id);
    }
};
exports.AdminCustomersController = AdminCustomersController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List customers dengan pagination & search' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List customers berhasil diambil' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_query_dto_1.AdminBaseQueryDto]),
    __metadata("design:returntype", void 0)
], AdminCustomersController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Detail customer by ID — includes profile + order history' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Customer (User) ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail customer berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Customer tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCustomersController.prototype, "getById", null);
exports.AdminCustomersController = AdminCustomersController = __decorate([
    (0, swagger_1.ApiTags)('Admin Customers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Controller)('admin/customers'),
    __metadata("design:paramtypes", [admin_customers_service_1.AdminCustomersService])
], AdminCustomersController);
//# sourceMappingURL=admin-customers.controller.js.map