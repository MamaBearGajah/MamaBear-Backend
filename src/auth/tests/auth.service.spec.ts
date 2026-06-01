jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-value'),
  compare: jest.fn().mockResolvedValue(true),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';

// ─────────────────────────────────────────────
// Shared mock factory
// ─────────────────────────────────────────────
const mockUser = {
  id: 'user-id-123',
  name: 'Test User',
  email: 'test@example.com',
  password: '$2b$10$hashedpassword',
  role: 'customer',
  isVerified: true,
  bannedAt: null,
  deletedAt: null,
  refreshToken: null,
  verifyToken: null,
  verifyTokenExp: null,
  resetToken: null,
  resetTokenExp: null,
};

const makePrisma = () => ({
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
});

const makeJwt = () => ({
  signAsync: jest.fn().mockResolvedValue('mock-token'),
});

const makeConfig = () => ({
  getOrThrow: jest.fn().mockReturnValue('test-secret'),
  get: jest.fn().mockReturnValue('http://localhost:3001'),
});

const makeMail = () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  sendResetPasswordEmail: jest.fn().mockResolvedValue(undefined),
});

// ─────────────────────────────────────────────
// Test Suite
// ─────────────────────────────────────────────
describe('AuthService', () => {
  let service: AuthService;
  let prisma: ReturnType<typeof makePrisma>;
  let mailService: ReturnType<typeof makeMail>;

  beforeEach(async () => {
    prisma = makePrisma();
    const jwtService = makeJwt();
    mailService = makeMail();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
        { provide: ConfigService, useValue: makeConfig() },
        { provide: MailService, useValue: mailService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => jest.clearAllMocks());

  // ─────────────────────────────────────────────
  // REGISTER
  // ─────────────────────────────────────────────
  describe('register()', () => {
    const dto = { name: 'Test User', email: 'test@example.com', password: 'Password123!' };

    it('should register user and send verification email', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue(mockUser);

      const result = await service.register(dto);

      expect(prisma.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ email: dto.email, name: dto.name }),
        }),
      );
      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        mockUser.email,
        expect.any(String),
      );
      expect(result).toMatchObject({
        message: expect.stringContaining('Registrasi berhasil'),
        userId: mockUser.id,
        email: mockUser.email,
      });
    });

    it('should hash password before saving', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue(mockUser);

      await service.register(dto);

      expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
    });

    it('should throw ConflictException if email already registered', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      await expect(service.register(dto)).rejects.toThrow(ConflictException);
    });

    it('should still return success even if email sending fails', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue(mockUser);
      mailService.sendVerificationEmail.mockRejectedValue(new Error('SMTP error'));

      await expect(service.register(dto)).resolves.toBeDefined();
    });
  });

  // ─────────────────────────────────────────────
  // VERIFY EMAIL
  // ─────────────────────────────────────────────
  describe('verifyEmail()', () => {
    it('should verify email with valid token', async () => {
      prisma.user.findFirst.mockResolvedValue({ ...mockUser, isVerified: false });
      prisma.user.update.mockResolvedValue({ ...mockUser, isVerified: true });

      const result = await service.verifyEmail('valid-raw-token');

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            isVerified: true,
            verifyToken: null,
            verifyTokenExp: null,
          }),
        }),
      );
      expect(result).toEqual({ message: 'Email berhasil diverifikasi' });
    });

    it('should throw BadRequestException for invalid/expired token', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.verifyEmail('invalid-token')).rejects.toThrow(BadRequestException);
    });
  });

  // ─────────────────────────────────────────────
  // RESEND VERIFICATION
  // ─────────────────────────────────────────────
  describe('resendVerification()', () => {
    it('should resend verification email to unverified user', async () => {
      const unverifiedUser = { ...mockUser, isVerified: false };
      prisma.user.findUnique.mockResolvedValue(unverifiedUser);
      prisma.user.update.mockResolvedValue(unverifiedUser);

      const result = await service.resendVerification(unverifiedUser.email);

      expect(mailService.sendVerificationEmail).toHaveBeenCalledWith(
        unverifiedUser.email,
        expect.any(String),
      );
      expect(result.message).toContain('dikirim ulang');
    });

    // FIX: Service tidak lagi throw NotFoundException — silent return untuk cegah user enumeration
    it('should return generic message if user does not exist (no enumeration)', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await service.resendVerification('ghost@example.com');

      expect(result.message).toBeDefined();
      expect(mailService.sendVerificationEmail).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if email already verified', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...mockUser, isVerified: true });

      await expect(service.resendVerification(mockUser.email)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  // ─────────────────────────────────────────────
  // LOGIN
  // ─────────────────────────────────────────────
  describe('login()', () => {
    const dto = { email: 'test@example.com', password: 'Password123!' };

    beforeEach(() => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-refresh-token');
      prisma.user.update.mockResolvedValue(mockUser);
    });

    it('should return tokens and user info on valid credentials', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.login(dto);

      expect(result.tokens).toMatchObject({
        accessToken: 'mock-token',
        refreshToken: 'mock-token',
      });
      expect(result.user).toMatchObject({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
      });
    });

    it('should save hashed refresh token to DB', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);

      await service.login(dto);

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ refreshToken: 'hashed-refresh-token' }),
        }),
      );
    });

    // FIX: Email tidak ditemukan → UnauthorizedException (bukan NotFoundException)
    // Pesan digabung untuk mencegah user enumeration
    it('should throw UnauthorizedException if email is not registered', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // dummy hash tidak cocok

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    // FIX: Password salah → UnauthorizedException dengan pesan yang sama
    it('should throw UnauthorizedException if password is wrong', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    // FIX: Unverified → ForbiddenException (bukan UnauthorizedException)
    it('should throw ForbiddenException if account is not verified', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...mockUser, isVerified: false });

      await expect(service.login(dto)).rejects.toThrow(ForbiddenException);
    });

    it('should throw UnauthorizedException if account is banned', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...mockUser, bannedAt: new Date() });

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if account is soft-deleted', async () => {
      prisma.user.findUnique.mockResolvedValue({ ...mockUser, deletedAt: new Date() });

      await expect(service.login(dto)).rejects.toThrow(UnauthorizedException);
    });

    // FIX: Kedua kasus sekarang throw UnauthorizedException dengan pesan yang SAMA
    // (by design — mencegah user enumeration)
    it('should return same error message for missing email and wrong password', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      let notFoundMessage = '';
      try { await service.login(dto); } catch (e) { notFoundMessage = (e as Error).message; }

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      prisma.user.findUnique.mockResolvedValue(mockUser);
      let wrongPassMessage = '';
      try { await service.login(dto); } catch (e) { wrongPassMessage = (e as Error).message; }

      expect(notFoundMessage).toBe('Email atau password salah');
      expect(wrongPassMessage).toBe('Email atau password salah');
    });
  });

  // ─────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────
  describe('logout()', () => {
    it('should nullify refresh token in DB', async () => {
      prisma.user.update.mockResolvedValue(mockUser);

      const result = await service.logout(mockUser.id);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { refreshToken: null },
      });
      expect(result).toEqual({ message: 'Logout berhasil' });
    });
  });

  // ─────────────────────────────────────────────
  // FORGOT PASSWORD
  // ─────────────────────────────────────────────
  describe('forgotPassword()', () => {
    const dto = { email: 'test@example.com' };

    it('should send reset email if user exists', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue(mockUser);

      const result = await service.forgotPassword(dto);

      expect(mailService.sendResetPasswordEmail).toHaveBeenCalledWith(
        mockUser.email,
        mockUser.name,
        expect.any(String),
      );
      expect(result.message).toContain('Jika email terdaftar');
    });

    it('should return same message even if user does not exist (security)', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await service.forgotPassword(dto);

      expect(result.message).toContain('Jika email terdaftar');
      expect(mailService.sendResetPasswordEmail).not.toHaveBeenCalled();
    });

    it('should save hashed reset token with 1-hour expiry', async () => {
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue(mockUser);

      const before = Date.now();
      await service.forgotPassword(dto);
      const after = Date.now();

      const updateCall = prisma.user.update.mock.calls[0][0];
      expect(updateCall.data.resetToken).toBeDefined();

      const exp: Date = updateCall.data.resetTokenExp;
      expect(exp.getTime()).toBeGreaterThanOrEqual(before + 60 * 60 * 1000 - 100);
      expect(exp.getTime()).toBeLessThanOrEqual(after + 60 * 60 * 1000 + 100);
    });
  });

  // ─────────────────────────────────────────────
  // RESET PASSWORD
  // ─────────────────────────────────────────────
  describe('resetPassword()', () => {
    const dto = { token: 'valid-token', newPassword: 'NewPassword123!' };

    it('should reset password and invalidate all sessions', async () => {
      prisma.user.findFirst.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hashed-password' as never);
      prisma.user.update.mockResolvedValue(mockUser);

      const result = await service.resetPassword(dto);

      expect(prisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            password: 'new-hashed-password',
            resetToken: null,
            resetTokenExp: null,
            refreshToken: null,
          }),
        }),
      );
      expect(result.message).toContain('Password berhasil diubah');
    });

    it('should throw BadRequestException for invalid/expired token', async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(service.resetPassword(dto)).rejects.toThrow(BadRequestException);
    });
  });
});