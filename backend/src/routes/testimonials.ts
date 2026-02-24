import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

// Public: get published testimonials. ?source=construction|mansaluxe-realty|...
router.get('/', async (req, res) => {
  try {
    const source = req.query.source as string | undefined;
    const where: Record<string, unknown> = { published: true };
    if (source) where.source = source;
    const items = await prisma.testimonial.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(items.map(mapTestimonial));
  } catch {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Admin: get all testimonials (incl. unpublished). ?source=construction|mansaluxe-realty|...
router.get('/admin', authMiddleware, requireRole('super_admin', 'editor', 'viewer'), async (req, res) => {
  try {
    const source = req.query.source as string | undefined;
    const where: Record<string, unknown> = {};
    if (source) where.source = source;
    const items = await prisma.testimonial.findMany({
      where,
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(items.map(mapTestimonial));
  } catch {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Admin: create
router.post('/', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const t = await prisma.testimonial.create({
      data: {
        name: String(body.name),
        role: body.role ? String(body.role) : null,
        company: body.company ? String(body.company) : null,
        photo: body.photo ? String(body.photo) : null,
        quote: String(body.quote),
        rating: body.rating != null ? Number(body.rating) : 5,
        propertyId: body.property_id ? String(body.property_id) : null,
        source: body.source ? String(body.source) : 'mansaluxe-realty',
        published: Boolean(body.published ?? true),
        displayOrder: body.display_order != null ? Number(body.display_order) : 0,
      },
    });
    res.status(201).json(mapTestimonial(t));
  } catch {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// Admin: update
router.put('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const t = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: {
        ...(body.name != null && { name: String(body.name) }),
        ...(body.role !== undefined && { role: body.role ? String(body.role) : null }),
        ...(body.company !== undefined && { company: body.company ? String(body.company) : null }),
        ...(body.photo !== undefined && { photo: body.photo ? String(body.photo) : null }),
        ...(body.quote != null && { quote: String(body.quote) }),
        ...(body.rating !== undefined && { rating: Number(body.rating) }),
        ...(body.property_id !== undefined && { propertyId: body.property_id ? String(body.property_id) : null }),
        ...(body.source !== undefined && { source: String(body.source) }),
        ...(body.published !== undefined && { published: Boolean(body.published) }),
        ...(body.display_order !== undefined && { displayOrder: Number(body.display_order) }),
      },
    });
    res.json(mapTestimonial(t));
  } catch {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// Admin: delete
router.delete('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

function mapTestimonial(t: {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  photo: string | null;
  quote: string;
  rating: number | null;
  propertyId: string | null;
  source: string;
  published: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: t.id,
    name: t.name,
    role: t.role,
    company: t.company,
    photo: t.photo,
    quote: t.quote,
    rating: t.rating,
    property_id: t.propertyId,
    source: t.source,
    published: t.published,
    display_order: t.displayOrder,
    created_at: t.createdAt.toISOString(),
    updated_at: t.updatedAt.toISOString(),
  };
}

export { router as testimonialsRouter };
