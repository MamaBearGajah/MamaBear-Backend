import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // ─────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────
  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new ConflictException('Email sudah terdaftar');

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password: hash },
    });

    await this.sendVerificationEmail(user.id, user.email);

    return {
      message: 'Registrasi berhasil. Cek email untuk verifikasi akun.',
      userId: user.id,
      email: user.email,
    };
  }

  // ─────────────────────────────────────────────
  // VERIFY EMAIL
  // ─────────────────────────────────────────────
  async verifyEmail(token: string) {
    const hashedToken = this.hashToken(token);

    const user = await this.prisma.user.findFirst({
      where: {
        verifyToken: hashedToken,
        verifyTokenExp: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequestException('Token verifikasi tidak valid atau sudah expired');

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

  // ─────────────────────────────────────────────
  // RESEND VERIFICATION EMAIL
  // ─────────────────────────────────────────────
  async resendVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User tidak ditemukan');
    if (user.isVerified) throw new BadRequestException('Email sudah terverifikasi');

    await this.sendVerificationEmail(user.id, user.email);
    return { message: 'Email verifikasi telah dikirim ulang' };
  }

  // ─────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Email atau password salah');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Email atau password salah');

    if (!user.isVerified)
      throw new UnauthorizedException('Akun belum diverifikasi. Cek email kamu.');

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // Simpan hashed refresh token ke DB
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  // ─────────────────────────────────────────────
  // REFRESH TOKEN
  // ─────────────────────────────────────────────
  async refreshToken(userId: string, email: string, role: string, oldRefreshToken: string) {
    const tokens = await this.generateTokens(userId, email, role);
    await this.updateRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  // ─────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { message: 'Logout berhasil' };
  }

  // ─────────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────────
  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Jangan reveal apakah email ada atau tidak (security)
    if (!user) return { message: 'Jika email terdaftar, link reset telah dikirim' };

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = this.hashToken(rawToken);
    const exp = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetToken: hashedToken, resetTokenExp: exp },
    });

    await this.mailService.sendResetPasswordEmail(user.email, user.name, rawToken);

    return { message: 'Jika email terdaftar, link reset telah dikirim' };
  }

  // ─────────────────────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────────────────────
  async resetPassword(dto: ResetPasswordDto) {
    const hashedToken = this.hashToken(dto.token);

    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExp: { gt: new Date() },
      },
    });

    if (!user) throw new BadRequestException('Token reset tidak valid atau sudah expired');

    const hash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hash,
        resetToken: null,
        resetTokenExp: null,
        refreshToken: null, // invalidate semua sesi aktif
      },
    });

    return { message: 'Password berhasil diubah. Silakan login kembali.' };
  }

  // ─────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────
  private async generateTokens(userId: string, email: string, role: string) {
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

    return { accessToken, refreshToken, expiresIn: 900 };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hashed = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashed },
    });
  }

  private async sendVerificationEmail(userId: string, email: string) {
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = this.hashToken(rawToken);
    const exp = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 jam

    await this.prisma.user.update({
      where: { id: userId },
      data: { verifyToken: hashedToken, verifyTokenExp: exp },
    });

    await this.mailService.sendVerificationEmail(email, rawToken);
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}