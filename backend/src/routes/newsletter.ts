import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware, requireRole } from '../middleware/auth.js';

const router = Router();

const SOURCES = ['group', 'construction', 'entertainment', 'mansaluxe-realty'] as const;

// POST /api/newsletter/subscribe - public newsletter signup
router.post('/subscribe', async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const name = body.name != null ? String(body.name).trim() : null;
    const source = typeof body.source === 'string' && SOURCES.includes(body.source as typeof SOURCES[number])
      ? (body.source as typeof SOURCES[number])
      : 'group';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Valid email is required' });
      return;
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: {
        email_source: { email: email.toLowerCase(), source },
      },
    });

    if (existing) {
      res.status(201).json({ message: 'You are already subscribed.' });
      return;
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        name: name || null,
        source,
      },
    });

    res.status(201).json({ message: 'Thank you for subscribing!' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

// GET /api/newsletter - admin: list subscribers (optional ?source=)
router.get('/', authMiddleware, requireRole('super_admin', 'editor', 'viewer'), async (req, res) => {
  try {
    const source = req.query.source as string | undefined;
    const limit = Math.min(parseInt(String(req.query.limit || 500), 10), 2000);
    const subscribers = await prisma.newsletterSubscriber.findMany({
      where: source && SOURCES.includes(source as typeof SOURCES[number]) ? { source } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    res.json(
      subscribers.map((s) => ({
        id: s.id,
        email: s.email,
        name: s.name,
        source: s.source,
        created_at: s.createdAt.toISOString(),
      }))
    );
  } catch {
    res.status(500).json({ error: 'Failed to fetch subscribers' });
  }
});

export { router as newsletterRouter };
