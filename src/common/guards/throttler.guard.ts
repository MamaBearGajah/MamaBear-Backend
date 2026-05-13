import { ExecutionContext, Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    protected async getTracker(req: Record<string, any>): Promise<string> {
        return req.ip;
    }

    protected async handleRequest(requestProps: any): Promise<boolean> {
        const {
        context,
        limit,
        ttl,
        throttler,
        blockDuration,
        generateKey,
        } = requestProps;

        const request = context.switchToHttp().getRequest();

        if (
        request.route?.path?.includes('login') ||
        request.route?.path?.includes('register')
        ) {
        requestProps.limit = 5;
        }

        return super.handleRequest({
        context,
        limit: requestProps.limit || limit,
        ttl,
        throttler,
        blockDuration,
        generateKey,
        getTracker: this.getTracker.bind(this),
        });
    }
}
