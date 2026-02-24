import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

// Public: get published items
router.get('/', async (req, res) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const items = await prisma.portfolioItem.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(items.map(mapItem));
  } catch {
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Public: get by slug (for detail pages)
router.get('/slug/:slug', async (req, res) => {
  try {
    const item = await prisma.portfolioItem.findFirst({
      where: { slug: req.params.slug, published: true },
    });
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapItem(item));
  } catch {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// Public: get by id
router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.portfolioItem.findUnique({
      where: { id: req.params.id },
    });
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapItem(item));
  } catch {
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

// Admin: create
router.post('/', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const item = await prisma.portfolioItem.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        description: body.description ? String(body.description) : null,
        content: body.content ? String(body.content) : null,
        category: body.category ? String(body.category) : 'project',
        featuredImageUrl: body.featured_image_url ? String(body.featured_image_url) : null,
        images: JSON.stringify(Array.isArray(body.images) ? body.images.map(String) : []),
        technologies: JSON.stringify(Array.isArray(body.technologies) ? body.technologies.map(String) : []),
        projectUrl: body.project_url ? String(body.project_url) : null,
        published: Boolean(body.published),
        publishedAt: body.published ? new Date() : null,
        orderIndex: body.order_index != null ? Number(body.order_index) : 0,
      },
    });
    res.status(201).json(mapItem(item));
  } catch {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Admin: update
router.put('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const item = await prisma.portfolioItem.update({
      where: { id: req.params.id },
      data: {
        ...(body.title != null && { title: String(body.title) }),
        ...(body.slug != null && { slug: String(body.slug) }),
        ...(body.description !== undefined && { description: body.description ? String(body.description) : null }),
        ...(body.content !== undefined && { content: body.content ? String(body.content) : null }),
        ...(body.category != null && { category: String(body.category) }),
        ...(body.featured_image_url !== undefined && { featuredImageUrl: body.featured_image_url ? String(body.featured_image_url) : null }),
        ...(body.images && { images: JSON.stringify(Array.isArray(body.images) ? body.images.map(String) : []) }),
        ...(body.technologies && { technologies: JSON.stringify(Array.isArray(body.technologies) ? body.technologies.map(String) : []) }),
        ...(body.project_url !== undefined && { projectUrl: body.project_url ? String(body.project_url) : null }),
        ...(body.published !== undefined && {
          published: Boolean(body.published),
          publishedAt: body.published ? new Date() : null,
        }),
        ...(body.order_index !== undefined && { orderIndex: Number(body.order_index) }),
      },
    });
    res.json(mapItem(item));
  } catch {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Admin: delete
router.delete('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    await prisma.portfolioItem.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete item' });
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

function mapItem(p: {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  category: string;
  featuredImageUrl: string | null;
  images: string;
  technologies: string;
  projectUrl: string | null;
  published: boolean;
  publishedAt: Date | null;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    content: p.content,
    category: p.category,
    featured_image_url: p.featuredImageUrl,
    images: parseJsonArray(p.images),
    technologies: parseJsonArray(p.technologies),
    project_url: p.projectUrl,
    published: p.published,
    published_at: p.publishedAt?.toISOString() ?? null,
    order_index: p.orderIndex,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}

export { router as portfolioRouter };
