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
var MembershipService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const enums_1 = require("../../generated/prisma/enums");
const membership_constants_1 = require("./membership.constants");
let MembershipService = MembershipService_1 = class MembershipService {
    prisma;
    logger = new common_1.Logger(MembershipService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreate(userId) {
        const existing = await this.prisma.membership.findUnique({
            where: { userId },
        });
        if (existing)
            return existing;
        return this.prisma.membership.create({
            data: { userId },
        });
    }
    async getMyMembership(userId) {
        const membership = await this.getOrCreate(userId);
        const pointTransactions = await this.prisma.pointTransaction.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        const myVouchers = await this.prisma.voucher.findMany({
            where: {
                ownerId: userId,
                isActive: true,
                OR: [{ endDate: null }, { endDate: { gte: new Date() } }],
            },
            orderBy: { createdAt: 'desc' },
        });
        return {
            membership,
            recentTransactions: pointTransactions,
            activeVouchers: myVouchers,
            nextTierInfo: this.getNextTierInfo(membership.tier, Number(membership.totalSpent)),
        };
    }
    async processPurchase(userId, paidAmount, orderId) {
        const membership = await this.getOrCreate(userId);
        const earnedPoints = (0, membership_constants_1.calculatePointsEarned)(paidAmount);
        const newTotalSpent = Number(membership.totalSpent) + paidAmount;
        const newPoints = membership.points + earnedPoints;
        const newTier = (0, membership_constants_1.determineTier)(newTotalSpent);
        const tierUpgraded = newTier !== membership.tier;
        this.logger.log(`User ${userId}: spent +${paidAmount} → totalSpent=${newTotalSpent}, points +${earnedPoints}, tier=${newTier}`);
        await this.prisma.$transaction(async (tx) => {
            await tx.membership.update({
                where: { userId },
                data: {
                    totalSpent: newTotalSpent,
                    points: newPoints,
                    tier: newTier,
                    ...(tierUpgraded && { lastTierUpAt: new Date() }),
                },
            });
            if (earnedPoints > 0) {
                await tx.pointTransaction.create({
                    data: {
                        userId,
                        points: earnedPoints,
                        type: 'purchase',
                        referenceId: orderId,
                        description: `Point dari pembelian order #${orderId}`,
                    },
                });
            }
            if (tierUpgraded && newTier !== enums_1.MembershipTier.bronze) {
                const shippingBenefit = membership_constants_1.TIER_SHIPPING_BENEFIT[newTier];
                if (shippingBenefit) {
                    await this.issueShippingVoucher(tx, userId, newTier, shippingBenefit);
                }
            }
        });
        return {
            earnedPoints,
            newTotalSpent,
            newPoints,
            newTier,
            tierUpgraded,
        };
    }
    async redeemPoints(userId, dto) {
        const membership = await this.getOrCreate(userId);
        if (dto.points < membership_constants_1.MIN_REDEEM_POINTS) {
            throw new common_1.BadRequestException(`Minimal redeem ${membership_constants_1.MIN_REDEEM_POINTS} point`);
        }
        if (membership.points < dto.points) {
            throw new common_1.BadRequestException(`Point tidak cukup. Kamu punya ${membership.points} point, ingin redeem ${dto.points} point`);
        }
        const discountValue = dto.points * membership_constants_1.POINT_TO_RUPIAH;
        const voucherCode = await this.generateVoucherCode('RDM');
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 30);
        const voucher = await this.prisma.$transaction(async (tx) => {
            await tx.membership.update({
                where: { userId },
                data: { points: { decrement: dto.points } },
            });
            await tx.pointTransaction.create({
                data: {
                    userId,
                    points: -dto.points,
                    type: 'redeem',
                    description: `Redeem ${dto.points} point → voucher potongan Rp ${discountValue.toLocaleString('id-ID')}`,
                },
            });
            return tx.voucher.create({
                data: {
                    code: voucherCode,
                    type: 'fixed',
                    source: 'point_redeem',
                    value: discountValue,
                    minPurchase: 0,
                    usageLimit: 1,
                    isActive: true,
                    endDate,
                    ownerId: userId,
                },
            });
        });
        return {
            voucher,
            pointsUsed: dto.points,
            discountValue,
            message: `Berhasil redeem ${dto.points} point. Voucher Rp ${discountValue.toLocaleString('id-ID')} telah diterbitkan dan berlaku 30 hari.`,
        };
    }
    async getPointHistory(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [transactions, total] = await Promise.all([
            this.prisma.pointTransaction.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.pointTransaction.count({ where: { userId } }),
        ]);
        return {
            data: transactions,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async findAll(page = 1, limit = 20, tier) {
        const skip = (page - 1) * limit;
        const where = tier ? { tier } : {};
        const [members, total] = await Promise.all([
            this.prisma.membership.findMany({
                where,
                skip,
                take: limit,
                orderBy: { totalSpent: 'desc' },
                include: { user: { select: { id: true, name: true, email: true } } },
            }),
            this.prisma.membership.count({ where }),
        ]);
        return {
            data: members,
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async issueShippingVoucher(tx, userId, tier, value) {
        const code = await this.generateVoucherCode(`SHIP-${tier.toUpperCase()}`);
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 90);
        await tx.voucher.create({
            data: {
                code,
                type: 'free_shipping',
                source: 'tier_benefit',
                value,
                usageLimit: 1,
                isActive: true,
                endDate,
                ownerId: userId,
            },
        });
        this.logger.log(`Issued shipping voucher ${code} (Rp ${value}) for user ${userId} tier ${tier}`);
    }
    async generateVoucherCode(prefix) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code;
        let exists;
        do {
            const random = Array.from({ length: 6 }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
            code = `${prefix}-${random}`;
            const found = await this.prisma.voucher.findUnique({ where: { code } });
            exists = !!found;
        } while (exists);
        return code;
    }
    getNextTierInfo(currentTier, totalSpent) {
        const tiers = [
            enums_1.MembershipTier.bronze,
            enums_1.MembershipTier.silver,
            enums_1.MembershipTier.gold,
            enums_1.MembershipTier.platinum,
        ];
        const thresholds = {
            [enums_1.MembershipTier.bronze]: 0,
            [enums_1.MembershipTier.silver]: 1_000_000,
            [enums_1.MembershipTier.gold]: 5_000_000,
            [enums_1.MembershipTier.platinum]: 10_000_000,
        };
        const currentIdx = tiers.indexOf(currentTier);
        if (currentIdx === tiers.length - 1) {
            return { nextTier: null, remainingSpend: 0, message: 'Tier tertinggi telah dicapai!' };
        }
        const nextTier = tiers[currentIdx + 1];
        const remainingSpend = thresholds[nextTier] - totalSpent;
        return {
            nextTier,
            remainingSpend,
            message: `Belanja Rp ${remainingSpend.toLocaleString('id-ID')} lagi untuk naik ke tier ${nextTier}`,
        };
    }
};
exports.MembershipService = MembershipService;
exports.MembershipService = MembershipService = MembershipService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembershipService);
//# sourceMappingURL=membership.service.js.map