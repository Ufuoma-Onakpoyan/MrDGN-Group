import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';

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

function parseJsonObject(s: string | null | undefined): Record<string, unknown> {
  if (!s) return {};
  try {
    const v = JSON.parse(s);
    return typeof v === 'object' && v !== null ? v : {};
  } catch {
    return {};
  }
}

// Public: list sponsored events (optional ?past=true|false)
router.get('/', async (req: Request, res: Response) => {
  try {
    const past = req.query.past as string | undefined;
    const where: { published?: boolean; isPast?: boolean } = { published: true };
    if (past === 'true') where.isPast = true;
    if (past === 'false') where.isPast = false;

    const events = await prisma.sponsoredEvent.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { eventDate: 'desc' }],
    });

    res.json(
      events.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        event_type: e.eventType,
        event_date: e.eventDate,
        event_time: e.eventTime,
        venue: e.venue,
        venue_address: e.venueAddress,
        location: e.location,
        image_url: e.imageUrl,
        presenter: e.presenter,
        featured_artists: parseJsonArray(e.featuredArtists),
        ticket_info: parseJsonObject(e.ticketInfo),
        ticket_outlets: parseJsonArray(e.ticketOutlets),
        contact_phones: parseJsonArray(e.contactPhones),
        sponsors: parseJsonArray(e.sponsors),
        highlights: parseJsonArray(e.highlights),
        extra_note: e.extraNote,
        is_past: e.isPast,
        order_index: e.orderIndex,
      }))
    );
  } catch {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Public: get by slug
router.get('/slug/:slug', async (req: Request, res: Response) => {
  try {
    const event = await prisma.sponsoredEvent.findFirst({
      where: { slug: req.params.slug, published: true },
    });
    if (!event) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json({
      id: event.id,
      title: event.title,
      slug: event.slug,
      description: event.description,
      event_type: event.eventType,
      event_date: event.eventDate,
      event_time: event.eventTime,
      venue: event.venue,
      venue_address: event.venueAddress,
      location: event.location,
      image_url: event.imageUrl,
      presenter: event.presenter,
      featured_artists: parseJsonArray(event.featuredArtists),
      ticket_info: parseJsonObject(event.ticketInfo),
      ticket_outlets: parseJsonArray(event.ticketOutlets),
      contact_phones: parseJsonArray(event.contactPhones),
      sponsors: parseJsonArray(event.sponsors),
      highlights: parseJsonArray(event.highlights),
      extra_note: event.extraNote,
      is_past: event.isPast,
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

export { router as eventsRouter };
