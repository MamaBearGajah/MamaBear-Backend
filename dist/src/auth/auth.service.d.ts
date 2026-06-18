import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "../prisma/prisma.service";
import { MailService } from "../mail/mail.service";
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto';
import { Role } from '../../generated/prisma/enums';
export declare class AuthService {
    private prisma;
    private config;
    private jwtService;
    private mailService;
    constructor(prisma: PrismaService, config: ConfigService, jwtService: JwtService, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        message: string;
        userId: string;
        email: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerification(email: string): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        user: {
            id: string;
            name: string;
            email: string;
            role: Role;
        };
    }>;
    refreshToken(userId: string, email: string, role: Role): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    private generateTokens;
    private updateRefreshToken;
    private sendVerificationEmail;
    private hashToken;
}
