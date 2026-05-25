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

// ─────────────────────────────────────────────
// Cookie option helpers
// ─────────────────────────────────────────────
const ACCESS_COOKIE_OPTIONS = (isProduction: boolean) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict' as const,
  maxAge: 15 * 60 * 1000,         // 15 menit
  path: '/',
});

const REFRESH_COOKIE_OPTIONS = (isProduction: boolean) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: 'strict' as const,
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

  @Public()
  @Post('resend-verification')
  @ApiOperation({ summary: 'Kirim ulang email verifikasi' })
  @ApiResponse({ status: 200, description: 'Email verifikasi berhasil dikirim' })
  @ApiResponse({ status: 404, description: 'Email tidak ditemukan' })
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login — semua token di HTTP-only cookie' })
  @ApiResponse({ status: 200, description: 'Login berhasil' })
  @ApiResponse({ status: 401, description: 'Email atau password salah' })
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto);
    const isProduction = process.env.NODE_ENV === 'production';

    // ✅ accessToken di cookie
    res.cookie('accessToken', result.tokens.accessToken, ACCESS_COOKIE_OPTIONS(isProduction));

    // ✅ refreshToken di cookie
    res.cookie('refreshToken', result.tokens.refreshToken, REFRESH_COOKIE_OPTIONS(isProduction));

    // ✅ response body hanya data user
    return result.user;
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token menggunakan cookie' })
  @ApiResponse({ status: 200, description: 'Token baru berhasil dibuat' })
  @ApiResponse({ status: 401, description: 'Refresh token tidak valid' })
  async refreshToken(
    @GetUser('sub') userId: string,
    @GetUser('email') email: string,
    @GetUser('role') role: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.refreshToken(userId, email, role);
    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('accessToken', tokens.accessToken, ACCESS_COOKIE_OPTIONS(isProduction));
    res.cookie('refreshToken', tokens.refreshToken, REFRESH_COOKIE_OPTIONS(isProduction));

    return { message: 'Token berhasil diperbarui' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout — hapus semua cookie' })
  @ApiResponse({ status: 200, description: 'Logout berhasil' })
  async logout(
    @GetUser('sub') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/api/auth' });
    return this.authService.logout(userId);
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({ summary: 'Request reset password via email' })
  @ApiResponse({ status: 200, description: 'Email reset password berhasil dikirim' })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password menggunakan token' })
  @ApiResponse({ status: 200, description: 'Password berhasil direset' })
  @ApiResponse({ status: 400, description: 'Token tidak valid atau expired' })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}