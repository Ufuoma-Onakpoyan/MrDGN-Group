import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { portfolioAPI } from '@/lib/blog-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';

const PortfolioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isNew = !id || id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    featured_image_url: '',
    project_url: '',
    category: 'project',
    technologies: '' as string,
    // Default published to true for new items so they show on the website immediately
    published: true,
  });

  const { data: item, isLoading, isError, error } = useQuery({
    queryKey: ['portfolio-item', id],
    queryFn: () => (id ? portfolioAPI.getItem(id) : Promise.resolve(null)),
    enabled: !isNew && !!id,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        slug: item.slug,
        description: item.description || '',
        content: item.content || '',
        featured_image_url: item.featured_image_url || '',
        project_url: item.project_url || '',
        category: item.category || 'project',
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.technologies || ''),
        published: item.published,
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
        description: data.description,
        content: data.content || null,
        featured_image_url: data.featured_image_url,
        project_url: data.project_url,
        category: data.category,
        technologies: data.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        published: data.published,
      };
      if (isNew) {
        return portfolioAPI.createItem(payload);
      }
      return portfolioAPI.updateItem(id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-items'] });
      toast({ title: "Success", description: `Portfolio item ${isNew ? 'created' : 'updated'}` });
      navigate('/admin/portfolio');
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
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
        <Button variant="outline" onClick={() => navigate('/admin/portfolio')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p className="text-destructive font-medium mt-4">Failed to load portfolio item</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/portfolio')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isNew ? 'New Portfolio Item' : 'Edit Portfolio'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Project title"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-slug"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Project description"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="project_url">Video / Watch URL</Label>
              <Input
                id="project_url"
                value={formData.project_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, project_url: e.target.value }))}
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
              />
              <p className="text-xs text-muted-foreground mt-1">YouTube or Vimeo link for embedding; or any external watch link</p>
            </div>
            <div>
              <Label htmlFor="content">Write-up / Full Description</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                placeholder="Full project write-up shown on the detail page..."
                rows={6}
              />
              <p className="text-xs text-muted-foreground mt-1">Extended content for the project detail page (About This Project section)</p>
            </div>
            <div>
              <Label htmlFor="category">Type / Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="Movie, Short Film, Viral Video, Short Nigerian Stories, YouTube Series, Behind the Scenes"
              />
              <p className="text-xs text-muted-foreground mt-1">e.g. Movie, Short Film, Viral Video, Short Nigerian Stories</p>
            </div>
            <div>
              <Label htmlFor="technologies">Tags (comma-separated)</Label>
              <Input
                id="technologies"
                value={formData.technologies}
                onChange={(e) => setFormData((prev) => ({ ...prev, technologies: e.target.value }))}
                placeholder="Drama, Family, Nigerian Culture"
              />
            </div>
            <div>
              <Label>Featured Image</Label>
              <ImageUpload
                value={formData.featured_image_url}
                onChange={(url) => setFormData((prev) => ({ ...prev, featured_image_url: url }))}
                bucket="portfolio-images"
                placeholder="Upload or enter URL"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="published">Published</Label>
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={mutation.isPending}>
          <Save className="h-4 w-4 mr-2" />
          {mutation.isPending ? 'Saving...' : isNew ? 'Create' : 'Update'}
        </Button>
      </form>
    </div>
  );
};

export default PortfolioEdit;
