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
exports.CartDto = exports.CartItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CartProductBriefDto {
    id;
    name;
    slug;
    basePrice;
    mainImage;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], CartProductBriefDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Minyak Telon Plus' }),
    __metadata("design:type", String)
], CartProductBriefDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'minyak-telon-plus' }),
    __metadata("design:type", String)
], CartProductBriefDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35000 }),
    __metadata("design:type", Number)
], CartProductBriefDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'https://res.cloudinary.com/...', nullable: true }),
    __metadata("design:type", Object)
], CartProductBriefDto.prototype, "mainImage", void 0);
class CartVariantBriefDto {
    id;
    name;
    value;
    priceAdjustment;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], CartVariantBriefDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ukuran' }),
    __metadata("design:type", String)
], CartVariantBriefDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100ml' }),
    __metadata("design:type", String)
], CartVariantBriefDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000 }),
    __metadata("design:type", Number)
], CartVariantBriefDto.prototype, "priceAdjustment", void 0);
class CartItemDto {
    id;
    cartId;
    productId;
    variantId;
    quantity;
    price;
    notes;
    product;
    variant;
    createdAt;
}
exports.CartItemDto = CartItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], CartItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], CartItemDto.prototype, "cartId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], CartItemDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-here', nullable: true }),
    __metadata("design:type", Object)
], CartItemDto.prototype, "variantId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], CartItemDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35000, description: 'Snapshot price per unit in IDR at time of adding' }),
    __metadata("design:type", Number)
], CartItemDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Tolong bungkus kado', nullable: true, description: 'Catatan customer untuk item ini' }),
    __metadata("design:type", Object)
], CartItemDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CartProductBriefDto }),
    __metadata("design:type", CartProductBriefDto)
], CartItemDto.prototype, "product", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: CartVariantBriefDto, nullable: true }),
    __metadata("design:type", Object)
], CartItemDto.prototype, "variant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], CartItemDto.prototype, "createdAt", void 0);
class CartDto {
    id;
    userId;
    items;
    updatedAt;
}
exports.CartDto = CartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], CartDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-here' }),
    __metadata("design:type", String)
], CartDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CartItemDto] }),
    __metadata("design:type", Array)
], CartDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-01-01T00:00:00.000Z' }),
    __metadata("design:type", Date)
], CartDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=cart-response.dto.js.map