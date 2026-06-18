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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const throttler_1 = require("@nestjs/throttler");
const decorators_1 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
const reports_service_1 = require("./reports.service");
const reports_response_dto_1 = require("./dto/reports-response.dto");
const reports_query_dto_1 = require("./dto/reports-query.dto");
let ReportsController = class ReportsController {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    getSalesReport(query) {
        return this.reportsService.getSalesReport(query);
    }
    getTopProducts(limit, startDate, endDate) {
        return this.reportsService.getTopProducts({
            limit: limit ? Number(limit) : undefined,
            startDate,
            endDate,
        });
    }
    getTopCategories(limit, startDate, endDate) {
        return this.reportsService.getTopCategories({
            limit: limit ? Number(limit) : undefined,
            startDate,
            endDate,
        });
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('sales'),
    (0, swagger_1.ApiOperation)({
        summary: 'Laporan penjualan (paid orders only)',
        description: 'Hanya menghitung order dengan paymentStatus === "paid". ' +
            'Mengembalikan totalSales, orderCount, avgOrderValue, dan breakdown time-series.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, example: '2026-01-01', description: 'Awal range tanggal (ISO date string)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, example: '2026-12-31', description: 'Akhir range tanggal (ISO date string)' }),
    (0, swagger_1.ApiQuery)({ name: 'groupBy', required: false, enum: ['day', 'week', 'month'], description: 'Granularitas time-series (default: day)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Laporan penjualan berhasil diambil', type: reports_response_dto_1.SalesReportResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Tidak terautentikasi' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak — butuh role admin/super_admin' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reports_query_dto_1.SalesQueryDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getSalesReport", null);
__decorate([
    (0, common_1.Get)('top-products'),
    (0, swagger_1.ApiOperation)({
        summary: 'Top produk terlaris (paid orders only)',
        description: 'Group by productId, sum quantity + revenue dari order dengan paymentStatus === "paid". ' +
            'Default top 10.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10, description: 'Jumlah produk yang ditampilkan (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, example: '2026-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, example: '2026-12-31' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Top produk berhasil diambil', type: [reports_response_dto_1.TopProductItemDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Tidak terautentikasi' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getTopProducts", null);
__decorate([
    (0, common_1.Get)('top-categories'),
    (0, swagger_1.ApiOperation)({
        summary: 'Top kategori berdasarkan revenue (paid orders only)',
        description: 'Join: orderItems → products → categories. ' +
            'Sum revenue per kategori dari order dengan paymentStatus === "paid".',
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 10, description: 'Jumlah kategori yang ditampilkan (default: 10)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, example: '2026-01-01' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, example: '2026-12-31' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Top kategori berhasil diambil', type: [reports_response_dto_1.TopCategoryItemDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Tidak terautentikasi' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak' }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getTopCategories", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, throttler_1.Throttle)({ default: { limit: 120, ttl: 60000 } }),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map