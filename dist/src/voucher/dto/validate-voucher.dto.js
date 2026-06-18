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
exports.UpdateVoucherDto = exports.ValidateVoucherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ValidateVoucherDto {
    code;
    totalAmount;
}
exports.ValidateVoucherDto = ValidateVoucherDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'HEMAT50', description: 'Kode voucher yang ingin divalidasi' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], ValidateVoucherDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150000, description: 'Total belanja (untuk cek minPurchase)' }),
    __metadata("design:type", Number)
], ValidateVoucherDto.prototype, "totalAmount", void 0);
const swagger_2 = require("@nestjs/swagger");
const create_voucher_dto_1 = require("./create-voucher.dto");
class UpdateVoucherDto extends (0, swagger_2.PartialType)(create_voucher_dto_1.CreateVoucherDto) {
}
exports.UpdateVoucherDto = UpdateVoucherDto;
//# sourceMappingURL=validate-voucher.dto.js.map