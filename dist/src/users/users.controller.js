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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const decorators_1 = require("../auth/decorators");
const users_dto_1 = require("./dto/users.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getProfile(userId) {
        return this.usersService.getProfile(userId);
    }
    updateProfile(userId, dto) {
        return this.usersService.updateProfile(userId, dto);
    }
    changePassword(userId, dto) {
        return this.usersService.changePassword(userId, dto);
    }
    getAddresses(userId) {
        return this.usersService.getAddresses(userId);
    }
    getAddressById(userId, addressId) {
        return this.usersService.getAddressById(userId, addressId);
    }
    createAddress(userId, dto) {
        return this.usersService.createAddress(userId, dto);
    }
    setDefaultAddress(userId, addressId) {
        return this.usersService.setDefaultAddress(userId, addressId);
    }
    updateAddress(userId, addressId, dto) {
        return this.usersService.updateAddress(userId, addressId, dto);
    }
    deleteAddress(userId, addressId) {
        return this.usersService.deleteAddress(userId, addressId);
    }
    getOrders(userId) {
        return this.usersService.getOrders(userId);
    }
    getOrderById(userId, orderId) {
        return this.usersService.getOrderById(userId, orderId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil profil user saat ini' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Update profil user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profil berhasil diperbarui' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('me/change-password'),
    (0, swagger_1.ApiOperation)({ summary: 'Ganti password user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password berhasil diganti' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Password lama salah' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('me/addresses'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua alamat user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar alamat berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAddresses", null);
__decorate([
    (0, common_1.Get)('me/addresses/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil detail alamat berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Address ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Alamat berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Alamat tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAddressById", null);
__decorate([
    (0, common_1.Post)('me/addresses'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah alamat baru' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Alamat berhasil ditambahkan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, users_dto_1.CreateAddressDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "createAddress", null);
__decorate([
    (0, common_1.Patch)('me/addresses/:id/default'),
    (0, swagger_1.ApiOperation)({ summary: 'Set alamat default' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Address ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Alamat default berhasil diubah' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Alamat tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "setDefaultAddress", null);
__decorate([
    (0, common_1.Patch)('me/addresses/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update alamat user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Address ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Alamat berhasil diperbarui' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Alamat tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, users_dto_1.UpdateAddressDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Delete)('me/addresses/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus alamat user' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Address ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Alamat berhasil dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Alamat tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.Get)('me/orders'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua order user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar order berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Get)('me/orders/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil detail order berdasarkan ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Order ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail order berhasil diambil' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Order tidak ditemukan' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getOrderById", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map