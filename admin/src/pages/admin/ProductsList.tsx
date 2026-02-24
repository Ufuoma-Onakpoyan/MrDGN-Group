import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productsAPI, type Product } from '@/lib/blog-api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Edit, Trash2, Plus, Search, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsAPI.getItems(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => productsAPI.deleteItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({ title: "Success", description: "Product deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    },
  });

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (p: number | null | undefined, unit: string | null | undefined) => {
    if (p == null || p === undefined) return 'Price on request';
    const num = typeof p === 'number' ? p : parseFloat(String(p));
    if (isNaN(num)) return 'Price on request';
    return `₦${num.toLocaleString()}${unit ? ` / ${unit}` : ''}`;
  };

  if (isLoading) {
    return <div className="p-6 text-center text-foreground bg-background">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center bg-background text-foreground">
        <p className="text-destructive font-medium">Failed to load products</p>
        <p className="text-sm text-muted-foreground mt-2">{String(error)}</p>
        <p className="text-xs text-muted-foreground mt-4">Ensure the backend is running and VITE_API_URL is set.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-background text-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Construction Products</h1>
          <p className="text-muted-foreground">
            Products with prices for the MrDGN Construction site
          </p>
        </div>
        <Link to="/admin/products/new">
          <Button className="flex gap-2">
            <Plus className="h-4 w-4" />
            New Product
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-6">
        {filteredItems.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <div className="text-muted-foreground">No products found</div>
              <p className="text-sm text-muted-foreground mt-2">Add products to display on the Construction site</p>
              <Link to="/admin/products/new">
                <Button className="mt-4">Add Product</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredItems.map((item: Product) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="font-mono">
                        {formatPrice(item.price, item.price_unit)}
                      </Badge>
                      <Badge variant="secondary">{item.category}</Badge>
                      <Badge variant={item.published ? "default" : "secondary"}>
                        {item.published ? "Published" : "Draft"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Link to={`/admin/products/edit/${item.id}`}>
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
                    if (window.confirm('Delete this product?')) deleteMutation.mutate(item.id);
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

export default ProductsList;
