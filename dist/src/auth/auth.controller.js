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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const decorators_1 = require("./decorators");
const config_1 = require("@nestjs/config");
const enums_1 = require("../../generated/prisma/enums");
const ACCESS_COOKIE_OPTIONS = () => ({
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 15 * 60 * 1000,
    path: '/',
});
const REFRESH_COOKIE_OPTIONS = () => ({
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/auth',
});
let AuthController = class AuthController {
    authService;
    config;
    constructor(authService, config) {
        this.authService = authService;
        this.config = config;
    }
    register(dto) {
        return this.authService.register(dto);
    }
    async verifyEmail(token, res) {
        const frontendUrl = this.config.get('FRONTEND_URL') || 'http://localhost:3001';
        try {
            await this.authService.verifyEmail(token);
            return res.redirect(`${frontendUrl}/email-verified?status=success`);
        }
        catch {
            return res.redirect(`${frontendUrl}/email-verified?status=failed`);
        }
    }
    resendVerification(dto) {
        return this.authService.resendVerification(dto.email);
    }
    async login(dto, res) {
        const result = await this.authService.login(dto);
        res.cookie('accessToken', result.tokens.accessToken, ACCESS_COOKIE_OPTIONS());
        res.cookie('refreshToken', result.tokens.refreshToken, REFRESH_COOKIE_OPTIONS());
        return {
            success: true,
            data: {
                expiresIn: 900,
                user: result.user,
            },
        };
    }
    async refreshToken(userId, email, role, res) {
        const tokens = await this.authService.refreshToken(userId, email, role);
        res.cookie('accessToken', tokens.accessToken, ACCESS_COOKIE_OPTIONS());
        res.cookie('refreshToken', tokens.refreshToken, REFRESH_COOKIE_OPTIONS());
        return { success: true, message: 'Token berhasil diperbarui' };
    }
    async logout(userId, res) {
        res.clearCookie('accessToken', {
            path: '/',
            secure: true,
            sameSite: 'none',
        });
        res.clearCookie('refreshToken', {
            path: '/api/auth',
            secure: true,
            sameSite: 'none',
        });
        return this.authService.logout(userId);
    }
    forgotPassword(dto) {
        return this.authService.forgotPassword(dto);
    }
    resetPassword(dto) {
        return this.authService.resetPassword(dto);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register akun baru' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Registrasi berhasil' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validasi gagal' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email sudah terdaftar' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('verify-email'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifikasi email via token — redirect ke frontend' }),
    (0, swagger_1.ApiQuery)({ name: 'token', required: true }),
    (0, swagger_1.ApiResponse)({ status: 302, description: 'Redirect ke halaman hasil verifikasi' }),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('resend-verification'),
    (0, swagger_1.ApiOperation)({ summary: 'Kirim ulang email verifikasi' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email verifikasi dikirim jika email terdaftar dan belum terverifikasi' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email sudah terverifikasi' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResendVerificationDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendVerification", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login — token disimpan di HTTP-only cookie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login berhasil' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Email/password salah / akun di-ban / akun dihapus' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akun belum diverifikasi' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtRefreshGuard),
    (0, common_1.Post)('refresh'),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token menggunakan cookie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token baru berhasil dibuat' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Refresh token tidak valid atau expired' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, decorators_1.GetUser)('email')),
    __param(2, (0, decorators_1.GetUser)('role')),
    __param(3, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('logout'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Logout — hapus semua cookie' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout berhasil' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Tidak terautentikasi' }),
    __param(0, (0, decorators_1.GetUser)('id')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request reset password via email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Email reset password berhasil dikirim (jika terdaftar)' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password menggunakan token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password berhasil direset' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Token tidak valid atau expired' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map