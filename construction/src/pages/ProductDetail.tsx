import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Package, CheckCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ProductImageCarousel } from '@/components/ProductImageCarousel';
import { SEO } from '@/components/SEO';
import { getProductEnrichment } from '@/data/productEnrichment';

const API_BASE = import.meta.env.VITE_API_URL || '';
const CLOUDINARY_CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://construction.mrdgngroup.com';

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

async function fetchProductBySlug(slug: string): Promise<ApiProduct | null> {
  if (!API_BASE || !slug) return null;
  const res = await fetch(`${API_BASE}/api/products/slug/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

function formatPrice(p: number | null, unit: string | null): string {
  if (p == null) return 'Price on request';
  return `₦${Number(p).toLocaleString()}${unit ? ` / ${unit}` : ''}`;
}

const DEFAULT_PRODUCT_DESC = 'Building materials in Asaba. Quality construction supplies from MR DGN Constructions – Delta State and Nigeria.';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug!),
    enabled: !!slug,
  });

  const enrichment = product ? getProductEnrichment(product.slug, product.category) : undefined;
  const imageUrls = product ? resolveImageUrls(product.images || [], API_BASE) : [];
  const firstImageOg = imageUrls.length > 0 ? (imageUrls[0].startsWith('http') ? imageUrls[0] : `${SITE_URL}${imageUrls[0].startsWith('/') ? '' : '/'}${imageUrls[0]}`) : undefined;

  useEffect(() => {
    if (product) {
      document.title = `${product.title} | Building Materials Asaba – MR DGN Constructions`;
    } else if (slug) {
      document.title = 'Product | MR DGN Constructions';
    }
  }, [product, slug]);

  if (isLoading || !slug) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or is no longer available.</p>
            <Button asChild className="btn-construction">
              <Link to="/products">Back to Products</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={product.title}
        description={product.description?.slice(0, 160) || `${product.title}. ${DEFAULT_PRODUCT_DESC}`}
        canonical={`/products/${product.slug}`}
        ogImage={firstImageOg}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">{product.title}</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">{product.title}</h1>
          {(product.description || enrichment?.overview) && (
            <p className="text-xl text-muted-foreground max-w-2xl">
              {product.description || enrichment?.overview}
            </p>
          )}
          {product.price != null && (
            <p className="text-2xl font-semibold text-primary mt-4">{formatPrice(product.price, product.price_unit)}</p>
          )}
        </div>
      </section>

      {/* Images or placeholder */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {imageUrls.length > 0 ? (
            <ProductImageCarousel
              images={imageUrls}
              alt={product.title}
              className="aspect-[4/3] min-h-[280px] w-full rounded-xl overflow-hidden"
              showButtons={true}
              showDots={true}
            />
          ) : (
            <div className="aspect-[4/3] w-full rounded-xl bg-muted flex flex-col items-center justify-center text-muted-foreground">
              <Package className="h-20 w-20 mb-4 opacity-50" />
              <p className="text-sm font-medium">Image coming soon</p>
              <p className="text-xs mt-1">Add images from the admin panel</p>
            </div>
          )}
        </div>
      </section>

      {/* Overview + Enrichment */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {(product.description || enrichment?.overview) && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl">Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product.description && (
                    <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                  )}
                  {enrichment?.overview && (
                    <p className="text-muted-foreground leading-relaxed">{enrichment.overview}</p>
                  )}
                </CardContent>
              </Card>
            )}
            {(enrichment?.uses?.length || enrichment?.applications?.length) ? (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl">Uses & Applications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enrichment.uses && enrichment.uses.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Typical uses</h4>
                      <ul className="space-y-2">
                        {enrichment.uses.map((use, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground/90">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {enrichment.applications && enrichment.applications.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">Applications</h4>
                      <ul className="space-y-2">
                        {enrichment.applications.map((app, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-foreground/90">{app}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </section>

      {/* Specifications & Features */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl">Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between gap-4 py-2 border-b border-border/40 last:border-0">
                        <span className="text-muted-foreground">{key}</span>
                        <span className="font-medium text-foreground text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            {product.features && product.features.length > 0 && (
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="text-xl">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* JSON-LD Product schema */}
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: product.title,
              description: product.description || enrichment?.overview || DEFAULT_PRODUCT_DESC,
              ...(imageUrls.length > 0 && { image: imageUrls[0].startsWith('http') ? imageUrls[0] : `${SITE_URL}${imageUrls[0]}` }),
              ...(product.price != null &&
                product.price > 0 && {
                  offers: {
                    '@type': 'Offer',
                    price: product.price,
                    priceCurrency: 'NGN',
                    availability: 'https://schema.org/InStock',
                  },
                }),
            }),
          }}
        />
      )}

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Interested in <span className="text-gradient">{product.title}</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Request a quote or contact us for building materials in Asaba. We deliver across Delta State and Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-construction">
              <Link to="/contact-us">Request Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/products" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
