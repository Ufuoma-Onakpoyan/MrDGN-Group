# Implementation Plan: Unified Admin, Remove Supabase & Lovable

## Overview

This plan covers three major changes:
1. **Unified Admin** – Merge `mansaluxe-realty-admin` + `mrdgn-blog-cms` into one `mrdgn-admin`
2. **Remove Supabase** – Remove all Supabase dependencies; replace with mock/stub data layer
3. **Remove Lovable** – Remove lovable-tagger, lovable-uploads references, Lovable meta/README

---

## Phase 1: Unified Admin Panel

### 1.1 Strategy

- **Base**: `mansaluxe-realty-admin` (has Dashboard, Properties, Testimonials, Users, Reports, Settings, Auth)
- **Merge in**: Blog + Portfolio from `mrdgn-blog-cms` (BlogList, BlogEdit, PortfolioList, PortfolioEdit, ViewAnalytics, ImageUpload)
- **Result**: Single `mrdgn-admin` folder with all admin sections
- **Remove**: `mansaluxe-realty-admin` (renamed to mrdgn-admin) and delete `mrdgn-blog-cms` after merge

### 1.2 New Admin Routes

| Route | Feature |
|-------|---------|
| `/admin/login` | Login |
| `/admin/dashboard` | Dashboard |
| `/admin/properties` | Realty properties |
| `/admin/testimonials` | Realty testimonials |
| `/admin/users` | User management |
| `/admin/reports` | Reports |
| `/admin/settings` | Settings |
| `/admin/blog` | Blog list |
| `/admin/blog/new` | New blog post |
| `/admin/blog/edit/:id` | Edit blog post |
| `/admin/portfolio` | Portfolio list |
| `/admin/portfolio/new` | New portfolio item |
| `/admin/portfolio/edit/:id` | Edit portfolio item |

### 1.3 Files to Copy from mrdgn-blog-cms

- `src/pages/BlogList.tsx`, `BlogEdit.tsx`, `PortfolioList.tsx`, `PortfolioEdit.tsx`
- `src/components/ViewAnalytics.tsx`, `ImageUpload.tsx`
- `src/components/Sidebar.tsx` – merge nav items into admin sidebar
- Update `AdminLayout` / sidebar to include Blog + Portfolio links

### 1.4 Root Route

- Admin root `/` → redirect to login or dashboard (current behavior via RootRoute)
- Public sites (mrdgn-group, mansaluxe-realty, etc.) keep their own roots
- `mansaluxe-realty` public site will need to point to the unified admin URL (e.g. `/admin` on shared domain or separate admin subdomain)

---

## Phase 2: Remove Supabase

### 2.1 Per-Project Changes

| Project | Supabase Usage | Replacement |
|---------|----------------|-------------|
| **mrdgn-group** | useBlogPosts (blog_posts) | Mock hook returning `[]` |
| **mansaluxe-realty** | api.ts (properties, testimonials) | Mock API returning `[]` |
| **mansaluxe-realty-admin** → **mrdgn-admin** | Auth, admin-api, properties-service, all pages | Mock Auth + Mock API (localStorage/in-memory) |
| **mrdgn-entertainment** | Blog, BlogPost components | Mock data / empty |
| **mrdgn-blog-cms** | (merged into admin) | N/A |
| **mrdgn-construction** | NewsletterModal, ContactSection (email) | Stub – no-op or console log |

### 2.2 Mock Auth

- Simple localStorage check: `admin_authenticated` = true/false
- Login: accept any email/password, set `admin_authenticated = true`
- Logout: clear localStorage
- No Supabase auth, no RPC calls

### 2.3 Mock Data Layer

- `getProperties()`, `getTestimonials()`, etc. → return `[]`
- `getBlogPosts()` → return `[]`
- CRUD operations → no-op or update in-memory state
- Image upload → return placeholder URL
- Allows UI to render; user can plug in real backend later

### 2.4 Files to Delete

- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `supabase/` folder (migrations, config, functions)
- `.env` – remove Supabase vars (or replace with placeholder)

### 2.5 Package Changes

- Remove `@supabase/supabase-js` from all `package.json`

---

## Phase 3: Remove Lovable

### 3.1 Package

- Remove `lovable-tagger` from `package.json` in all 6 projects

### 3.2 Vite Config

- Remove `import { componentTagger } from "lovable-tagger"`
- Remove `componentTagger()` from plugins array (all projects)

### 3.3 Asset Paths

- Rename `public/lovable-uploads` → `public/assets` in each project
- Update all `src="/lovable-uploads/xxx"` → `src="/assets/xxx"`
- Missing files: use `/assets/placeholder.svg` or project-specific placeholder
- Only `mrdgn-construction` confirmed has `favicon-m-logo.png`; others may have different files

### 3.4 HTML Meta

- Remove `Lovable Generated Project`, `@lovable_dev`, `lovable.dev` og:image
- Use project-specific title/description or generic MrDGN branding
- Replace og:image with project favicon or remove

### 3.5 README

- `mrdgn-group/README.md` – Replace Lovable instructions with generic project README

---

## Phase 4: Cleanup & Reorganization

### 4.1 Folder Changes

- Rename `mansaluxe-realty-admin` → `mrdgn-admin` (after merge)
- Delete `mrdgn-blog-cms` (content merged into mrdgn-admin)
- Update `STRUCTURE.md` with new layout

### 4.2 Final Project Layout

```
mrdgn-group/          # Group main site (no admin)
mrdgn-entertainment/  # Entertainment site
mrdgn-construction/   # Construction site
mansaluxe-realty/     # Realty public site (reads from… TBD: API or static)
mrdgn-admin/          # Unified admin (blog, portfolio, realty, users, etc.)
```

### 4.3 Cross-References

- `mansaluxe-realty` footer/link to admin: update to `/admin` or admin URL
- `mrdgn-group` blog: currently fetches from Supabase; will use mock (empty) until new backend

---

## Execution Order

1. **Phase 3 first (Lovable)** – Lowest risk, no data/auth impact
2. **Phase 2 (Supabase)** – Create stubs, then remove Supabase
3. **Phase 1 (Unified Admin)** – Merge, then rename and delete
4. **Phase 4** – Final cleanup, STRUCTURE.md

---

## Risks & Notes

- **Data loss**: All Supabase data will be inaccessible. Export any needed data before removal.
- **Auth**: Mock auth is insecure; suitable only for dev. Add proper auth before production.
- **Images**: lovable-uploads files may not all exist locally; some paths might 404 until assets are added.
- **Deployment**: Update any CI/CD or deployment configs that reference old folder names or Supabase env vars.
