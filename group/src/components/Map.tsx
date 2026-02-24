import React from 'react';

interface MapProps {
  className?: string;
}

/** MR DGN Construction & Developers Ltd - Head Office, Asaba, Delta State */
const MAP_LAT = 6.2339308;
const MAP_LNG = 6.6340773;
const GOOGLE_EMBED_URL = `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&z=17&output=embed`;
export const MAP_PLACE_URL = 'https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu';

const Map: React.FC<MapProps> = ({ className = '' }) => {
  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden border border-border/50 shadow-2xl ${className}`}>
      <iframe
        title="MrDGN Group office location - Google Maps"
        src={GOOGLE_EMBED_URL}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
    </div>
  );
};

export default Map;
