import type { Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResendVerificationDto, ResetPasswordDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../generated/prisma/enums';
export declare class AuthController {
    private readonly authService;
    private readonly config;
    constructor(authService: AuthService, config: ConfigService);
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
        email: string;
    }>;
    verifyEmail(token: string, res: Response): Promise<void>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        success: boolean;
        data: {
            expiresIn: number;
            user: {
                id: string;
                name: string;
                email: string;
                role: Role;
            };
        };
    }>;
    refreshToken(userId: string, email: string, role: Role, res: Response): Promise<{
        success: boolean;
        message: string;
    }>;
    logout(userId: string, res: Response): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
