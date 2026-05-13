# 🐻 Mamabear Backend

REST API e-commerce Mamabear — NestJS + Prisma + PostgreSQL.

---

## Install

```bash
npm install
```

Salin file environment:

```bash
cp .env.example .env
```

Isi nilai yang diperlukan di `.env` (DATABASE_URL, JWT secrets, dll).

---

## Migrate

Generate Prisma Client:

```bash
npx prisma generate
```

Jalankan migrasi database:

```bash
npx prisma migrate dev
```

Seed data awal (opsional):

```bash
npx prisma db seed
```

---

## Run

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

API berjalan di `http://localhost:3000`

Swagger docs: `http://localhost:3000/api/docs`