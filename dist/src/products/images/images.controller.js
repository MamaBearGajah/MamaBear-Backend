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
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const images_service_1 = require("./images.service");
const create_image_dto_1 = require("../dto/create-image.dto");
const update_image_dto_1 = require("../dto/update-image.dto");
const reorder_images_dto_1 = require("../dto/reorder-images.dto");
const decorators_1 = require("../../auth/decorators");
const enums_1 = require("../../../generated/prisma/enums");
let ImagesController = class ImagesController {
    imagesService;
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    findAll(productId) {
        return this.imagesService.findAll(productId);
    }
    addImage(productId, dto) {
        return this.imagesService.addImage(productId, dto);
    }
    reorder(productId, dto) {
        return this.imagesService.reorder(productId, dto);
    }
    setFeatured(productId, imageId) {
        return this.imagesService.setFeatured(productId, imageId);
    }
    updateImage(productId, imageId, dto) {
        return this.imagesService.updateImage(productId, imageId, dto);
    }
    removeImage(productId, imageId) {
        return this.imagesService.removeImage(productId, imageId);
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get semua gambar produk (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List gambar berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produk tidak ditemukan' }),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah gambar ke produk (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Gambar berhasil ditambahkan' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produk tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_image_dto_1.CreateImageDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "addImage", null);
__decorate([
    (0, common_1.Patch)('reorder'),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder gambar produk (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Urutan gambar berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reorder_images_dto_1.ReorderImagesDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "reorder", null);
__decorate([
    (0, common_1.Patch)(':imageId/featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Set gambar sebagai featured/utama (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'imageId', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Featured image berhasil diset' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Gambar tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "setFeatured", null);
__decorate([
    (0, common_1.Patch)(':imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update data gambar produk (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'imageId', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gambar berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Gambar tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('imageId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_image_dto_1.UpdateImageDto]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Delete)(':imageId'),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus gambar produk + dari Cloudinary (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'imageId', description: 'Image ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Gambar berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Gambar tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('imageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "removeImage", null);
exports.ImagesController = ImagesController = __decorate([
    (0, swagger_1.ApiTags)('Product Images'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.Controller)('products/:productId/images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map