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

function mapJob(p: {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  department: string | null;
  location: string | null;
  employmentType: string | null;
  salary: string | null;
  requirements: string;
  source: string;
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
    department: p.department,
    location: p.location,
    employment_type: p.employmentType,
    salary: p.salary,
    requirements: parseJsonArray(p.requirements),
    source: p.source,
    published: p.published,
    order_index: p.orderIndex,
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}

// Public: get published jobs (optional ?source= to filter)
router.get('/', async (req: Request, res: Response) => {
  try {
    const publishedOnly = req.query.published !== 'false';
    const source = req.query.source as string | undefined;
    const jobs = await prisma.jobPosting.findMany({
      where: {
        ...(publishedOnly ? { published: true } : {}),
        ...(source ? { source } : {}),
      },
      orderBy: [{ orderIndex: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(jobs.map(mapJob));
  } catch {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Public: get by slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { slug: req.params.slug, published: true },
    });
    if (!job) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapJob(job));
  } catch {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Public/Admin: get by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const job = await prisma.jobPosting.findUnique({
      where: { id: req.params.id },
    });
    if (!job) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(mapJob(job));
  } catch {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Admin: create
router.post('/', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    const job = await prisma.jobPosting.create({
      data: {
        title: String(body.title),
        slug: String(body.slug),
        description: body.description ? String(body.description) : null,
        department: body.department ? String(body.department) : null,
        location: body.location ? String(body.location) : null,
        employmentType: body.employment_type ? String(body.employment_type) : null,
        salary: body.salary ? String(body.salary) : null,
        requirements: JSON.stringify(Array.isArray(body.requirements) ? body.requirements.map(String) : []),
        source: String(body.source || 'group'),
        published: Boolean(body.published),
        orderIndex: body.order_index != null ? Number(body.order_index) : 0,
      },
    });
    res.status(201).json(mapJob(job));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Admin: update
router.put('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    const job = await prisma.jobPosting.update({
      where: { id: req.params.id },
      data: {
        ...(body.title != null ? { title: String(body.title) } : {}),
        ...(body.slug != null ? { slug: String(body.slug) } : {}),
        ...(body.description !== undefined ? { description: body.description ? String(body.description) : null } : {}),
        ...(body.department !== undefined ? { department: body.department ? String(body.department) : null } : {}),
        ...(body.location !== undefined ? { location: body.location ? String(body.location) : null } : {}),
        ...(body.employment_type !== undefined ? { employmentType: body.employment_type ? String(body.employment_type) : null } : {}),
        ...(body.salary !== undefined ? { salary: body.salary ? String(body.salary) : null } : {}),
        ...(body.requirements ? { requirements: JSON.stringify(Array.isArray(body.requirements) ? body.requirements.map(String) : []) } : {}),
        ...(body.source != null ? { source: String(body.source) } : {}),
        ...(body.published !== undefined ? { published: Boolean(body.published) } : {}),
        ...(body.order_index !== undefined ? { orderIndex: Number(body.order_index) } : {}),
      },
    });
    res.json(mapJob(job));
  } catch {
    res.status(500).json({ error: 'Failed to update job' });
  }
});

// Admin: delete
router.delete('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    await prisma.jobPosting.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

export { router as jobsRouter };
