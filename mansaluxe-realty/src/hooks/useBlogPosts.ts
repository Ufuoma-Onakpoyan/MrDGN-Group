import { useQuery } from '@tanstack/react-query';

/** Blog posts are always fetched from the backend API (VITE_API_URL). No hardcoded posts. */
const API_BASE = import.meta.env.VITE_API_URL || '';

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
}

/** Resolve relative featured image URLs to absolute using API origin so images load on all sites. */
function normalizeFeaturedImageUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== 'string') return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url;
  if (url.startsWith('/')) return API_BASE ? `${API_BASE.replace(/\/$/, '')}${url}` : url;
  return url;
}

async function fetchPosts(source: string): Promise<BlogPost[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}/api/blog?source=${encodeURIComponent(source)}`);
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    const msg = data?.message ?? data?.error ?? `Failed to load posts (${res.status})`;
    throw new Error(typeof msg === 'string' ? msg : 'Failed to load posts');
  }
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map((p: BlogPost) => ({
    ...p,
    featured_image_url: normalizeFeaturedImageUrl(p.featured_image_url) || p.featured_image_url || '',
  }));
}

async function fetchPostBySlug(slug: string, source: string): Promise<BlogPost | null> {
  if (!API_BASE) return null;
  const res = await fetch(`${API_BASE}/api/blog/slug/${slug}?source=${encodeURIComponent(source)}`);
  if (!res.ok) {
    if (res.status === 404) return null;
    const data = await res.json().catch(() => ({}));
    const msg = data?.message ?? data?.error ?? `Failed to load post (${res.status})`;
    throw new Error(typeof msg === 'string' ? msg : 'Failed to load post');
  }
  const p = await res.json();
  if (!p) return null;
  return {
    ...p,
    featured_image_url: normalizeFeaturedImageUrl(p.featured_image_url) || p.featured_image_url || '',
  };
}

export const useBlogPosts = (source = 'mansaluxe-realty') => {
  return useQuery({
    queryKey: ['blog-posts', source],
    queryFn: () => fetchPosts(source),
  });
};

export const useBlogPost = (slug: string, source = 'mansaluxe-realty') => {
  return useQuery({
    queryKey: ['blog-post', slug, source],
    queryFn: () => fetchPostBySlug(slug, source),
    enabled: !!slug,
  });
};
