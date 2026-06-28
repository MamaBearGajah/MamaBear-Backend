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
const ACCESS_COOKIE_OPTIONS = () => ({
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  maxAge: 15 * 60 * 1000, // 15 menit
  path: '/',
});

const REFRESH_COOKIE_OPTIONS = () => ({
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
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
  @ApiResponse({ status: 200, description: 'Login berhasil' })
  @ApiResponse({ status: 401, description: 'Email/password salah / akun di-ban / akun dihapus' })
  @ApiResponse({ status: 403, description: 'Akun belum diverifikasi' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
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
    @GetUser('role') role: Role,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshToken(userId, email, role);

    res.cookie('accessToken', tokens.accessToken, ACCESS_COOKIE_OPTIONS());
    res.cookie('refreshToken', tokens.refreshToken, REFRESH_COOKIE_OPTIONS());

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