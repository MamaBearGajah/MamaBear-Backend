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
exports.AdminConsultationsController = void 0;
const common_1 = require("@nestjs/common");
const admin_consultations_service_1 = require("../admin-consultations/admin-consultations.service");
const swagger_1 = require("@nestjs/swagger");
const admin_consultation_query_dto_1 = require("../dto/admin-consultation-query.dto");
let AdminConsultationsController = class AdminConsultationsController {
    adminConsultationsService;
    constructor(adminConsultationsService) {
        this.adminConsultationsService = adminConsultationsService;
    }
    async getAll(query) {
        return this.adminConsultationsService.findAll(query);
    }
    async updateStatus(id, dto, req) {
        const adminId = req.user?.id;
        return this.adminConsultationsService.updateStatus(id, adminId, dto);
    }
};
exports.AdminConsultationsController = AdminConsultationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of consultations (paginated & filtered)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_consultation_query_dto_1.AdminConsultationQueryDto]),
    __metadata("design:returntype", Promise)
], AdminConsultationsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update consultation status (new -> in_progress -> closed)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, admin_consultation_query_dto_1.UpdateConsultationStatusDto, Object]),
    __metadata("design:returntype", Promise)
], AdminConsultationsController.prototype, "updateStatus", null);
exports.AdminConsultationsController = AdminConsultationsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Consultations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin/consultations'),
    __metadata("design:paramtypes", [admin_consultations_service_1.AdminConsultationsService])
], AdminConsultationsController);
//# sourceMappingURL=admin-consultations.controller.js.map