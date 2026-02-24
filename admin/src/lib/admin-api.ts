import {
  propertiesApi,
  testimonialsApi,
  dashboardApi,
  uploadFile as apiUploadFile,
} from './api-client';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  property_type: string;
  status: string;
  featured: boolean;
  images: string[];
  amenities: string[];
  features: string[];
  lot_size?: string;
  year_built?: number;
  agent?: unknown;
  created_at: string;
  updated_at: string;
}

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  quote: string;
  rating?: number;
  property_id?: string;
  source?: string;
  published: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin';
  status: string;
  avatar: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  twoFactorEnabled: boolean;
  permissions: string[];
}

interface DashboardStats {
  totalProperties: number;
  totalProducts?: number;
  totalContacts?: number;
  totalBlogPosts?: number;
  totalJobs?: number;
  pendingInquiries: number;
  totalTestimonials: number;
  adminUser: number;
  propertiesSold: number;
  monthlyRevenue: string;
  recentContacts?: Array<{ id: string; source: string; name: string | null; email: string; subject: string | null; created_at: string }>;
  recentBlogPosts?: Array<{ id: string; title: string; slug: string; published_at: string | null }>;
}

const useApi = !!import.meta.env.VITE_API_URL;

class AdminAPI {
  async uploadFile(file: File, bucket: string): Promise<string> {
    if (useApi) return apiUploadFile(file, bucket);
    return `/assets/placeholder.svg?t=${Date.now()}`;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    if (useApi) return dashboardApi.stats() as Promise<DashboardStats>;
    return {
      totalProperties: 0,
      totalProducts: 0,
      pendingInquiries: 0,
      totalTestimonials: 0,
      adminUser: 0,
      propertiesSold: 0,
      monthlyRevenue: '₦0M',
    };
  }

  async getProperties(): Promise<Property[]> {
    if (useApi) return propertiesApi.list() as Promise<Property[]>;
    return [];
  }

  async getProperty(id: string): Promise<Property> {
    if (useApi) return propertiesApi.get(id) as Promise<Property>;
    throw new Error('Property not found');
  }

  async createProperty(property: Omit<Property, 'id' | 'created_at' | 'updated_at'>): Promise<Property> {
    if (useApi) return propertiesApi.create(property) as Promise<Property>;
    return { ...property, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Property;
  }

  async updateProperty(id: string, updates: Partial<Property>): Promise<Property> {
    if (useApi) return propertiesApi.update(id, updates) as Promise<Property>;
    return updates as Property;
  }

  async deleteProperty(id: string): Promise<void> {
    if (useApi) return propertiesApi.delete(id);
  }

  async getTestimonials(source?: string): Promise<Testimonial[]> {
    if (useApi) return testimonialsApi.listAdmin(source) as Promise<Testimonial[]>;
    return [];
  }

  async getTestimonial(id: string): Promise<Testimonial> {
    if (useApi) {
      const list = await testimonialsApi.listAdmin() as Testimonial[];
      const t = list.find((x) => x.id === id);
      if (!t) throw new Error('Testimonial not found');
      return t;
    }
    throw new Error('Testimonial not found');
  }

  async createTestimonial(data: Omit<Testimonial, 'id' | 'created_at' | 'updated_at'> & { source?: string }): Promise<Testimonial> {
    if (useApi) return testimonialsApi.create(data) as Promise<Testimonial>;
    return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Testimonial;
  }

  async updateTestimonial(id: string, updates: Partial<Testimonial>): Promise<Testimonial> {
    if (useApi) return testimonialsApi.update(id, updates) as Promise<Testimonial>;
    return updates as Testimonial;
  }

  async deleteTestimonial(id: string): Promise<void> {
    if (useApi) return testimonialsApi.delete(id);
  }

  async getUsers(): Promise<User[]> {
    return [];
  }

  async getSettings(): Promise<Record<string, unknown>> {
    return {
      companyName: 'MansaLuxeRealty',
      companySubtitle: 'A subsidiary of MrDGNGroup',
      primaryColor: '#D4AF37',
      secondaryColor: '#000000',
      currency: '₦',
      timezone: 'Africa/Lagos',
      language: 'en',
      emailNotifications: true,
      maintenanceMode: false,
    };
  }

  async updateSettings(settings: Record<string, unknown>): Promise<Record<string, unknown>> {
    return settings;
  }
}

export const adminAPI = new AdminAPI();
export type { Property, Testimonial, User, DashboardStats };
