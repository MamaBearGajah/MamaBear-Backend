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
exports.VariantsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const variants_service_1 = require("./variants.service");
const create_variant_dto_1 = require("../dto/create-variant.dto");
const update_variant_dto_1 = require("../dto/update-variant.dto");
const update_batch_variant_images_dto_1 = require("../dto/update-batch-variant-images.dto");
const decorators_1 = require("../../auth/decorators");
const enums_1 = require("../../../generated/prisma/enums");
let VariantsController = class VariantsController {
    variantsService;
    constructor(variantsService) {
        this.variantsService = variantsService;
    }
    findVariants(productId) {
        return this.variantsService.findVariants(productId);
    }
    findOneVariant(productId, variantId) {
        return this.variantsService.findOneVariant(productId, variantId);
    }
    addVariant(productId, dto) {
        return this.variantsService.addVariant(productId, dto);
    }
    updateVariant(productId, variantId, dto) {
        return this.variantsService.updateVariant(productId, variantId, dto);
    }
    removeVariant(productId, variantId) {
        return this.variantsService.removeVariant(productId, variantId);
    }
    setVariantImage(productId, variantId, imageUrl) {
        return this.variantsService.setVariantImage(productId, variantId, imageUrl);
    }
    deleteVariantImage(productId, variantId) {
        return this.variantsService.deleteVariantImage(productId, variantId);
    }
    batchUpdateVariantImages(productId, dto) {
        return this.variantsService.batchUpdateVariantImages(productId, dto);
    }
};
exports.VariantsController = VariantsController;
__decorate([
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get semua varian produk (public)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List varian berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Produk tidak ditemukan' }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "findVariants", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get detail satu varian (public)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'variantId', description: 'Variant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail varian berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Varian tidak ditemukan' }),
    (0, common_1.Get)(':variantId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "findOneVariant", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah varian ke produk (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Varian berhasil ditambahkan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_variant_dto_1.CreateVariantDto]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "addVariant", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update varian produk (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'variantId', description: 'Variant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Varian berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Varian tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, common_1.Patch)(':variantId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_variant_dto_1.UpdateVariantDto]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "updateVariant", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus varian produk (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'variantId', description: 'Variant ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Varian berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Varian tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, common_1.Delete)(':variantId'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "removeVariant", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Set gambar varian (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'variantId', description: 'Variant ID' }),
    (0, common_1.Post)(':variantId/image'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __param(2, (0, common_1.Body)('imageUrl')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "setVariantImage", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus gambar varian (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, swagger_1.ApiParam)({ name: 'variantId', description: 'Variant ID' }),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, common_1.Delete)(':variantId/image'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Param)('variantId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "deleteVariantImage", null);
__decorate([
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Batch update gambar banyak varian (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'productId', description: 'Product ID' }),
    (0, common_1.Post)('images/batch'),
    __param(0, (0, common_1.Param)('productId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_batch_variant_images_dto_1.UpdateVariantImagesBatchDto]),
    __metadata("design:returntype", void 0)
], VariantsController.prototype, "batchUpdateVariantImages", null);
exports.VariantsController = VariantsController = __decorate([
    (0, swagger_1.ApiTags)('Variants'),
    (0, common_1.Controller)('products/:productId/variants'),
    __metadata("design:paramtypes", [variants_service_1.VariantsService])
], VariantsController);
//# sourceMappingURL=variants.controller.js.map