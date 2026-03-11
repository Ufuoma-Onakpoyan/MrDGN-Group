import React from 'react';
import { ArrowRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';

const API_BASE = import.meta.env.VITE_API_URL || '';
const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

function resolveImageUrls(urls: unknown[], base: string): string[] {
  if (!Array.isArray(urls)) return [];
  const asStrings = urls.map((u) => (typeof u === 'string' ? u : (u && typeof u === 'object' && 'url' in u && typeof (u as { url: string }).url === 'string' ? (u as { url: string }).url : String(u))));
  const valid = asStrings.filter((s) => typeof s === 'string' && s.length > 0 && !s.startsWith('[object'));
  const root = base ? base.replace(/\/$/, '') : '';
  const forceHttps = typeof window !== 'undefined' && window.location?.protocol === 'https:';
  const cloudinaryBase = CLOUDINARY_CLOUD ? `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload` : '';
  return valid.map((u) => {
    let out = u;
    if (root) {
      if (u.startsWith('/')) out = root + u;
      else if (u.startsWith('http://') || u.startsWith('https://')) {
        try {
          const parsed = new URL(u);
          if (parsed.pathname.includes('/uploads/')) out = root + parsed.pathname + parsed.search;
        } catch {
          /* leave out as u */
        }
      }
    }
    if (cloudinaryBase && !out.startsWith('http') && !out.startsWith('/')) {
      out = `${cloudinaryBase}/${out.replace(/^\//, '')}`;
    }
    if (forceHttps && out.startsWith('http://')) out = 'https://' + out.slice(7);
    return out;
  });
}

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
    <section className="py-16 sm:py-20 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Our <span className="text-gradient">Building Materials</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Quality construction materials in Asaba. Cement, blocks, roofing, and more—supplied for builders and projects across Delta State and Nigeria.
          </p>
        </div>

        {displayProducts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {displayProducts.map((product) => (
                <Card key={product.id} className="card-elevated hover-lift text-center overflow-hidden rounded-xl border-border/60 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-[4/3] bg-muted/80 overflow-hidden">
                    <ProductImageCarousel
                      images={resolveImageUrls(product.images || [], API_BASE)}
                      alt={product.title}
                      className="aspect-[4/3] w-full h-full"
                      showButtons={true}
                      showDots={true}
                    />
                  </div>
                  <CardHeader className="px-5 pt-5 pb-2">
                    <CardTitle className="text-lg font-semibold leading-snug">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-6">
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {product.description || 'Quality construction materials.'}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="btn-construction group rounded-lg font-medium">
                <Link to="/products">
                  View More Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-5" />
            <p className="text-muted-foreground mb-6">Products are managed from the admin panel.</p>
            <Button asChild size="lg" className="btn-construction group rounded-lg font-medium">
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
