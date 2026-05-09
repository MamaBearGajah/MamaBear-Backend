import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResendVerificationDto,
  ResetPasswordDto,
} from './dto';
import { JwtAuthGuard, JwtRefreshGuard } from './guards/jwt-auth.guard';
import { GetUser } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ─────────────────────────────────────────────
  // POST /auth/register
  // ─────────────────────────────────────────────
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // ─────────────────────────────────────────────
  // GET /auth/verify-email?token=...
  // ─────────────────────────────────────────────
  @Get('verify-email')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // ─────────────────────────────────────────────
  // POST /auth/resend-verification
  // ─────────────────────────────────────────────
  @Post('resend-verification')
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  // ─────────────────────────────────────────────
  // POST /auth/login
  // ─────────────────────────────────────────────
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // ─────────────────────────────────────────────
  // POST /auth/refresh
  // Protected by JWT Refresh Guard
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // POST /auth/logout
  // Protected by JWT Access Guard
  // ─────────────────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@GetUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  // ─────────────────────────────────────────────
  // POST /auth/forgot-password
  // ─────────────────────────────────────────────
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  // ─────────────────────────────────────────────
  // POST /auth/reset-password
  // ─────────────────────────────────────────────
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}