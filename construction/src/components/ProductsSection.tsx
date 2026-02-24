import React from 'react';
import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface ApiProduct {
  id: string;
  title: string;
  description: string | null;
  images: string[];
}

async function fetchProducts(): Promise<ApiProduct[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

const ProductsSection = () => {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Products & <span className="text-gradient">Materials</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium construction materials manufactured to international standards and optimized for Nigerian conditions.
          </p>
        </div>

        {displayProducts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {displayProducts.map((product) => (
                <Card key={product.id} className="card-elevated hover-lift text-center overflow-hidden">
                  <div className="relative aspect-[4/3] bg-muted">
                    <ProductImageCarousel
                      images={product.images || []}
                      alt={product.title}
                      className="aspect-[4/3] w-full h-full"
                      showButtons={true}
                      showDots={true}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground line-clamp-3">
                      {product.description || 'Quality construction materials.'}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="btn-construction group">
                <Link to="/products">
                  View More Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">Products are managed from the admin panel.</p>
            <Button asChild size="lg" className="btn-construction group">
              <Link to="/products">
                View Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
