import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';

interface ProductImageCarouselProps {
  images: string[];
  alt: string;
  /** Container class for the image area (e.g. aspect-[4/3], min-h-[200px]) */
  className?: string;
  /** Show prev/next buttons (default true when multiple images) */
  showButtons?: boolean;
  /** Show dot indicators (default true when multiple images) */
  showDots?: boolean;
}

export function ProductImageCarousel({
  images,
  alt,
  className = 'aspect-[4/3] min-h-[200px]',
  showButtons = true,
  showDots = true,
}: ProductImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-muted ${className}`}
      >
        <Package className="h-16 w-16 text-muted-foreground/50" />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className={`relative overflow-hidden bg-muted ${className}`}>
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-full object-contain bg-muted"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      <Carousel setApi={setApi} opts={{ loop: true }} className="h-full w-full">
        <CarouselContent className="ml-0 h-full">
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-0 h-full">
              <div className="h-full w-full flex items-center justify-center bg-muted">
                <img
                  src={src}
                  alt={`${alt} - image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showButtons && (
          <>
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 z-10"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 z-10"
              onClick={() => api?.scrollNext()}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next image</span>
            </Button>
          </>
        )}
      </Carousel>
      {showDots && images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-5 bg-primary' : 'w-2 bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
