# MrDGN Group Website – Project Structure

## Running locally

```bash
# One-time: install all dependencies
npm run install:all

# Run all 5 frontends at once
npm run dev
```

| Site            | URL                    |
|-----------------|------------------------|
| Group           | http://localhost:5173  |
| Admin           | http://localhost:5174  |
| MansaLuxe Realty| http://localhost:5175  |
| Entertainment   | http://localhost:5176  |
| Construction    | http://localhost:5177  |

Or run individually: `npm run dev:group`, `npm run dev:admin`, etc.

**With backend:** Uses SQLite—no Docker or sign-up needed. In a separate terminal:

```bash
cd backend
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev:backend
```

Or from root: `npm run dev:backend` (after `db:push` and `db:seed`). The seed creates an admin user and 6 filler blog posts for the frontends.

---

## Projects

| Folder | Purpose |
|--------|---------|
| **group** | MrDGN Group main holding company site |
| **entertainment** | Mr DGN Entertainment |
| **construction** | Mr DGN Construction |
| **mansaluxe-realty** | MansaLuxeRealty public website |
| **admin** | Unified admin panel (properties, blog, portfolio, etc.) |
| **backend** | Node.js API (Express, Prisma, PostgreSQL) |

## Deployment (Vercel + GitHub)

All 5 frontends deploy to **Vercel** via GitHub:

1. Push repo to GitHub
2. Create 5 separate Vercel projects from the same repo, each with a different **Root Directory**:
   - `group`, `admin`, `entertainment`, `construction`, `mansaluxe-realty`
3. Add `VITE_API_URL` env var (your backend URL) to each project
4. Backend deploys to Railway/Render/Fly.io (see `backend/README.md`)

See **DEPLOYMENT.md** for step-by-step instructions.

## Backend

The `backend` folder contains a production-ready API (deploy to Railway, Render, or Fly.io):

- **Auth**: JWT-based admin login
- **Properties, Testimonials**: Realty data
- **Blog, Portfolio**: Content management
- **Contact**: Form submissions
- **File uploads**: Served at `/uploads`

### Quick start (local)

```bash
docker compose up -d    # Start PostgreSQL (from project root)
cd backend
cp .env.example .env
npm run db:push
npm run db:seed         # Admin + 6 filler blog posts
npm run dev
```
