import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  isVerified: boolean;
}

// ✅ Tidak extend global Express.Request — buat custom type sendiri
export interface AppRequest extends Request {
  currentUser?: AuthenticatedUser;
}

// ─────────────────────────────────────────────
// AuthMiddleware
// ─────────────────────────────────────────────
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: AppRequest, res: Response, next: NextFunction) {
    const token = this.extractToken(req);

    if (!token) {
      throw new UnauthorizedException('Token tidak ditemukan');
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
        throw new UnauthorizedException('Akun tidak ditemukan');
      }

      if (!user.isVerified) {
        throw new UnauthorizedException('Akun belum diverifikasi');
      }

      req.currentUser = {
        id: user.id,
        email: user.email,
        role: user.role as string,
        isVerified: user.isVerified,
      };

      next();
    } catch (error) {
      if (error instanceof UnauthorizedException || error instanceof ForbiddenException) {
        throw error;
      }

      this.logger.warn(`Invalid token from ${req.ip}: ${(error as Error).message}`);
      throw new UnauthorizedException('Token tidak valid atau sudah expired');
    }
  }

  private extractToken(req: AppRequest): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) return null;
    return authHeader.slice(7);
  }
}

// ─────────────────────────────────────────────
// AdminMiddleware
// ─────────────────────────────────────────────
@Injectable()
export class AdminMiddleware implements NestMiddleware {
  async use(req: AppRequest, res: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new UnauthorizedException('Autentikasi diperlukan');
    }

    if (req.currentUser.role !== 'admin' && req.currentUser.role !== 'super_admin') {
      throw new ForbiddenException('Akses ditolak: hanya admin');
    }

    next();
  }
}

// ─────────────────────────────────────────────
// SuperAdminMiddleware
// ─────────────────────────────────────────────
@Injectable()
export class SuperAdminMiddleware implements NestMiddleware {
  async use(req: AppRequest, res: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new UnauthorizedException('Autentikasi diperlukan');
    }

    if (req.currentUser.role !== 'super_admin') {
      throw new ForbiddenException('Akses ditolak: hanya super admin');
    }

    next();
  }
}

// ─────────────────────────────────────────────
// CustomerMiddleware
// ─────────────────────────────────────────────
@Injectable()
export class CustomerMiddleware implements NestMiddleware {
  async use(req: AppRequest, res: Response, next: NextFunction) {
    if (!req.currentUser) {
      throw new UnauthorizedException('Autentikasi diperlukan');
    }

    if (req.currentUser.role !== 'customer') {
      throw new ForbiddenException('Akses ditolak: hanya untuk customer');
    }

    next();
  }
}

// ─────────────────────────────────────────────
// OptionalAuthMiddleware
// ─────────────────────────────────────────────
@Injectable()
export class OptionalAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: AppRequest, res: Response, next: NextFunction) {
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
          role: user.role as string,
          isVerified: user.isVerified,
        };
      }
    } catch {
      // treat as guest
    }

    next();
  }
}