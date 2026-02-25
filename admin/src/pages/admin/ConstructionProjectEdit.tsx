import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { constructionProjectsAPI } from '@/lib/blog-api';
import { adminAPI } from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';

const defaultForm = {
  title: '',
  slug: '',
  description: '',
  image_url: '',
  category: 'General',
  location: '',
  duration: '',
  value: '',
  client: '',
  architect: '',
  planning_details: '',
  structural_design: '',
  machines: '' as string,
  materials: '' as string,
  published: true,
  order_index: 0,
};

const ConstructionProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState(defaultForm);
  const [isUploading, setIsUploading] = useState(false);

  const { data: item, isLoading, isError, error } = useQuery({
    queryKey: ['construction-project', id],
    queryFn: () => (id ? constructionProjectsAPI.getItem(id) : Promise.resolve(null)),
    enabled: !isNew && !!id,
  });

  useEffect(() => {
    if (item && typeof item === 'object') {
      setFormData({
        title: String(item.title ?? ''),
        slug: String(item.slug ?? ''),
        description: String(item.description ?? ''),
        image_url: String(item.image_url ?? ''),
        category: String(item.category ?? 'General'),
        location: String(item.location ?? ''),
        duration: String(item.duration ?? ''),
        value: String(item.value ?? ''),
        client: String(item.client ?? ''),
        architect: String(item.architect ?? ''),
        planning_details: String(item.planning_details ?? ''),
        structural_design: String(item.structural_design ?? ''),
        machines: Array.isArray(item.machines) ? item.machines.join('\n') : '',
        materials: Array.isArray(item.materials) ? item.materials.join('\n') : '',
        published: Boolean(item.published),
        order_index: Number(item.order_index) || 0,
      });
    }
  }, [item]);

  useEffect(() => {
    if (formData.title && isNew) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, isNew]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        image_url: data.image_url || '',
        category: data.category || 'General',
        location: data.location || null,
        duration: data.duration || null,
        value: data.value || null,
        client: data.client || null,
        architect: data.architect || null,
        planning_details: data.planning_details || null,
        structural_design: data.structural_design || null,
        machines: data.machines.split('\n').filter(Boolean).map((s) => s.trim()),
        materials: data.materials.split('\n').filter(Boolean).map((s) => s.trim()),
        published: data.published,
        order_index: data.order_index,
      };
      if (isNew) {
        return constructionProjectsAPI.createItem(payload);
      }
      return constructionProjectsAPI.updateItem(id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['construction-projects'] });
      toast({ title: 'Success', description: `Project ${isNew ? 'created' : 'updated'}` });
      navigate('/admin/construction-projects');
    },
    onError: (e: Error) => {
      toast({ title: 'Error', description: e.message || 'Failed to save', variant: 'destructive' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await adminAPI.uploadFile(file, 'construction-projects');
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast({ title: 'Success', description: 'Image uploaded' });
    } catch {
      toast({ title: 'Error', description: 'Upload failed', variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  if (!isNew && isLoading) {
    return <div className="p-6 text-center bg-background text-foreground">Loading...</div>;
  }

  if (!isNew && isError) {
    return (
      <div className="p-6 bg-background text-foreground">
        <Button variant="outline" onClick={() => navigate('/admin/construction-projects')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p className="text-destructive font-medium">Failed to load project</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/construction-projects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isNew ? 'New Project' : 'Edit Project'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Featured project shown on the Construction site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Skyline Tower Complex"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="skyline-tower-complex"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Short project description"
                rows={3}
                required
              />
            </div>
            <div>
              <Label>Featured Image URL</Label>
              <div className="flex flex-wrap gap-2 mt-2 items-center">
                {formData.image_url && (
                  <div className="relative group">
                    <img src={formData.image_url} alt="" className="w-24 h-24 object-cover rounded border" />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image_url: '' }))}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, image_url: e.target.value }))}
                  placeholder="Image URL or upload below"
                  className="flex-1 min-w-[200px]"
                />
                <label className="border-2 border-dashed rounded px-4 py-2 cursor-pointer hover:bg-muted flex items-center gap-2">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                  <Upload className="h-4 w-4" />
                  {isUploading ? 'Uploading...' : 'Upload'}
                </label>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  placeholder="High-Rise, Residential, Commercial, Infrastructure, etc."
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g. Downtown Metropolitan"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                  placeholder="e.g. 36 months"
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData((prev) => ({ ...prev, value: e.target.value }))}
                  placeholder="e.g. ₦150M"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="client">Client</Label>
                <Input
                  id="client"
                  value={formData.client}
                  onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                  placeholder="Client name"
                />
              </div>
              <div>
                <Label htmlFor="architect">Architect</Label>
                <Input
                  id="architect"
                  value={formData.architect}
                  onChange={(e) => setFormData((prev) => ({ ...prev, architect: e.target.value }))}
                  placeholder="Architect / design firm"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="planning_details">Planning & Design (detail page)</Label>
              <Textarea
                id="planning_details"
                value={formData.planning_details}
                onChange={(e) => setFormData((prev) => ({ ...prev, planning_details: e.target.value }))}
                placeholder="Planning and design narrative..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="structural_design">Structural Engineering (detail page)</Label>
              <Textarea
                id="structural_design"
                value={formData.structural_design}
                onChange={(e) => setFormData((prev) => ({ ...prev, structural_design: e.target.value }))}
                placeholder="Structural design narrative..."
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="machines">Machines & Equipment (one per line)</Label>
              <Textarea
                id="machines"
                value={formData.machines}
                onChange={(e) => setFormData((prev) => ({ ...prev, machines: e.target.value }))}
                placeholder="Tower Cranes&#10;Concrete Pumps&#10;Excavators"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="materials">Materials & Components (one per line)</Label>
              <Textarea
                id="materials"
                value={formData.materials}
                onChange={(e) => setFormData((prev) => ({ ...prev, materials: e.target.value }))}
                placeholder="High-strength Concrete&#10;Structural Steel&#10;Curtain Wall Systems"
                rows={3}
              />
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(v) => setFormData((prev) => ({ ...prev, published: v }))}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
            <div>
              <Label htmlFor="order_index">Display Order</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData((prev) => ({ ...prev, order_index: parseInt(e.target.value, 10) || 0 }))}
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

export default ConstructionProjectEdit;
