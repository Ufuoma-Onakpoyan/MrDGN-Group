# SEO Implementation Checklist – External Steps

This document lists steps you need to complete **outside the codebase** to maximize search engine visibility for all MRDGN Group sites.

---

## 1. Google Search Console

For each domain, add and verify your property:

| Site | Domain to add |
|------|---------------|
| MR DGN Group | `https://mrdgngroup.com` |
| MR DGN Constructions | `https://construction.mrdgngroup.com` |
| MR DGN Entertainment | `https://entertainment.mrdgngroup.com` |
| Mansa Luxe Realty | `https://mansaluxerealty.mrdgngroup.com` |

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property → URL prefix → enter the domain
3. Verify ownership via one of:
   - **DNS:** Add the TXT record to your domain’s DNS
   - **HTML file:** Upload the file to your site’s root
   - **HTML meta tag:** Add the tag to `index.html` (we can add this for you if needed)
4. After verification, go to **Sitemaps** and submit the sitemap index (this includes static pages + blog + properties):
   - **Group:** `https://mrdgngroup.com/sitemap-index.xml`
   - **Construction:** `https://construction.mrdgngroup.com/sitemap-index.xml`
   - **Entertainment:** `https://entertainment.mrdgngroup.com/sitemap-index.xml`
   - **Mansa Luxe:** `https://mansaluxerealty.mrdgngroup.com/sitemap-index.xml`
   - (Google only accepts sitemaps on the same domain; the sitemap-index.xml is proxied from your API via Vercel rewrites)

---

## 2. Bing Webmaster Tools

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add each site, or **import from Google Search Console** (recommended) so verified sites and sitemaps sync
3. Verify ownership (same methods as Google)
4. Submit sitemaps (or rely on the GSC import)

---

## 3. Create and Host OG Images (1200×630 px)

Create **1200×630 px** Open Graph images for each site. These appear when links are shared on social media.

**Current setup:** The sites use logo assets as `og:image` fallbacks. For better social previews, create dedicated OG images:

| Site | Suggested content | Host path |
|------|-------------------|-----------|
| MR DGN Group | Logo + tagline “Entertainment, Construction & Real Estate” | `/og-home.png` |
| MR DGN Constructions | Logo + “Building Excellence Since 2020” | `/og-home.png` |
| MR DGN Entertainment | Logo + “Movies, YouTube Content & Event Sponsorship” | `/og-home.png` |
| Mansa Luxe Realty | Logo + “Nigeria’s Premier Luxury Real Estate” | `/og-home.png` |

**Guidelines:**
- Size: **1200×630 px** (PNG or JPG)
- File size: ideally under 300 KB
- Save in each site’s `public/` folder (e.g. `group/public/og-home.png`)
- Update `index.html` and the SEO components to use the new paths if needed

---

## 4. Dynamic Sitemaps (Blog & Properties)

The backend exposes sitemap endpoints:

- `GET /api/sitemap/blog?baseUrl=...&source=...` – blog post URLs
- `GET /api/sitemap/properties?baseUrl=...` – property URLs (mansaluxe only)
- `GET /api/sitemap/index?site=group|construction|entertainment|mansaluxe` – sitemap index

**To submit these to Google/Bing:**
- Add a second `Sitemap` line in `robots.txt` pointing to your API (see comments in each site’s `robots.txt`)
- Or submit `https://YOUR_API_URL/api/sitemap/index?site=group` directly in Search Console

**Optional proxy:** If you prefer sitemaps on the same domain, configure a rewrite so that  
`https://mrdgngroup.com/sitemap-blog.xml` → your backend `/api/sitemap/blog?baseUrl=...&source=group`.

---

## 5. Local SEO (Asaba, Lagos, Abuja, Nigeria)

To rank better for searches like "construction company in Lagos", "real estate Abuja", "entertainment Asaba":

1. **Google Business Profile** – Create/claim a profile for each business:
   - MR DGN Constructions – Asaba (primary), consider Lagos/Abuja if you have physical locations
   - Mansa Luxe Realty – Asaba (primary), Lagos/Abuja if applicable
   - MR DGN Entertainment – Asaba (primary)
   - MR DGN Group – Asaba (head office)

2. **Consistent NAP** – Use the same Name, Address, Phone number across:
   - Website footers
   - Google Business Profile
   - Local directories (Yellow Pages Nigeria, Nairaland listings, industry-specific directories)

3. **Local citations** – Submit to Nigerian/local directories and industry listings so searches for "construction Asaba", "real estate Lagos", etc. surface your sites.

4. **Reviews** – Encourage satisfied clients to leave Google reviews; these boost local rankings.

---

## 6. Optional Tools

- **Google Analytics 4** or **Google Tag Manager** – traffic and behavior
- **Ahrefs / SEMrush / Screaming Frog** – regular audits

---

## Summary of In-Codebase SEO Implemented

- Per-route SEO (title, description, canonical, Open Graph) for group, construction, entertainment, mansaluxe
- `og:image` and `og:image:width` / `og:image:height` on all sites
- JSON-LD: Organization, LocalBusiness (construction), EntertainmentBusiness (entertainment), RealEstateListing (property detail)
- Fixed sitemaps (removed invalid routes on entertainment, added `lastmod`)
- Backend sitemap endpoints for blog and properties
- `robots.txt` comments for dynamic sitemap submission
