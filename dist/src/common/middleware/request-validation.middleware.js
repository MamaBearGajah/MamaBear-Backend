"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RequestValidationMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const MAX_BODY_SIZE_BYTES = 1 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = ['application/json', 'multipart/form-data', 'application/x-www-form-urlencoded'];
const DANGEROUS_PATTERNS = [
    /<script\b[^>]*>/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /(\bDROP\b|\bDELETE\b|\bINSERT\b|\bUPDATE\b).+\bFROM\b/i,
    /--\s*$/m,
    /;\s*(DROP|DELETE|INSERT|UPDATE|SELECT)\b/i,
];
let RequestValidationMiddleware = RequestValidationMiddleware_1 = class RequestValidationMiddleware {
    logger = new common_1.Logger(RequestValidationMiddleware_1.name);
    use(req, res, next) {
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            const contentType = req.headers['content-type']?.split(';')[0].trim();
            if (contentType && !ALLOWED_CONTENT_TYPES.includes(contentType)) {
                this.logger.warn(`Blocked invalid Content-Type: ${contentType} from ${req.ip}`);
                throw new common_1.BadRequestException(`Content-Type '${contentType}' tidak didukung`);
            }
        }
        const contentLength = parseInt(req.headers['content-length'] ?? '0', 10);
        if (contentLength > MAX_BODY_SIZE_BYTES) {
            this.logger.warn(`Blocked oversized request: ${contentLength} bytes from ${req.ip}`);
            throw new common_1.PayloadTooLargeException('Request body terlalu besar (maks 1MB)');
        }
        if (req.body && typeof req.body === 'object') {
            try {
                this.scanObject(req.body, req);
            }
            catch (e) {
                throw e;
            }
        }
        if (req.query && typeof req.query === 'object') {
            for (const [key, value] of Object.entries(req.query)) {
                if (typeof value === 'string' && this.isDangerous(value)) {
                    this.logger.warn(`Dangerous pattern in query param '${key}' from ${req.ip}: ${req.path}`);
                    throw new common_1.BadRequestException(`Query parameter '${key}' mengandung karakter tidak valid`);
                }
            }
        }
        next();
    }
    scanObject(obj, req, depth = 0) {
        if (depth > 5)
            return;
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'string') {
                if (this.isDangerous(value)) {
                    this.logger.warn(`Dangerous pattern in body field '${key}' from ${req.ip}: ${req.path}`);
                    throw new common_1.BadRequestException(`Field '${key}' mengandung karakter tidak valid`);
                }
            }
            else if (value && typeof value === 'object' && !Array.isArray(value)) {
                this.scanObject(value, req, depth + 1);
            }
            else if (Array.isArray(value)) {
                for (const item of value) {
                    if (typeof item === 'string' && this.isDangerous(item)) {
                        throw new common_1.BadRequestException(`Field '${key}' mengandung karakter tidak valid`);
                    }
                }
            }
        }
    }
    isDangerous(value) {
        return DANGEROUS_PATTERNS.some((pattern) => pattern.test(value));
    }
};
exports.RequestValidationMiddleware = RequestValidationMiddleware;
exports.RequestValidationMiddleware = RequestValidationMiddleware = RequestValidationMiddleware_1 = __decorate([
    (0, common_1.Injectable)()
], RequestValidationMiddleware);
//# sourceMappingURL=request-validation.middleware.js.map