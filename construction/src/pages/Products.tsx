import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Package, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface ApiProduct {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | null;
  price_unit: string | null;
  category: string;
  images: string[];
  specifications: Record<string, string>;
  features: string[];
}

async function fetchProducts(): Promise<ApiProduct[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) return [];
  return res.json();
}

function formatPrice(p: number | null, unit: string | null): string {
  if (p == null) return 'Price on request';
  return `₦${Number(p).toLocaleString()}${unit ? ` / ${unit}` : ''}`;
}

const Products = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    document.title = 'Products - MR DGN Constructions';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Premium Construction <span className="text-gradient">Products</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our comprehensive range of high-quality construction materials and products,
              manufactured to the highest industry standards for your building projects.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid - all content from admin/API */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No products listed yet.</p>
              <p className="text-sm mt-2">Products are managed from the admin panel.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-10">
              {products.map((product) => (
                <Card key={product.id} className="card-elevated hover-lift overflow-hidden flex flex-col">
                  {/* Product image(s) on top - carousel when multiple */}
                  <div className="relative w-full overflow-hidden bg-muted">
                    <ProductImageCarousel
                      images={product.images || []}
                      alt={product.title}
                      className="aspect-[4/3] min-h-[200px] w-full"
                      showButtons={true}
                      showDots={true}
                    />
                  </div>
                  {/* Write-up below the images */}
                  <div className="flex flex-col p-5 md:p-6">
                    <CardHeader className="p-0 pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <CardTitle className="text-xl leading-tight">
                          {product.title}
                        </CardTitle>
                        <span className="text-lg font-semibold text-primary shrink-0">
                          {formatPrice(product.price, product.price_unit)}
                        </span>
                      </div>
                      {product.description && (
                        <CardDescription className="text-base leading-relaxed mt-3 text-muted-foreground">
                          {product.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-5 p-0">
                      {product.features && product.features.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                            Key Features
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                            Specifications
                          </h4>
                          <div className="space-y-2 text-sm">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between gap-4 py-1 border-b border-border/50 last:border-0">
                                <span className="text-muted-foreground">{key}</span>
                                <span className="font-medium text-foreground text-right">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <Button className="w-full btn-construction mt-2" asChild>
                        <Link to="/contact-us">Request Quote</Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
