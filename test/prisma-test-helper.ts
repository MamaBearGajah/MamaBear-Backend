import { PrismaClient } from 'generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

/**
 * Truncate all tables in correct order (respects FK constraints).
 * Call in beforeEach to guarantee a clean slate per test.
 */
export async function cleanDatabase() {
  const tableNames = [
    'OrderStatusHistory',
    'PointTransaction',
    'ProductReviewImage',
    'ProductReviewHelpful',
    'ProductReview',
    'OrderItem',
    'Payment',
    'Order',
    'GuestCartItem',
    'GuestCart',
    'CartItem',
    'Cart',
    'ProductVariant',
    'ProductImage',
    'Product',
    'Category',
    'Voucher',
    'Membership',
    'Address',
    'BlogPost',
    'Consultation',
    'Faq',
    'User',
  ];

  for (const table of tableNames) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE`);
  }
}

/**
 * Create a verified user ready for login — skips email flow.
 */
export async function createVerifiedUser(overrides: Partial<{
  name: string;
  email: string;
  password: string;
  role: string;
}> = {}) {
  const bcrypt = await import('bcrypt');
  const hash = await bcrypt.hash(overrides.password ?? 'Password123!', 10);

  return prisma.user.create({
    data: {
      name: overrides.name ?? 'Test User',
      email: overrides.email ?? 'test@example.com',
      password: hash,
      isVerified: true,
      role: (overrides.role as any) ?? 'customer',
    },
  });
}

/**
 * Create an unverified user — for testing auth guards.
 */
export async function createUnverifiedUser(email = 'unverified@example.com') {
  const bcrypt = await import('bcrypt');
  const hash = await bcrypt.hash('Password123!', 10);

  return prisma.user.create({
    data: {
      name: 'Unverified User',
      email,
      password: hash,
      isVerified: false,
    },
  });
}

export { prisma as testPrisma };