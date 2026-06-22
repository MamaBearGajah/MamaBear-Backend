"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const mail_service_1 = require("../mail/mail.service");
const DUMMY_HASH = '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345';
let AuthService = class AuthService {
    prisma;
    config;
    jwtService;
    mailService;
    constructor(prisma, config, jwtService, mailService) {
        this.prisma = prisma;
        this.config = config;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(dto) {
        const exists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (exists)
            throw new common_1.ConflictException('Email sudah terdaftar');
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: { name: dto.name, email: dto.email, password: hash },
        });
        try {
            await this.sendVerificationEmail(user.id, user.email);
        }
        catch (error) {
            console.error('Gagal mengirim email verifikasi:', error);
        }
        return {
            message: 'Registrasi berhasil. Cek email untuk verifikasi akun.',
            userId: user.id,
            email: user.email,
        };
    }
    async verifyEmail(token) {
        const hashedToken = this.hashToken(token);
        const user = await this.prisma.user.findFirst({
            where: {
                verifyToken: hashedToken,
                verifyTokenExp: { gt: new Date() },
            },
        });
        if (!user)
            throw new common_1.BadRequestException('Token verifikasi tidak valid atau sudah expired');
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verifyToken: null,
                verifyTokenExp: null,
            },
        });
        return { message: 'Email berhasil diverifikasi' };
    }
    async resendVerification(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.isVerified) {
            if (user?.isVerified)
                throw new common_1.BadRequestException('Email sudah terverifikasi');
            return { message: 'Jika email terdaftar dan belum terverifikasi, email telah dikirim ulang' };
        }
        await this.sendVerificationEmail(user.id, user.email);
        return { message: 'Jika email terdaftar dan belum terverifikasi, email telah dikirim ulang' };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        const passwordMatch = await bcrypt.compare(dto.password, user?.password ?? DUMMY_HASH);
        if (!user || !passwordMatch) {
            throw new common_1.UnauthorizedException('Email atau password salah');
        }
        if (user.deletedAt)
            throw new common_1.UnauthorizedException('Akun tidak ditemukan atau telah dihapus');
        if (!user.isVerified)
            throw new common_1.ForbiddenException('Akun belum diverifikasi. Cek email kamu.');
        if (user.bannedAt)
            throw new common_1.UnauthorizedException(`Akun kamu telah dinonaktifkan${user.banReason ? `: ${user.banReason}` : '.'}`);
        const tokens = await this.generateTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return {
            tokens,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    async refreshToken(userId, email, role) {
        const tokens = await this.generateTokens(userId, email, role);
        await this.updateRefreshToken(userId, tokens.refreshToken);
        return tokens;
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: null },
        });
        return { message: 'Logout berhasil' };
    }
    async forgotPassword(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            return { message: 'Jika email terdaftar, link reset telah dikirim' };
        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = this.hashToken(rawToken);
        const exp = new Date(Date.now() + 1000 * 60 * 60);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { resetToken: hashedToken, resetTokenExp: exp },
        });
        await this.mailService.sendResetPasswordEmail(user.email, user.name, rawToken);
        return { message: 'Jika email terdaftar, link reset telah dikirim' };
    }
    async resetPassword(dto) {
        const hashedToken = this.hashToken(dto.token);
        const user = await this.prisma.user.findFirst({
            where: {
                resetToken: hashedToken,
                resetTokenExp: { gt: new Date() },
            },
        });
        if (!user)
            throw new common_1.BadRequestException('Token reset tidak valid atau sudah expired');
        const hash = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hash,
                resetToken: null,
                resetTokenExp: null,
                refreshToken: null,
            },
        });
        return { message: 'Password berhasil diubah. Silakan login kembali.' };
    }
    async generateTokens(userId, email, role) {
        const payload = { sub: userId, email, role };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return { accessToken, refreshToken };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashed = await bcrypt.hash(refreshToken, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: hashed },
        });
    }
    async sendVerificationEmail(userId, email) {
        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = this.hashToken(rawToken);
        const exp = new Date(Date.now() + 1000 * 60 * 60 * 24);
        await this.prisma.user.update({
            where: { id: userId },
            data: { verifyToken: hashedToken, verifyTokenExp: exp },
        });
        await this.mailService.sendVerificationEmail(email, rawToken);
    }
    hashToken(token) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map