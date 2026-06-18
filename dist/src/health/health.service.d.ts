import { PrismaService } from "../prisma/prisma.service";
export declare class HealthService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    check(): Promise<{
        status: string;
        timestamp: string;
        uptime: number;
        services: {
            db: {
                status: string;
                latency: string;
            };
        };
    }>;
    checkDatabase(): Promise<{
        status: string;
        latency: string;
    }>;
}
