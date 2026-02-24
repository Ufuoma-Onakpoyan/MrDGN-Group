import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { contactApi } from '@/lib/api-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Search, Calendar, User, MessageSquare } from 'lucide-react';

const SOURCE_OPTIONS = [
  { value: 'all', label: 'All sources' },
  { value: 'group', label: 'Group' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'construction', label: 'Construction' },
  { value: 'mansaluxe-realty', label: 'MansaLuxe Realty' },
  { value: 'contact', label: 'Contact (generic)' },
];

interface ContactSubmission {
  id: string;
  source: string;
  name: string | null;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

const ContactSubmissions = () => {
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: submissions = [], isLoading, isError, error } = useQuery({
    queryKey: ['contact-submissions', sourceFilter],
    queryFn: () => contactApi.list(sourceFilter === 'all' ? undefined : sourceFilter) as Promise<ContactSubmission[]>,
  });

  const filtered = submissions.filter(
    (s: ContactSubmission) =>
      !searchTerm ||
      (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.subject || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.message || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sourceLabel = (source: string) =>
    SOURCE_OPTIONS.find((o) => o.value === source)?.label || source;

  if (isLoading) {
    return <div className="p-6 text-center text-foreground">Loading submissions...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive font-medium">Failed to load contact submissions</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
        <p className="text-xs text-muted-foreground mt-4">Ensure the backend is running and you are logged in.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Contact Submissions</h1>
        <p className="text-muted-foreground">
          Form submissions from all site contact pages (Group, Entertainment, Construction, MansaLuxe Realty)
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sourceFilter} onValueChange={setSourceFilter}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by source" />
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

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No contact submissions found</p>
            </CardContent>
          </Card>
        ) : (
          filtered.map((sub: ContactSubmission) => (
            <Card key={sub.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-lg">{sub.subject || '(No subject)'}</CardTitle>
                  <Badge variant="outline">{sourceLabel(sub.source)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {sub.name && (
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {sub.name}
                    </span>
                  )}
                  <a href={`mailto:${sub.email}`} className="flex items-center gap-1 hover:text-primary">
                    <Mail className="h-4 w-4" />
                    {sub.email}
                  </a>
                  {sub.phone && <span>{sub.phone}</span>}
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(sub.created_at).toLocaleString()}
                  </span>
                </div>
                {sub.message && (
                  <p className="text-sm pt-2 border-t border-border">{sub.message}</p>
                )}
                {sub.metadata && Object.keys(sub.metadata).length > 0 && (
                  <div className="text-xs text-muted-foreground pt-1">
                    {Object.entries(sub.metadata).map(([k, v]) => (
                      <span key={k} className="mr-4">
                        {k}: {String(v)}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ContactSubmissions;
