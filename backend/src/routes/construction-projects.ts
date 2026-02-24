import { Router, type Request, type Response } from 'express';
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

function mapProject(p: {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  category: string;
  location: string | null;
  duration: string | null;
  value: string | null;
  client: string | null;
  architect: string | null;
  planningDetails: string | null;
  structuralDesign: string | null;
  machines: string;
  materials: string;
  published: boolean;
  orderIndex: number;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    image_url: p.imageUrl,
    category: p.category,
    location: p.location,
    duration: p.duration,
    value: p.value,
    client: p.client,
    architect: p.architect,
    planning_details: p.planningDetails,
    structural_design: p.structuralDesign,
    machines: parseJsonArray(p.machines),
    materials: parseJsonArray(p.materials),
    published: p.published,
    order_index: p.orderIndex,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}

// Public: get published projects (construction site)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const items = await prisma.constructionProject.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(items.map(mapProject));
  } catch {
    res.status(500).json({ error: 'Failed to fetch construction projects' });
  }
});

// Public: get by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await prisma.constructionProject.findUnique({
      where: { id: req.params.id },
    });
    if (!item) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapProject(item));
  } catch {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Admin: create
router.post('/', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    const item = await prisma.constructionProject.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        description: String(body.description ?? ''),
        imageUrl: String(body.image_url ?? ''),
        category: String(body.category ?? 'General'),
        location: body.location ? String(body.location) : null,
        duration: body.duration ? String(body.duration) : null,
        value: body.value ? String(body.value) : null,
        client: body.client ? String(body.client) : null,
        architect: body.architect ? String(body.architect) : null,
        planningDetails: body.planning_details ? String(body.planning_details) : null,
        structuralDesign: body.structural_design ? String(body.structural_design) : null,
        machines: JSON.stringify(Array.isArray(body.machines) ? body.machines.map(String) : []),
        materials: JSON.stringify(Array.isArray(body.materials) ? body.materials.map(String) : []),
        published: Boolean(body.published),
        orderIndex: body.order_index != null ? Number(body.order_index) : 0,
      },
    });
    res.status(201).json(mapProject(item));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Admin: update
router.put('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    const item = await prisma.constructionProject.update({
      where: { id: req.params.id },
      data: {
        ...(body.title != null ? { title: String(body.title) } : {}),
        ...(body.slug != null ? { slug: String(body.slug) } : {}),
        ...(body.description !== undefined ? { description: String(body.description ?? '') } : {}),
        ...(body.image_url !== undefined ? { imageUrl: String(body.image_url ?? '') } : {}),
        ...(body.category != null ? { category: String(body.category) } : {}),
        ...(body.location !== undefined ? { location: body.location ? String(body.location) : null } : {}),
        ...(body.duration !== undefined ? { duration: body.duration ? String(body.duration) : null } : {}),
        ...(body.value !== undefined ? { value: body.value ? String(body.value) : null } : {}),
        ...(body.client !== undefined ? { client: body.client ? String(body.client) : null } : {}),
        ...(body.architect !== undefined ? { architect: body.architect ? String(body.architect) : null } : {}),
        ...(body.planning_details !== undefined ? { planningDetails: body.planning_details ? String(body.planning_details) : null } : {}),
        ...(body.structural_design !== undefined ? { structuralDesign: body.structural_design ? String(body.structural_design) : null } : {}),
        ...(body.machines ? { machines: JSON.stringify(Array.isArray(body.machines) ? body.machines.map(String) : []) } : {}),
        ...(body.materials ? { materials: JSON.stringify(Array.isArray(body.materials) ? body.materials.map(String) : []) } : {}),
        ...(body.published !== undefined ? { published: Boolean(body.published) } : {}),
        ...(body.order_index !== undefined ? { orderIndex: Number(body.order_index) } : {}),
      },
    });
    res.json(mapProject(item));
  } catch {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Admin: delete
router.delete('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    await prisma.constructionProject.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export { router as constructionProjectsRouter };
