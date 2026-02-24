import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_URL || '';

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

async function fetchJobs(source: string): Promise<JobPosting[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}/api/jobs?source=${encodeURIComponent(source)}`);
  if (!res.ok) return [];
  return res.json();
}

export function useJobs(source: string) {
  return useQuery({
    queryKey: ['jobs', source],
    queryFn: () => fetchJobs(source),
    enabled: !!source,
  });
}
