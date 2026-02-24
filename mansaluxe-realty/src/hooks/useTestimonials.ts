import { useState, useEffect } from 'react';
import { apiService, Testimonial } from '@/services/api';

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 'fallback-1',
    name: 'Chidi Okonkwo',
    role: 'Business Executive',
    company: 'Tech Ventures Ltd',
    photo: '/assets/testimonial-1.jpg',
    quote: 'Mansa Luxe Realty made our property search seamless. Their team understood our requirements and delivered beyond expectations. Highly recommend for anyone seeking luxury real estate in Nigeria.',
    rating: 5,
    property_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-2',
    name: 'Adaeze Nwosu',
    role: 'Entrepreneur',
    company: 'Luxe Living Corp',
    photo: '/assets/testimonial-2.jpg',
    quote: 'From the first consultation to the final handover, the professionalism and attention to detail were exceptional. Our penthouse in Victoria Island is everything we dreamed of.',
    rating: 5,
    property_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'fallback-3',
    name: 'Oluwaseun Adeyemi',
    role: 'Director',
    company: 'Prime Holdings',
    photo: '/assets/testimonial-3.jpg',
    quote: 'Outstanding service from start to finish. The team\'s market knowledge and negotiation skills ensured we got the best value. Mansa Luxe Realty is now our go-to for all property investments.',
    rating: 5,
    property_id: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getTestimonials();
      const combined = [...data, ...FALLBACK_TESTIMONIALS];
      setTestimonials(combined);
    } catch (err) {
      setError('Failed to load testimonials. Please try again later.');
      setTestimonials(FALLBACK_TESTIMONIALS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, loading, error, refetch: fetchTestimonials };
};