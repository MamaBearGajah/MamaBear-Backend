import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from "../../prisma/prisma.service";
import { Role } from '../../../generated/prisma/enums';
declare const JwtRefreshStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private prisma;
    constructor(config: ConfigService, prisma: PrismaService);
    validate(req: Request, payload: {
        sub: string;
        email: string;
        role: Role;
    }): Promise<{
        id: string;
        email: string;
        role: Role;
    }>;
}
export {};
