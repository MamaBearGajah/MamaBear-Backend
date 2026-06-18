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
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const wishlist_service_1 = require("./wishlist.service");
const wishlist_dto_1 = require("./dto/wishlist.dto");
const decorators_1 = require("../auth/decorators");
let WishlistController = class WishlistController {
    wishlistService;
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    getWishlist(userId) {
        return this.wishlistService.getWishlist(userId);
    }
    addToWishlist(userId, dto) {
        return this.wishlistService.addToWishlist(userId, dto.productId);
    }
    removeFromWishlist(userId, productId) {
        return this.wishlistService.removeFromWishlist(userId, productId);
    }
    checkWishlist(userId, productId) {
        return this.wishlistService.checkWishlist(userId, productId);
    }
};
exports.WishlistController = WishlistController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Daftar wishlist user' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "getWishlist", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Produk ditambahkan ke wishlist' }),
    (0, swagger_1.ApiConflictResponse)({ description: 'Produk sudah ada di wishlist' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Produk tidak ditemukan' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, wishlist_dto_1.AddWishlistDto]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.Delete)(':productId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Produk dihapus dari wishlist' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Item tidak ada di wishlist' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "removeFromWishlist", null);
__decorate([
    (0, common_1.Get)('check/:productId'),
    (0, swagger_1.ApiOkResponse)({ description: 'Status wishlist untuk produk ini' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WishlistController.prototype, "checkWishlist", null);
exports.WishlistController = WishlistController = __decorate([
    (0, swagger_1.ApiTags)('Wishlist'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('wishlist'),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
//# sourceMappingURL=wishlist.controller.js.map