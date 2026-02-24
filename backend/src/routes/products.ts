import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

function parseJsonArray(s: string | null | undefined): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function mapProduct(p: {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  priceUnit: string | null;
  category: string;
  images: string;
  specifications: string | null;
  features: string;
  featured: boolean;
  orderIndex: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    price: p.price,
    price_unit: p.priceUnit,
    category: p.category,
    images: parseJsonArray(p.images),
    specifications: p.specifications ? (() => {
      try {
        return JSON.parse(p.specifications) as Record<string, string>;
      } catch {
        return {};
      }
    })() : {},
    features: parseJsonArray(p.features),
    featured: p.featured,
    order_index: p.orderIndex,
    published: p.published,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}

// Public: get published products
router.get('/', async (req, res) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const items = await prisma.product.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(items.map(mapProduct));
  } catch {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Public: get by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const item = await prisma.product.findUnique({
      where: { slug: req.params.slug, published: true },
    });
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapProduct(item));
  } catch {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Public: get by id
router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.product.findUnique({
      where: { id: req.params.id },
    });
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapProduct(item));
  } catch {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Admin: create
router.post('/', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const item = await prisma.product.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        description: body.description ? String(body.description) : null,
        price: body.price != null ? Number(body.price) : null,
        priceUnit: body.price_unit ? String(body.price_unit) : null,
        category: body.category ? String(body.category) : 'general',
        images: JSON.stringify(Array.isArray(body.images) ? body.images.map(String) : []),
        specifications: body.specifications ? JSON.stringify(body.specifications) : null,
        features: JSON.stringify(Array.isArray(body.features) ? body.features.map(String) : []),
        featured: Boolean(body.featured),
        orderIndex: body.order_index != null ? Number(body.order_index) : 0,
        published: Boolean(body.published),
      },
    });
    res.status(201).json(mapProduct(item));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Admin: update
router.put('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const item = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        ...(body.title != null && { title: String(body.title) }),
        ...(body.slug != null && { slug: String(body.slug) }),
        ...(body.description !== undefined && { description: body.description ? String(body.description) : null }),
        ...(body.price !== undefined && { price: body.price != null ? Number(body.price) : null }),
        ...(body.price_unit !== undefined && { priceUnit: body.price_unit ? String(body.price_unit) : null }),
        ...(body.category != null && { category: String(body.category) }),
        ...(body.images && { images: JSON.stringify(Array.isArray(body.images) ? body.images.map(String) : []) }),
        ...(body.specifications !== undefined && { specifications: body.specifications ? JSON.stringify(body.specifications) : null }),
        ...(body.features && { features: JSON.stringify(Array.isArray(body.features) ? body.features.map(String) : []) }),
        ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
        ...(body.order_index !== undefined && { orderIndex: Number(body.order_index) }),
        ...(body.published !== undefined && { published: Boolean(body.published) }),
      },
    });
    res.json(mapProduct(item));
  } catch {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin: delete
router.delete('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export { router as productsRouter };
