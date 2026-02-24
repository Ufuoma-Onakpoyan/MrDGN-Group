import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_URL || '';

export interface SponsoredEventResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  event_type: string;
  event_date: string | null;
  event_time: string | null;
  venue: string | null;
  venue_address: string | null;
  location: string | null;
  image_url: string | null;
  presenter: string | null;
  featured_artists: string[];
  ticket_info: Record<string, unknown>;
  ticket_outlets: string[];
  contact_phones: string[];
  sponsors: string[];
  highlights: string[];
  extra_note: string | null;
  is_past: boolean;
  order_index?: number;
}

async function fetchEvents(past: boolean | undefined): Promise<SponsoredEventResponse[]> {
  const params = new URLSearchParams();
  if (past === true) params.set('past', 'true');
  if (past === false) params.set('past', 'false');
  const q = params.toString();
  const url = `${API_BASE}/api/events${q ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export function useEvents(options?: { past?: boolean }) {
  return useQuery({
    queryKey: ['events', options?.past],
    queryFn: () => fetchEvents(options?.past),
  });
}

export function usePastEvents() {
  return useEvents({ past: true });
}

export function useUpcomingEvents() {
  return useEvents({ past: false });
}
