import { propertiesApi } from './api-client';

export type ListingType = 'sale' | 'rent' | 'new_development';

export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number | undefined;
  location: string;
  status: 'available' | 'sold' | 'pending';
  listing_type?: ListingType | null;
  latitude?: number | null;
  longitude?: number | null;
  images: string[];
  amenities: string[];
  features: string[];
  agent?: unknown;
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  lot_size?: string;
  year_built?: number;
  created_at: string;
  updated_at: string;
  area?: string;
  type?: string;
  featured?: boolean;
  virtualTourUrl?: string;
  videoUrl?: string;
  floorPlanImages?: string[];
  /** Drone, walkthrough, general videos - labeled "Mansa Luxe Realty Limited" */
  videos?: { drone?: string; walkthrough?: string; general?: string };
  /** Optional thumbnail for listing card when first media is video */
  card_poster_url?: string | null;
  /** Optional: time in video (seconds) the poster image is from */
  card_poster_video_timestamp_seconds?: number | null;
}

export interface CreatePropertyData {
  title: string;
  description?: string;
  price?: string;
  location: string;
  status?: 'available' | 'sold' | 'pending';
  listing_type?: ListingType | null;
  latitude?: number | null;
  longitude?: number | null;
  images?: string[];
  amenities?: string[];
  features?: string[];
  property_type?: string;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  lot_size?: string;
  year_built?: number;
  area?: string;
  type?: string;
  featured?: boolean;
  virtualTourUrl?: string;
  videoUrl?: string;
  floorPlanImages?: string[];
  videos?: { drone?: string; walkthrough?: string; general?: string };
  card_poster_url?: string | null;
  card_poster_video_timestamp_seconds?: number | null;
}

function toApiData(d: CreatePropertyData) {
  const priceVal = (d.price ?? '').toString().trim();
  const parsed = priceVal !== '' ? parseFloat(priceVal.replace(/[^\d.-]/g, '')) : null;
  const price = parsed != null && !Number.isNaN(parsed) ? parsed : null;
  return {
    title: d.title,
    description: d.description,
    price,
    location: d.location,
    status: d.status || 'available',
    listing_type: d.listing_type ?? 'sale',
    latitude: d.latitude,
    longitude: d.longitude,
    images: d.images || [],
    amenities: d.amenities || [],
    features: d.features || [],
    property_type: d.type || d.property_type,
    bedrooms: d.bedrooms,
    bathrooms: d.bathrooms,
    square_feet: d.area ? parseInt(String(d.area).replace(/[^\d]/g, ''), 10) : d.square_feet,
    lot_size: d.lot_size || d.area,
    year_built: d.year_built,
    featured: d.featured,
    agent: d.virtualTourUrl || d.videoUrl ? { virtualTourUrl: d.virtualTourUrl, videoUrl: d.videoUrl } : undefined,
    videos: d.videos ?? undefined,
    card_poster_url: d.card_poster_url != null && d.card_poster_url !== '' ? d.card_poster_url : null,
    card_poster_video_timestamp_seconds: d.card_poster_video_timestamp_seconds != null && d.card_poster_video_timestamp_seconds !== '' ? Number(d.card_poster_video_timestamp_seconds) : null,
  };
}

function fromApi(p: Record<string, unknown>): Property {
  const listingType = p.listing_type as string | undefined;
  return {
    id: String(p.id),
    title: String(p.title),
    description: p.description ? String(p.description) : undefined,
    price: p.price != null ? Number(p.price) : undefined,
    location: String(p.location),
    status: String(p.status || 'available'),
    listing_type: (listingType === 'sale' || listingType === 'rent' || listingType === 'new_development') ? listingType : undefined,
    latitude: p.latitude != null ? Number(p.latitude) : undefined,
    longitude: p.longitude != null ? Number(p.longitude) : undefined,
    images: Array.isArray(p.images) ? p.images.map(String) : [],
    amenities: Array.isArray(p.amenities) ? p.amenities.map(String) : [],
    features: Array.isArray(p.features) ? p.features.map(String) : [],
    bedrooms: p.bedrooms != null ? Number(p.bedrooms) : undefined,
    bathrooms: p.bathrooms != null ? Number(p.bathrooms) : undefined,
    square_feet: p.square_feet != null ? Number(p.square_feet) : undefined,
    lot_size: p.lot_size ? String(p.lot_size) : undefined,
    year_built: p.year_built != null ? Number(p.year_built) : undefined,
    property_type: p.property_type ? String(p.property_type) : undefined,
    featured: Boolean(p.featured),
    agent: p.agent,
    videos: (p.videos && typeof p.videos === 'object') ? p.videos as { drone?: string; walkthrough?: string; general?: string } : undefined,
    card_poster_url: p.card_poster_url != null ? String(p.card_poster_url) : undefined,
    card_poster_video_timestamp_seconds: p.card_poster_video_timestamp_seconds != null ? Number(p.card_poster_video_timestamp_seconds) : undefined,
    created_at: String(p.created_at),
    updated_at: String(p.updated_at),
  };
}

const useApi = !!import.meta.env.VITE_API_URL;

export const propertiesService = {
  async getProperties(): Promise<Property[]> {
    if (useApi) {
      const data = await propertiesApi.list();
      return (data || []).map(fromApi);
    }
    return [];
  },

  async getProperty(id: string): Promise<Property | null> {
    if (useApi) {
      try {
        const p = await propertiesApi.get(id);
        return fromApi(p as Record<string, unknown>);
      } catch {
        return null;
      }
    }
    return null;
  },

  async createProperty(propertyData: CreatePropertyData): Promise<Property> {
    const payload = toApiData(propertyData);
    if (useApi) {
      const p = await propertiesApi.create(payload);
      return fromApi(p as Record<string, unknown>);
    }
    return fromApi({
      id: crypto.randomUUID(),
      ...payload,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  },

  async updateProperty(id: string, propertyData: Partial<CreatePropertyData>): Promise<Property> {
    const payload = toApiData({ title: '', location: '', ...propertyData } as CreatePropertyData);
    if (useApi) {
      const p = await propertiesApi.update(id, payload);
      return fromApi(p as Record<string, unknown>);
    }
    throw new Error('Connect backend to update');
  },

  async deleteProperty(id: string): Promise<void> {
    if (useApi) await propertiesApi.delete(id);
  },
};
