/**
 * API client for MrDGN backend
 * Set VITE_API_URL in .env (e.g. http://localhost:3001)
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function getToken(): string | null {
  return localStorage.getItem('admin_token');
}

async function request<T>(
  path: string,
  options: RequestInit & { body?: unknown } = {}
): Promise<T> {
  const { body, ...rest } = options;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((rest.headers as Record<string, string>) || {}),
  };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers,
    body: body ? JSON.stringify(body) : rest.body,
  });

  if (res.status === 204) return undefined as T;
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || res.statusText || 'Request failed');
  }
  return data as T;
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; email: string; name: string | null; role: string } }>(
      '/api/auth/login',
      { method: 'POST', body: { email, password } }
    ),
  me: () => request<{ id: string; email: string; name: string | null; role: string }>('/api/auth/me'),
};

// Properties
export const propertiesApi = {
  list: () => request<unknown[]>('/api/properties'),
  get: (id: string) => request<unknown>(`/api/properties/${id}`),
  create: (data: unknown) => request<unknown>('/api/properties', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => request<unknown>(`/api/properties/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request(`/api/properties/${id}`, { method: 'DELETE' }),
};

// Testimonials
export const testimonialsApi = {
  list: (source?: string) => {
    const q = source ? `?source=${encodeURIComponent(source)}` : '';
    return request<unknown[]>(`/api/testimonials${q}`);
  },
  listAdmin: (source?: string) => {
    const q = source ? `?source=${encodeURIComponent(source)}` : '';
    return request<unknown[]>(`/api/testimonials/admin${q}`);
  },
  create: (data: unknown) => request<unknown>('/api/testimonials', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => request<unknown>(`/api/testimonials/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request(`/api/testimonials/${id}`, { method: 'DELETE' }),
};

// Blog
export const blogApi = {
  list: (published?: boolean, source?: string) => {
    const params = new URLSearchParams();
    // Admin needs published=false to see all posts (including drafts). Public defaults to published only.
    if (published === false) params.set('published', 'false');
    else params.set('published', 'true');
    if (source) params.set('source', source);
    return request<unknown[]>(`/api/blog?${params}`);
  },
  get: (id: string) => request<unknown>(`/api/blog/${id}`),
  getBySlug: (slug: string, source?: string) => {
    const url = source ? `/api/blog/slug/${slug}?source=${encodeURIComponent(source)}` : `/api/blog/slug/${slug}`;
    return request<unknown>(url);
  },
  create: (data: unknown) => request<unknown>('/api/blog', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => request<unknown>(`/api/blog/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request(`/api/blog/${id}`, { method: 'DELETE' }),
};

// Jobs (all sites)
export const jobsApi = {
  list: (published?: boolean, source?: string) => {
    const params = new URLSearchParams();
    if (published === false) params.set('published', 'false');
    else params.set('published', 'true');
    if (source) params.set('source', source);
    return request<unknown[]>(`/api/jobs?${params}`);
  },
  get: (id: string) => request<unknown>(`/api/jobs/${id}`),
  create: (data: unknown) => request<unknown>('/api/jobs', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => request<unknown>(`/api/jobs/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request(`/api/jobs/${id}`, { method: 'DELETE' }),
};

// Products (Construction)
export const productsApi = {
  list: (published?: boolean) =>
    request<unknown[]>(`/api/products?published=${published !== false}`),
  get: (id: string) => request<unknown>(`/api/products/${id}`),
  getBySlug: (slug: string) => request<unknown>(`/api/products/slug/${slug}`),
  create: (data: unknown) => request<unknown>('/api/products', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => request<unknown>(`/api/products/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request(`/api/products/${id}`, { method: 'DELETE' }),
};

// Construction projects (construction site featured projects)
export const constructionProjectsApi = {
  list: (published?: boolean) =>
    request<unknown[]>(`/api/construction/projects?published=${published !== false}`),
  get: (id: string) => request<unknown>(`/api/construction/projects/${id}`),
  create: (data: unknown) => request<unknown>('/api/construction/projects', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => request<unknown>(`/api/construction/projects/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request(`/api/construction/projects/${id}`, { method: 'DELETE' }),
};

// Portfolio
export const portfolioApi = {
  list: (published?: boolean) =>
    request<unknown[]>(`/api/portfolio?published=${published !== false}`),
  get: (id: string) => request<unknown>(`/api/portfolio/${id}`),
  create: (data: unknown) => request<unknown>('/api/portfolio', { method: 'POST', body: data }),
  update: (id: string, data: unknown) => request<unknown>(`/api/portfolio/${id}`, { method: 'PUT', body: data }),
  delete: (id: string) => request(`/api/portfolio/${id}`, { method: 'DELETE' }),
};

// Contact (admin)
export const contactApi = {
  list: (source?: string) => {
    const params = new URLSearchParams();
    if (source) params.set('source', source);
    return request<unknown[]>(`/api/contact?${params}`);
  },
};

// Newsletter (admin - list subscribers from all sites)
export const newsletterApi = {
  list: (source?: string) => {
    const params = new URLSearchParams();
    if (source) params.set('source', source);
    return request<unknown[]>(`/api/newsletter?${params}`);
  },
};

// Dashboard
export interface BlogAnalytics {
  source: string;
  post_count: number;
  total_real_views: number;
  total_display_views: number;
  top_posts: Array<{
    id: string;
    title: string;
    slug: string;
    author: string;
    real_views: number;
    display_views: number;
    published_at: string | null;
  }>;
}

export const dashboardApi = {
  stats: () =>
    request<{
      totalProperties: number;
      totalProducts?: number;
      pendingInquiries: number;
      totalTestimonials: number;
      adminUser: number;
      propertiesSold: number;
      monthlyRevenue: string;
    }>('/api/dashboard/stats'),
  blogAnalytics: (source?: string) => {
    const q = source ? `?source=${encodeURIComponent(source)}` : '';
    return request<BlogAnalytics>(`/api/dashboard/blog-analytics${q}`);
  },
};

// Upload
export async function uploadFile(file: File, bucket: string): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  const token = getToken();
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}/api/upload/${bucket}`, {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Upload failed');
  return data.url;
}
