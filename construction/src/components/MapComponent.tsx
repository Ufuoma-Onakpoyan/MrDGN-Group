import React from 'react';
import { MapPin, Navigation, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  companyName?: string;
  address?: string;
}

const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  companyName = "MR DGN Construction & Developers Ltd",
  address = "Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state"
}) => {
  const MAP_PLACE_URL = 'https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu';
  const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;
  const handleOpenInMaps = () => {
    window.open(MAP_PLACE_URL, '_blank');
  };

  const handleGetDirections = () => {
    window.open(MAP_PLACE_URL, '_blank');
  };

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg border border-border">
      {/* Map Container */}
      <div className="relative w-full h-full">
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="MR DGN Construction Location"
          className="w-full h-full"
        />
        
        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            onClick={handleOpenInMaps}
            size="sm"
            variant="secondary"
            className="shadow-lg backdrop-blur-sm bg-background/80 hover:bg-background/90"
          >
            <Maximize2 className="h-4 w-4 mr-2" />
            View Larger
          </Button>
          <Button
            onClick={handleGetDirections}
            size="sm"
            variant="default"
            className="shadow-lg"
          >
            <Navigation className="h-4 w-4 mr-2" />
            Directions
          </Button>
        </div>

        {/* Company Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-background/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-border">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {companyName}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {address}
                </p>
                <div className="mt-2 text-xs text-muted-foreground">
                  <span className="font-mono">
                    {latitude.toFixed(6)}, {longitude.toFixed(6)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Pin Indicator */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="absolute -top-8 -left-3 text-red-500 animate-bounce">
              <MapPin className="h-8 w-8 fill-current drop-shadow-lg" />
            </div>
            <div className="absolute -top-2 -left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-1 left-1 text-xs text-muted-foreground/60 bg-background/50 px-2 py-1 rounded">
        © Google Maps
      </div>
    </div>
  );
};

export default MapComponent;