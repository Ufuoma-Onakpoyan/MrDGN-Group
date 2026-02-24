import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

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

// Public: get published posts (optional ?source= to filter by site)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const source = req.query.source as string | undefined;
    const posts = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { publishedAt: 'desc' },
    });
    const filtered = source
      ? posts.filter((p) => postMatchesSource(p.sources, source))
      : posts;
    res.json(filtered.map(mapPostWithSources));
  } catch (e) {
    console.error('Blog list error:', e);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

// Public: get by slug (optional ?source= to ensure post is for that site)
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const source = req.query.source as string | undefined;
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug, published: true },
    });
    if (!post || !postMatchesSource(post.sources, source)) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { viewCount: { increment: 1 } },
    });
    res.json(mapPostWithSources({ ...post, viewCount: post.viewCount + 1 }));
  } catch {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Public/Admin: get by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id: req.params.id },
    });
    if (!post) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapPostWithSources(post));
  } catch {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Admin: create
router.post('/', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    const sources = Array.isArray(body.sources) && body.sources.length > 0
      ? body.sources.map(String)
      : ['group', 'entertainment', 'construction', 'mansaluxe-realty'];
    const post = await prisma.blogPost.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        content: String(body.content),
        excerpt: body.excerpt ? String(body.excerpt) : null,
        featuredImageUrl: body.featured_image_url ? String(body.featured_image_url) : null,
        author: body.author ? String(body.author) : 'MrDGN',
        published: Boolean(body.published),
        publishedAt: body.published ? new Date() : null,
        tags: JSON.stringify(Array.isArray(body.tags) ? body.tags.map(String) : []),
        sources: JSON.stringify(sources),
      },
    });
    res.status(201).json(mapPostWithSources(post));
  } catch {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Admin: update
router.put('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    const updateData: Record<string, unknown> = {
      ...(body.title != null ? { title: String(body.title) } : {}),
      ...(body.slug != null ? { slug: String(body.slug) } : {}),
      ...(body.content != null ? { content: String(body.content) } : {}),
      ...(body.excerpt !== undefined ? { excerpt: body.excerpt ? String(body.excerpt) : null } : {}),
      ...(body.featured_image_url !== undefined ? { featuredImageUrl: body.featured_image_url ? String(body.featured_image_url) : null } : {}),
      ...(body.author != null ? { author: String(body.author) } : {}),
      ...(body.published !== undefined ? {
        published: Boolean(body.published),
        publishedAt: body.published ? new Date() : null,
      } : {}),
      ...(body.tags ? { tags: JSON.stringify(Array.isArray(body.tags) ? body.tags.map(String) : []) } : {}),
    };
    if (body.sources !== undefined && Array.isArray(body.sources) && body.sources.length > 0) {
      updateData.sources = JSON.stringify(body.sources.map(String));
    }
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: updateData,
    });
    res.json(mapPostWithSources(post));
  } catch {
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// Admin: delete
router.delete('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

function parseJsonArray(s: string | null | undefined): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function mapPostWithSources(p: {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImageUrl: string | null;
  author: string;
  viewCount: number;
  published: boolean;
  publishedAt: Date | null;
  tags: string;
  sources?: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  // Ensure featured_image_url is absolute so all frontends can load it
  let featuredImage = p.featuredImageUrl;
  if (featuredImage && featuredImage.startsWith('/') && !featuredImage.startsWith('//')) {
    const baseOrigin = process.env.API_ORIGIN || (() => {
      try {
        return new URL(process.env.UPLOAD_URL || process.env.API_URL || 'http://localhost:3001').origin;
      } catch {
        return 'http://localhost:3001';
      }
    })();
    featuredImage = baseOrigin + featuredImage;
  }

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    content: p.content,
    excerpt: p.excerpt,
    featured_image_url: featuredImage,
    author: p.author,
    view_count: p.viewCount,
    published: p.published,
    published_at: p.publishedAt?.toISOString() ?? null,
    tags: parseJsonArray(p.tags),
    sources: parseSources(p.sources),
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}

const mapPost = mapPostWithSources;

export { router as blogRouter };
