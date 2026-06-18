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
exports.GuestUpdateCartItemDto = exports.GuestAddToCartDto = exports.CreateGuestCartDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateGuestCartDto {
    sessionId;
}
exports.CreateGuestCartDto = CreateGuestCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Session identifier unik untuk guest cart', example: 'sess_abc123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateGuestCartDto.prototype, "sessionId", void 0);
class GuestAddToCartDto {
    sessionId;
    productId;
    variantId;
    quantity;
    notes;
}
exports.GuestAddToCartDto = GuestAddToCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guest session identifier (UUID or custom string)', example: 'sess_abc123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GuestAddToCartDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Product UUID', example: 'uuid-here' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GuestAddToCartDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Product variant UUID (if applicable)', example: 'uuid-here' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], GuestAddToCartDto.prototype, "variantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity to add', example: 1, minimum: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GuestAddToCartDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Catatan untuk item ini, misal "Tolong bungkus kado"', example: 'Tolong bungkus kado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GuestAddToCartDto.prototype, "notes", void 0);
class GuestUpdateCartItemDto {
    quantity;
    notes;
}
exports.GuestUpdateCartItemDto = GuestUpdateCartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'New quantity for the cart item', example: 2, minimum: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], GuestUpdateCartItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Catatan untuk item ini, misal "Tolong bungkus kado"', example: 'Tolong bungkus kado' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GuestUpdateCartItemDto.prototype, "notes", void 0);
//# sourceMappingURL=guest-cart.dto.js.map