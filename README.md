# Mamabear Backend

REST API e-commerce Mamabear — NestJS + Prisma + PostgreSQL.

**Live:** [https://mamabear-backend.onrender.com](https://mamabear-backend.onrender.com)  
**Swagger docs:** [https://mamabear-backend.onrender.com/api/docs](https://mamabear-backend.onrender.com/api/docs)

---

## Tech stack

| Layer | Library |
|---|---|
| Framework | NestJS 11 |
| ORM | Prisma 7 |
| Database | PostgreSQL (Supabase / local) |
| Cache | Redis (cache-manager + ioredis) |
| Auth | JWT (access 15m + refresh 7d), Passport |
| Payment | Xendit, Midtrans |
| Upload | Cloudinary, Multer |
| Shipping | RajaOngkir |
| Email | Nodemailer (SMTP) |
| Error monitoring | Sentry |
| Docs | Swagger (`/api/docs`) |

---

## Prasyarat

- Node.js 20+
- PostgreSQL (atau akun Supabase)
- Redis
- Akun Cloudinary (untuk upload gambar produk)
- API key RajaOngkir (untuk kalkulasi ongkir)
- Akun Xendit atau Midtrans (untuk payment)

---

## Instalasi

```bash
npm install
```

Salin file environment:

```bash
cp .env.example .env
```

Isi semua nilai di `.env` (lihat bagian Variabel environment di bawah).

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

## Menjalankan

```bash
# Development (dengan watch)
npm run start:dev

# Production
npm run build
npm run start:prod
```

API berjalan di `http://localhost:3000`

Swagger docs: `http://localhost:3000/api/docs`

---

## Struktur folder

```
src/
├── admin/                   # Fitur khusus admin
│   ├── admin-categories/
│   ├── admin-consultations/
│   ├── admin-customers/
│   ├── admin-orders/
│   ├── admin-products/
│   ├── admin-users/
│   └── dto/
├── auth/                    # JWT auth, guards, strategies
├── cart/                    # Cart user & guest cart
├── categories/
├── cloudinary/              # Upload gambar
├── consultation/
├── mail/                    # Email notifikasi
├── membership/              # Tier, poin, voucher membership
├── orders/                  # Create order, update status, export CSV
├── payments/                # Xendit & Midtrans integration
├── prisma/                  # PrismaService
├── products/
├── search/
├── shipping/                # RajaOngkir API wrapper
├── site-settings/
├── users/
├── voucher/
└── wishlist/
```

---

## API utama

### Auth
| Method | Path | Deskripsi |
|---|---|---|
| POST | `/auth/register` | Daftar akun baru |
| POST | `/auth/login` | Login, set cookie accessToken + refreshToken |
| POST | `/auth/logout` | Hapus cookie |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/users/me` | Profil user login |

### Produk & Kategori
| Method | Path | Deskripsi |
|---|---|---|
| GET | `/products` | List produk (filter, search, paginate) |
| GET | `/products/:id` | Detail produk |
| GET | `/products/slug/:slug` | Produk by slug |
| GET | `/products/:id/variants` | Variant produk |
| GET | `/categories` | Semua kategori (tree) |

### Cart
| Method | Path | Deskripsi |
|---|---|---|
| GET | `/cart` | Keranjang user |
| POST | `/cart/items` | Tambah item |
| PUT | `/cart/items/:id` | Update quantity |
| DELETE | `/cart/items/:id` | Hapus item |
| DELETE | `/cart` | Kosongkan cart |
| POST | `/cart/merge-guest` | Merge guest cart setelah login |

### Orders
| Method | Path | Deskripsi |
|---|---|---|
| POST | `/orders` | Buat order dari cart |
| GET | `/users/me/orders` | Riwayat order user |
| GET | `/orders/:id` | Detail order |

### Payments
| Method | Path | Deskripsi |
|---|---|---|
| POST | `/payments/checkout` | Buat invoice Xendit / Midtrans |
| POST | `/payments/xendit/webhook` | Webhook notifikasi pembayaran |

### Admin (role: admin / super_admin)
| Method | Path | Deskripsi |
|---|---|---|
| GET | `/admin/orders` | List semua order |
| PATCH | `/admin/orders/:id/status` | Update status order |
| PATCH | `/admin/orders/:id/tracking` | Set nomor resi |
| GET | `/admin/orders/export` | Export CSV semua order |
| GET | `/admin/customers` | List customer (paginate + search) |
| GET | `/admin/products` | List produk admin |
| POST | `/admin/products` | Buat produk baru |
| PATCH | `/admin/products/:id` | Edit produk |
| DELETE | `/admin/products/:id` | Hapus produk |
| GET | `/admin/orders/:id/invoice` | Data invoice untuk print |

---

## Role & akses

| Role | Deskripsi |
|---|---|
| `customer` | User biasa — hanya akses endpoint publik & milik sendiri |
| `admin` | Akses semua endpoint `/admin/*` |
| `super_admin` | Akses penuh termasuk manajemen user admin |

---

## Testing

```bash
# Unit tests
npm run test:unit

# Integration tests (butuh .env.test)
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## Deployment (VPS dengan Nginx)

Contoh konfigurasi Nginx ada di `etc/nginx/sites-available/mamabear`.

```bash
# Salin ke nginx
sudo cp etc/nginx/sites-available/mamabear /etc/nginx/sites-available/mamabear
sudo ln -s /etc/nginx/sites-available/mamabear /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Backend berjalan di port `3000`, Nginx meneruskan dari domain `api.mamabear.id`.

---

## Variabel environment lengkap

| Variabel | Wajib | Keterangan |
|---|:---:|---|
| `NODE_ENV` | ✓ | `development` / `production` |
| `PORT` | — | Default `3000` |
| `APP_URL` | ✓ | URL backend, contoh `http://localhost:3000` |
| `FRONTEND_URL` | ✓ | URL frontend untuk CORS |
| `DATABASE_URL` | ✓ | PostgreSQL connection string |
| `REDIS_HOST` | ✓ | Host Redis |
| `REDIS_PORT` | ✓ | Port Redis (default `6379`) |
| `JWT_ACCESS_SECRET` | ✓ | Secret untuk access token |
| `JWT_REFRESH_SECRET` | ✓ | Secret untuk refresh token |
| `JWT_ACCESS_EXPIRES_IN` | — | Default `15m` |
| `JWT_REFRESH_EXPIRES_IN` | — | Default `7d` |
| `CLOUDINARY_CLOUD_NAME` | ✓ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ✓ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ✓ | Cloudinary API secret |
| `RAJAONGKIR_API_KEY` | ✓ | API key RajaOngkir |
| `RAJAONGKIR_BASE_URL` | ✓ | `https://api.rajaongkir.com/starter` |
| `XENDIT_SECRET_KEY` | ✓ | Xendit secret key |
| `XENDIT_WEBHOOK_TOKEN` | ✓ | Token verifikasi webhook Xendit |
| `MIDTRANS_SERVER_KEY` | — | Midtrans server key |
| `MIDTRANS_CLIENT_KEY` | — | Midtrans client key |
| `MIDTRANS_IS_PRODUCTION` | — | `true` untuk production |
| `SMTP_HOST` | ✓ | SMTP host, contoh `smtp.gmail.com` |
| `SMTP_PORT` | ✓ | SMTP port, contoh `587` |
| `SMTP_USER` | ✓ | Email pengirim |
| `SMTP_PASS` | ✓ | App password email |
| `SMTP_FROM_NAME` | — | Nama pengirim, default `MamaBear` |
| `WAREHOUSE_CITY_ID` | ✓ | ID kota asal pengiriman (RajaOngkir) |
| `SENTRY_DSN` | — | Sentry DSN untuk error monitoring |