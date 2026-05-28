import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Sudah di-wrap manual (misal auth login) — skip
        if (data && typeof data === 'object' && 'success' in data) {
          return data;
        }

        // Paginated response: { data: [...], meta: {...} }
        if (
          data &&
          typeof data === 'object' &&
          'data' in data &&
          'meta' in data
        ) {
          return {
            success: true,
            data: data.data,
            meta: data.meta,
          };
        }

        // Default
        return {
          success: true,
          data,
        };
      }),
    );
  }
}