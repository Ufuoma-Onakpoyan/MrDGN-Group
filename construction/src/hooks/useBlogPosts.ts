import { useQuery } from '@tanstack/react-query';

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
  if (!res.ok) return [];
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map((p: BlogPost) => ({
    ...p,
    featured_image_url: normalizeFeaturedImageUrl(p.featured_image_url) || p.featured_image_url || '',
  }));
}

async function fetchPostBySlug(slug: string, source: string): Promise<BlogPost | null> {
  if (!API_BASE) return null;
  try {
    const res = await fetch(`${API_BASE}/api/blog/slug/${slug}?source=${encodeURIComponent(source)}`);
    if (!res.ok) return null;
    const p = await res.json();
    if (!p) return null;
    return {
      ...p,
      featured_image_url: normalizeFeaturedImageUrl(p.featured_image_url) || p.featured_image_url || '',
    };
  } catch {
    return null;
  }
}

export const useBlogPosts = (source = 'construction') => {
  return useQuery({
    queryKey: ['blog-posts', source],
    queryFn: () => fetchPosts(source),
  });
};

export const useBlogPost = (slug: string, source = 'construction') => {
  return useQuery({
    queryKey: ['blog-post', slug, source],
    queryFn: () => fetchPostBySlug(slug, source),
    enabled: !!slug,
  });
};
