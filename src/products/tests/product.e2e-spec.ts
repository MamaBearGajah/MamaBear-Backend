import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { AppModule } from 'src/app.module';
import { cleanDatabase, createVerifiedUser, testPrisma } from '../../../test/prisma-test-helper';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

async function loginAs(app: INestApplication, email: string, password = 'Password123!') {
  const res = await request(app.getHttpServer())
    .post('/api/auth/login')
    .send({ email, password });
  return res.body.data.accessToken as string;
}

async function seedCategory(name: string) {
  return testPrisma.category.create({
    data: {
      name,
      slug: slugify(name),
    },
  });
}

async function seedProduct(overrides: Partial<{
  name: string;
  basePrice: number;
  stock: number;
  categoryId: string;
}> = {}) {
  const category = await seedCategory('Baby Care');

  return testPrisma.product.create({
    data: {
      name: overrides.name ?? 'Baby Shampoo',
      slug: slugify(overrides.name ?? 'Baby Shampoo'),
      description: 'Gentle baby shampoo',
      basePrice: overrides.basePrice ?? 50000,
      weight: 200,
      sku: `SKU-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      stock: overrides.stock ?? 100,
      categoryId: overrides.categoryId ?? category.id,
    },
  });
}

// ─────────────────────────────────────────────
// Test Suite
// ─────────────────────────────────────────────
describe('Product Endpoints (Integration)', () => {
  let app: INestApplication;
  let customerToken: string;
  let adminToken: string;

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

  afterAll(async () => await app.close());

  beforeEach(async () => {
    await cleanDatabase();

    await createVerifiedUser({ email: 'customer@example.com', password: 'Password123!', role: 'customer' });
    await createVerifiedUser({ email: 'admin@example.com', password: 'Password123!', role: 'admin' });

    customerToken = await loginAs(app, 'customer@example.com');
    adminToken = await loginAs(app, 'admin@example.com');
  });

  // ─────────────────────────────────────────────
  // GET /api/products
  // ─────────────────────────────────────────────
  describe('GET /api/products', () => {
    it('200 — should return paginated product list (public)', async () => {
      await seedProduct({ name: 'Baby Oil' });
      await seedProduct({ name: 'Baby Powder' });

      const res = await request(app.getHttpServer())
        .get('/api/products')
        .expect(200);

      expect(res.body.data).toBeDefined();
      expect(Array.isArray(res.body.data.items ?? res.body.data)).toBe(true);
    });

    it('200 — should filter products by name query', async () => {
      await seedProduct({ name: 'Baby Oil' });
      await seedProduct({ name: 'Baby Powder' });

      const res = await request(app.getHttpServer())
        .get('/api/products?search=Oil')
        .expect(200);

      const items = res.body.data.items ?? res.body.data;
      expect(items.every((p: any) => p.name.toLowerCase().includes('oil'))).toBe(true);
    });

    it('200 — should support pagination params', async () => {
      for (let i = 0; i < 5; i++) {
        await seedProduct({ name: `Product ${i}` });
      }

      const res = await request(app.getHttpServer())
        .get('/api/products?page=1&limit=2')
        .expect(200);

      const items = res.body.data.items ?? res.body.data;
      expect(items.length).toBeLessThanOrEqual(2);
    });
  });

  // ─────────────────────────────────────────────
  // GET /api/products/:id
  // ─────────────────────────────────────────────
  describe('GET /api/products/:id', () => {
    it('200 — should return single product (public)', async () => {
      const product = await seedProduct();

      const res = await request(app.getHttpServer())
        .get(`/api/products/${product.id}`)
        .expect(200);

      expect(res.body.data).toMatchObject({
        id: product.id,
        name: product.name,
      });
    });

    it('404 — should return 404 for non-existent product', async () => {
      await request(app.getHttpServer())
        .get('/api/products/non-existent-id')
        .expect(404);
    });
  });

  // ─────────────────────────────────────────────
  // POST /api/products (admin only)
  // ─────────────────────────────────────────────
  describe('POST /api/products', () => {
    it('201 — admin should create product', async () => {
      const category = await seedCategory('Toys');

      const res = await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Rattles',
          slug: 'rattles',
          description: 'Colorful baby rattles',
          basePrice: 75000,
          weight: 150,
          sku: 'SKU-RATTLES-001',
          stock: 50,
          categoryId: category.id,
        })
        .expect(201);

      expect(res.body.data).toMatchObject({ name: 'Rattles', basePrice: 75000 });
    });

    it('403 — customer should not create product', async () => {
      const category = await seedCategory('Toys');

      await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          name: 'Rattles',
          slug: 'rattles',
          description: 'Baby rattles',
          basePrice: 75000,
          weight: 150,
          sku: 'SKU-RATTLES-002',
          stock: 50,
          categoryId: category.id,
        })
        .expect(403);
    });

    it('401 — unauthenticated request should be rejected', async () => {
      await request(app.getHttpServer())
        .post('/api/products')
        .send({ name: 'Rattles', basePrice: 75000 })
        .expect(401);
    });

    it('400 — should reject missing required fields', async () => {
      await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Incomplete Product' })
        .expect(400);
    });

    it('400 — should reject negative price', async () => {
      const category = await seedCategory('Misc');

      await request(app.getHttpServer())
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Bad Product',
          slug: 'bad-product',
          basePrice: -1000,
          weight: 100,
          sku: 'SKU-BAD-001',
          stock: 10,
          categoryId: category.id,
        })
        .expect(400);
    });
  });

  // ─────────────────────────────────────────────
  // PATCH /api/products/:id (admin only)
  // ─────────────────────────────────────────────
  describe('PATCH /api/products/:id', () => {
    it('200 — admin should update product', async () => {
      const product = await seedProduct({ name: 'Old Name', basePrice: 10000 });

      const res = await request(app.getHttpServer())
        .patch(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ basePrice: 20000 })
        .expect(200);

      expect(res.body.data.basePrice).toBe(20000);
    });

    it('403 — customer should not update product', async () => {
      const product = await seedProduct();

      await request(app.getHttpServer())
        .patch(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ basePrice: 20000 })
        .expect(403);
    });

    it('404 — should return 404 for non-existent product', async () => {
      await request(app.getHttpServer())
        .patch('/api/products/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ basePrice: 20000 })
        .expect(404);
    });
  });

  // ─────────────────────────────────────────────
  // DELETE /api/products/:id (admin only)
  // ─────────────────────────────────────────────
  describe('DELETE /api/products/:id', () => {
    it('200 — admin should delete product', async () => {
      const product = await seedProduct();

      await request(app.getHttpServer())
        .delete(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const deleted = await testPrisma.product.findUnique({ where: { id: product.id } });
      expect(deleted).toBeNull();
    });

    it('403 — customer should not delete product', async () => {
      const product = await seedProduct();

      await request(app.getHttpServer())
        .delete(`/api/products/${product.id}`)
        .set('Authorization', `Bearer ${customerToken}`)
        .expect(403);
    });

    it('401 — unauthenticated request should be rejected', async () => {
      const product = await seedProduct();

      await request(app.getHttpServer())
        .delete(`/api/products/${product.id}`)
        .expect(401);
    });
  });
});