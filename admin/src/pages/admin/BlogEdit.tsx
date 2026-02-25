import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogAPI } from '@/lib/blog-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save } from 'lucide-react';
import { ImageUpload } from '@/components/ImageUpload';

const ALL_SITES = [
  { id: 'group', label: 'MrDGN Group' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'construction', label: 'Construction' },
  { id: 'mansaluxe-realty', label: 'MansaLuxe Realty' },
] as const;

const BlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // /admin/blog/new has no :id param, so id is undefined; treat as new post
  const isNewPost = !id || id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: '',
    featured_image_url: '',
    published: false,
    sources: ['group', 'entertainment', 'construction', 'mansaluxe-realty'] as string[],
  });

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => (id ? blogAPI.getPost(id) : Promise.resolve(null)),
    enabled: !isNewPost && !!id,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || '',
        tags: (post.tags || []).join(', '),
        featured_image_url: post.featured_image_url || '',
        published: post.published,
        sources: (post.sources && post.sources.length > 0)
          ? post.sources
          : ['group', 'entertainment', 'construction', 'mansaluxe-realty'],
      });
    }
  }, [post]);

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const tagsArray = data.tags.split(',').map((t) => t.trim()).filter(Boolean);
      const postData = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || '',
        tags: tagsArray,
        featured_image_url: data.featured_image_url || '',
        published: data.published,
        sources: data.sources.length > 0 ? data.sources : ['group', 'entertainment', 'construction', 'mansaluxe-realty'],
      };

      if (isNewPost) {
        return blogAPI.createPost(postData);
      } else {
        return blogAPI.updatePost(id!, postData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast({ title: "Success", description: `Blog post ${isNewPost ? 'created' : 'updated'} successfully` });
      navigate('/admin/blog');
    },
    onError: () => {
      toast({ title: "Error", description: `Failed to ${isNewPost ? 'create' : 'update'} blog post`, variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug || !formData.content) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    mutation.mutate(formData);
  };

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({ ...prev, title, slug: prev.slug || generateSlug(title) }));
  };

  if (!isNewPost && isLoading) {
    return <div className="p-6 text-center bg-background text-foreground">Loading blog post...</div>;
  }

  if (!isNewPost && isError) {
    return (
      <div className="p-6 bg-background text-foreground">
        <Button variant="outline" onClick={() => navigate('/admin/blog')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        <p className="text-destructive font-medium mt-4">Failed to load blog post</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/blog')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>
        <h1 className="text-3xl font-bold">{isNewPost ? 'Create New Post' : 'Edit Post'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-friendly-slug"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your content..."
                    rows={15}
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, published: checked }))}
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                <div>
                  <Label>Featured Image</Label>
                  <ImageUpload
                    value={formData.featured_image_url}
                    onChange={(url) => setFormData((prev) => ({ ...prev, featured_image_url: url }))}
                    bucket="blog-images"
                    placeholder="Upload or enter URL"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Shown on blog list and full post. Placeholders: /assets/blog/blog-placeholder.svg, /assets/blog/lifestyle-placeholder.svg
                  </p>
                </div>
                <div className="space-y-3">
                  <Label>Show on sites</Label>
                  <p className="text-xs text-muted-foreground">
                    Select which websites this post appears on. Post to all sites or choose specific ones.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="all-sites"
                        checked={formData.sources.length === ALL_SITES.length}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({
                            ...prev,
                            sources: checked ? ALL_SITES.map((s) => s.id) : [],
                          }));
                        }}
                      />
                      <label htmlFor="all-sites" className="text-sm font-medium cursor-pointer">
                        All sites
                      </label>
                    </div>
                    {ALL_SITES.map((site) => (
                      <div key={site.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={site.id}
                          checked={formData.sources.includes(site.id)}
                          onCheckedChange={(checked) => {
                            setFormData((prev) => {
                              const next = checked
                                ? [...prev.sources, site.id]
                                : prev.sources.filter((s) => s !== site.id);
                              return { ...prev, sources: next };
                            });
                          }}
                        />
                        <label htmlFor={site.id} className="text-sm cursor-pointer">
                          {site.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  {formData.sources.length > 0 && formData.sources.length < ALL_SITES.length && (
                    <p className="text-xs text-muted-foreground">
                      Shown on: {formData.sources.map((id) => ALL_SITES.find((s) => s.id === id)?.label).join(', ')}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {mutation.isPending ? 'Saving...' : isNewPost ? 'Create Post' : 'Update Post'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogEdit;
