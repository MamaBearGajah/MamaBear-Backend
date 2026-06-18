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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminConsultationsService = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminConsultationsService = class AdminConsultationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const status = query.status;
        const skip = (page - 1) * limit;
        const where = status ? { status } : {};
        const [data, totalItems] = await Promise.all([
            this.prisma.consultation.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.consultation.count({ where }),
        ]);
        return {
            data,
            meta: { totalItems, itemsPerPage: limit, totalPages: Math.ceil(totalItems / limit), currentPage: page },
        };
    }
    async updateStatus(id, adminId, dto) {
        const consultation = await this.prisma.consultation.findUnique({ where: { id } });
        if (!consultation)
            throw new common_1.NotFoundException('Consultation not found!');
        const current = consultation.status;
        const target = dto.status;
        if (current === enums_1.ConsultationStatus.new && target !== enums_1.ConsultationStatus.in_progress) {
            throw new common_1.BadRequestException('Status "new" can only transition to "in_progress"');
        }
        if (current === enums_1.ConsultationStatus.in_progress && target !== enums_1.ConsultationStatus.closed) {
            throw new common_1.BadRequestException('Status "in_progress" can only transition to "closed"');
        }
        if (current === enums_1.ConsultationStatus.closed) {
            throw new common_1.BadRequestException('Consultation is already "closed" and cannot be modified');
        }
        let updateData = { status: target };
        if (target === enums_1.ConsultationStatus.in_progress || target === enums_1.ConsultationStatus.closed) {
            updateData.respondedBy = adminId;
            if (dto.response) {
                updateData.response = dto.response;
                updateData.respondedAt = new Date();
            }
        }
        return this.prisma.consultation.update({
            where: { id },
            data: updateData,
        });
    }
};
exports.AdminConsultationsService = AdminConsultationsService;
exports.AdminConsultationsService = AdminConsultationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminConsultationsService);
//# sourceMappingURL=admin-consultations.service.js.map