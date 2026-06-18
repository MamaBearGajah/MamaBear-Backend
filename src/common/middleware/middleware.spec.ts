import { BadRequestException, PayloadTooLargeException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RequestValidationMiddleware } from './request-validation.middleware';
import { AuthMiddleware, AdminMiddleware, OptionalAuthMiddleware } from './auth.middleware';

// ─────────────────────────────────────────────
// Mock factories
// ─────────────────────────────────────────────
const mockRes = {} as any;
const next = jest.fn();

function makeReq(overrides: Partial<any> = {}): any {
  return {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: {},
    query: {},
    ip: '127.0.0.1',
    path: '/api/test',
    ...overrides,
  };
}

// ─────────────────────────────────────────────
// RequestValidationMiddleware
// ─────────────────────────────────────────────
describe('RequestValidationMiddleware', () => {
  let middleware: RequestValidationMiddleware;

  beforeEach(() => {
    middleware = new RequestValidationMiddleware();
    jest.clearAllMocks();
  });

  it('should call next() for valid requests', () => {
    const req = makeReq({ body: { email: 'test@example.com', password: 'Pass123!' } });
    middleware.use(req, mockRes, next);
    expect(next).toHaveBeenCalled();
  });

  it('should reject unsupported Content-Type', () => {
    const req = makeReq({ headers: { 'content-type': 'text/xml' } });
    expect(() => middleware.use(req, mockRes, next)).toThrow(BadRequestException);
  });

  it('should reject oversized Content-Length header', () => {
    const req = makeReq({
      headers: { 'content-type': 'application/json', 'content-length': String(2 * 1024 * 1024) },
    });
    expect(() => middleware.use(req, mockRes, next)).toThrow(PayloadTooLargeException);
  });

  it('should reject body with XSS script tag', () => {
    const req = makeReq({ body: { name: '<script>alert(1)</script>' } });
    expect(() => middleware.use(req, mockRes, next)).toThrow(BadRequestException);
  });

  it('should reject body with SQL injection pattern', () => {
    const req = makeReq({ body: { name: "'; DROP TABLE users; --" } });
    expect(() => middleware.use(req, mockRes, next)).toThrow(BadRequestException);
  });

  it('should reject dangerous query params', () => {
    const req = makeReq({ query: { search: '<script>alert(1)</script>' } });
    expect(() => middleware.use(req, mockRes, next)).toThrow(BadRequestException);
  });

  it('should allow GET requests without Content-Type', () => {
    const req = makeReq({ method: 'GET', headers: {} });
    middleware.use(req, mockRes, next);
    expect(next).toHaveBeenCalled();
  });

  it('should scan nested object fields', () => {
    const req = makeReq({ body: { address: { city: '<script>xss</script>' } } });
    expect(() => middleware.use(req, mockRes, next)).toThrow(BadRequestException);
  });
});

// ─────────────────────────────────────────────
// AuthMiddleware
// ─────────────────────────────────────────────
describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;
  let prisma: any;

  const mockUser = { id: 'u1', email: 'test@example.com', role: 'customer', isVerified: true };

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() } as any;
    configService = { getOrThrow: jest.fn().mockReturnValue('secret') } as any;
    prisma = { user: { findUnique: jest.fn().mockResolvedValue(mockUser) } };
    middleware = new AuthMiddleware(jwtService, configService, prisma);
    jest.clearAllMocks();
  });

  it('should attach user to req and call next() with valid token', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 'u1', email: 'test@example.com', role: 'customer' });
    const req = makeReq({ headers: { authorization: 'Bearer valid-token' } });

    await middleware.use(req, mockRes, next);

    expect(req.currentUser).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if no token', async () => {
    const req = makeReq({ headers: {} });
    await expect(middleware.use(req, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid signature'));
    const req = makeReq({ headers: { authorization: 'Bearer bad-token' } });
    await expect(middleware.use(req, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user no longer exists in DB', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 'ghost-id' });
    prisma.user.findUnique.mockResolvedValue(null);
    const req = makeReq({ headers: { authorization: 'Bearer valid-token' } });
    await expect(middleware.use(req, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if user is not verified', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 'u1' });
    prisma.user.findUnique.mockResolvedValue({ ...mockUser, isVerified: false });
    const req = makeReq({ headers: { authorization: 'Bearer valid-token' } });
    await expect(middleware.use(req, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });
});

// ─────────────────────────────────────────────
// AdminMiddleware
// ─────────────────────────────────────────────
describe('AdminMiddleware', () => {
  let middleware: AdminMiddleware;

  beforeEach(() => {
    middleware = new AdminMiddleware();
    jest.clearAllMocks();
  });

  it('should call next() for ADMIN user', async () => {
    const req = makeReq({ currentUser: { id: 'u1', role: 'admin' } });
    await middleware.use(req, mockRes, next);
    expect(next).toHaveBeenCalled();
  });

  it('should throw ForbiddenException for USER role', async () => {
    const req = makeReq({ currentUser: { id: 'u1', role: 'customer' } });
    await expect(middleware.use(req, mockRes, next)).rejects.toThrow(ForbiddenException);
  });

  it('should throw UnauthorizedException if req.currentUser is missing', async () => {
    const req = makeReq({ currentUser: undefined });
    await expect(middleware.use(req, mockRes, next)).rejects.toThrow(UnauthorizedException);
  });
});

// ─────────────────────────────────────────────
// OptionalAuthMiddleware
// ─────────────────────────────────────────────
describe('OptionalAuthMiddleware', () => {
  let middleware: OptionalAuthMiddleware;
  let jwtService: jest.Mocked<JwtService>;
  let configService: jest.Mocked<ConfigService>;
  let prisma: any;

  const mockUser = { id: 'u1', email: 'test@example.com', role: 'customer', isVerified: true };

  beforeEach(() => {
    jwtService = { verifyAsync: jest.fn() } as any;
    configService = { getOrThrow: jest.fn().mockReturnValue('secret') } as any;
    prisma = { user: { findUnique: jest.fn().mockResolvedValue(mockUser) } };
    middleware = new OptionalAuthMiddleware(jwtService, configService, prisma);
    jest.clearAllMocks();
  });

  it('should attach user and call next() with valid token', async () => {
    jwtService.verifyAsync.mockResolvedValue({ sub: 'u1' });
    const req = makeReq({ headers: { authorization: 'Bearer valid-token' } });
    await middleware.use(req, mockRes, next);
    expect(req.currentUser).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
  });

  it('should call next() without attaching user when no token present', async () => {
    const req = makeReq({ headers: {} });
    await middleware.use(req, mockRes, next);
    expect(req.currentUser).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  it('should call next() without throwing even if token is invalid', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('expired'));
    const req = makeReq({ headers: { authorization: 'Bearer bad-token' } });
    await middleware.use(req, mockRes, next); // must NOT throw
    expect(req.currentUser).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });
});