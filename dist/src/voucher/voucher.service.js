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
exports.VoucherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../../generated/prisma/client");
let VoucherService = class VoucherService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const code = dto.code.toUpperCase().trim();
        const exists = await this.prisma.voucher.findUnique({ where: { code } });
        if (exists)
            throw new common_1.BadRequestException(`Kode voucher "${code}" sudah digunakan`);
        return this.prisma.voucher.create({
            data: {
                code,
                type: dto.type,
                source: dto.source ?? 'manual',
                value: dto.value,
                minPurchase: dto.minPurchase ?? 0,
                maxDiscount: dto.maxDiscount,
                usageLimit: dto.usageLimit,
                isActive: dto.isActive ?? true,
                startDate: dto.startDate ? new Date(dto.startDate) : undefined,
                endDate: dto.endDate ? new Date(dto.endDate) : undefined,
                ownerId: dto.ownerId,
            },
        });
    }
    async update(id, dto) {
        await this.findById(id);
        return this.prisma.voucher.update({
            where: { id },
            data: {
                ...(dto.code && { code: dto.code.toUpperCase().trim() }),
                ...(dto.type && { type: dto.type }),
                ...(dto.source && { source: dto.source }),
                ...(dto.value !== undefined && { value: dto.value }),
                ...(dto.minPurchase !== undefined && { minPurchase: dto.minPurchase }),
                ...(dto.maxDiscount !== undefined && { maxDiscount: dto.maxDiscount }),
                ...(dto.usageLimit !== undefined && { usageLimit: dto.usageLimit }),
                ...(dto.isActive !== undefined && { isActive: dto.isActive }),
                ...(dto.startDate && { startDate: new Date(dto.startDate) }),
                ...(dto.endDate && { endDate: new Date(dto.endDate) }),
                ...(dto.ownerId !== undefined && { ownerId: dto.ownerId }),
            },
        });
    }
    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [vouchers, total] = await Promise.all([
            this.prisma.voucher.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: { owner: { select: { id: true, name: true, email: true } } },
            }),
            this.prisma.voucher.count(),
        ]);
        return { data: vouchers, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } };
    }
    async deactivate(id) {
        await this.findById(id);
        return this.prisma.voucher.update({
            where: { id },
            data: { isActive: false },
        });
    }
    async getMyVouchers(userId) {
        const now = new Date();
        return this.prisma.voucher.findMany({
            where: {
                ownerId: userId,
                isActive: true,
                OR: [{ endDate: null }, { endDate: { gte: now } }],
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async validate(code, subtotal, shippingCost, userId) {
        const voucher = await this.findValidVoucherByCode(code, subtotal, userId);
        const { discountAmount, finalShippingCost, usedCount } = this.buildApplyVoucherResult(voucher, subtotal, shippingCost);
        return {
            valid: true,
            voucher,
            discountAmount,
            finalShippingCost,
            usedCount,
        };
    }
    async apply(code, subtotal, userId) {
        const voucher = await this.findValidVoucherByCode(code, subtotal, userId);
        const { discountAmount, finalShippingCost, usedCount } = this.buildApplyVoucherResult(voucher, subtotal, 0);
        return {
            valid: true,
            voucher,
            discountAmount,
            finalShippingCost,
            usedCount,
        };
    }
    async validateById(voucherId, subtotal, shippingCost, userId) {
        const voucher = await this.findValidVoucherById(voucherId, subtotal, userId);
        const { discountAmount, finalShippingCost, usedCount } = this.buildApplyVoucherResult(voucher, subtotal, shippingCost);
        return {
            valid: true,
            voucher,
            discountAmount,
            finalShippingCost,
            usedCount,
        };
    }
    async applyVoucher(tx, voucherId, subtotal, userId) {
        const voucher = await tx.voucher.findUnique({ where: { id: voucherId } });
        const validVoucher = this.assertVoucherCanBeApplied(voucher, subtotal, userId);
        const result = this.buildApplyVoucherResult(validVoucher, subtotal, 0);
        const updatedVoucher = await tx.voucher.update({
            where: { id: voucherId },
            data: { usedCount: { increment: 1 } },
        });
        return {
            discountAmount: result.discountAmount,
            finalShippingCost: result.finalShippingCost,
            usedCount: updatedVoucher.usedCount,
        };
    }
    calculateDiscount(voucher, subtotal) {
        let discountAmount = 0;
        const value = Number(voucher.value);
        const maxDiscount = voucher.maxDiscount ? Number(voucher.maxDiscount) : Infinity;
        switch (voucher.type) {
            case client_1.VoucherType.percentage:
                discountAmount = Math.min((subtotal * value) / 100, maxDiscount);
                break;
            case client_1.VoucherType.fixed:
                discountAmount = Math.min(value, subtotal);
                break;
            case client_1.VoucherType.free_shipping:
                discountAmount = 0;
                break;
        }
        return Math.floor(discountAmount);
    }
    buildApplyVoucherResult(voucher, subtotal, shippingCost) {
        return {
            voucher,
            discountAmount: this.calculateDiscount(voucher, subtotal),
            finalShippingCost: shippingCost,
            usedCount: voucher.usedCount,
        };
    }
    async findValidVoucherByCode(code, subtotal, userId) {
        const voucher = await this.prisma.voucher.findUnique({ where: { code: code.toUpperCase().trim() } });
        return this.assertVoucherCanBeApplied(voucher, subtotal, userId);
    }
    async findValidVoucherById(voucherId, subtotal, userId) {
        const voucher = await this.prisma.voucher.findUnique({ where: { id: voucherId } });
        return this.assertVoucherCanBeApplied(voucher, subtotal, userId);
    }
    assertVoucherCanBeApplied(voucher, subtotal, userId) {
        if (!voucher)
            throw new common_1.NotFoundException('Voucher tidak ditemukan');
        if (!voucher.isActive)
            throw new common_1.BadRequestException('Voucher tidak aktif');
        const now = new Date();
        if (voucher.startDate && voucher.startDate > now)
            throw new common_1.BadRequestException('Voucher belum berlaku');
        if (voucher.endDate && voucher.endDate < now)
            throw new common_1.BadRequestException('Voucher sudah kadaluarsa');
        if (voucher.usageLimit !== null && voucher.usedCount >= voucher.usageLimit)
            throw new common_1.BadRequestException('Voucher sudah habis');
        if (subtotal < Number(voucher.minPurchase))
            throw new common_1.BadRequestException(`Minimum pembelian Rp ${Number(voucher.minPurchase).toLocaleString('id-ID')} untuk pakai voucher ini`);
        if (voucher.ownerId && voucher.ownerId !== userId)
            throw new common_1.BadRequestException('Voucher ini tidak untuk akun Anda');
        return voucher;
    }
    async findById(id) {
        const voucher = await this.prisma.voucher.findUnique({ where: { id } });
        if (!voucher)
            throw new common_1.NotFoundException('Voucher tidak ditemukan');
        return voucher;
    }
};
exports.VoucherService = VoucherService;
exports.VoucherService = VoucherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VoucherService);
//# sourceMappingURL=voucher.service.js.map