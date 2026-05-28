

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Auth E2E', () => {
    let app: INestApplication<App>;

    beforeAll(async () => {
        const moduleFixture: TestingModule =
        await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('register -> verify -> login -> get products', async () => {
        // gunakan email random agar tidak duplicate
        const email = `test${Date.now()}@mail.com`;

        // =========================
        // REGISTER
        // =========================
        const registerResponse = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
            name: 'Adera',
            email,
            password: '123456',
        });

        expect(registerResponse.status).toBe(201);

        // =========================
        // VERIFY EMAIL
        // =========================
        const verifyResponse = await request(app.getHttpServer())
        .post('/auth/verify-email')
        .send({
            email,
            code: '123456',
        });

        expect(verifyResponse.status).toBe(200);

        // =========================
        // LOGIN
        // =========================
        const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
            email,
            password: '123456',
        });

        expect(loginResponse.status).toBe(200);

        // ambil JWT token
        const token = loginResponse.body.access_token;

        expect(token).toBeDefined();

        // =========================
        // GET PRODUCTS
        // =========================
        const productResponse = await request(app.getHttpServer())
        .get('/products')
        .set('Authorization', `Bearer ${token}`);

        expect(productResponse.status).toBe(200);
    });
});