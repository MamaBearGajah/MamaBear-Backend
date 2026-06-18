import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '../../../generated/prisma/enums';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.refreshToken ?? null,
      secretOrKey: config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  // FIX: role di payload di-type sebagai Role, bukan string
  async validate(req: Request, payload: { sub: string; email: string; role: Role }) {
    const refreshToken = req?.cookies?.refreshToken;
    if (!refreshToken) throw new UnauthorizedException('Refresh token tidak ditemukan');

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        role: true,
        refreshToken: true,
        bannedAt: true,
        deletedAt: true,
      },
    });

    if (!user || user.deletedAt) throw new UnauthorizedException('User tidak ditemukan');
    if (user.bannedAt) throw new UnauthorizedException('Akun kamu telah dinonaktifkan');
    if (!user.refreshToken) throw new UnauthorizedException('Refresh token tidak valid');

    const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isMatch) throw new UnauthorizedException('Refresh token tidak cocok');

    // Return role dari DB (bukan dari payload JWT) — lebih aman kalau role berubah
    return { id: user.id, email: user.email, role: user.role };
  }
}