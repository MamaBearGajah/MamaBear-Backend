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
exports.TopCategoryItemDto = exports.TopProductItemDto = exports.SalesReportResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SalesPeriodDto {
    period;
    revenue;
    orders;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-05-01', description: 'Label periode: YYYY-MM-DD (day), YYYY-WW (week start), YYYY-MM (month)' }),
    __metadata("design:type", String)
], SalesPeriodDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500000, description: 'Total revenue pada periode ini (IDR)' }),
    __metadata("design:type", Number)
], SalesPeriodDto.prototype, "revenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12, description: 'Jumlah paid order pada periode ini' }),
    __metadata("design:type", Number)
], SalesPeriodDto.prototype, "orders", void 0);
class SalesReportResponseDto {
    totalSales;
    orderCount;
    avgOrderValue;
    groupBy;
    data;
}
exports.SalesReportResponseDto = SalesReportResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000000, description: 'Total revenue dari paid orders (IDR)' }),
    __metadata("design:type", Number)
], SalesReportResponseDto.prototype, "totalSales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'Total jumlah paid orders' }),
    __metadata("design:type", Number)
], SalesReportResponseDto.prototype, "orderCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 166666, description: 'Rata-rata nilai order (IDR)' }),
    __metadata("design:type", Number)
], SalesReportResponseDto.prototype, "avgOrderValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'day', enum: ['day', 'week', 'month'] }),
    __metadata("design:type", String)
], SalesReportResponseDto.prototype, "groupBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SalesPeriodDto], description: 'Breakdown time-series per periode' }),
    __metadata("design:type", Array)
], SalesReportResponseDto.prototype, "data", void 0);
class TopProductInfoDto {
    id;
    name;
    slug;
    mainImage;
    sku;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], TopProductInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MamaBear AlmonMix' }),
    __metadata("design:type", String)
], TopProductInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'mamabear-almonmix' }),
    __metadata("design:type", String)
], TopProductInfoDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://res.cloudinary.com/...', nullable: true }),
    __metadata("design:type", Object)
], TopProductInfoDto.prototype, "mainImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ALMN-001' }),
    __metadata("design:type", String)
], TopProductInfoDto.prototype, "sku", void 0);
class TopProductItemDto {
    product;
    totalSold;
    totalRevenue;
}
exports.TopProductItemDto = TopProductItemDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: TopProductInfoDto, nullable: true, description: 'null jika produk sudah dihapus' }),
    __metadata("design:type", Object)
], TopProductItemDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 42, description: 'Total unit terjual dari paid orders' }),
    __metadata("design:type", Number)
], TopProductItemDto.prototype, "totalSold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1680000, description: 'Total revenue dari produk ini (IDR)' }),
    __metadata("design:type", Number)
], TopProductItemDto.prototype, "totalRevenue", void 0);
class TopCategoryInfoDto {
    id;
    name;
    slug;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], TopCategoryInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ASI Booster' }),
    __metadata("design:type", String)
], TopCategoryInfoDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'asi-booster' }),
    __metadata("design:type", String)
], TopCategoryInfoDto.prototype, "slug", void 0);
class TopCategoryItemDto {
    category;
    totalSold;
    totalRevenue;
}
exports.TopCategoryItemDto = TopCategoryItemDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: TopCategoryInfoDto, nullable: true, description: 'null jika kategori sudah dihapus' }),
    __metadata("design:type", Object)
], TopCategoryItemDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 85, description: 'Total unit terjual di kategori ini' }),
    __metadata("design:type", Number)
], TopCategoryItemDto.prototype, "totalSold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2975000, description: 'Total revenue dari kategori ini (IDR)' }),
    __metadata("design:type", Number)
], TopCategoryItemDto.prototype, "totalRevenue", void 0);
//# sourceMappingURL=reports-response.dto.js.map