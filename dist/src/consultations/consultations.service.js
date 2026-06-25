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
exports.ConsultationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ConsultationsService = class ConsultationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.consultation.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                message: dto.message,
            },
        });
    }
    async findAll(query) {
        const page = query.page ?? 1;
        const limit = query.limit ?? 20;
        const skip = (page - 1) * limit;
        const where = {
            ...(query.status && {
                status: query.status,
            }),
            ...(query.search && {
                OR: [
                    {
                        name: {
                            contains: query.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        email: {
                            contains: query.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        phone: {
                            contains: query.search,
                            mode: 'insensitive',
                        },
                    },
                    {
                        message: {
                            contains: query.search,
                            mode: 'insensitive',
                        },
                    },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            this.prisma.consultation.findMany({
                where,
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    admin: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            }),
            this.prisma.consultation.count({
                where,
            }),
        ]);
        return {
            data,
            meta: {
                page,
                limit,
                totalItems: total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const consultation = await this.prisma.consultation.findUnique({
            where: {
                id,
            },
            include: {
                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        if (!consultation) {
            throw new common_1.NotFoundException(`Konsultasi dengan id ${id} tidak ditemukan`);
        }
        return consultation;
    }
    async updateStatus(id, dto, adminId) {
        const consultation = await this.prisma.consultation.findUnique({
            where: {
                id,
            },
        });
        if (!consultation) {
            throw new common_1.NotFoundException(`Konsultasi dengan id ${id} tidak ditemukan`);
        }
        return this.prisma.consultation.update({
            where: {
                id,
            },
            data: {
                status: dto.status,
                respondedBy: adminId,
                ...(dto.response && {
                    response: dto.response,
                    respondedAt: new Date(),
                }),
            },
            include: {
                admin: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
};
exports.ConsultationsService = ConsultationsService;
exports.ConsultationsService = ConsultationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConsultationsService);
//# sourceMappingURL=consultations.service.js.map