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
var AuthMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalAuthMiddleware = exports.CustomerMiddleware = exports.SuperAdminMiddleware = exports.AdminMiddleware = exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthMiddleware = AuthMiddleware_1 = class AuthMiddleware {
    jwtService;
    config;
    prisma;
    logger = new common_1.Logger(AuthMiddleware_1.name);
    constructor(jwtService, config, prisma) {
        this.jwtService = jwtService;
        this.config = config;
        this.prisma = prisma;
    }
    async use(req, res, next) {
        const token = this.extractToken(req);
        if (!token) {
            throw new common_1.UnauthorizedException('Token tidak ditemukan');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
            });
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                select: { id: true, email: true, role: true, isVerified: true },
            });
            if (!user) {
                this.logger.warn(`Token valid but user ${payload.sub} not found`);
                throw new common_1.UnauthorizedException('Akun tidak ditemukan');
            }
            if (!user.isVerified) {
                throw new common_1.UnauthorizedException('Akun belum diverifikasi');
            }
            req.currentUser = {
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            };
            next();
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException || error instanceof common_1.ForbiddenException) {
                throw error;
            }
            this.logger.warn(`Invalid token from ${req.ip}: ${error.message}`);
            throw new common_1.UnauthorizedException('Token tidak valid atau sudah expired');
        }
    }
    extractToken(req) {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer '))
            return null;
        return authHeader.slice(7);
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = AuthMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], AuthMiddleware);
let AdminMiddleware = class AdminMiddleware {
    async use(req, res, next) {
        if (!req.currentUser) {
            throw new common_1.UnauthorizedException('Autentikasi diperlukan');
        }
        if (req.currentUser.role !== 'admin' && req.currentUser.role !== 'super_admin') {
            throw new common_1.ForbiddenException('Akses ditolak: hanya admin');
        }
        next();
    }
};
exports.AdminMiddleware = AdminMiddleware;
exports.AdminMiddleware = AdminMiddleware = __decorate([
    (0, common_1.Injectable)()
], AdminMiddleware);
let SuperAdminMiddleware = class SuperAdminMiddleware {
    async use(req, res, next) {
        if (!req.currentUser) {
            throw new common_1.UnauthorizedException('Autentikasi diperlukan');
        }
        if (req.currentUser.role !== 'super_admin') {
            throw new common_1.ForbiddenException('Akses ditolak: hanya super admin');
        }
        next();
    }
};
exports.SuperAdminMiddleware = SuperAdminMiddleware;
exports.SuperAdminMiddleware = SuperAdminMiddleware = __decorate([
    (0, common_1.Injectable)()
], SuperAdminMiddleware);
let CustomerMiddleware = class CustomerMiddleware {
    async use(req, res, next) {
        if (!req.currentUser) {
            throw new common_1.UnauthorizedException('Autentikasi diperlukan');
        }
        if (req.currentUser.role !== 'customer') {
            throw new common_1.ForbiddenException('Akses ditolak: hanya untuk customer');
        }
        next();
    }
};
exports.CustomerMiddleware = CustomerMiddleware;
exports.CustomerMiddleware = CustomerMiddleware = __decorate([
    (0, common_1.Injectable)()
], CustomerMiddleware);
let OptionalAuthMiddleware = class OptionalAuthMiddleware {
    jwtService;
    config;
    prisma;
    constructor(jwtService, config, prisma) {
        this.jwtService = jwtService;
        this.config = config;
        this.prisma = prisma;
    }
    async use(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return next();
        }
        const token = authHeader.slice(7);
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.config.getOrThrow('JWT_ACCESS_SECRET'),
            });
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
                select: { id: true, email: true, role: true, isVerified: true },
            });
            if (user?.isVerified) {
                req.currentUser = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    isVerified: user.isVerified,
                };
            }
        }
        catch {
        }
        next();
    }
};
exports.OptionalAuthMiddleware = OptionalAuthMiddleware;
exports.OptionalAuthMiddleware = OptionalAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], OptionalAuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map