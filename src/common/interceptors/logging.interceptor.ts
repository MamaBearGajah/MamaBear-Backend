import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        const { method, originalUrl } = request;
        const startTime = Date.now();

        return next.handle().pipe(
        tap(() => {
            const statusCode = response.statusCode;
            const duration = Date.now() - startTime;

            this.logger.log(
            `${method} ${originalUrl} ${statusCode} - ${duration}ms`,
            );
        }),
        );
    }
}
