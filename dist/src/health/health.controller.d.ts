import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
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
