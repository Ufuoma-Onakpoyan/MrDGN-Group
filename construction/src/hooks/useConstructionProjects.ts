import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_URL || '';

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

async function fetchProjects(): Promise<ConstructionProject[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}/api/construction/projects`);
  if (!res.ok) return [];
  return res.json();
}

async function fetchProject(id: string): Promise<ConstructionProject | null> {
  if (!API_BASE || !id) return null;
  try {
    const res = await fetch(`${API_BASE}/api/construction/projects/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const useConstructionProjects = () => {
  return useQuery({
    queryKey: ['construction-projects'],
    queryFn: fetchProjects,
  });
};

export const useConstructionProject = (id: string | undefined) => {
  return useQuery({
    queryKey: ['construction-project', id],
    queryFn: () => fetchProject(id!),
    enabled: !!id,
  });
};
