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
exports.UpdateSiteSettingsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class UpdateSiteSettingsDto {
    siteName;
    siteDescription;
    contactEmail;
    contactPhone;
    contactAddress;
    socialInstagram;
    socialTiktok;
    socialFacebook;
    socialWhatsapp;
    shippingOriginCityId;
    taxRate;
    currency;
    maintenanceMode;
}
exports.UpdateSiteSettingsDto = UpdateSiteSettingsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Mamabear' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "siteName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Produk perawatan ibu & bayi terpercaya' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "siteDescription", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'hello@mamabear.id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "contactEmail", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+6281234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "contactPhone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Jl. Kenanga No. 12, Jakarta Selatan' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "contactAddress", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://instagram.com/mamabear.id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "socialInstagram", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://tiktok.com/@mamabear.id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "socialTiktok", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://facebook.com/mamabear.id' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "socialFacebook", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://wa.me/6281234567890' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "socialWhatsapp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '151', description: 'City ID asal pengiriman (RajaOngkir)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "shippingOriginCityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 11, description: 'Pajak dalam persen (0-100)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateSiteSettingsDto.prototype, "taxRate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'IDR' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiteSettingsDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateSiteSettingsDto.prototype, "maintenanceMode", void 0);
//# sourceMappingURL=update-site-settings.dto.js.map