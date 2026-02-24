import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || '';

interface ApiTestimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  quote: string;
  rating?: number;
}

async function fetchTestimonials(): Promise<ApiTestimonial[]> {
  if (!API_BASE) return [];
  const res = await fetch(`${API_BASE}/api/testimonials?source=construction`);
  if (!res.ok) return [];
  return res.json();
}

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
    ))}
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = React.useState<ApiTestimonial[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    document.title = 'Testimonials - MR DGN Constructions';
    fetchTestimonials()
      .then(setTestimonials)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Hear from clients who have trusted us with their construction projects across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Quote className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No testimonials yet.</p>
              <p className="text-sm mt-2">Testimonials are managed from the admin panel.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <Card key={t.id} className="card-elevated hover-lift flex flex-col">
                  <CardContent className="pt-6 flex-1 flex flex-col">
                    {t.photo ? (
                      <img src={t.photo} alt={t.name} className="w-14 h-14 rounded-full object-cover mb-4" />
                    ) : (
                      <Quote className="h-10 w-10 text-primary/30 mb-4" />
                    )}
                    <StarRating count={t.rating ?? 5} />
                    <p className="text-muted-foreground mt-4 mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{t.name}</p>
                      {t.role && <p className="text-sm text-muted-foreground">{t.role}</p>}
                      {t.company && <p className="text-sm text-primary mt-1">{t.company}</p>}
                    </div>
                  </CardContent>
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

export default Testimonials;
