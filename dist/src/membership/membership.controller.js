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
exports.MembershipController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const membership_service_1 = require("./membership.service");
const redeem_points_dto_1 = require("./dto/redeem-points.dto");
const admin_adjust_points_dto_1 = require("./dto/admin-adjust-points.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const decorators_1 = require("../auth/decorators");
const enums_1 = require("../../generated/prisma/enums");
let MembershipController = class MembershipController {
    membershipService;
    constructor(membershipService) {
        this.membershipService = membershipService;
    }
    getMyMembership(userId) {
        return this.membershipService.getMyMembership(userId);
    }
    getPointHistory(userId, page, limit) {
        return this.membershipService.getPointHistory(userId, page, limit);
    }
    redeemPoints(userId, dto) {
        return this.membershipService.redeemPoints(userId, dto);
    }
    dailyLoginCheckIn(userId) {
        return this.membershipService.dailyLoginCheckIn(userId);
    }
    findAll(page, limit, tier, search) {
        return this.membershipService.findAll(page, limit, tier, search);
    }
    getMembershipStats() {
        return this.membershipService.getStats();
    }
    getMembershipByUser(userId) {
        return this.membershipService.getMyMembership(userId);
    }
    getPointHistoryByUser(userId, page, limit) {
        return this.membershipService.getPointHistory(userId, page, limit);
    }
    adminAdjustPoints(dto) {
        return this.membershipService.adminAdjustPoints(dto);
    }
};
exports.MembershipController = MembershipController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({
        summary: 'Info membership saya',
        description: 'Menampilkan tier, point, total spent, voucher aktif, dan info tier berikutnya.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Data membership berhasil diambil' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getMyMembership", null);
__decorate([
    (0, common_1.Get)('points/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Riwayat transaksi point saya' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getPointHistory", null);
__decorate([
    (0, common_1.Post)('points/redeem'),
    (0, swagger_1.ApiOperation)({
        summary: 'Redeem point jadi voucher potongan harga',
        description: `
      Konversi point menjadi voucher diskon.
      - 1 point = Rp 100 potongan harga
      - Minimal redeem 100 point (= Rp 10.000)
      - Voucher berlaku 30 hari
    `,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Point berhasil di-redeem, voucher diterbitkan' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Point tidak cukup atau di bawah minimum' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, redeem_points_dto_1.RedeemPointsDto]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "redeemPoints", null);
__decorate([
    (0, common_1.Post)('daily-login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Daily login check-in — klaim point harian',
        description: `
      Klaim point harian (1x per hari).
      - **+5 point** setiap hari login
      - **+20 point bonus** setiap 7 hari streak berturut-turut
      - Jika sudah diklaim hari ini, akan mengembalikan \`alreadyClaimed: true\`
    `,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Check-in berhasil atau sudah diklaim hari ini',
        schema: {
            example: {
                alreadyClaimed: false,
                message: 'Check-in berhasil! +5 point. Streak: 3 hari.',
                pointsEarned: 5,
                basePoints: 5,
                bonusPoints: 0,
                streakCount: 3,
                isStreakBonus: false,
                currentPoints: 45,
            },
        },
    }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "dailyLoginCheckIn", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] List semua member' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    (0, swagger_1.ApiQuery)({ name: 'tier', required: false, enum: enums_1.MembershipTier }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Cari by nama/email user' }),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('tier')),
    __param(3, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Statistik membership (jumlah per tier, total point beredar)' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getMembershipStats", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Detail membership satu user' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getMembershipByUser", null);
__decorate([
    (0, common_1.Get)('user/:userId/points/history'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({ summary: '[Admin] Riwayat point satu user' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 20 }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(20), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getPointHistoryByUser", null);
__decorate([
    (0, common_1.Post)('admin/adjust-points'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, decorators_1.Roles)(enums_1.Role.admin, enums_1.Role.super_admin),
    (0, swagger_1.ApiOperation)({
        summary: '[Admin] Tambah/kurangi point user secara manual',
        description: 'Gunakan untuk kompensasi, koreksi, atau reward manual. Nilai negatif = kurangi.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Point berhasil disesuaikan' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_adjust_points_dto_1.AdminAdjustPointsDto]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "adminAdjustPoints", null);
exports.MembershipController = MembershipController = __decorate([
    (0, swagger_1.ApiTags)('Membership'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('membership'),
    __metadata("design:paramtypes", [membership_service_1.MembershipService])
], MembershipController);
//# sourceMappingURL=membership.controller.js.map