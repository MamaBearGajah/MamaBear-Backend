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
exports.GuestCartController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const guest_cart_service_1 = require("./guest-cart.service");
const guest_cart_dto_1 = require("./dto/guest-cart.dto");
const decorators_1 = require("../auth/decorators");
let GuestCartController = class GuestCartController {
    guestCartService;
    constructor(guestCartService) {
        this.guestCartService = guestCartService;
    }
    createCart(dto) {
        return this.guestCartService.createCart(dto.sessionId);
    }
    getCart(sessionId) {
        return this.guestCartService.getCart(sessionId);
    }
    addItem(dto) {
        return this.guestCartService.addItem(dto);
    }
    updateItem(sessionId, itemId, dto) {
        return this.guestCartService.updateItem(sessionId, itemId, dto);
    }
    removeItem(sessionId, itemId) {
        return this.guestCartService.removeItem(sessionId, itemId);
    }
    clearCart(sessionId) {
        return this.guestCartService.clearCart(sessionId);
    }
    deleteCart(sessionId) {
        return this.guestCartService.deleteCart(sessionId);
    }
};
exports.GuestCartController = GuestCartController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Guest cart dibuat atau ditemukan berdasarkan sessionId' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guest_cart_dto_1.CreateGuestCartDto]),
    __metadata("design:returntype", void 0)
], GuestCartController.prototype, "createCart", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOkResponse)({ description: 'Returns guest cart + items + subtotal' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuestCartController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Item ditambahkan ke guest cart. Returns updated cart.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Stok tidak mencukupi atau data tidak valid' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Produk atau variant tidak ditemukan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [guest_cart_dto_1.GuestAddToCartDto]),
    __metadata("design:returntype", void 0)
], GuestCartController.prototype, "addItem", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    (0, swagger_1.ApiOkResponse)({ description: 'Quantity item diupdate. Returns updated cart.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Stok tidak mencukupi' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Item tidak ditemukan' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, guest_cart_dto_1.GuestUpdateCartItemDto]),
    __metadata("design:returntype", void 0)
], GuestCartController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Item berhasil dihapus dari guest cart' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Item tidak ditemukan' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GuestCartController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)('clear'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Semua item di guest cart berhasil dikosongkan' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuestCartController.prototype, "clearCart", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOkResponse)({ description: 'Guest cart berhasil dihapus seluruhnya' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Guest cart tidak ditemukan' }),
    __param(0, (0, common_1.Query)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GuestCartController.prototype, "deleteCart", null);
exports.GuestCartController = GuestCartController = __decorate([
    (0, swagger_1.ApiTags)('Guest Cart'),
    (0, decorators_1.Public)(),
    (0, common_1.Controller)('guest-cart'),
    __metadata("design:paramtypes", [guest_cart_service_1.GuestCartService])
], GuestCartController);
//# sourceMappingURL=guest-cart.controller.js.map