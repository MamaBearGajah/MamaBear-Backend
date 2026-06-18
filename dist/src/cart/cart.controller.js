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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cart_service_1 = require("./cart.service");
const create_cart_dto_1 = require("./dto/create-cart.dto");
const decorators_1 = require("../auth/decorators");
let CartController = class CartController {
    cartService;
    constructor(cartService) {
        this.cartService = cartService;
    }
    getCart(userId) {
        return this.cartService.getCart(userId);
    }
    addItem(userId, dto) {
        return this.cartService.addItem(userId, dto);
    }
    updateItem(userId, itemId, dto) {
        return this.cartService.updateItem(userId, itemId, dto);
    }
    removeItem(userId, itemId) {
        return this.cartService.removeItem(userId, itemId);
    }
    clearCart(userId) {
        return this.cartService.clearCart(userId);
    }
    mergeGuest(userId, dto) {
        return this.cartService.mergeGuest(userId, dto);
    }
};
exports.CartController = CartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns user cart with all items and subtotal' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Access token missing or invalid' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Item added to cart. Returns updated cart with subtotal' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Stok tidak mencukupi atau data tidak valid' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Access token missing or invalid' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Produk atau variant tidak ditemukan' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Put)('items/:id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Quantity diupdate. Returns updated cart with subtotal' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Stok tidak mencukupi' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Access token missing or invalid' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Cart item tidak ditemukan' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, create_cart_dto_1.UpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Item berhasil dihapus dari cart' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Access token missing or invalid' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Cart item tidak ditemukan' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Cart berhasil dikosongkan' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Access token missing or invalid' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Post)('merge-guest'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Guest cart berhasil di-merge. Returns updated cart dengan subtotal' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Session ID tidak valid' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Access token missing or invalid' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Stok tidak mencukupi untuk beberapa item saat merge' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_cart_dto_1.MergeGuestCartDto]),
    __metadata("design:returntype", void 0)
], CartController.prototype, "mergeGuest", null);
exports.CartController = CartController = __decorate([
    (0, swagger_1.ApiTags)('Cart'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
//# sourceMappingURL=cart.controller.js.map