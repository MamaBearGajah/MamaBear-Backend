import {
  Injectable,
  NestMiddleware,
  BadRequestException,
  PayloadTooLargeException,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// ─────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────
const MAX_BODY_SIZE_BYTES = 1 * 1024 * 1024; // 1MB
const ALLOWED_CONTENT_TYPES = ['application/json', 'multipart/form-data', 'application/x-www-form-urlencoded'];

// Characters that could indicate SQL injection or XSS
const DANGEROUS_PATTERNS = [
  /<script\b[^>]*>/i,           // XSS script tag
  /javascript:/i,               // JS protocol
  /on\w+\s*=/i,                 // inline event handlers
  /(\bDROP\b|\bDELETE\b|\bINSERT\b|\bUPDATE\b).+\bFROM\b/i, // SQL injection
  /--\s*$/m,                    // SQL comment
  /;\s*(DROP|DELETE|INSERT|UPDATE|SELECT)\b/i, // SQL chained queries
];

// ─────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────
@Injectable()
export class RequestValidationMiddleware implements NestMiddleware {
  private readonly logger = new Logger(RequestValidationMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    // ── 1. Content-Type check (POST/PUT/PATCH only) ──
    if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
      const contentType = req.headers['content-type']?.split(';')[0].trim();

      if (contentType && !ALLOWED_CONTENT_TYPES.includes(contentType)) {
        this.logger.warn(`Blocked invalid Content-Type: ${contentType} from ${req.ip}`);
        throw new BadRequestException(`Content-Type '${contentType}' tidak didukung`);
      }
    }

    // ── 2. Body size check ──
    const contentLength = parseInt(req.headers['content-length'] ?? '0', 10);
    if (contentLength > MAX_BODY_SIZE_BYTES) {
      this.logger.warn(`Blocked oversized request: ${contentLength} bytes from ${req.ip}`);
      throw new PayloadTooLargeException('Request body terlalu besar (maks 1MB)');
    }

    // ── 3. Sanitize & scan string fields in body ──
    if (req.body && typeof req.body === 'object') {
      try {
        this.scanObject(req.body, req);
      } catch (e) {
        throw e;
      }
    }

    // ── 4. Sanitize query params ──
    if (req.query && typeof req.query === 'object') {
      for (const [key, value] of Object.entries(req.query)) {
        if (typeof value === 'string' && this.isDangerous(value)) {
          this.logger.warn(
            `Dangerous pattern in query param '${key}' from ${req.ip}: ${req.path}`,
          );
          throw new BadRequestException(`Query parameter '${key}' mengandung karakter tidak valid`);
        }
      }
    }

    next();
  }

  // ─────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────
  private scanObject(obj: Record<string, any>, req: Request, depth = 0) {
    if (depth > 5) return; // prevent deep-nest DoS

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        if (this.isDangerous(value)) {
          this.logger.warn(
            `Dangerous pattern in body field '${key}' from ${req.ip}: ${req.path}`,
          );
          throw new BadRequestException(`Field '${key}' mengandung karakter tidak valid`);
        }
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        this.scanObject(value, req, depth + 1);
      } else if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === 'string' && this.isDangerous(item)) {
            throw new BadRequestException(`Field '${key}' mengandung karakter tidak valid`);
          }
        }
      }
    }
  }

  private isDangerous(value: string): boolean {
    return DANGEROUS_PATTERNS.some((pattern) => pattern.test(value));
  }
}