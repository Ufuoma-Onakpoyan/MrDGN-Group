import { blogApi, portfolioApi, productsApi, jobsApi, constructionProjectsApi, uploadFile as apiUploadFile } from './api-client';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  author: string;
  view_count: number;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  sources?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  category?: string;
  project_url?: string;
  featured_image_url: string;
  images: string[];
  technologies: string[];
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const useApi = !!import.meta.env.VITE_API_URL;

export const blogAPI = {
  async getPosts(source?: string): Promise<BlogPost[]> {
    if (useApi) return blogApi.list(false, source) as Promise<BlogPost[]>;
    return [];
  },
  async getPost(id: string): Promise<BlogPost | null> {
    if (useApi) return blogApi.get(id) as Promise<BlogPost | null>;
    return null;
  },
  async createPost(data: Partial<BlogPost>): Promise<BlogPost> {
    if (useApi) return blogApi.create(data) as Promise<BlogPost>;
    return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as BlogPost;
  },
  async updatePost(id: string, data: Partial<BlogPost>): Promise<BlogPost> {
    if (useApi) return blogApi.update(id, data) as Promise<BlogPost>;
    return { ...data, id } as BlogPost;
  },
  async deletePost(id: string): Promise<void> {
    if (useApi) return blogApi.delete(id);
  },
  async togglePublish(id: string, published: boolean): Promise<void> {
    if (useApi) {
      await blogApi.update(id, { published });
      return;
    }
  },
};

export const portfolioAPI = {
  async getItems(): Promise<PortfolioItem[]> {
    if (useApi) return portfolioApi.list(false) as Promise<PortfolioItem[]>;
    return [];
  },
  async getItem(id: string): Promise<PortfolioItem | null> {
    if (useApi) return portfolioApi.get(id) as Promise<PortfolioItem | null>;
    return null;
  },
  async createItem(data: Partial<PortfolioItem>): Promise<PortfolioItem> {
    if (useApi) return portfolioApi.create(data) as Promise<PortfolioItem>;
    return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as PortfolioItem;
  },
  async updateItem(id: string, data: Partial<PortfolioItem>): Promise<PortfolioItem> {
    if (useApi) return portfolioApi.update(id, data) as Promise<PortfolioItem>;
    return { ...data, id } as PortfolioItem;
  },
  async deleteItem(id: string): Promise<void> {
    if (useApi) return portfolioApi.delete(id);
  },
};

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | null;
  price_unit: string | null;
  category: string;
  images: string[];
  specifications: Record<string, string>;
  features: string[];
  featured: boolean;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const productsAPI = {
  async getItems(): Promise<Product[]> {
    if (useApi) return productsApi.list(false) as Promise<Product[]>;
    return [];
  },
  async getItem(id: string): Promise<Product | null> {
    if (useApi) return productsApi.get(id) as Promise<Product | null>;
    return null;
  },
  async createItem(data: Partial<Product>): Promise<Product> {
    if (useApi) return productsApi.create(data) as Promise<Product>;
    return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as Product;
  },
  async updateItem(id: string, data: Partial<Product>): Promise<Product> {
    if (useApi) return productsApi.update(id, data) as Promise<Product>;
    return { ...data, id } as Product;
  },
  async deleteItem(id: string): Promise<void> {
    if (useApi) return productsApi.delete(id);
  },
};

export interface JobPosting {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  salary: string | null;
  requirements: string[];
  source: string;
  published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ConstructionProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  location: string | null;
  duration: string | null;
  value: string | null;
  client: string | null;
  architect: string | null;
  planning_details: string | null;
  structural_design: string | null;
  machines: string[];
  materials: string[];
  published: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export const constructionProjectsAPI = {
  async getItems(): Promise<ConstructionProject[]> {
    if (useApi) return constructionProjectsApi.list(false) as Promise<ConstructionProject[]>;
    return [];
  },
  async getItem(id: string): Promise<ConstructionProject | null> {
    if (useApi) return constructionProjectsApi.get(id) as Promise<ConstructionProject | null>;
    return null;
  },
  async createItem(data: Partial<ConstructionProject>): Promise<ConstructionProject> {
    if (useApi) return constructionProjectsApi.create(data) as Promise<ConstructionProject>;
    return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as ConstructionProject;
  },
  async updateItem(id: string, data: Partial<ConstructionProject>): Promise<ConstructionProject> {
    if (useApi) return constructionProjectsApi.update(id, data) as Promise<ConstructionProject>;
    return { ...data, id } as ConstructionProject;
  },
  async deleteItem(id: string): Promise<void> {
    if (useApi) return constructionProjectsApi.delete(id);
  },
};

export const jobsAPI = {
  async getItems(source?: string): Promise<JobPosting[]> {
    if (useApi) return jobsApi.list(false, source) as Promise<JobPosting[]>;
    return [];
  },
  async getItem(id: string): Promise<JobPosting | null> {
    if (useApi) return jobsApi.get(id) as Promise<JobPosting | null>;
    return null;
  },
  async createItem(data: Partial<JobPosting>): Promise<JobPosting> {
    if (useApi) return jobsApi.create(data) as Promise<JobPosting>;
    return { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as JobPosting;
  },
  async updateItem(id: string, data: Partial<JobPosting>): Promise<JobPosting> {
    if (useApi) return jobsApi.update(id, data) as Promise<JobPosting>;
    return { ...data, id } as JobPosting;
  },
  async deleteItem(id: string): Promise<void> {
    if (useApi) return jobsApi.delete(id);
  },
};
