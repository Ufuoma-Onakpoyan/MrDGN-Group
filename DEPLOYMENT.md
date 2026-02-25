# Deploy MrDGN Group Website (Beginner Guide)

Use **Neon** for the database, **Render** for the API backend, and **Vercel** for all 5 websites. Follow the steps in order.

---

## What you’ll have when done

| Service   | What it runs        | Example URL                    |
|-----------|---------------------|--------------------------------|
| **Neon**  | PostgreSQL database | (no public URL; connection string only) |
| **Render**| Backend API         | `https://mrdgn-api.onrender.com` |
| **Vercel**| 5 frontend sites    | `https://group.vercel.app`, etc. |

Your code must be on **GitHub**. If it isn’t yet:

1. Create a repo at [github.com/new](https://github.com/new).
2. Push your project:
   ```bash
   cd "C:\Users\ufuoma\Desktop\MrDGN Group Website"
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

# Part 1: Neon (database)

Neon gives you a free PostgreSQL database in the cloud.

## Step 1.1 – Sign up and create a project

1. Go to **[neon.tech](https://neon.tech)** and click **Sign up**.
2. Sign up with **GitHub** (easiest).
3. After login, click **New Project**.
4. **Project name:** e.g. `mrdgn`.
5. **Region:** pick one close to you (e.g. US East).
6. Click **Create project**.

## Step 1.2 – Get the database connection string

1. On the project page you’ll see **Connection string**.
2. Choose the **Pooled connection** tab (recommended).
3. Copy the connection string. It looks like:
   ```text
   postgresql://USER:PASSWORD@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. **Save this somewhere safe** (e.g. a notes file). You’ll use it in Part 2 as `DATABASE_URL`.  
   You can also click **Copy** next to it in Neon whenever you need it.

You’re done with Neon for now. Next: put the backend on Render and point it to this database.

---

# Part 2: Render (backend API)

Render will run your Node.js backend and connect it to Neon.

## Step 2.1 – Sign up and create a Web Service

1. Go to **[render.com](https://render.com)** and click **Get started**.
2. Sign up with **GitHub**.
3. In the dashboard, click **New +** → **Web Service**.
4. **Connect your GitHub account** if asked, then **find and select the repository** that contains your MrDGN project.
5. Click **Connect** (or **Use this repository**).

## Step 2.2 – Configure the service

Use these settings exactly (change only where it says “your …”):

| Field | Value |
|--------|--------|
| **Name** | `mrdgn-api` (or any name you like) |
| **Region** | Choose one close to you |
| **Branch** | `main` |
| **Root Directory** | `backend` ← **Important: type `backend`** so Render only builds the API folder. |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npx prisma generate && npx prisma db push && npm run build` |
| **Start Command** | `npm run start` |

Leave **Instance Type** as **Free** for now.

## Step 2.3 – Add environment variables

Scroll to **Environment Variables** and click **Add Environment Variable**. Add these one by one:

| Key | Value | Notes |
|-----|--------|--------|
| `DATABASE_URL` | Paste the **full connection string** you copied from Neon | The `postgresql://...?sslmode=require` string. |
| `JWT_SECRET` | A long random string | Example: open PowerShell and run `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])` and use the output. Or use any long random phrase (e.g. 32+ characters). |
| `NODE_ENV` | `production` | Exactly this. |
| `CORS_ORIGINS` | `https://group.vercel.app,https://admin.vercel.app,https://entertainment.vercel.app,https://construction.vercel.app,https://mansaluxe-realty.vercel.app` | We’ll add your real Vercel URLs in Step 2.7 after the first deploy. For the first deploy you can leave this as above (Vercel will give similar URLs). |
| `UPLOAD_URL` | `https://mrdgn-api.onrender.com/uploads` | **Replace `mrdgn-api` with your Render service name** if you used a different name in Step 2.2. |
| `API_ORIGIN` | `https://mrdgn-api.onrender.com` | Same as above, without `/uploads`. |

Click **Save** after adding each variable.

## Step 2.4 – Deploy

1. Scroll down and click **Create Web Service**.
2. Render will clone the repo, run the build command, and start the app. This can take a few minutes.
3. When the build finishes, the **Logs** tab should show something like “API running at …”.
4. At the top of the page you’ll see your service URL, e.g. **https://mrdgn-api.onrender.com**.  
   **Copy this URL** – this is your backend API URL. You’ll use it as `VITE_API_URL` in Part 3.

## Step 2.5 – Seed the database (required for properties, blogs, admin)

Your Neon database has empty tables until you run the seed. Do this **once** from your computer:

1. Open the **backend** folder and create or edit **`.env`** (do not commit this file).
2. Set **only** this variable to your **Neon** connection string (the same one you use on Render):
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```
3. In a terminal, from the **backend** folder, run:
   ```bash
   cd backend
   npm run db:seed
   ```
4. You should see lines like: “Created admin user”, “Created 6 filler blog posts”, “Created 5 filler properties”, etc. After this, your live site will show blogs, properties, and you can log in to the admin with the seeded email/password (see your seed or `.env.example` for the default).

If you skip this step, the sites will load but **blogs and properties will be empty**.

## Step 2.6 – Create admin user (optional if you already seeded)

1. In Render, open your service → **Shell** tab (or use a one-off job if available).
2. If Shell is available, run:
   ```bash
   npm run db:seed
   ```
   This creates the first admin user. Check your backend `prisma/seed.ts` or `.env.example` for the default email/password (often something like `admin@mrdgngroup.com` / `Admin123!`). Change that password after first login if needed.

If Shell isn’t available, you can run `npm run db:seed` once from your computer after setting `DATABASE_URL` in your local `backend/.env` to the **same Neon connection string** (so you’re seeding the same DB).

## Step 2.7 – Update CORS with your real Vercel URLs

After you deploy the 5 sites on Vercel (Part 3), you’ll get URLs like:

- `https://your-group.vercel.app`
- `https://your-admin.vercel.app`
- etc.

Go back to Render → your service → **Environment** → edit `CORS_ORIGINS` and set it to a **comma-separated list** of those 5 URLs (no spaces), for example:

```text
https://your-group.vercel.app,https://your-admin.vercel.app,https://your-entertainment.vercel.app,https://your-construction.vercel.app,https://your-mansaluxe.vercel.app
```

Save. Render will redeploy automatically. This lets the browser load your API from those frontend domains.

## Step 2.8 – Keep the backend awake (optional but recommended)

On the **free** plan, Render spins down your backend after about **15 minutes** of no requests. The next visitor then waits 30–60 seconds while it starts again. To avoid that, ping your API on a schedule so it stays warm.

Your backend already has a **health endpoint** that is safe to ping:

- **URL:** `https://YOUR-RENDER-URL/api/health`  
  Example: `https://mrdgn-api.onrender.com/api/health`

Use one of these **free** options (pick one):

### Option A: UptimeRobot (easiest)

1. Go to **[uptimerobot.com](https://uptimerobot.com)** and sign up (free).
2. Click **Add New Monitor**.
3. **Monitor Type:** HTTP(s).
4. **Friendly Name:** e.g. `MrDGN API`.
5. **URL:** `https://mrdgn-api.onrender.com/api/health` (use your real Render URL).
6. **Monitoring Interval:** 5 minutes (free tier allows this).
7. Click **Create Monitor**.

UptimeRobot will request that URL every 5 minutes. That’s enough to prevent Render from putting your backend to sleep.

### Option B: cron-job.org

1. Go to **[cron-job.org](https://cron-job.org)** and create a free account.
2. **Create Cronjob** → **Title:** e.g. `MrDGN API keep-alive`.
3. **Address:** `https://mrdgn-api.onrender.com/api/health` (your Render URL).
4. **Schedule:** every 10 or 15 minutes (e.g. `*/10 * * * *` for every 10 minutes).
5. Save.

Either option will keep your backend from falling asleep so the first visit after idle stays fast.

## Step 2.9 – Fix disappearing images (Cloudinary, strongly recommended)

On Render’s **free** plan, the server’s disk is **ephemeral**: when the backend restarts (spin-down, redeploy, or crash), everything in the `uploads` folder is **deleted**. So property images, blog featured images, and any other uploads work at first but show as **broken** after a while. The same applies to blog featured images and any content that uses the upload API.

To make uploads **persist**, use **Cloudinary** (free tier). The backend is already set up to use it when these environment variables are set.

1. Go to **[cloudinary.com](https://cloudinary.com)** and sign up (free).
2. In the **Dashboard**, note your **Cloud name**, **API Key**, and **API Secret**.
3. In **Render** → your backend service → **Environment** → **Add Environment Variable**. Add:

| Key | Value |
|-----|--------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloud name from the dashboard |
| `CLOUDINARY_API_KEY` | Your API key |
| `CLOUDINARY_API_SECRET` | Your API secret |

4. (Optional) To group uploads in a folder, add:
   - **Key:** `CLOUDINARY_FOLDER`  
   - **Value:** `mrdgn` (or any folder name you like)

5. **Save**. Render will redeploy. After that, **new** uploads (properties, blog images, portfolio, etc.) will be stored on Cloudinary and will **no longer disappear** after a restart.

**Note:** Images that were uploaded **before** adding Cloudinary were stored on the server disk and are already gone after any restart. Re-upload them from the admin (edit the property or blog post and upload the images again).

---

# Part 3: Vercel (5 frontend websites)

You’ll create **5 separate Vercel projects**, one per app. Each project uses the **same GitHub repo** but a **different Root Directory**.

## Step 3.1 – Sign up and install Vercel

1. Go to **[vercel.com](https://vercel.com)** and click **Sign up**.
2. Sign up with **GitHub**.
3. If Vercel asks to install the Vercel GitHub App, approve it so it can read your repos.

## Step 3.2 – Deploy the first site (Group)

1. Click **Add New…** → **Project**.
2. **Import** the same GitHub repository you used on Render.
3. **Configure Project**:
   - **Project Name:** e.g. `mrdgn-group`.
   - **Root Directory:** click **Edit**, choose **Select**, and pick the folder **`group`** (only the `group` folder, not the whole repo).
   - **Framework Preset:** should be **Vite** (auto-detected). If not, set it to Vite.
   - **Build Command:** `npm run build`.
   - **Output Directory:** `dist`.
4. **Environment Variables:** click **Add**:
   - **Name:** `VITE_API_URL`
   - **Value:** your Render backend URL **with no slash at the end**, e.g. `https://mrdgn-api.onrender.com`
   - **Environments:** check Production, Preview, and Development.
5. Click **Deploy**.
6. Wait for the build to finish. You’ll get a URL like `https://mrdgn-group.vercel.app`. Save it for Step 2.7 (CORS).

## Step 3.3 – Deploy the second site (Admin)

1. **Add New…** → **Project** again.
2. Import the **same** repository.
3. **Configure:**
   - **Project Name:** e.g. `mrdgn-admin`.
   - **Root Directory:** **`admin`** (not `group`).
   - **Framework Preset:** Vite.
   - **Build Command:** `npm run build`.
   - **Output Directory:** `dist`.
4. **Environment Variables:** add `VITE_API_URL` = same Render URL as above (no trailing slash).
5. Click **Deploy**. Save the new URL (e.g. `https://mrdgn-admin.vercel.app`) for CORS.

## Step 3.4 – Deploy the third site (Entertainment)

1. **Add New…** → **Project**.
2. Same repo.
3. **Root Directory:** **`entertainment`**.
4. **Project Name:** e.g. `mrdgn-entertainment`.
5. Same build/output and **same** `VITE_API_URL`.
6. Deploy and save the URL.

## Step 3.5 – Deploy the fourth site (Construction)

1. **Add New…** → **Project**.
2. Same repo.
3. **Root Directory:** **`construction`**.
4. **Project Name:** e.g. `mrdgn-construction`.
5. Same build/output and **same** `VITE_API_URL`.
6. Deploy and save the URL.

## Step 3.6 – Deploy the fifth site (Mansaluxe Realty)

1. **Add New…** → **Project**.
2. Same repo.
3. **Root Directory:** **`mansaluxe-realty`**.
4. **Project Name:** e.g. `mrdgn-mansaluxe-realty` (or `mansaluxe-realty`).
5. Same build/output and **same** `VITE_API_URL`.
6. Optional: add `VITE_SITE_URL` = your final site URL (e.g. `https://mansaluxerealty.com`) for SEO.
7. Deploy and save the URL.

## Step 3.7 – Update CORS on Render

Take the 5 Vercel URLs you saved. In Render → your backend service → **Environment** → edit `CORS_ORIGINS` and set it to those 5 URLs, comma-separated, no spaces. Save so the backend allows requests from all 5 sites.

---

# Quick reference

## Order of operations

1. **Neon** – Create project → copy connection string.
2. **Render** – New Web Service, root `backend`, add env vars (including Neon `DATABASE_URL` and `CORS_ORIGINS`), deploy, copy backend URL.
3. **Vercel** – 5 projects, each with its own Root Directory (`group`, `admin`, `entertainment`, `construction`, `mansaluxe-realty`), each with `VITE_API_URL` = Render URL.
4. **Render** – Update `CORS_ORIGINS` with the 5 Vercel URLs.

## Env vars summary

| Where | Variable | Example |
|--------|----------|--------|
| **Neon** | (none to set; you only copy the connection string) | — |
| **Render** | `DATABASE_URL` | Neon pooled connection string |
| **Render** | `JWT_SECRET` | Long random string |
| **Render** | `NODE_ENV` | `production` |
| **Render** | `CORS_ORIGINS` | Your 5 Vercel URLs, comma-separated |
| **Render** | `UPLOAD_URL` | `https://YOUR-RENDER-NAME.onrender.com/uploads` |
| **Render** | `API_ORIGIN` | `https://YOUR-RENDER-NAME.onrender.com` |
| **Vercel (all 5)** | `VITE_API_URL` | `https://YOUR-RENDER-NAME.onrender.com` (no trailing slash) |

## If something goes wrong

- **Build fails on Render:** Check the **Logs** tab. Often it’s a wrong **Root Directory** (must be `backend`) or a missing env var (e.g. `DATABASE_URL`).
- **Build fails on Vercel:** Make sure **Root Directory** is exactly one of: `group`, `admin`, `entertainment`, `construction`, `mansaluxe-realty`. And that `VITE_API_URL` has no trailing slash.
- **Sites load but data doesn’t:** Check that `VITE_API_URL` on Vercel matches the Render URL, and that `CORS_ORIGINS` on Render includes that Vercel URL (with `https://`).
- **Database errors:** Confirm `DATABASE_URL` on Render is the full Neon connection string (with `?sslmode=require`).

---

You now have:

- **Neon** = database  
- **Render** = backend API  
- **Vercel** = 5 frontend sites  

All set for production. If you add a custom domain later, add it to `CORS_ORIGINS` on Render and, for Mansaluxe, you can set `VITE_SITE_URL` to that domain.
