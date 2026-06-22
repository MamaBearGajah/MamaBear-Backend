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
exports.ShippingCostDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ShippingCostDto {
    originCityId;
    destinationCityId;
    weight;
    courier;
}
exports.ShippingCostDto = ShippingCostDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10', description: 'ID kota asal dari RajaOngkir' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShippingCostDto.prototype, "originCityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '23', description: 'ID kota tujuan dari RajaOngkir' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShippingCostDto.prototype, "destinationCityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, description: 'Berat paket dalam gram' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ShippingCostDto.prototype, "weight", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'jne', description: 'Kode kurir (jne, tiki, pos)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ShippingCostDto.prototype, "courier", void 0);
//# sourceMappingURL=shipping-cost.dto.js.map