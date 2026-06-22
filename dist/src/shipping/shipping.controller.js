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
exports.ShippingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const shipping_service_1 = require("./shipping.service");
const shipping_cost_dto_1 = require("./dto/shipping-cost.dto");
const decorators_1 = require("../auth/decorators");
let ShippingController = class ShippingController {
    shippingService;
    constructor(shippingService) {
        this.shippingService = shippingService;
    }
    getProvinces() {
        return this.shippingService.getProvinces();
    }
    getCities(provinceId) {
        return this.shippingService.getCities(provinceId);
    }
    calculateCost(dto) {
        return this.shippingService.calculateCost(dto);
    }
};
exports.ShippingController = ShippingController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Daftar provinsi' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List provinsi berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'Gagal dari RajaOngkir' }),
    (0, common_1.Get)('provinces'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "getProvinces", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Daftar kota per provinsi' }),
    (0, swagger_1.ApiQuery)({ name: 'provinceId', required: false, description: 'ID provinsi dari RajaOngkir' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List kota berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'Gagal dari RajaOngkir' }),
    (0, common_1.Get)('cities'),
    __param(0, (0, common_1.Query)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "getCities", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Hitung ongkos kirim' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kalkulasi ongkir berhasil' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validasi gagal' }),
    (0, swagger_1.ApiResponse)({ status: 502, description: 'Gagal dari RajaOngkir' }),
    (0, common_1.Post)('cost'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [shipping_cost_dto_1.ShippingCostDto]),
    __metadata("design:returntype", void 0)
], ShippingController.prototype, "calculateCost", null);
exports.ShippingController = ShippingController = __decorate([
    (0, swagger_1.ApiTags)('Shipping'),
    (0, decorators_1.Public)(),
    (0, common_1.Controller)('shipping'),
    __metadata("design:paramtypes", [shipping_service_1.ShippingService])
], ShippingController);
//# sourceMappingURL=shipping.controller.js.map