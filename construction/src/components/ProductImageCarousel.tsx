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
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [staticIndex, setStaticIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isIos =
      /iPad|iPhone|iPod/.test(ua) ||
      (typeof navigator !== 'undefined' &&
        (navigator as any).platform === 'MacIntel' &&
        (navigator as any).maxTouchPoints > 1);
    setIsIosSafari(isIos);
  }, []);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on('select', () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  // Auto-advance carousel when multiple images (still controllable via prev/next)
  useEffect(() => {
    if (!api || !images || images.length <= 1) return;
    const interval = setInterval(() => api.scrollNext(), 4000);
    return () => clearInterval(interval);
  }, [api, images?.length]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-muted min-h-[200px] ${className}`}
      >
        <Package className="h-16 w-16 text-muted-foreground/50" />
      </div>
    );
  }

  // On iOS Safari, avoid Embla carousel entirely; show one image at a time with tap-to-cycle.
  // Fixed-size container prevents any touch-induced growth; no transform/scale.
  if (isIosSafari || images.length === 1) {
    const idx = images.length === 1 ? 0 : (staticIndex % images.length + images.length) % images.length;
    const hasMultiple = images.length > 1;

    return (
      <div
        className={`product-card-media relative bg-muted ${className}`}
        style={
          {
            touchAction: 'manipulation',
            WebkitTouchCallout: 'none',
            userSelect: 'none',
            overflow: 'hidden',
            maxWidth: '100%',
            minHeight: 0,
          } as React.CSSProperties
        }
      >
        <div
          className={`absolute inset-0 overflow-hidden ${slideDirection === 1 ? 'carousel-static-slide-next' : 'carousel-static-slide-prev'}`}
        >
          <img
            key={idx}
            src={images[idx]}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="carousel-static-img w-full h-full object-cover object-center pointer-events-none select-none"
            draggable={false}
          />
        </div>
        {hasMultiple && showButtons && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-foreground/50 hover:bg-foreground/70 text-background border-0 z-10 touch-manipulation"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSlideDirection(-1);
                setStaticIndex((i) => i - 1);
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-foreground/50 hover:bg-foreground/70 text-background border-0 z-10 touch-manipulation"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSlideDirection(1);
                setStaticIndex((i) => i + 1);
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`product-card-media relative overflow-hidden bg-muted min-h-[200px] ${className}`}>
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: 'start',
          containScroll: 'trimSnaps',
          dragFree: false,
        }}
        className="h-full w-full"
      >
        <CarouselContent className="ml-0 h-full flex-nowrap">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="pl-0 basis-full shrink-0 grow-0 w-full min-w-full h-full"
            >
              <div className="h-full w-full relative overflow-hidden bg-muted">
                <img
                  src={src}
                  alt={`${alt} - image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center select-none"
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
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-foreground/50 hover:bg-foreground/70 text-background border-0 z-10"
              onClick={() => api?.scrollPrev()}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous image</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-foreground/50 hover:bg-foreground/70 text-background border-0 z-10"
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
                i === current ? 'w-5 bg-primary' : 'w-2 bg-background/70 hover:bg-background'
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
