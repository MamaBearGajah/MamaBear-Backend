import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

const STATUS_TO_CODE: Record<number, string> = {
  400: 'VALIDATION_ERROR',
  401: 'AUTH_REQUIRED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  429: 'RATE_LIMITED',
  500: 'INTERNAL_ERROR',
  502: 'EXTERNAL_SERVICE_ERROR',
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const errorCode = STATUS_TO_CODE[status] ?? 'INTERNAL_ERROR';

    let message: string = 'Internal Server Error';
    let details: any[] | undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const res = exceptionResponse as any;

        // ValidationPipe returns array of messages
        if (Array.isArray(res.message)) {
          message = 'Validasi gagal';
          details = res.message.map((msg: string) => ({ message: msg }));
        } else {
          message = res.message ?? exception.message;
        }
      }
    } else {
      // Non-HTTP error (unexpected crash)
      this.logger.error(
        `Unhandled exception: ${exception?.message}`,
        exception?.stack,
      );
      message = 'Terjadi kesalahan pada server';
    }

    response.status(status).json({
      success: false,
      error: {
        code: errorCode,
        message,
        ...(details && { details }),
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}