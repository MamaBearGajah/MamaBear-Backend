"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const STATUS_TO_CODE = {
    400: 'VALIDATION_ERROR',
    401: 'AUTH_REQUIRED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    409: 'CONFLICT',
    429: 'RATE_LIMITED',
    500: 'INTERNAL_ERROR',
    502: 'EXTERNAL_SERVICE_ERROR',
};
let AllExceptionFilter = AllExceptionFilter_1 = class AllExceptionFilter {
    logger = new common_1.Logger(AllExceptionFilter_1.name);
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : 500;
        const errorCode = STATUS_TO_CODE[status] ?? 'INTERNAL_ERROR';
        let message = 'Internal Server Error';
        let details;
        if (exception instanceof common_1.HttpException) {
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            }
            else if (typeof exceptionResponse === 'object') {
                const res = exceptionResponse;
                if (Array.isArray(res.message)) {
                    message = 'Validasi gagal';
                    details = res.message.map((msg) => ({ message: msg }));
                }
                else {
                    message = res.message ?? exception.message;
                }
            }
        }
        else {
            this.logger.error(`Unhandled exception: ${exception?.message}`, exception?.stack);
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
};
exports.AllExceptionFilter = AllExceptionFilter;
exports.AllExceptionFilter = AllExceptionFilter = AllExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionFilter);
//# sourceMappingURL=all-exception.filter.js.map