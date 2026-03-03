---
name: Brand name MR DGN not MrDGN
overview: Replace all user-facing brand text "MrDGN" and "MrDGNGroup" with "MR DGN" and "MR DGN Group" across every website (group, construction, entertainment, mansaluxe-realty) and shared assets (admin, backend). URLs and email addresses remain unchanged.
todos: []
isProject: false
---

# Brand name: MR DGN (not MrDGN) across all websites

## Rule

- **Display / copy:** Use **"MR DGN"** (space, capitals M and R) as the brand name everywhere.
- **"MrDGN Group"** → **"MR DGN Group"**
- **"MrDGNGroup"** (no space) → **"MR DGN Group"**
- **"MrDGN Entertainment"** → **"MR DGN Entertainment"**
- **"MrDGN Construction"** → **"MR DGN Construction"** (when used as subsidiary/brand; legal name "Mr DGN construction and developers limited" stays where already used)
- **CEO / title:** "(MrDGN)" and "MrDGN — CEO" → **"(MR DGN)"** and **"MR DGN — CEO"** for brand consistency
- **Do not change:** URLs (e.g. `mrdgngroup.com`), email addresses (e.g. `contact@mrdgngroup.com`), `href`/`mailto` values, package names, env vars, or actual asset file paths (e.g. `/assets/MrDGN Group.mp4` stays as path unless you rename the file separately)

---

## 1. Group site (`group/`)


| File                                                                       | Replacements                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [group/index.html](group/index.html)                                       | All meta and schema: `MrDGN Group` → `MR DGN Group`, `MrDGN Entertainment` → `MR DGN Entertainment`, `MrDGN Construction` → `MR DGN Construction` (in title, description, keywords, og:*, twitter:*, JSON-LD name/site_name). Leave `Contact@mrdgngroup.com` and URLs unchanged.               |
| [group/src/App.tsx](group/src/App.tsx)                                     | `PAGE_TITLES` and fallback: every `MrDGN Group` → `MR DGN Group`.                                                                                                                                                                                                                              |
| [group/src/pages/Index.tsx](group/src/pages/Index.tsx)                     | Businesses `name: 'MrDGN Entertainment'` / `'MrDGN Construction'` → `'MR DGN Entertainment'` / `'MR DGN Construction'`. All copy "MrDGN Group", "MrDGN Entertainment", "MrDGN Construction" → MR DGN variants. Conditional `business.name === 'MrDGN Construction'` → `'MR DGN Construction'`. |
| [group/src/pages/About.tsx](group/src/pages/About.tsx)                     | "About MrDGN Group", "Onakpoyan Success (MrDGN)", "MrDGN Group", "MrDGN — CEO" → MR DGN / MR DGN Group. Alt texts and body copy same.                                                                                                                                                          |
| [group/src/pages/Businesses.tsx](group/src/pages/Businesses.tsx)           | `name: 'MrDGN Entertainment'` / `'MrDGN Construction'` → MR DGN variants. `business.name === 'MrDGN Construction'` → `'MR DGN Construction'`.                                                                                                                                                  |
| [group/src/pages/Contact.tsx](group/src/pages/Contact.tsx)                 | "How can I reach MrDGN Group?" and answer text "MrDGN Group" → "MR DGN Group". Leave email/URLs.                                                                                                                                                                                               |
| [group/src/pages/FAQ.tsx](group/src/pages/FAQ.tsx)                         | Every `MrDGN Group`, `MrDGN Entertainment`, `MrDGN Construction` in questions/answers → MR DGN variants.                                                                                                                                                                                       |
| [group/src/pages/Investors.tsx](group/src/pages/Investors.tsx)             | "MrDGN Group", "MrDGN Entertainment", "MrDGN Construction" in body → MR DGN variants.                                                                                                                                                                                                          |
| [group/src/pages/Media.tsx](group/src/pages/Media.tsx)                     | Comment can say "MR DGN Group" if you like; path `/assets/MrDGN Group.mp4` unchanged unless file is renamed. All visible "MrDGN Group" → "MR DGN Group".                                                                                                                                       |
| [group/src/pages/BlogPost.tsx](group/src/pages/BlogPost.tsx)               | Document title `MrDGN Group` → `MR DGN Group`.                                                                                                                                                                                                                                                 |
| [group/src/pages/Careers.tsx](group/src/pages/Careers.tsx)                 | `group: 'MrDGN Group'`, `entertainment: 'MrDGN Entertainment'`, `construction: 'MrDGN Construction'` and body "MrDGN Group" → MR DGN variants.                                                                                                                                                 |
| [group/src/components/Navigation.tsx](group/src/components/Navigation.tsx) | `alt="MrDGN Group Logo"` → `alt="MR DGN Group Logo"`.                                                                                                                                                                                                                                          |
| [group/src/components/Footer.tsx](group/src/components/Footer.tsx)         | Business names "MrDGN Entertainment", "MrDGN Construction", "MrDGN Group Logo", "MrDGN Group news", "© ... MrDGN Group" → MR DGN variants. URLs unchanged.                                                                                                                                     |
| [group/src/components/Map.tsx](group/src/components/Map.tsx)               | `title="MrDGN Group office location..."` → `"MR DGN Group office location..."`. Comment "MR DGN Construction & Developers Ltd" can stay (already correct).                                                                                                                                     |


