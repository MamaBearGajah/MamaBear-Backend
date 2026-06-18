import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "../../prisma/prisma.service";
export interface AuthenticatedUser {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
}
export interface AppRequest extends Request {
    currentUser?: AuthenticatedUser;
}
export declare class AuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly config;
    private readonly prisma;
    private readonly logger;
    constructor(jwtService: JwtService, config: ConfigService, prisma: PrismaService);
    use(req: AppRequest, res: Response, next: NextFunction): Promise<void>;
    private extractToken;
}
export declare class AdminMiddleware implements NestMiddleware {
    use(req: AppRequest, res: Response, next: NextFunction): Promise<void>;
}
export declare class SuperAdminMiddleware implements NestMiddleware {
    use(req: AppRequest, res: Response, next: NextFunction): Promise<void>;
}
export declare class CustomerMiddleware implements NestMiddleware {
    use(req: AppRequest, res: Response, next: NextFunction): Promise<void>;
}
export declare class OptionalAuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly config;
    private readonly prisma;
    constructor(jwtService: JwtService, config: ConfigService, prisma: PrismaService);
    use(req: AppRequest, res: Response, next: NextFunction): Promise<void>;
}
