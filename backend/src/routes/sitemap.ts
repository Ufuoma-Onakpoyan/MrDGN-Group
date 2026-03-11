import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

function parseSources(s: string | null | undefined): string[] {
  if (!s) return ['group', 'entertainment', 'construction', 'mansaluxe-realty'];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function postMatchesSource(sourcesJson: string | null, source: string | undefined): boolean {
  if (!source) return true;
  const sources = parseSources(sourcesJson);
  return sources.length === 0 || sources.includes(source);
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * GET /api/sitemap/blog?source=group&baseUrl=https://mrdgngroup.com
 * Returns XML sitemap for blog post URLs.
 */
router.get('/blog', async (req: Request, res: Response) => {
  try {
    const baseUrl = (req.query.baseUrl as string)?.replace(/\/$/, '') || 'https://mrdgngroup.com';
    const source = req.query.source as string | undefined;

    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, sources: true, publishedAt: true, updatedAt: true },
    });

    const filtered = source ? posts.filter((p) => postMatchesSource(p.sources, source)) : posts;

    const urls = filtered.map((p) => {
      const lastmod = p.updatedAt || p.publishedAt;
      const lastmodStr = lastmod ? lastmod.toISOString().slice(0, 10) : '';
      return `  <url>
    <loc>${escapeXml(`${baseUrl}/blog/${p.slug}`)}</loc>${lastmodStr ? `\n    <lastmod>${lastmodStr}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
    res.send(xml);
  } catch (e) {
    console.error('Sitemap blog error:', e);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Internal server error</error>');
  }
});

/**
 * GET /api/sitemap/properties?baseUrl=https://mansaluxerealty.mrdgngroup.com
 * Returns XML sitemap for property listing URLs.
 */
router.get('/properties', async (req: Request, res: Response) => {
  try {
    const baseUrl = (req.query.baseUrl as string)?.replace(/\/$/, '') || 'https://mansaluxerealty.mrdgngroup.com';

    const properties = await prisma.property.findMany({
      where: { status: { in: ['available', 'sold', 'pending'] } },
      select: { id: true, updatedAt: true },
    });

    const urls = properties.map((p) => {
      const lastmod = p.updatedAt ? p.updatedAt.toISOString().slice(0, 10) : '';
      return `  <url>
    <loc>${escapeXml(`${baseUrl}/properties/${p.id}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
    res.send(xml);
  } catch (e) {
    console.error('Sitemap properties error:', e);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Internal server error</error>');
  }
});

/**
 * GET /api/sitemap/products?baseUrl=https://construction.mrdgngroup.com
 * Returns XML sitemap for construction product detail URLs.
 */
router.get('/products', async (req: Request, res: Response) => {
  try {
    const baseUrl = (req.query.baseUrl as string)?.replace(/\/$/, '') || 'https://construction.mrdgngroup.com';

    const products = await prisma.product.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    const urls = products.map((p) => {
      const lastmod = p.updatedAt ? p.updatedAt.toISOString().slice(0, 10) : '';
      return `  <url>
    <loc>${escapeXml(`${baseUrl}/products/${p.slug}`)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour
    res.send(xml);
  } catch (e) {
    console.error('Sitemap products error:', e);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Internal server error</error>');
  }
});

const SITE_CONFIG: Record<string, { baseUrl: string; source?: string; hasBlog: boolean; hasProperties: boolean; hasProducts: boolean }> = {
  group: { baseUrl: 'https://mrdgngroup.com', source: 'group', hasBlog: true, hasProperties: false, hasProducts: false },
  construction: { baseUrl: 'https://construction.mrdgngroup.com', source: 'construction', hasBlog: true, hasProperties: false, hasProducts: true },
  entertainment: { baseUrl: 'https://entertainment.mrdgngroup.com', source: 'entertainment', hasBlog: true, hasProperties: false, hasProducts: false },
  mansaluxe: { baseUrl: 'https://mansaluxerealty.mrdgngroup.com', source: 'mansaluxe-realty', hasBlog: true, hasProperties: true, hasProducts: false },
};

/**
 * GET /api/sitemap/index?site=group
 * Returns sitemap index XML for the given site. Use API_BASE from env for full URLs.
 */
router.get('/index', async (req: Request, res: Response) => {
  try {
    const site = (req.query.site as string) || 'group';
    const config = SITE_CONFIG[site] || SITE_CONFIG.group;
    const overrideBase = (req.query.baseUrl as string)?.replace(/\/$/, '');
    const baseUrl = overrideBase || config.baseUrl;

    // API base for sitemap URLs - use request origin or env
    const apiBase = process.env.API_PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
    const apiBaseClean = apiBase.replace(/\/$/, '');

    const sitemaps: string[] = [
      `${baseUrl}/sitemap.xml`, // static pages - must exist in frontend public
    ];
    if (config.hasBlog) {
      sitemaps.push(`${apiBaseClean}/api/sitemap/blog?baseUrl=${encodeURIComponent(baseUrl)}${config.source ? `&source=${encodeURIComponent(config.source)}` : ''}`);
    }
    if (config.hasProperties) {
      sitemaps.push(`${apiBaseClean}/api/sitemap/properties?baseUrl=${encodeURIComponent(baseUrl)}`);
    }
    if (config.hasProducts) {
      sitemaps.push(`${apiBaseClean}/api/sitemap/products?baseUrl=${encodeURIComponent(baseUrl)}`);
    }

    const urls = sitemaps.map((loc) => `  <sitemap>
    <loc>${escapeXml(loc)}</loc>
  </sitemap>`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</sitemapindex>`;

    res.set('Content-Type', 'application/xml');
    res.set('Cache-Control', 'public, max-age=3600');
    res.send(xml);
  } catch (e) {
    console.error('Sitemap index error:', e);
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><error>Internal server error</error>');
  }
});

export { router as sitemapRouter };