---

## 2. Construction site (`construction/`)


| File                                                                                           | Replacements                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [construction/index.html](construction/index.html)                                             | Meta title/author/og:site_name/twitter:title: keep legal name where you have "MR DGN Constructions" or "MR DGN Construction and Developers Limited"; ensure no "MrDGN" in visible meta. (Already mostly "MR DGN" or full legal name; verify.) |
| [construction/src/pages/AboutUs.tsx](construction/src/pages/AboutUs.tsx)                       | "subsidiary of MrDGN Group" → "subsidiary of MR DGN Group". "(MrDGN)" in alt and "MrDGN — Chief Executive Officer" → "(MR DGN)" and "MR DGN — Chief Executive Officer". "MrDGN" in bio → "MR DGN".                                            |
| [construction/src/components/Footer.tsx](construction/src/components/Footer.tsx)               | "subsidiary of MrDGN Group", "A subsidiary of MrDGN Group" → "MR DGN Group". Leave mrdgngroup.com URL.                                                                                                                                        |
| [construction/src/components/CTASection.tsx](construction/src/components/CTASection.tsx)       | Leave email [constructions@mrdgngroup.com](mailto:constructions@mrdgngroup.com). No "MrDGN" in visible text (already "Mr DGN construction and developers limited").                                                                           |
| [construction/src/pages/Blog.tsx](construction/src/pages/Blog.tsx)                             | "updates from MrDGN Construction" → "MR DGN Construction". Document title already "MR DGN Constructions" or similar; unify to brand "MR DGN" if desired.                                                                                      |
| [construction/src/components/WhatsAppFloat.tsx](construction/src/components/WhatsAppFloat.tsx) | "MR DGN Constructions website" is fine (or "MR DGN construction and developers limited" for legal). No "MrDGN" here.                                                                                                                          |


Construction already uses "Mr DGN construction and developers limited" and "MR DGN Constructions" in many places; only **"MrDGN Group"** and **"MrDGN"** (CEO/brand) need changing to **"MR DGN Group"** and **"MR DGN"**.

---

## 3. Entertainment site (`entertainment/`)


| File                                                                                       | Replacements                                                                                                                                                           |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [entertainment/src/components/About.tsx](entertainment/src/components/About.tsx)           | "MrDGN Entertainment" → "MR DGN Entertainment". "MrDGN Group" → "MR DGN Group". Alt "Onakpoyan Success (MrDGN), CEO of MrDGN Group" → "(MR DGN), CEO of MR DGN Group". |
| [entertainment/src/components/Blog.tsx](entertainment/src/components/Blog.tsx)             | `author: p.author                                                                                                                                                      |
| [entertainment/src/components/BlogPost.tsx](entertainment/src/components/BlogPost.tsx)     | Document title `MrDGN Entertainment` → `MR DGN Entertainment`. `author: raw.author                                                                                     |
| [entertainment/src/pages/PortfolioDetail.tsx](entertainment/src/pages/PortfolioDetail.tsx) | Document title `MrDGN Entertainment` → `MR DGN Entertainment`.                                                                                                         |
| Leave [entertainment/src/components/Contact.tsx](entertainment/src/components/Contact.tsx) | Email [entertainment@mrdgngroup.com](mailto:entertainment@mrdgngroup.com) unchanged.                                                                                   |


---

## 4. Mansaluxe Realty (`mansaluxe-realty/`)


| File                                                                                                   | Replacements                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [mansaluxe-realty/src/pages/About.tsx](mansaluxe-realty/src/pages/About.tsx)                           | "MrDGN Group", "MrDGN leads the MrDGN Group", "MrDGNGroup" (in span), "subsidiary of MrDGN Group" → "MR DGN Group". TODO comment "MrDGNGroup" → "MR DGN Group". |
| [mansaluxe-realty/src/components/layout/Footer.tsx](mansaluxe-realty/src/components/layout/Footer.tsx) | "subsidiary of MrDGN Group", `aria-label="MrDGN Group"`, "A subsidiary of MrDGN Group", `alt="MrDGN Group"` → "MR DGN Group". Keep mrdgngroup.com link.         |
| [mansaluxe-realty/src/components/RouteSEO.tsx](mansaluxe-realty/src/components/RouteSEO.tsx)           | "subsidiary of MrDGN Group" in description → "MR DGN Group".                                                                                                    |


