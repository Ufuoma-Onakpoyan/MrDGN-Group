import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsAPI } from '@/lib/blog-api';
import { adminAPI } from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    price_unit: 'per piece',
    category: 'general',
    images: [] as string[],
    specifications: '{}',
    features: '' as string,
    featured: false,
    order_index: 0,
    published: true,
  });
  const [isUploading, setIsUploading] = useState(false);

  const { data: item, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => (id ? productsAPI.getItem(id) : Promise.resolve(null)),
    enabled: !isNew && !!id,
  });

  useEffect(() => {
    if (item && typeof item === 'object') {
      const specs = item.specifications;
      const specsStr = typeof specs === 'object' && specs !== null
        ? JSON.stringify(specs, null, 2)
        : (typeof specs === 'string' ? specs : '{}');
      setFormData({
        title: String(item.title ?? ''),
        slug: String(item.slug ?? ''),
        description: String(item.description ?? ''),
        price: item.price != null ? String(item.price) : '',
        price_unit: String(item.price_unit ?? 'per piece'),
        category: String(item.category ?? 'general'),
        images: Array.isArray(item.images) ? [...item.images] : [],
        specifications: specsStr,
        features: Array.isArray(item.features) ? item.features.join('\n') : '',
        featured: Boolean(item.featured),
        order_index: Number(item.order_index) || 0,
        published: Boolean(item.published),
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
      let specs: Record<string, string> = {};
      try {
        specs = JSON.parse(data.specifications || '{}');
      } catch {
        // ignore
      }
      const payload = {
        title: data.title,
        slug: data.slug,
        description: data.description || null,
        price: data.price ? parseFloat(data.price) : null,
        price_unit: data.price_unit || null,
        category: data.category,
        images: data.images,
        specifications: Object.keys(specs).length ? specs : null,
        features: data.features.split('\n').filter(Boolean).map(s => s.trim()),
        featured: data.featured,
        order_index: data.order_index,
        published: data.published,
      };
      if (isNew) {
        return productsAPI.createItem(payload);
      }
      return productsAPI.updateItem(id!, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "Success", description: `Product ${isNew ? 'created' : 'updated'}` });
      navigate('/admin/products');
    },
    onError: (e: Error) => {
      toast({ title: "Error", description: e.message || "Failed to save", variant: "destructive" });
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
      const url = await adminAPI.uploadFile(file, 'product-images');
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
      toast({ title: "Success", description: "Image uploaded" });
    } catch {
      toast({ title: "Error", description: "Upload failed", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (idx: number) => {
    setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  if (!isNew && isLoading) {
    return <div className="p-6 text-center bg-background text-foreground">Loading...</div>;
  }

  if (!isNew && isError) {
    return (
      <div className="p-6 bg-background text-foreground">
        <Button variant="outline" onClick={() => navigate('/admin/products')} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <p className="text-destructive font-medium">Failed to load product</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{isNew ? 'New Product' : 'Edit Product'}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Construction products shown on the Construction site</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. High-Quality Solid Blocks"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="solid-blocks"
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
                placeholder="Product description"
                rows={3}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                  placeholder="450"
                />
                <p className="text-xs text-muted-foreground mt-1">Leave empty for &quot;Price on request&quot;</p>
              </div>
              <div>
                <Label htmlFor="price_unit">Price Unit</Label>
                <Input
                  id="price_unit"
                  value={formData.price_unit}
                  onChange={(e) => setFormData((prev) => ({ ...prev, price_unit: e.target.value }))}
                  placeholder="per piece, per m², per 50kg bag"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="blocks, pavers, cement, kerbs"
              />
            </div>
            <div>
              <Label>Images</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.images.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img src={url} alt="" className="w-20 h-20 object-cover rounded border" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <label className="w-20 h-20 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-muted">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </label>
              </div>
            </div>
            <div>
              <Label htmlFor="specifications">Specifications (JSON)</Label>
              <Textarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) => setFormData((prev) => ({ ...prev, specifications: e.target.value }))}
                placeholder='{"Compressive Strength": "20-40 MPa", "Sizes": "100mm, 150mm"}'
                rows={4}
                className="font-mono text-sm"
              />
            </div>
            <div>
              <Label htmlFor="features">Features (one per line)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData((prev) => ({ ...prev, features: e.target.value }))}
                placeholder="Various sizes available&#10;Weather resistant&#10;High compressive strength"
                rows={4}
              />
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(v) => setFormData((prev) => ({ ...prev, featured: v }))}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
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
              <Label htmlFor="order_index">Order</Label>
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

export default ProductEdit;
