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
const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';

/** Resolve image URLs: normalize to strings, uploads use API base, path-only use Cloudinary base, HTTPS when page is HTTPS. */
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
    document.title = 'Building Materials Asaba | Cement, Blocks & Supplies – MR DGN Constructions';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-14 sm:pt-28 sm:pb-16 bg-gradient-to-b from-muted/40 to-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight mb-5">
              Building Materials in <span className="text-gradient">Asaba</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              From our base in Asaba we supply cement, blocks, roofing, and construction materials for builders and projects across Delta State and Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-14 pb-24 sm:py-16 sm:pb-28">
        <div className="container mx-auto px-6 max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <Package className="h-16 w-16 mx-auto mb-5 opacity-50" />
              <p className="text-lg font-medium">No products listed yet.</p>
              <p className="text-sm mt-2">Products are managed from the admin panel.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
              {products.map((product) => (
                <Card key={product.id} className="card-elevated hover-lift overflow-hidden flex flex-col rounded-xl border-border/60 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full overflow-hidden bg-muted/80 rounded-t-xl">
                    <ProductImageCarousel
                      images={resolveImageUrls(product.images || [], API_BASE)}
                      alt={product.title}
                      className="aspect-[4/3] min-h-[220px] w-full"
                      showButtons={true}
                      showDots={true}
                    />
                  </div>
                  <div className="flex flex-col p-6 md:p-7">
                    <CardHeader className="p-0 pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <CardTitle className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-foreground">
                          {product.title}
                        </CardTitle>
                        <span className="text-lg font-semibold text-primary shrink-0">
                          {formatPrice(product.price, product.price_unit)}
                        </span>
                      </div>
                      {product.description && (
                        <CardDescription className="text-[15px] leading-relaxed mt-3 text-muted-foreground">
                          {product.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-5 p-0">
                      {product.features && product.features.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Key Features
                          </h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-sm text-foreground/95 leading-snug">
                                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                            Specifications
                          </h4>
                          <div className="space-y-2 text-sm">
                            {Object.entries(product.specifications).map(([key, value]) => (
                              <div key={key} className="flex justify-between gap-4 py-2 border-b border-border/40 last:border-0">
                                <span className="text-muted-foreground">{key}</span>
                                <span className="font-medium text-foreground text-right">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col gap-2 mt-3">
                        <Button className="w-full rounded-lg font-medium" size="lg" variant="outline" asChild>
                          <Link to={`/products/${product.slug}`}>View details</Link>
                        </Button>
                        <Button className="w-full btn-construction rounded-lg font-medium" size="lg" asChild>
                          <Link to="/contact-us">Request Quote</Link>
                        </Button>
                      </div>
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
