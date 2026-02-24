import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsAPI, type JobPosting } from '@/lib/blog-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, Search, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOURCE_OPTIONS = [
  { value: 'all', label: 'All sites' },
  { value: 'group', label: 'MrDGN Group' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'construction', label: 'Construction' },
  { value: 'mansaluxe-realty', label: 'MansaLuxe Realty' },
];

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading, isError, error } = useQuery({
    queryKey: ['jobs', sourceFilter],
    queryFn: () => jobsAPI.getItems(sourceFilter === 'all' ? undefined : sourceFilter),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => jobsAPI.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Success', description: 'Job deleted successfully' });
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete job', variant: 'destructive' });
    },
  });

  const filteredItems = items.filter(
    (item: JobPosting) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.department || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6 text-center text-foreground">Loading jobs...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <p className="text-destructive font-medium">Failed to load jobs</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
        <p className="text-xs text-muted-foreground mt-4">Ensure the backend is running and VITE_API_URL is set.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Job Postings</h1>
          <p className="text-muted-foreground">
            Career opportunities across MrDGN Group sites
          </p>
        </div>
        <Link to="/admin/jobs/new">
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            New Job
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
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

      <div className="grid gap-6">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <div className="text-muted-foreground">No jobs found</div>
              <p className="text-sm text-muted-foreground mt-2">
                Add job postings to display on careers pages
              </p>
              <Link to="/admin/jobs/new">
                <Button className="mt-4">Add Job</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item: JobPosting) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description || '—'}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">{item.source}</Badge>
                      <Badge variant="secondary">{item.department || '—'}</Badge>
                      <Badge variant={item.published ? 'default' : 'secondary'}>
                        {item.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={`/admin/jobs/edit/${item.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    if (window.confirm('Delete this job?')) deleteMutation.mutate(item.id);
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default JobsList;
