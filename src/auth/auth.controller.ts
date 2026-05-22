import {
  Controller, Post, Body, Get,
  Query, HttpCode, HttpStatus, UseGuards, Res,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiQuery,
} from '@nestjs/swagger';
// FIX 1: pakai 'import type' agar tidak error dengan isolatedModules + emitDecoratorMetadata
import type { Response } from 'express';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto, LoginDto, RegisterDto,
  ResendVerificationDto, ResetPasswordDto,
} from './dto';
import { JwtAuthGuard, JwtRefreshGuard } from './guards/jwt-auth.guard';
import { GetUser, Public } from './decorators';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  // FIX 2: inject ConfigService untuk akses FRONTEND_URL di verifyEmail
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @ApiOperation({ summary: 'Register akun baru' })
  @ApiResponse({ status: 201, description: 'Registrasi berhasil' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @ApiOperation({ summary: 'Verifikasi email via token — redirect ke frontend' })
  @ApiQuery({ name: 'token', required: true, description: 'Token verifikasi dari email' })
  @ApiResponse({ status: 302, description: 'Redirect ke halaman hasil verifikasi' })
  @Get('verify-email')
  async verifyEmail(
    @Query('token') token: string,
    // FIX 3: verifyEmail pakai @Res() tanpa passthrough karena manual redirect
    @Res() res: Response,
  ) {
    const frontendUrl = this.config.get('FRONTEND_URL') || 'http://localhost:3001';
    try {
      await this.authService.verifyEmail(token);
      return res.redirect(`${frontendUrl}/email-verified?status=success`);
    } catch {
      return res.redirect(`${frontendUrl}/email-verified?status=failed`);
    }
  }

  @Public()
  @ApiOperation({ summary: 'Kirim ulang email verifikasi' })
  @ApiResponse({ status: 200, description: 'Email verifikasi berhasil dikirim' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 404, description: 'Email tidak ditemukan' })
  @Post('resend-verification')
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @Public()
  @ApiOperation({ summary: 'Login — accessToken di body, refreshToken di HTTP-only cookie' })
  @ApiResponse({ status: 200, description: 'Login berhasil' })
  @ApiResponse({ status: 401, description: 'Email atau password salah' })
  @ApiResponse({ status: 403, description: 'Email belum diverifikasi' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
      path: '/api/auth',
    });

    const { refreshToken: _, ...response } = result;
    return response;
  }

  @ApiOperation({ summary: 'Refresh access token menggunakan refresh token dari cookie' })
  @ApiResponse({ status: 200, description: 'Token baru berhasil dibuat' })
  @ApiResponse({ status: 401, description: 'Refresh token tidak valid' })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refreshToken(
    @GetUser('sub') userId: string,
    @GetUser('email') email: string,
    @GetUser('role') role: string,
    @GetUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.refreshToken(userId, email, role, refreshToken);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/api/auth',
    });

    const { refreshToken: _, ...response } = result;
    return response;
  }

  @ApiOperation({ summary: 'Logout — hapus refresh token dan clear cookie' })
  @ApiResponse({ status: 200, description: 'Logout berhasil' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(
    @GetUser('sub') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refreshToken', { path: '/api/auth' });
    return this.authService.logout(userId);
  }

  @Public()
  @ApiOperation({ summary: 'Request reset password via email' })
  @ApiResponse({ status: 200, description: 'Email reset password berhasil dikirim' })
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @ApiOperation({ summary: 'Reset password menggunakan token' })
  @ApiResponse({ status: 200, description: 'Password berhasil direset' })
  @ApiResponse({ status: 400, description: 'Token tidak valid atau expired' })
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}