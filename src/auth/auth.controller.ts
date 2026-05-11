import {
  Controller, Post, Body, Get,
  Query, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse,
  ApiBearerAuth, ApiQuery,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto, LoginDto, RegisterDto,
  ResendVerificationDto, ResetPasswordDto,
} from './dto';
import { JwtAuthGuard, JwtRefreshGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register akun baru' })
  @ApiResponse({ status: 201, description: 'Registrasi berhasil' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Verifikasi email via token' })
  @ApiQuery({ name: 'token', required: true, description: 'Token verifikasi dari email' })
  @ApiResponse({ status: 200, description: 'Email berhasil diverifikasi' })
  @ApiResponse({ status: 400, description: 'Token tidak valid atau expired' })
  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @ApiOperation({ summary: 'Kirim ulang email verifikasi' })
  @ApiResponse({ status: 200, description: 'Email verifikasi berhasil dikirim' })
  @ApiResponse({ status: 400, description: 'Validasi gagal' })
  @ApiResponse({ status: 404, description: 'Email tidak ditemukan' })
  @Post('resend-verification')
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @ApiOperation({ summary: 'Login dan dapatkan access token' })
  @ApiResponse({ status: 200, description: 'Login berhasil, token dikembalikan' })
  @ApiResponse({ status: 401, description: 'Email atau password salah' })
  @ApiResponse({ status: 403, description: 'Email belum diverifikasi' })
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Refresh access token menggunakan refresh token' })
  @ApiResponse({ status: 200, description: 'Token baru berhasil dibuat' })
  @ApiResponse({ status: 401, description: 'Refresh token tidak valid' })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refreshToken(
    @GetUser('sub') userId: string,
    @GetUser('email') email: string,
    @GetUser('role') role: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, email, role, refreshToken);
  }

  @ApiOperation({ summary: 'Logout dan hapus refresh token' })
  @ApiResponse({ status: 200, description: 'Logout berhasil' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@GetUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @ApiOperation({ summary: 'Request reset password via email' })
  @ApiResponse({ status: 200, description: 'Email reset password berhasil dikirim' })
  @ApiResponse({ status: 404, description: 'Email tidak ditemukan' })
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @ApiOperation({ summary: 'Reset password menggunakan token' })
  @ApiResponse({ status: 200, description: 'Password berhasil direset' })
  @ApiResponse({ status: 400, description: 'Token tidak valid atau expired' })
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}