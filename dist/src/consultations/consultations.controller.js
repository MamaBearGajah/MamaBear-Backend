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
exports.ConsultationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const consultations_service_1 = require("./consultations.service");
const create_consultation_dto_1 = require("./dto/create-consultation.dto");
const update_consultation_dto_1 = require("./dto/update-consultation.dto");
const consultation_query_dto_1 = require("./dto/consultation-query.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const decorators_1 = require("../auth/decorators");
const decorators_2 = require("../auth/decorators");
const decorators_3 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
let ConsultationsController = class ConsultationsController {
    consultationsService;
    constructor(consultationsService) {
        this.consultationsService = consultationsService;
    }
    create(dto) {
        return this.consultationsService.create(dto);
    }
    findAll(query) {
        return this.consultationsService.findAll(query);
    }
    findOne(id) {
        return this.consultationsService.findOne(id);
    }
    update(id, dto, adminId, { id: string }) {
        return this.consultationsService.updateStatus(id, dto, adminId);
    }
};
exports.ConsultationsController = ConsultationsController;
__decorate([
    (0, decorators_2.Public)(),
    (0, common_1.Post)('consultations'),
    (0, swagger_1.ApiOperation)({
        summary: 'Kirim form konsultasi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Konsultasi berhasil dikirim',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Validasi gagal',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_consultation_dto_1.CreateConsultationDto]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('admin/consultations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({
        summary: 'Ambil daftar konsultasi',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Daftar konsultasi berhasil diambil',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [consultation_query_dto_1.ConsultationQueryDto]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin/consultations/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({
        summary: 'Detail konsultasi',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Consultation ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Detail konsultasi berhasil diambil',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Konsultasi tidak ditemukan',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('admin/consultations/:id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({
        summary: 'Update status dan respon konsultasi',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Consultation ID',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Konsultasi berhasil diupdate',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Konsultasi tidak ditemukan',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, decorators_3.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_consultation_dto_1.UpdateConsultationDto, String, Object]),
    __metadata("design:returntype", void 0)
], ConsultationsController.prototype, "update", null);
exports.ConsultationsController = ConsultationsController = __decorate([
    (0, swagger_1.ApiTags)('Consultations'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [consultations_service_1.ConsultationsService])
], ConsultationsController);
//# sourceMappingURL=consultations.controller.js.map