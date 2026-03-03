import { useState } from "react";
import { PlayCircle, Home } from "lucide-react";
import type { Property } from "@/services/api";
import { isVideoUrl } from "@/lib/utils";
import { usePropertyCardPoster } from "@/hooks/usePropertyCardPoster";
import { VideoFramePoster } from "@/components/VideoFramePoster";

const SOFT_PLACEHOLDER_CLASS = "bg-gradient-to-br from-muted to-muted/70";

interface PropertyCardMediaProps {
  property: Property;
  /** "full" for main grid card, "thumb" for map sidebar small card */
  variant?: "full" | "thumb";
  getPropertyIcon?: (type: string) => React.ReactNode;
}

const defaultGetPropertyIcon = () => <Home className="w-4 h-4" />;

export function PropertyCardMedia({ property, variant = "full", getPropertyIcon = defaultGetPropertyIcon }: PropertyCardMediaProps) {
  const poster = usePropertyCardPoster(property);
  const [frameUrl, setFrameUrl] = useState<string | null>(null);

  const firstMedia = property.images?.[0];
  const hasMedia = property.images && property.images.length > 0;

  if (!hasMedia) {
    return (
      <div className={`${variant === "thumb" ? "w-full h-full" : "absolute inset-0 w-full h-full"} flex items-center justify-center text-muted-foreground`}>
        <div className="text-center">
          <div className={`${variant === "thumb" ? "w-8 h-8" : "w-16 h-16"} bg-border rounded-full flex items-center justify-center mx-auto mb-2`}>
            {getPropertyIcon(property.property_type || "apartment")}
          </div>
          {variant === "full" && (
            <p className="text-sm">{property.property_type?.charAt(0).toUpperCase() + property.property_type?.slice(1) || "Property"}</p>
          )}
        </div>
      </div>
    );
  }

  if (!isVideoUrl(firstMedia)) {
    return (
      <img
        src={firstMedia}
        alt={property.title}
        className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 ${variant === "thumb" ? "object-cover" : ""}`}
      />
    );
  }

  const posterOrFrame = poster.posterUrl || frameUrl;
  const bgStyle = posterOrFrame ? { backgroundImage: `url(${posterOrFrame})` } : undefined;
  const className = [
    "w-full h-full relative flex items-center justify-center bg-cover bg-center",
    variant === "full" ? "transition-transform duration-700 group-hover:scale-105" : "",
    !posterOrFrame ? SOFT_PLACEHOLDER_CLASS : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      {poster.directVideo && (
        <VideoFramePoster
          videoUrl={poster.directVideo.videoUrl}
          timestampSeconds={poster.directVideo.timestampSeconds}
          onFrameUrl={setFrameUrl}
        />
      )}
      <div className={className} style={bgStyle}>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <PlayCircle className={variant === "thumb" ? "w-6 h-6 text-white" : "w-14 h-14 text-white drop-shadow-md"} />
        </div>
      </div>
    </>
  );
}
