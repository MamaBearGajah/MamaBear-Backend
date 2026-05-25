import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      // ✅ Baca dari cookie dulu, fallback ke Authorization header
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
      select: { id: true, email: true, role: true, isVerified: true },
    });

    if (!user) throw new UnauthorizedException('User tidak ditemukan');
    if (!user.isVerified) throw new UnauthorizedException('Akun belum diverifikasi');

    return user;
  }
}