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
exports.AdminProductsController = void 0;
const admin_product_csv_dto_1 = require("./../dto/admin-product-csv.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_products_service_1 = require("./admin-products.service");
const platform_express_1 = require("@nestjs/platform-express");
let AdminProductsController = class AdminProductsController {
    adminProductsService;
    constructor(adminProductsService) {
        this.adminProductsService = adminProductsService;
    }
    async exportCsv(res) {
        const csvContent = await this.adminProductsService.exportProductsToCsv();
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=products_export.csv');
        return res.status(200).send(csvContent);
    }
    async importCsv(file) {
        if (!file)
            throw new common_1.BadRequestException('Please upload a CSV file');
        if (!file.originalname.match(/\.(csv)$/))
            throw new common_1.BadRequestException('Only CSV files are allowed');
        return this.adminProductsService.importProductsFromCsv(file.buffer);
    }
};
exports.AdminProductsController = AdminProductsController;
__decorate([
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Export all products into a CSV file' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminProductsController.prototype, "exportCsv", null);
__decorate([
    (0, common_1.Post)('import'),
    (0, swagger_1.ApiOperation)({ summary: 'Import products from a CSV file' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: admin_product_csv_dto_1.CsvUploadDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminProductsController.prototype, "importCsv", null);
exports.AdminProductsController = AdminProductsController = __decorate([
    (0, swagger_1.ApiTags)('Admin Product'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin/products'),
    __metadata("design:paramtypes", [admin_products_service_1.AdminProductsService])
], AdminProductsController);
//# sourceMappingURL=admin-products.controller.js.map