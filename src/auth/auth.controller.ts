import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiTags,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResendVerificationDto,
  ResetPasswordDto,
} from './dto/index.js';
import { JwtAuthGuard, JwtRefreshGuard } from './guards/jwt-auth.guard.js';
import { GetUser, Public } from './decorators/index.js';
import { BadRequestResponseDto, ConflictResponseDto, ForbiddenResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { LoginResponseDto, RegisterResponseDto, TokensResponseDto } from './dto/auth-response.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'User registered successfully. Verification email sent.', type: RegisterResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid input data.', type: BadRequestResponseDto })
  @ApiConflictResponse({ description: 'Email is already registered.', type: ConflictResponseDto })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Get('verify-email/:token')
  @ApiOkResponse({ description: 'Email verified successfully.', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'Token is invalid or has expired.', type: BadRequestResponseDto })
  verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Public()
  @Post('resend-verification')
  @Throttle({ default: { ttl: 60000, limit: 3 } })
  @ApiOkResponse({ description: 'Verification email resent.', type: MessageResponseDto })
  @ApiNotFoundResponse({ description: 'No account found with that email.', type: NotFoundResponseDto })
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto.email);
  }

  @Public()
  @Post('login')
  @Throttle({ default: { ttl: 60000, limit: 5 } })
  @ApiOkResponse({ description: 'Login successful. Returns access and refresh tokens.', type: LoginResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid credentials.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Wrong password.', type: UnauthorizedResponseDto })
  @ApiForbiddenResponse({ description: 'Email not yet verified.', type: ForbiddenResponseDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @ApiOkResponse({ description: 'Tokens refreshed successfully.', type: TokensResponseDto })
  @ApiUnauthorizedResponse({ description: 'Refresh token is invalid or expired.', type: UnauthorizedResponseDto })
  refreshToken(
    @GetUser('sub') userId: string,
    @GetUser('email') email: string,
    @GetUser('role') role: string,
    @GetUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, email, role, refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @ApiOkResponse({ description: 'Logged out successfully.', type: MessageResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  logout(@GetUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @Public()
  @Post('forgot-password')
  @ApiOkResponse({ description: 'Password reset email sent if the account exists.', type: MessageResponseDto })
  @ApiNotFoundResponse({ description: 'No account found with that email.', type: NotFoundResponseDto })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @ApiOkResponse({ description: 'Password reset successfully.', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'Reset token is invalid or has expired.', type: BadRequestResponseDto })
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
