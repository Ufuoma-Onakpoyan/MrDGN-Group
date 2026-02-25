import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { jobsAPI, type JobPosting } from '@/lib/blog-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';

const SOURCE_OPTIONS = [
  { value: 'group', label: 'MrDGN Group' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'construction', label: 'Construction' },
  { value: 'mansaluxe-realty', label: 'MansaLuxe Realty' },
];

const JobEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    department: '',
    location: '',
    employment_type: 'Full-time',
    salary: '',
    requirements: '',
    source: 'group',
    order_index: 0,
    published: true,
  });

  const { data: item, isLoading, isError, error } = useQuery({
    queryKey: ['job', id],
    queryFn: () => (id ? jobsAPI.getItem(id) : Promise.resolve(null)),
    enabled: !isNew && !!id,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        slug: item.slug,
        description: item.description || '',
        department: item.department || '',
        location: item.location || '',
        employment_type: item.employment_type || 'Full-time',
        salary: item.salary || '',
        requirements: (item.requirements || []).join('\n'),
        source: item.source || 'group',
        order_index: item.order_index ?? 0,
        published: item.published,
      });
    }
  }, [item]);

  useEffect(() => {
    if (formData.title && isNew) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, isNew]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        department: data.department || null,
        location: data.location || null,
        employment_type: data.employment_type || null,
        salary: data.salary || null,
        requirements: data.requirements
          .split('\n')
          .filter(Boolean)
          .map((s) => s.trim()),
        source: data.source,
        order_index: data.order_index,
        published: data.published,
      };
      if (isNew) {
        return jobsAPI.createItem(payload);
      }
      return jobsAPI.updateItem(id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Success', description: `Job ${isNew ? 'created' : 'updated'}` });
      navigate('/admin/jobs');
    },
    onError: (e: Error) => {
      toast({
        title: 'Error',
        description: e.message || 'Failed to save',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (!isNew && isLoading) {
    return <div className="p-6 text-center bg-background text-foreground">Loading...</div>;
  }

  if (!isNew && isError) {
    return (
      <div className="p-6 bg-background text-foreground">
        <Button variant="outline" onClick={() => navigate('/admin/jobs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p className="text-destructive font-medium mt-4">Failed to load job</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/jobs')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isNew ? 'New Job' : 'Edit Job'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Job postings appear on careers pages for the selected site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Senior Software Engineer"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="senior-software-engineer"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="Job description"
                rows={3}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, department: e.target.value }))
                  }
                  placeholder="e.g. Engineering, Sales"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, location: e.target.value }))
                  }
                  placeholder="e.g. Lagos, Remote"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="employment_type">Employment Type</Label>
                <Input
                  id="employment_type"
                  value={formData.employment_type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      employment_type: e.target.value,
                    }))
                  }
                  placeholder="Full-time, Part-time, Contract"
                />
              </div>
              <div>
                <Label htmlFor="salary">Salary</Label>
                <Input
                  id="salary"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, salary: e.target.value }))
                  }
                  placeholder="₦80,000 - ₦120,000"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="requirements">Requirements (one per line)</Label>
              <Textarea
                id="requirements"
                value={formData.requirements}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, requirements: e.target.value }))
                }
                placeholder="5+ years experience&#10;Bachelor's degree&#10;Team leadership"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="source">Site (where this job appears)</Label>
              <Select value={formData.source} onValueChange={(v) => setFormData((prev) => ({ ...prev, source: v }))}>
                <SelectTrigger>
                  <SelectValue />
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
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(v) =>
                    setFormData((prev) => ({ ...prev, published: v }))
                  }
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="order_index">Order</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    order_index: parseInt(e.target.value, 10) || 0,
                  }))
                }
              />
            </div>
          </CardContent>
        </Card>
        <Button type="submit" disabled={mutation.isPending}>
          <Save className="h-4 w-4 mr-2" />
          {mutation.isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </div>
  );
};

export default JobEdit;
