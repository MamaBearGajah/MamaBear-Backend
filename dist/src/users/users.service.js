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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                isVerified: true,
                createdAt: true,
                membership: {
                    select: {
                        points: true,
                        lastDailyLoginAt: true,
                    },
                },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User tidak ditemukan');
        return user;
    }
    async updateProfile(userId, dto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: dto,
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
            },
        });
        return { message: 'Profil berhasil diperbarui', user };
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User tidak ditemukan');
        const match = await bcrypt.compare(dto.oldPassword, user.password);
        if (!match)
            throw new common_1.BadRequestException('Password lama tidak sesuai');
        if (dto.oldPassword === dto.newPassword)
            throw new common_1.BadRequestException('Password baru tidak boleh sama dengan password lama');
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashed, refreshToken: null },
        });
        return { message: 'Password berhasil diubah. Silakan login kembali.' };
    }
    async getAddresses(userId) {
        return this.prisma.address.findMany({
            where: { userId },
            orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async getAddressById(userId, addressId) {
        const address = await this.prisma.address.findUnique({
            where: { id: addressId },
        });
        if (!address)
            throw new common_1.NotFoundException('Alamat tidak ditemukan');
        if (address.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        return address;
    }
    async createAddress(userId, dto) {
        const count = await this.prisma.address.count({ where: { userId } });
        const isDefault = count === 0;
        const address = await this.prisma.address.create({
            data: { ...dto, userId, isDefault },
        });
        return { message: 'Alamat berhasil ditambahkan', address };
    }
    async updateAddress(userId, addressId, dto) {
        await this.getAddressById(userId, addressId);
        const address = await this.prisma.address.update({
            where: { id: addressId },
            data: dto,
        });
        return { message: 'Alamat berhasil diperbarui', address };
    }
    async setDefaultAddress(userId, addressId) {
        await this.getAddressById(userId, addressId);
        await this.prisma.$transaction([
            this.prisma.address.updateMany({
                where: { userId },
                data: { isDefault: false },
            }),
            this.prisma.address.update({
                where: { id: addressId },
                data: { isDefault: true },
            }),
        ]);
        return { message: 'Alamat default berhasil diubah' };
    }
    async deleteAddress(userId, addressId) {
        const address = await this.getAddressById(userId, addressId);
        if (address.isDefault) {
            throw new common_1.BadRequestException('Tidak dapat menghapus alamat default. Ubah alamat default terlebih dahulu.');
        }
        await this.prisma.address.delete({ where: { id: addressId } });
        return { message: 'Alamat berhasil dihapus' };
    }
    async getOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                images: {
                                    where: { imageType: 'main' },
                                    select: { imageUrl: true, altText: true },
                                    orderBy: { sortOrder: 'asc' },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
                payment: { select: { status: true, provider: true, paymentUrl: true } },
                address: { select: { receiverName: true, address: true, cityId: true } },
            },
        });
    }
    async getOrderById(userId, orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                slug: true,
                                images: {
                                    where: { imageType: 'main' },
                                    select: { imageUrl: true, altText: true },
                                    orderBy: { sortOrder: 'asc' },
                                    take: 1,
                                },
                            },
                        },
                    },
                },
                payment: true,
                address: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order tidak ditemukan');
        if (order.userId !== userId)
            throw new common_1.ForbiddenException('Akses ditolak');
        return order;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map