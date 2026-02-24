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

function parseJsonObject<T = Record<string, unknown>>(s: string | null | undefined): T | null {
  if (!s) return null;
  try {
    const v = JSON.parse(s);
    return typeof v === 'object' && v !== null ? (v as T) : null;
  } catch {
    return null;
  }
}

function mapProperty(p: Record<string, unknown> & {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeet: number | null;
  lotSize: string | null;
  yearBuilt: number | null;
  propertyType: string | null;
  status: string;
  featured: boolean;
  images: string;
  amenities: string;
  features: string;
  agent: string | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    location: p.location,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    square_feet: p.squareFeet,
    lot_size: p.lotSize,
    year_built: p.yearBuilt,
    property_type: p.propertyType,
    status: p.status,
    featured: p.featured,
    images: parseJsonArray(p.images),
    amenities: parseJsonArray(p.amenities),
    features: parseJsonArray(p.features),
    agent: (() => {
      if (!p.agent) return null;
      try {
        return JSON.parse(p.agent) as unknown;
      } catch {
        return null;
      }
    })(),
    latitude: p.latitude != null ? Number(p.latitude) : null,
    longitude: p.longitude != null ? Number(p.longitude) : null,
    listing_type: p.listingType ?? null,
    videos: parseJsonObject<{ drone?: string; walkthrough?: string; general?: string }>(p.videos as string | null),
    created_at: p.createdAt.toISOString(),
    updated_at: p.updatedAt.toISOString(),
  };
}

router.get('/', async (_req: Request, res: Response) => {
  try {
    const props = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(props.map(mapProperty));
  } catch {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const p = await prisma.property.findUnique({
      where: { id: req.params.id },
    });
    if (!p) {
      res.status(404).json({ error: 'Property not found' });
      return;
    }
    res.json(mapProperty(p));
  } catch {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

router.post('/', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    const body = req.body as Record<string, unknown>;
    const p = await prisma.property.create({
      data: {
        title: String(body.title),
        description: body.description ? String(body.description) : null,
        price: Number(body.price),
        location: String(body.location),
        bedrooms: body.bedrooms != null ? Number(body.bedrooms) : null,
        bathrooms: body.bathrooms != null ? Number(body.bathrooms) : null,
        squareFeet: body.square_feet != null ? Number(body.square_feet) : null,
        lotSize: body.lot_size ? String(body.lot_size) : null,
        yearBuilt: body.year_built != null ? Number(body.year_built) : null,
        propertyType: body.property_type ? String(body.property_type) : null,
        status: body.status ? String(body.status) : 'available',
        featured: Boolean(body.featured),
        images: JSON.stringify(Array.isArray(body.images) ? body.images.map(String) : []),
        amenities: JSON.stringify(Array.isArray(body.amenities) ? body.amenities.map(String) : []),
        features: JSON.stringify(Array.isArray(body.features) ? body.features.map(String) : []),
        agent: body.agent != null ? JSON.stringify(body.agent) : null,
        latitude: body.latitude != null ? Number(body.latitude) : null,
        longitude: body.longitude != null ? Number(body.longitude) : null,
        listingType: body.listing_type ? String(body.listing_type) : null,
        videos: body.videos != null ? JSON.stringify(body.videos) : null,
      },
    });
    res.status(201).json(mapProperty(p));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

router.put('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req, res) => {
  try {
    const body = req.body as Record<string, unknown>;
    const p = await prisma.property.update({
      where: { id: req.params.id },
      data: {
        ...(body.title != null && { title: String(body.title) }),
        ...(body.description !== undefined && { description: body.description ? String(body.description) : null }),
        ...(body.price != null && { price: Number(body.price) }),
        ...(body.location != null && { location: String(body.location) }),
        ...(body.bedrooms !== undefined && { bedrooms: body.bedrooms != null ? Number(body.bedrooms) : null }),
        ...(body.bathrooms !== undefined && { bathrooms: body.bathrooms != null ? Number(body.bathrooms) : null }),
        ...(body.square_feet !== undefined && { squareFeet: body.square_feet != null ? Number(body.square_feet) : null }),
        ...(body.lot_size !== undefined && { lotSize: body.lot_size ? String(body.lot_size) : null }),
        ...(body.year_built !== undefined && { yearBuilt: body.year_built != null ? Number(body.year_built) : null }),
        ...(body.property_type !== undefined && { propertyType: body.property_type ? String(body.property_type) : null }),
        ...(body.status != null && { status: String(body.status) }),
        ...(body.featured !== undefined && { featured: Boolean(body.featured) }),
        ...(body.images ? { images: JSON.stringify(Array.isArray(body.images) ? body.images.map(String) : []) } : {}),
        ...(body.amenities ? { amenities: JSON.stringify(Array.isArray(body.amenities) ? body.amenities.map(String) : []) } : {}),
        ...(body.features ? { features: JSON.stringify(Array.isArray(body.features) ? body.features.map(String) : []) } : {}),
        ...(body.agent !== undefined && { agent: body.agent != null ? JSON.stringify(body.agent) : null }),
        ...(body.latitude !== undefined && { latitude: body.latitude != null ? Number(body.latitude) : null }),
        ...(body.longitude !== undefined && { longitude: body.longitude != null ? Number(body.longitude) : null }),
        ...(body.listing_type !== undefined && { listingType: body.listing_type ? String(body.listing_type) : null }),
        ...(body.videos !== undefined && { videos: body.videos != null ? JSON.stringify(body.videos) : null }),
      },
    });
    res.json(mapProperty(p));
  } catch {
    res.status(500).json({ error: 'Failed to update property' });
  }
});

router.delete('/:id', authMiddleware, requireRole('super_admin', 'editor'), async (req: Request, res: Response) => {
  try {
    await prisma.property.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

export { router as propertiesRouter };
