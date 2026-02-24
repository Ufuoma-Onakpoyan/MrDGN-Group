const API_BASE = import.meta.env.VITE_API_URL || '';

export type ListingType = 'sale' | 'rent' | 'new_development';

export interface Property {
  id: string;
  title: string;
  description: string | null;
  price: number;
  location: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  lot_size: string | null;
  property_type: string | null;
  status: string;
  listing_type?: ListingType | null;
  latitude?: number | null;
  longitude?: number | null;
  images: string[] | null;
  amenities: string[] | null;
  features: string[] | null;
  year_built: number | null;
  agent: unknown | null;
  featured: boolean | null;
  videos?: { drone?: string; walkthrough?: string; general?: string } | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  photo: string | null;
  quote: string;
  rating: number | null;
  property_id: string | null;
  created_at: string;
  updated_at: string;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = typeof data?.message === 'string' ? data.message : typeof data?.error === 'string' ? data.error : res.statusText || 'Request failed';
    throw new Error(message);
  }
  return data as T;
}

class ApiService {
  async getPublishedProperties(): Promise<Property[]> {
    if (!API_BASE) return [];
    const data = await get<Property[]>('/api/properties');
    return (data || []).filter((p) => ['available', 'sold'].includes(p.status));
  }

  async getSoldProperties(): Promise<Property[]> {
    if (!API_BASE) return [];
    const data = await get<Property[]>('/api/properties');
    return (data || []).filter((p) => p.status === 'sold');
  }

  async getFeaturedProperties(): Promise<Property[]> {
    if (!API_BASE) return [];
    const data = await get<Property[]>('/api/properties');
    return (data || [])
      .filter((p) => Boolean(p.featured) && String(p.status || '').toLowerCase() === 'available')
      .slice(0, 3);
  }

  async getProperty(id: string): Promise<Property | null> {
    if (!API_BASE) return null;
    try {
      return await get<Property>(`/api/properties/${id}`);
    } catch {
      return null;
    }
  }

  async getTestimonials(): Promise<Testimonial[]> {
    if (!API_BASE) return [];
    return get<Testimonial[]>('/api/testimonials');
  }

  async searchProperties(_filters: {
    location?: string;
    property_type?: string;
    minBedrooms?: number;
    minBathrooms?: number;
    priceRange?: [number, number];
  }): Promise<Property[]> {
    if (!API_BASE) return [];
    const data = await get<Property[]>('/api/properties');
    return (data || []).filter((p) => p.status === 'available');
  }

  formatPrice(price: number): string {
    return `₦${price.toLocaleString()}`;
  }
}

export const apiService = new ApiService();
