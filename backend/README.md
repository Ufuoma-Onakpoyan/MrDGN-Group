# MrDGN Backend API

Production-ready Node.js API for the MrDGN Group websites.

## Tech Stack

- **Express** – REST API
- **Prisma** – PostgreSQL ORM
- **JWT** – Admin authentication
- **bcrypt** – Password hashing
- **multer** – File uploads

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set:

- `DATABASE_URL` – Uses SQLite by default (`file:./dev.db`). No Docker or sign-up needed.
- `JWT_SECRET` – Any random string for dev (e.g. `my-secret-key`)
- `CORS_ORIGINS` – Already set for localhost in `.env.example`

### 3. Initialize database

```bash
npm run db:push
```

### 4. Seed database (admin + filler blog posts)

```bash
npm run db:seed
```

- **Admin:** `admin@mrdgngroup.com` / `Admin123!` (change in production via `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`)
- **Blog:** 6 filler posts for the group and entertainment sites
- **Products:** 4 construction products with prices for the Construction site

### 5. Run

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm run build
npm start
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/properties` | No | List properties |
| GET | `/api/properties/:id` | No | Get property |
| POST | `/api/properties` | Admin | Create property |
| PUT | `/api/properties/:id` | Admin | Update property |
| DELETE | `/api/properties/:id` | Admin | Delete property |
| GET | `/api/testimonials` | No | List testimonials |
| POST | `/api/testimonials` | Admin | Create testimonial |
| PUT | `/api/testimonials/:id` | Admin | Update testimonial |
| DELETE | `/api/testimonials/:id` | Admin | Delete testimonial |
| GET | `/api/blog` | No | List blog posts |
| GET | `/api/blog/slug/:slug` | No | Get post by slug |
| GET | `/api/products` | No | List products (Construction) |
| GET | `/api/products/slug/:slug` | No | Get product by slug |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| POST | `/api/blog` | Admin | Create post |
| PUT | `/api/blog/:id` | Admin | Update post |
| DELETE | `/api/blog/:id` | Admin | Delete post |
| GET | `/api/portfolio` | No | List portfolio items |
| POST | `/api/portfolio` | Admin | Create item |
| PUT | `/api/portfolio/:id` | Admin | Update item |
| DELETE | `/api/portfolio/:id` | Admin | Delete item |
| POST | `/api/contact` | No | Submit contact form |
| POST | `/api/upload/:bucket` | Admin | Upload file |
| GET | `/api/dashboard/stats` | Admin | Dashboard stats |

## Deployment

### Railway / Render / Fly.io

1. Create a PostgreSQL database (Railway/Render/Neon).
2. Set environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `CORS_ORIGINS` (your frontend URLs)
   - `UPLOAD_URL` (e.g. `https://your-api.railway.app/uploads`)
3. Deploy. Run `npm run db:push` and `npm run db:seed` in a one-off task or locally pointed at the deployed DB.

### Docker (optional)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

Build: `npm run build` then `docker build -t mrdgn-api .`

## Frontend Configuration

In each frontend `.env`:

- **admin:** `VITE_API_URL=https://your-api.com`
- **mansaluxe-realty:** `VITE_API_URL=https://your-api.com`
- **group:** `VITE_API_URL=https://your-api.com`

Leave empty for offline/mock mode.