---

## 5. Admin panel (`admin/`)


| File                                                                                     | Replacements                                                                        |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [admin/src/components/admin/AdminLayout.tsx](admin/src/components/admin/AdminLayout.tsx) | "MrDGN Group Admin Panel" → "MR DGN Group Admin Panel".                             |
| [admin/src/pages/admin/Dashboard.tsx](admin/src/pages/admin/Dashboard.tsx)               | Label `'MrDGN Group'` and copy "MrDGN Group websites" → "MR DGN Group".             |
| [admin/src/pages/admin/JobsList.tsx](admin/src/pages/admin/JobsList.tsx)                 | `label: 'MrDGN Group'`, "Career opportunities across MrDGN Group" → "MR DGN Group". |
| [admin/src/pages/admin/JobEdit.tsx](admin/src/pages/admin/JobEdit.tsx)                   | `label: 'MrDGN Group'` → "MR DGN Group".                                            |
| [admin/src/lib/public-api.ts](admin/src/lib/public-api.ts)                               | `companySubtitle: 'A subsidiary of MrDGNGroup'` → `'A subsidiary of MR DGN Group'`. |


---

## 6. Backend (`backend/`)


| File                                                     | Replacements                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [backend/src/index.ts](backend/src/index.ts)             | Health message `'MrDGN API'` → `'MR DGN API'` (user-facing in JSON).                                                                                                                                                                                                                                                                                                                                        |
| [backend/src/routes/blog.ts](backend/src/routes/blog.ts) | Default author `'MrDGN'` → `'MR DGN'`.                                                                                                                                                                                                                                                                                                                                                                      |
| [backend/prisma/seed.ts](backend/prisma/seed.ts)         | Blog titles/excerpts/content: "MrDGN Group", "MrDGN" (author), "MrDGN Construction" → "MR DGN Group", "MR DGN", "MR DGN Construction". Job `department: 'MrDGN Construction'` / `'MrDGN Entertainment'` → "MR DGN Construction" / "MR DGN Entertainment". Event descriptions "MrDGN Group" → "MR DGN Group". Sponsors string "Mr DGN Group" already correct. Leave `admin@mrdgngroup.com` and other emails. |


---

## 7. Docs / README (optional but recommended)


| File                                                     | Replacements                                                                                             |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [group/README.md](group/README.md)                       | "MrDGN Group", "MrDGN Entertainment", "MrDGN Construction" → MR DGN variants.                            |
| [admin/README.md](admin/README.md)                       | "MrDGN Group", "MrDGNGroup" → "MR DGN Group". Leave [admin@mrdgngroup.com](mailto:admin@mrdgngroup.com). |
| [mansaluxe-realty/README.md](mansaluxe-realty/README.md) | "MrDGNGroup" → "MR DGN Group".                                                                           |
| [backend/README.md](backend/README.md)                   | "MrDGN Backend", "MrDGN Group" → "MR DGN". Leave [admin@mrdgngroup.com](mailto:admin@mrdgngroup.com).    |
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md)         | "MrDGN branding" → "MR DGN branding" if present.                                                         |


---

## Summary

- **Find-and-replace rules (display text only):**  
  - `MrDGN Group` → `MR DGN Group`  
  - `MrDGNGroup` → `MR DGN Group`  
  - `MrDGN Entertainment` → `MR DGN Entertainment`  
  - `MrDGN Construction` → `MR DGN Construction`  
  - `MrDGN` (standalone, e.g. author or CEO) → `MR DGN`  
  - `(MrDGN)` → `(MR DGN)` in alt/text  
  - `MrDGN —` → `MR DGN —` in titles
- **Do not replace:** `mrdgngroup.com`, any `*@mrdgngroup.com`, package names, or internal identifiers unless they are user-visible labels.
- **Construction:** Keep "Mr DGN construction and developers limited" where that legal name is used; only fix "MrDGN" / "MrDGN Group" to "MR DGN" / "MR DGN Group".

Implement by app (group → construction → entertainment → mansaluxe-realty → admin → backend → docs), then run a final grep for `MrDGN` (and `MrDGNGroup`) to catch any remaining display strings.