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

  // #region agent log
  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const isIos =
      /iPad|iPhone|iPod/.test(ua) ||
      (typeof navigator !== 'undefined' &&
        (navigator as any).platform === 'MacIntel' &&
        (navigator as any).maxTouchPoints > 1);
    setIsIosSafari(isIos);

    try {
      fetch('http://127.0.0.1:7729/ingest/a34b21ca-c51d-4e94-a26f-273b68fd62c8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Debug-Session-Id': '361340',
        },
        body: JSON.stringify({
          sessionId: '361340',
          hypothesisId: 'CAROUSEL_ENV',
          location: 'ProductImageCarousel.tsx:env',
          message: 'Carousel environment',
          data: {
            isIosSafari: isIos,
            imagesLength: images?.length ?? 0,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }
  }, [images?.length]);
  // #endregion

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
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={images[idx]}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full w-auto h-auto object-contain bg-muted pointer-events-none select-none"
            style={{ maxHeight: '260px' }}
            draggable={false}
          />
        </div>
        {hasMultiple && showButtons && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 z-10 touch-manipulation"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setStaticIndex((i) => i - 1); }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 z-10 touch-manipulation"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setStaticIndex((i) => i + 1); }}
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
              <div className="h-full w-full relative flex items-center justify-center bg-muted overflow-hidden">
                <img
                  src={src}
                  alt={`${alt} - image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full max-h-[260px] object-contain select-none"
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
