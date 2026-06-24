"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminUsersService = class AdminUsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const admins = await this.prisma.user.findMany({
            where: {
                role: { in: ['admin', 'super_admin'] },
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isVerified: true,
                bannedAt: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return { data: admins, total: admins.length };
    }
    async create(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing)
            throw new common_1.ConflictException('Email sudah digunakan');
        const hashed = await bcrypt.hash(dto.password, 10);
        const admin = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashed,
                role: dto.role ?? 'admin',
                isVerified: true,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                isVerified: true,
                createdAt: true,
            },
        });
        return { message: 'Admin berhasil dibuat', data: admin };
    }
    async updateRole(targetId, dto, requesterId) {
        if (targetId === requesterId)
            throw new common_1.BadRequestException('Tidak dapat mengubah role sendiri');
        const target = await this.prisma.user.findUnique({ where: { id: targetId } });
        if (!target)
            throw new common_1.NotFoundException('Admin tidak ditemukan');
        if (target.role === 'customer')
            throw new common_1.BadRequestException('User ini bukan admin');
        if (target.role === 'super_admin' && dto.role === 'admin') {
            const count = await this.prisma.user.count({
                where: { role: 'super_admin', deletedAt: null },
            });
            if (count <= 1)
                throw new common_1.ForbiddenException('Tidak dapat mengubah role: minimal harus ada 1 super_admin aktif');
        }
        const updated = await this.prisma.user.update({
            where: { id: targetId },
            data: { role: dto.role },
            select: { id: true, name: true, email: true, role: true },
        });
        return { message: 'Role berhasil diubah', data: updated };
    }
    async deactivate(targetId, requesterId) {
        if (targetId === requesterId)
            throw new common_1.BadRequestException('Tidak dapat menonaktifkan akun sendiri');
        const target = await this.prisma.user.findUnique({ where: { id: targetId } });
        if (!target)
            throw new common_1.NotFoundException('Admin tidak ditemukan');
        if (target.role === 'customer')
            throw new common_1.BadRequestException('User ini bukan admin');
        if (target.role === 'super_admin') {
            const count = await this.prisma.user.count({
                where: { role: 'super_admin', deletedAt: null, bannedAt: null },
            });
            if (count <= 1)
                throw new common_1.ForbiddenException('Tidak dapat menonaktifkan: minimal harus ada 1 super_admin aktif');
        }
        await this.prisma.user.update({
            where: { id: targetId },
            data: { bannedAt: new Date(), banReason: 'Dinonaktifkan oleh super_admin' },
        });
        return { message: 'Akun admin berhasil dinonaktifkan' };
    }
    async reactivate(targetId) {
        const target = await this.prisma.user.findUnique({ where: { id: targetId } });
        if (!target)
            throw new common_1.NotFoundException('Admin tidak ditemukan');
        await this.prisma.user.update({
            where: { id: targetId },
            data: { bannedAt: null, banReason: null },
        });
        return { message: 'Akun admin berhasil diaktifkan kembali' };
    }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map