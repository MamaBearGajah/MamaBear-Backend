import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import { cleanDatabase, createVerifiedUser, createUnverifiedUser, testPrisma } from '../../../test/prisma-test-helper';
import * as crypto from 'crypto';

// ─────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────
function findCookie(headers: Record<string, any>, name: string): string | undefined {
  const raw = headers['set-cookie'];
  const list: string[] = Array.isArray(raw) ? raw : [raw ?? ''];
  return list.find((c) => c.startsWith(`${name}=`));
}

describe('Auth Endpoints (Integration)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.use(cookieParser());
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  // ─────────────────────────────────────────────
  // POST /api/auth/register
  // ─────────────────────────────────────────────
  describe('POST /api/auth/register', () => {
    const validPayload = {
      name: 'Test User',
      email: 'register@example.com',
      password: 'Password123!',
    };

    it('201 — should register a new user', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/register')
        .send(validPayload)
        .expect(201);

      expect(res.body).toMatchObject({
        message: expect.stringContaining('Registrasi berhasil'),
        email: validPayload.email,
      });
    });

    it('409 — should reject duplicate email', async () => {
      await createVerifiedUser({ email: validPayload.email });

      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send(validPayload)
        .expect(409);
    });

    it('400 — should reject missing name', async () => {
      const { name: _, ...noName } = validPayload;
      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send(noName)
        .expect(400);
    });

    it('400 — should reject weak password', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({ ...validPayload, password: '123' })
        .expect(400);
    });

    it('400 — should reject invalid email format', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({ ...validPayload, email: 'not-an-email' })
        .expect(400);
    });

    it('400 — should reject extra unknown fields', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/register')
        .send({ ...validPayload, hackerField: 'value' })
        .expect(400);
    });
  });

  // ─────────────────────────────────────────────
  // GET /api/auth/verify-email
  // ─────────────────────────────────────────────
  describe('GET /api/auth/verify-email', () => {
    it('302 — should redirect to success URL on valid token', async () => {
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

      const user = await createUnverifiedUser('verify@example.com');
      await testPrisma.user.update({
        where: { id: user.id },
        data: {
          verifyToken: hashedToken,
          verifyTokenExp: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      const res = await request(app.getHttpServer())
        .get(`/api/auth/verify-email?token=${rawToken}`)
        .expect(302);

      expect(res.headers.location).toContain('status=success');

      const updated = await testPrisma.user.findUnique({ where: { id: user.id } });
      expect(updated?.isVerified).toBe(true);
      expect(updated?.verifyToken).toBeNull();
    });

    it('302 — should redirect to failed URL on invalid token', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/auth/verify-email?token=invalid-garbage')
        .expect(302);

      expect(res.headers.location).toContain('status=failed');
    });

    it('302 — should redirect to failed URL on expired token', async () => {
      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

      const user = await createUnverifiedUser('expired@example.com');
      await testPrisma.user.update({
        where: { id: user.id },
        data: {
          verifyToken: hashedToken,
          verifyTokenExp: new Date(Date.now() - 1000),
        },
      });

      const res = await request(app.getHttpServer())
        .get(`/api/auth/verify-email?token=${rawToken}`)
        .expect(302);

      expect(res.headers.location).toContain('status=failed');
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/auth/login
  // ─────────────────────────────────────────────
  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await createVerifiedUser({ email: 'login@example.com', password: 'Password123!' });
    });

    it('200 — should set accessToken and refreshToken as HTTP-only cookies', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'Password123!' })
        .expect(200);

      // ✅ Sesuai implementasi: token di cookie, BUKAN di body
      expect(res.body.data.accessToken).toBeUndefined();
      expect(res.body.data.refreshToken).toBeUndefined();

      // ✅ Token ada di cookie
      const accessCookie = findCookie(res.headers, 'accessToken');
      const refreshCookie = findCookie(res.headers, 'refreshToken');

      expect(accessCookie).toBeDefined();
      expect(accessCookie).toContain('HttpOnly');

      expect(refreshCookie).toBeDefined();
      expect(refreshCookie).toContain('HttpOnly');
      expect(refreshCookie).toContain('Path=/api/auth');

      // ✅ Body hanya berisi user dan expiresIn
      expect(res.body.data.expiresIn).toBe(900);
      expect(res.body.data.user).toMatchObject({
        email: 'login@example.com',
      });
    });

    // ✅ Sesuai implementasi terbaru: email tidak ditemukan → 404
    it('404 — should return 404 for unregistered email', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'ghost@example.com', password: 'Password123!' })
        .expect(404);
    });

    // ✅ Sesuai implementasi terbaru: password salah → 401
    it('401 — should reject wrong password', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'WrongPassword!' })
        .expect(401);
    });

    it('401 — should reject unverified account', async () => {
      await createUnverifiedUser('unverified@example.com');

      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'unverified@example.com', password: 'Password123!' })
        .expect(401);
    });

    // ✅ Update: implementasi terbaru sengaja beda pesan untuk UX
    it('should return different error messages for unregistered email vs wrong password', async () => {
      const noUser = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'ghost@example.com', password: 'Password123!' });

      const wrongPass = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'login@example.com', password: 'WrongPassword!' });

      expect(noUser.body.message).toBe('Email belum terdaftar');
      expect(wrongPass.body.message).toBe('Password salah');
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/auth/refresh
  // ─────────────────────────────────────────────
  describe('POST /api/auth/refresh', () => {
    it('200 — should issue new cookies using refresh cookie', async () => {
      await createVerifiedUser({ email: 'refresh@example.com', password: 'Password123!' });

      const loginRes = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'refresh@example.com', password: 'Password123!' });

      const cookies = loginRes.headers['set-cookie'];

      const refreshRes = await request(app.getHttpServer())
        .post('/api/auth/refresh')
        .set('Cookie', Array.isArray(cookies) ? cookies : [cookies])
        .expect(200);

      // ✅ Token tidak di body
      expect(refreshRes.body.data?.accessToken).toBeUndefined();
      expect(refreshRes.body.data?.refreshToken).toBeUndefined();

      // ✅ New cookies issued (token rotation)
      const newAccessCookie = findCookie(refreshRes.headers, 'accessToken');
      const newRefreshCookie = findCookie(refreshRes.headers, 'refreshToken');
      expect(newAccessCookie).toBeDefined();
      expect(newRefreshCookie).toBeDefined();
    });

    it('401 — should reject request without cookie', async () => {
      await request(app.getHttpServer()).post('/api/auth/refresh').expect(401);
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/auth/logout
  // ─────────────────────────────────────────────
  describe('POST /api/auth/logout', () => {
    it('200 — should logout and clear cookies', async () => {
      await createVerifiedUser({ email: 'logout@example.com', password: 'Password123!' });

      const loginRes = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'logout@example.com', password: 'Password123!' });

      const cookies = loginRes.headers['set-cookie'];

      const logoutRes = await request(app.getHttpServer())
        .post('/api/auth/logout')
        .set('Cookie', Array.isArray(cookies) ? cookies : [cookies])
        .expect(200);

      // ✅ Cookies cleared
      const clearedAccess = findCookie(logoutRes.headers, 'accessToken');
      const clearedRefresh = findCookie(logoutRes.headers, 'refreshToken');
      expect(clearedAccess).toContain('Expires=Thu, 01 Jan 1970');
      expect(clearedRefresh).toContain('Expires=Thu, 01 Jan 1970');
    });

    it('401 — should reject unauthenticated request', async () => {
      await request(app.getHttpServer()).post('/api/auth/logout').expect(401);
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/auth/forgot-password
  // ─────────────────────────────────────────────
  describe('POST /api/auth/forgot-password', () => {
    it('200 — should always return same message regardless of email existence', async () => {
      await createVerifiedUser({ email: 'forgot@example.com' });

      const withUser = await request(app.getHttpServer())
        .post('/api/auth/forgot-password')
        .send({ email: 'forgot@example.com' })
        .expect(200);

      const withoutUser = await request(app.getHttpServer())
        .post('/api/auth/forgot-password')
        .send({ email: 'ghost@example.com' })
        .expect(200);

      expect(withUser.body.message).toBe(withoutUser.body.message);
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/auth/reset-password
  // ─────────────────────────────────────────────
  describe('POST /api/auth/reset-password', () => {
    it('200 — should reset password with valid token', async () => {
      const user = await createVerifiedUser({
        email: 'reset@example.com',
        password: 'OldPass123!',
      });

      const rawToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

      await testPrisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: hashedToken,
          resetTokenExp: new Date(Date.now() + 1000 * 60 * 60),
        },
      });

      await request(app.getHttpServer())
        .post('/api/auth/reset-password')
        .send({ token: rawToken, newPassword: 'NewPassword123!' })
        .expect(200);

      // Verify can now login with new password
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'reset@example.com', password: 'NewPassword123!' })
        .expect(200);
    });

    it('400 — should reject invalid token', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/reset-password')
        .send({ token: 'fake-token', newPassword: 'NewPassword123!' })
        .expect(400);
    });
  });
});