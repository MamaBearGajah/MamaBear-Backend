import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '../../../generated/prisma/enums';
import { Request } from 'express';

export type JwtPayload = {
  sub: string;
  email: string;
  // FIX: role di-type sebagai Role enum, bukan string
  role: Role;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        return (
          req?.cookies?.accessToken ??
          ExtractJwt.fromAuthHeaderAsBearerToken()(req) ??
          null
        );
      },
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      passReqToCallback: false,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        role: true,
        isVerified: true,
        bannedAt: true,
        deletedAt: true,
      },
    });

    if (!user || user.deletedAt) throw new UnauthorizedException('User tidak ditemukan');
    if (!user.isVerified) throw new UnauthorizedException('Akun belum diverifikasi');
    if (user.bannedAt) throw new UnauthorizedException('Akun kamu telah dinonaktifkan');

    // Return role dari DB, bukan dari payload JWT
    // Ini penting: kalau admin di-demote, token lama tidak bisa eskalasi privilege
    return { id: user.id, email: user.email, role: user.role };
  }
}