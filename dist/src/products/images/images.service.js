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
exports.ImagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const media_service_1 = require("../../media/media.service");
let ImagesService = class ImagesService {
    prisma;
    mediaService;
    constructor(prisma, mediaService) {
        this.prisma = prisma;
        this.mediaService = mediaService;
    }
    async findAll(productId) {
        await this.validateProduct(productId);
        return this.prisma.productImage.findMany({
            where: { productId },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async addImage(productId, dto) {
        await this.validateProduct(productId);
        if (dto.isFeatured) {
            await this.prisma.productImage.updateMany({
                where: { productId, isFeatured: true },
                data: { isFeatured: false },
            });
        }
        const lastImage = await this.prisma.productImage.findFirst({
            where: { productId },
            orderBy: { sortOrder: 'desc' },
        });
        const sortOrder = dto.sortOrder ?? (lastImage ? lastImage.sortOrder + 1 : 0);
        return this.prisma.productImage.create({
            data: { ...dto, productId, sortOrder },
        });
    }
    async setFeatured(productId, imageId) {
        await this.validateImage(productId, imageId);
        await this.prisma.productImage.updateMany({
            where: { productId, isFeatured: true },
            data: { isFeatured: false },
        });
        return this.prisma.productImage.update({
            where: { id: imageId },
            data: { isFeatured: true },
        });
    }
    async reorder(productId, dto) {
        await this.validateProduct(productId);
        await this.prisma.$transaction(dto.imageIds.map((imageId, index) => this.prisma.productImage.updateMany({
            where: { id: imageId, productId },
            data: { sortOrder: index },
        })));
        return this.findAll(productId);
    }
    async updateImage(productId, imageId, dto) {
        await this.validateImage(productId, imageId);
        if (dto.isFeatured) {
            await this.prisma.productImage.updateMany({
                where: { productId, isFeatured: true },
                data: { isFeatured: false },
            });
        }
        return this.prisma.productImage.update({
            where: { id: imageId },
            data: dto,
        });
    }
    async removeImage(productId, imageId) {
        const image = await this.validateImage(productId, imageId);
        if (image.publicId) {
            try {
                await this.mediaService.deleteFile(image.publicId);
            }
            catch (err) {
                console.error('Gagal hapus dari Cloudinary:', err);
            }
        }
        return this.prisma.productImage.delete({ where: { id: imageId } });
    }
    async validateProduct(productId) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Produk tidak ditemukan');
        return product;
    }
    async validateImage(productId, imageId) {
        const image = await this.prisma.productImage.findFirst({
            where: { id: imageId, productId },
        });
        if (!image)
            throw new common_1.NotFoundException('Gambar tidak ditemukan di produk ini');
        return image;
    }
};
exports.ImagesService = ImagesService;
exports.ImagesService = ImagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        media_service_1.MediaService])
], ImagesService);
//# sourceMappingURL=images.service.js.map