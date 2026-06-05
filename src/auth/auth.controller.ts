import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResendVerificationDto,
  ResetPasswordDto,
} from './dto';
import { JwtAuthGuard, JwtRefreshGuard } from './guards/jwt-auth.guard';
import { GetUser, Public } from './decorators';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../generated/prisma/enums';
// ─────────────────────────────────────────────
// Cookie option helpers
// ─────────────────────────────────────────────
const ACCESS_COOKIE_OPTIONS = (isProduction: boolean) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
  maxAge: 15 * 60 * 1000,           // 15 menit
  // maxAge: 10 * 1000, // 10 detik (untuk testing)
  path: '/',
});

const REFRESH_COOKIE_OPTIONS = (isProduction: boolean) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'strict' : 'lax') as 'strict' | 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
  // FIX: path harus sama persis dengan path saat clearCookie di logout
  // Pastikan prefix /api sesuai dengan global prefix app di main.ts
  path: '/api/auth',
});

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  // ─────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register akun baru' })
  @ApiResponse({ status: 201, description: 'Registrasi berhasil' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // ─────────────────────────────────────────────
  // VERIFY EMAIL
  // ─────────────────────────────────────────────
  @Public()
  @Get('verify-email')
  @ApiOperation({ summary: 'Verifikasi email via token — redirect ke frontend' })
  @ApiQuery({ name: 'token', required: true })
  @ApiResponse({ status: 302, description: 'Redirect ke halaman hasil verifikasi' })
  async verifyEmail(@Query('token') token: string, @Res() res: Response) {
    const frontendUrl = this.config.get('FRONTEND_URL') || 'http://localhost:3001';
    try {
      await this.authService.verifyEmail(token);
      return res.redirect(`${frontendUrl}/email-verified?status=success`);
    } catch {
      return res.redirect(`${frontendUrl}/email-verified?status=failed`);
    }
  }

  // ─────────────────────────────────────────────
  // RESEND VERIFICATION
  // ─────────────────────────────────────────────
  @Public()
  @Post('resend-verification')
  @ApiOperation({ summary: 'Kirim ulang email verifikasi' })
  // FIX: Hapus 404 — service sekarang tidak throw NotFoundException untuk email tidak terdaftar
  @ApiResponse({ status: 200, description: 'Email verifikasi dikirim jika email terdaftar dan belum terverifikasi' })
  @ApiResponse({ status: 400, description: 'Email sudah terverifikasi' })
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  // ─────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login — token disimpan di HTTP-only cookie' })
  // FIX: Hapus 404 — service tidak lagi throw NotFoundException untuk login
  @ApiResponse({ status: 200, description: 'Login berhasil' })
  @ApiResponse({ status: 401, description: 'Email/password salah / akun di-ban / akun dihapus' })
  @ApiResponse({ status: 403, description: 'Akun belum diverifikasi' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);

    // FIX: Pakai ConfigService konsisten, jangan campur dengan process.env langsung
    const isProduction = this.config.get('NODE_ENV') === 'production';

    res.cookie('accessToken', result.tokens.accessToken, ACCESS_COOKIE_OPTIONS(isProduction));
    res.cookie('refreshToken', result.tokens.refreshToken, REFRESH_COOKIE_OPTIONS(isProduction));

    return {
      success: true,
      data: {
        expiresIn: 900,
        user: result.user,
      },
    };
  }

  // ─────────────────────────────────────────────
  // REFRESH TOKEN
  // ─────────────────────────────────────────────
  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token menggunakan cookie' })
  @ApiResponse({ status: 200, description: 'Token baru berhasil dibuat' })
  @ApiResponse({ status: 401, description: 'Refresh token tidak valid atau expired' })
  async refreshToken(
    @GetUser('id') userId: string,
    @GetUser('email') email: string,
    // FIX: Terima sebagai Role langsung — JWT strategy seharusnya sudah set tipe yang benar
    // Kalau strategy-mu return role sebagai string, tambahkan Role enum mapping di strategy
    @GetUser('role') role: Role,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshToken(userId, email, role);

    // FIX: Konsisten pakai ConfigService
    const isProduction = this.config.get('NODE_ENV') === 'production';

    res.cookie('accessToken', tokens.accessToken, ACCESS_COOKIE_OPTIONS(isProduction));
    res.cookie('refreshToken', tokens.refreshToken, REFRESH_COOKIE_OPTIONS(isProduction));

    return { success: true, message: 'Token berhasil diperbarui' };
  }

  // ─────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout — hapus semua cookie' })
  @ApiResponse({ status: 200, description: 'Logout berhasil' })
  @ApiResponse({ status: 401, description: 'Tidak terautentikasi' })
  async logout(
    @GetUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/api/auth' });
    return this.authService.logout(userId);
  }

  // ─────────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────────
  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request reset password via email' })
  @ApiResponse({ status: 200, description: 'Email reset password berhasil dikirim (jika terdaftar)' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  // ─────────────────────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────────────────────
  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password menggunakan token' })
  @ApiResponse({ status: 200, description: 'Password berhasil direset' })
  @ApiResponse({ status: 400, description: 'Token tidak valid atau expired' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}