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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const category_query_dto_1 = require("./dto/category-query.dto");
const product_query_dto_1 = require("../products/dto/product-query.dto");
const decorators_1 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
let CategoriesController = class CategoriesController {
    categoriesService;
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    findAll(query) {
        return this.categoriesService.findAll(query);
    }
    getBreadcrumb(id) {
        return this.categoriesService.getBreadcrumb(id);
    }
    findProducts(id, query) {
        return this.categoriesService.findProducts(id, query);
    }
    findOne(id) {
        return this.categoriesService.findOne(id);
    }
    create(dto) {
        return this.categoriesService.create(dto);
    }
    update(id, dto) {
        return this.categoriesService.update(id, dto);
    }
    reorder(items) {
        return this.categoriesService.reorder(items);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
exports.CategoriesController = CategoriesController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get semua kategori (public)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List kategori berhasil diambil' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_query_dto_1.CategoryQueryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id/breadcrumb'),
    (0, swagger_1.ApiOperation)({ summary: 'Get breadcrumb path dari root ke kategori ini (public)' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Array breadcrumb dari root ke kategori' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "getBreadcrumb", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id/products'),
    (0, swagger_1.ApiOperation)({ summary: 'Get produk dalam kategori ini dan semua sub-kategorinya (public)' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List produk dalam kategori (rekursif)' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_query_dto_1.ProductQueryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findProducts", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get detail kategori by ID (public)' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail kategori' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Buat kategori baru (admin)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Kategori berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Slug sudah digunakan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: 'Update kategori (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategori berhasil diupdate' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kategori tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Slug sudah digunakan atau circular reference' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reorder kategori (admin)' }),
    __param(0, (0, common_1.Body)(new common_1.ParseArrayPipe({ items: Object }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "reorder", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus kategori (admin)' }),
    (0, swagger_1.ApiParam)({ name: 'id' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kategori berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Kategori masih memiliki produk atau sub-kategori' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, swagger_1.ApiTags)('Categories'),
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map