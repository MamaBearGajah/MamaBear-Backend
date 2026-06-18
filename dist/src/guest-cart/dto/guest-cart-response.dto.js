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
exports.GuestCartDto = exports.GuestCartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GuestCartProductBriefDto {
    id;
    name;
    basePrice;
    mainImage;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], GuestCartProductBriefDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Minyak Telon Plus' }),
    __metadata("design:type", String)
], GuestCartProductBriefDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35000 }),
    __metadata("design:type", Number)
], GuestCartProductBriefDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://res.cloudinary.com/...', nullable: true }),
    __metadata("design:type", Object)
], GuestCartProductBriefDto.prototype, "mainImage", void 0);
class GuestCartItemDto {
    id;
    guestCartId;
    productId;
    variantId;
    quantity;
    price;
    notes;
    product;
    createdAt;
}
exports.GuestCartItemDto = GuestCartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], GuestCartItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], GuestCartItemDto.prototype, "guestCartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], GuestCartItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-here', nullable: true }),
    __metadata("design:type", Object)
], GuestCartItemDto.prototype, "variantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], GuestCartItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35000, description: 'Snapshot price per unit in IDR' }),
    __metadata("design:type", Number)
], GuestCartItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Tolong bungkus kado', nullable: true, description: 'Catatan customer untuk item ini' }),
    __metadata("design:type", Object)
], GuestCartItemDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: GuestCartProductBriefDto }),
    __metadata("design:type", GuestCartProductBriefDto)
], GuestCartItemDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], GuestCartItemDto.prototype, "createdAt", void 0);
class GuestCartDto {
    id;
    sessionId;
    items;
    updatedAt;
}
exports.GuestCartDto = GuestCartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], GuestCartDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sess_abc123' }),
    __metadata("design:type", String)
], GuestCartDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [GuestCartItemDto] }),
    __metadata("design:type", Array)
], GuestCartDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], GuestCartDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=guest-cart-response.dto.js.map