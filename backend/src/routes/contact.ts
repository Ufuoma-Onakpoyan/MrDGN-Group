import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/contact - admin: list contact submissions
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const source = req.query.source as string | undefined;
    const limit = Math.min(parseInt(String(req.query.limit || 100), 10), 500);
    const submissions = await prisma.contactSubmission.findMany({
      where: source ? { source } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    res.json(
      submissions.map((s) => ({
        id: s.id,
        source: s.source,
        name: s.name,
        email: s.email,
        phone: s.phone,
        subject: s.subject,
        message: s.message,
        metadata: (() => {
        try {
          return s.metadata ? JSON.parse(s.metadata) : null;
        } catch {
          return s.metadata;
        }
      })(),
        created_at: s.createdAt.toISOString(),
      }))
    );
  } catch {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// POST /api/contact - public contact form
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    await prisma.contactSubmission.create({
      data: {
        source: String(body.source || 'contact'),
        name: body.name ? String(body.name) : null,
        email: String(body.email),
        phone: body.phone ? String(body.phone) : null,
        subject: body.subject ? String(body.subject) : null,
        message: body.message ? String(body.message) : null,
        metadata: body.metadata != null ? JSON.stringify(body.metadata) : null,
      },
    });
    res.status(201).json({ message: 'Thank you. We will contact you soon.' });
  } catch {
    res.status(500).json({ error: 'Failed to submit' });
  }
});

export { router as contactRouter };
