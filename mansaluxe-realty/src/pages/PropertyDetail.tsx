import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { SITE_PHONE, SITE_PHONE_DISPLAY } from "@/lib/constants";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, MapPin, Bed, Bath, Square, Calendar, PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { apiService, Property } from "@/services/api";
import { SEO } from "@/components/SEO";
import { formatPriceDisplay, getEmbedUrl, getYouTubeThumbnailUrl } from "@/lib/utils";
import { toast } from "sonner";

function isVideoUrl(url: string): boolean {
  return !!(url?.includes('.mp4') || url?.includes('.mov') || url?.includes('.avi') || url?.includes('webm') ||
    url?.includes('youtube') || url?.includes('youtu.be') || url?.includes('vimeo'));
}

type MediaItem = { type: 'image' | 'video'; url: string; label?: string; embedUrl?: string | null };

function buildMediaItems(property: Property): MediaItem[] {
  const items: MediaItem[] = [];
  const images = property.images || [];

  // 1. Images and legacy videos from property.images
  images.forEach((url) => {
    if (isVideoUrl(url)) {
      items.push({
        type: 'video',
        url,
        label: 'Property Video • Mansa Luxe Realty Limited',
        embedUrl: getEmbedUrl(url),
      });
    } else {
      items.push({ type: 'image', url });
    }
  });

  // 2. Structured videos from admin (labeled)
  const v = property.videos;
  if (v?.drone) items.push({ type: 'video', url: v.drone, label: 'Drone Video • Mansa Luxe Realty Limited', embedUrl: getEmbedUrl(v.drone) });
  if (v?.walkthrough) items.push({ type: 'video', url: v.walkthrough, label: 'Walkthrough • Mansa Luxe Realty Limited', embedUrl: getEmbedUrl(v.walkthrough) });
  if (v?.general) items.push({ type: 'video', url: v.general, label: 'General Video • Mansa Luxe Realty Limited', embedUrl: getEmbedUrl(v.general) });

  return items;
}

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mediaSectionRef = useRef<HTMLDivElement>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [embedPlayedIndices, setEmbedPlayedIndices] = useState<Set<number>>(new Set());

  const mediaItems = property ? buildMediaItems(property) : [];

  const fetchProperty = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getProperty(id);
      setProperty(data);
    } catch (err) {
      console.error("Error fetching property:", err);
      setError(err instanceof Error ? err.message : "Failed to load property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [id]);

  useEffect(() => {
    if (mediaItems.length > 0 && selectedImageIndex >= mediaItems.length) {
      setSelectedImageIndex(Math.max(0, mediaItems.length - 1));
    }
  }, [mediaItems.length, selectedImageIndex]);

  useEffect(() => {
    if (searchParams.get('playVideo') === '1' && !loading && property && mediaItems.length > 0 && mediaItems[0].type === 'video') {
      mediaSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast.info('Click the video to play', { duration: 4000 });
    }
  }, [searchParams, loading, property, mediaItems]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (mediaItems.length <= 1) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); setSelectedImageIndex((i) => (i <= 0 ? mediaItems.length - 1 : i - 1)); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setSelectedImageIndex((i) => (i >= mediaItems.length - 1 ? 0 : i + 1)); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mediaItems.length]);

  const goPrev = () => setSelectedImageIndex((i) => (i <= 0 ? mediaItems.length - 1 : i - 1));
  const goNext = () => setSelectedImageIndex((i) => (i >= mediaItems.length - 1 ? 0 : i + 1));
  const current = mediaItems[selectedImageIndex];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 px-4">
        <h1 className="text-2xl font-bold text-center">Unable to load property</h1>
        <p className="text-muted-foreground text-center max-w-md">{error}</p>
        <div className="flex gap-3">
          <Button onClick={() => fetchProperty()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link to="/properties">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Properties
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col space-y-4">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Link to="/properties">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </Link>
      </div>
    );
  }

  const firstImageItem = mediaItems.find((m) => m.type === 'image');
  const ogImage = firstImageItem?.url ?? (property.images?.[0] && !isVideoUrl(property.images[0]) ? property.images[0] : undefined);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SEO title={property.title} description={property.description || undefined} canonical={`/properties/${property.id}`} ogImage={ogImage} ogType="website" />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/properties">
            <Button variant="outline" size="lg" className="hover-scale">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Properties
            </Button>
          </Link>
          <Badge 
            variant={property.status === 'sold' ? 'destructive' : 'secondary'} 
            className="text-base font-bold px-5 py-2.5 uppercase tracking-wide"
          >
            {property.status === 'sold' ? 'Sold' : property.status === 'pending' ? 'Pending' : 'Available'}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Unified Media Gallery - Images & Videos in One Panel */}
          <div ref={mediaSectionRef} className="lg:col-span-2 space-y-4">
            <RevealAnimation animation="fade-up">
              <Card className="overflow-hidden luxury-card">
                <div className="relative h-[500px] group">
                  {mediaItems.length > 0 && current ? (
                    <>
                      {/* Main media display */}
                      {current.type === 'image' ? (
                        <img
                          src={current.url}
                          alt={property.title}
                          className="w-full h-full object-contain bg-muted/20"
                        />
                      ) : (
                        <div className="relative w-full h-full bg-black">
                          {current.embedUrl ? (
                            embedPlayedIndices.has(selectedImageIndex) ? (
                              <iframe
                                key={current.url}
                                src={`${current.embedUrl}?autoplay=1`}
                                className="w-full h-full"
                                allowFullScreen
                                title={current.label || 'Video'}
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() => setEmbedPlayedIndices((prev) => new Set(prev).add(selectedImageIndex))}
                                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-black text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                style={{
                                  backgroundImage: getYouTubeThumbnailUrl(current.url)
                                    ? `url(${getYouTubeThumbnailUrl(current.url)})`
                                    : undefined,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              >
                                <div className="absolute inset-0 bg-black/50" />
                                <PlayCircle className="w-20 h-20 text-white drop-shadow-lg relative z-10" />
                                <span className="mt-2 text-sm font-medium relative z-10">Click to play</span>
                              </button>
                            )
                          ) : (
                            <div
                              className="relative w-full h-full cursor-pointer"
                              onClick={() => videoRef.current?.play()}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => e.key === 'Enter' && videoRef.current?.play()}
                              aria-label="Play video"
                            >
                              <video
                                ref={videoRef}
                                key={current.url}
                                className="w-full h-full object-contain bg-muted/20"
                                controls
                                preload="metadata"
                                playsInline
                              >
                                <source src={current.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                                <PlayCircle className="w-20 h-20 text-white drop-shadow-lg" />
                              </div>
                            </div>
                          )}
                          {current.label && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 pointer-events-none">
                              <p className="text-sm font-medium text-white">{current.label}</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Arrow navigation */}
                      {mediaItems.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={goPrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={goNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </Button>
                        </>
                      )}

                      {/* Counter */}
                      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm font-medium">
                        {selectedImageIndex + 1} / {mediaItems.length}
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground">No media available</span>
                    </div>
                  )}
                </div>
              </Card>
            </RevealAnimation>

            {/* Thumbnail strip - unified */}
            {mediaItems.length > 1 && (
              <RevealAnimation animation="fade-up" delay={200}>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {mediaItems.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? "ring-2 ring-primary border-primary"
                          : "border-transparent hover:border-primary/50"
                      }`}
                    >
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={`${property.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex flex-col items-center justify-center p-1">
                          <PlayCircle className="w-6 h-6 text-primary flex-shrink-0" />
                          {item.label && (
                            <span className="text-[10px] text-center text-muted-foreground truncate w-full" title={item.label}>
                              {item.label.split(' • ')[0]}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </RevealAnimation>
            )}
          </div>

          {/* Property Details - relative z-10 so Contact card stacks above any overlapping siblings */}
          <div className="space-y-6 relative z-10">
            <RevealAnimation animation="slide-right">
              <Card className="luxury-card">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold font-serif mb-2">{property.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      {property.location}
                    </div>
                  </div>

                  <div className="text-4xl font-bold text-primary">
                    {formatPriceDisplay(property.price)}
                  </div>

                  {/* Property Stats */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                    {property.bedrooms && (
                      <div className="flex items-center space-x-2">
                        <Bed className="w-5 h-5 text-primary" />
                        <span className="font-medium">{property.bedrooms} Beds</span>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="flex items-center space-x-2">
                        <Bath className="w-5 h-5 text-primary" />
                        <span className="font-medium">{property.bathrooms} Baths</span>
                      </div>
                    )}
                    {property.square_feet && (
                      <div className="flex items-center space-x-2">
                        <Square className="w-5 h-5 text-primary" />
                        <span className="font-medium">{property.square_feet} sqft</span>
                      </div>
                    )}
                    {property.year_built && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">Built {property.year_built}</span>
                      </div>
                    )}
                  </div>

                  {/* Property Type */}
                  {property.property_type && (
                    <div>
                      <Badge variant="outline" className="text-sm">
                        {property.property_type}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            </RevealAnimation>

            {/* Enhanced Description with Features */}
            {(property.description || (property.features && property.features.length > 0)) && (
              <RevealAnimation animation="slide-right" delay={200}>
                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-6">Property Description & Features</h3>
                    
                    {/* Main Description - from description field */}
                    {property.description && (
                      <div className="mb-6">
                        <p className="text-muted-foreground leading-relaxed text-base">
                          {property.features && property.features.length > 0
                            ? property.description
                            : (property.description.includes(',') ? property.description.split(',')[0].trim() : property.description)}
                        </p>
                      </div>
                    )}

                    {/* Features Grid - from admin features array, or fallback to description comma-split */}
                    {(() => {
                      const featuresList = (property.features && property.features.length > 0)
                        ? property.features
                        : (property.description?.includes(',')
                          ? property.description.split(',').slice(1).map(f => f.trim()).filter(Boolean)
                          : []);
                      if (featuresList.length === 0) return null;
                      return (
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary">Key Features</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {featuresList.map((feature, index) => (
                              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm font-medium leading-relaxed">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </RevealAnimation>
            )}

            {/* Contact - relative z-20 + pointer-events-auto to ensure clicks reach buttons */}
            <Card className="luxury-card relative z-20">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Interested?</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${SITE_PHONE}`;
                    }}
                  >
                    Call Agent: {SITE_PHONE_DISPLAY}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/contact');
                    }}
                  >
                    Contact Us
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://wa.me/${SITE_PHONE.replace(/\D/g, '')}`, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    Schedule Viewing (WhatsApp)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PropertyDetail;