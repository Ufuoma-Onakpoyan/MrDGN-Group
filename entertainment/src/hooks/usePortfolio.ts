import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_URL || '';

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  category: string;
  featured_image_url: string | null;
  images: string[];
  technologies: string[];
  project_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

async function fetchPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  if (!API_BASE || !slug) return null;
  try {
    const res = await fetch(`${API_BASE}/api/portfolio/slug/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function fetchPortfolio(): Promise<PortfolioItem[]> {
  if (!API_BASE) return [];
  try {
    const res = await fetch(`${API_BASE}/api/portfolio?published=true`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function usePortfolio() {
  return useQuery({
    queryKey: ['portfolio'],
    queryFn: fetchPortfolio,
  });
}

export function usePortfolioItem(slug: string) {
  return useQuery({
    queryKey: ['portfolio-item', slug],
    queryFn: () => fetchPortfolioItemBySlug(slug),
    enabled: !!slug,
  });
}
