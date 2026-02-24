import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsletterApi } from '@/lib/api-client';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Newspaper, Search, Calendar, User, Mail } from 'lucide-react';

const SOURCE_OPTIONS = [
  { value: 'all', label: 'All sites' },
  { value: 'group', label: 'Group' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'construction', label: 'Construction' },
  { value: 'mansaluxe-realty', label: 'MansaLuxe Realty' },
];

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  source: string;
  created_at: string;
}

const Newsletter = () => {
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: subscribers = [], isLoading, isError, error } = useQuery({
    queryKey: ['newsletter', sourceFilter],
    queryFn: () =>
      newsletterApi.list(sourceFilter === 'all' ? undefined : sourceFilter) as Promise<Subscriber[]>,
  });

  const filtered = subscribers.filter(
    (s: Subscriber) =>
      !searchTerm ||
      (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sourceLabel = (source: string) =>
    SOURCE_OPTIONS.find((o) => o.value === source)?.label || source;

  if (isLoading) {
    return <div className="p-6 text-center text-foreground">Loading newsletter subscribers...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive font-medium">Failed to load newsletter subscribers</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
        <p className="text-xs text-muted-foreground mt-4">Ensure the backend is running and you are logged in.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Newsletter Subscribers</h1>
        <p className="text-muted-foreground">
          Subscribers from newsletter signups on Group, Entertainment, Construction, and MansaLuxe Realty
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by site" />
          </SelectTrigger>
          <SelectContent>
            {SOURCE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="py-12 text-center">
              <Newspaper className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No newsletter subscribers yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left p-3 font-medium">Email</th>
                    <th className="text-left p-3 font-medium">Name</th>
                    <th className="text-left p-3 font-medium">Site</th>
                    <th className="text-left p-3 font-medium">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((sub: Subscriber) => (
                    <tr key={sub.id} className="border-b hover:bg-muted/30">
                      <td className="p-3">
                        <a href={`mailto:${sub.email}`} className="text-primary hover:underline flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {sub.email}
                        </a>
                      </td>
                      <td className="p-3 text-muted-foreground">
                        {sub.name ? (
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {sub.name}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="p-3">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {sourceLabel(sub.source)}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(sub.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Newsletter;
