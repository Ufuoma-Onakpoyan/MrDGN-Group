# Mansa Luxe Realty - Vercel Deployment Checklist

## Pre-Deploy

1. **Environment variables** (Vercel Project → Settings → Environment Variables):
   - `VITE_API_URL` = Your backend API URL (e.g. `https://your-api.railway.app`)
   - `VITE_SITE_URL` = Your production site URL (e.g. `https://mansaluxerealty.com`) – for SEO canonicals

2. **Backend CORS**: Ensure `CORS_ORIGINS` on your backend includes your Vercel URL(s), e.g.:
   ```
   https://mansaluxerealty.vercel.app,https://mansaluxerealty.com
   ```

3. **Contact form**: The form POSTs to `{VITE_API_URL}/api/contact`. If `VITE_API_URL` is not set, users see an error with fallback contact details.

## Vercel project settings

- **Framework preset**: Vite  
- **Root directory**: `mansaluxe-realty` (or leave blank if deploying from repo root)  
- **Build command**: `npm run build`  
- **Output directory**: `dist`

## Post-deploy

1. **Update sitemap & robots**: If using a custom domain, update:
   - `public/sitemap.xml` – replace `https://mansaluxerealty.com` with your domain
   - `public/robots.txt` – update the Sitemap URL

2. **Verify**: Test Contact form, property listings, and key pages.
