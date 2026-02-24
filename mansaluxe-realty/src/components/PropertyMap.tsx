import { useEffect, useRef } from "react";
import { Property } from "@/services/api";

// Leaflet loaded from CDN in index.html
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const L: any;

interface PropertyMapProps {
  properties: Property[];
  filteredPropertiesWithCoords: Property[];
}

// Nigeria center
const DEFAULT_CENTER: [number, number] = [9.082, 8.675];
const DEFAULT_ZOOM = 6;

export function PropertyMap({ properties, filteredPropertiesWithCoords }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<ReturnType<typeof L.map> | null>(null);
  const markersRef = useRef<ReturnType<typeof L.marker>[]>([]);

  const hasCoords = (p: Property) =>
    p.latitude != null && p.longitude != null &&
    !Number.isNaN(Number(p.latitude)) && !Number.isNaN(Number(p.longitude));

  const propertiesWithCoords = filteredPropertiesWithCoords.filter(hasCoords);

  useEffect(() => {
    if (!mapRef.current || typeof L === "undefined") return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstanceRef.current);
    }

    const map = mapInstanceRef.current;

    // Remove old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add markers for properties with coordinates
    const bounds: [number, number][] = [];

    propertiesWithCoords.forEach((property) => {
      const lat = Number(property.latitude);
      const lng = Number(property.longitude);
      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup(
        `<div style="min-width:180px;">
          <a href="/properties/${property.id}" class="font-semibold text-primary hover:underline">${escapeHtml(property.title)}</a>
          <p class="text-sm text-muted-foreground mt-1">${escapeHtml(property.location || "")}</p>
          <p class="text-sm font-semibold mt-1">₦${Number(property.price).toLocaleString()}</p>
        </div>`
      );
      markersRef.current.push(marker);
      bounds.push([lat, lng]);
    });

    // Fit map to show all markers
    if (bounds.length > 0) {
      map.fitBounds(bounds as [number, number][], { padding: [40, 40], maxZoom: 14 });
    } else {
      map.setView(DEFAULT_CENTER, DEFAULT_ZOOM);
    }

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
    };
  }, [propertiesWithCoords]);

  // Cleanup map on unmount (e.g. switching from map to list view)
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const noCoordsCount = filteredPropertiesWithCoords.filter((p) => !hasCoords(p)).length;

  return (
    <div className="space-y-2">
      <div
        ref={mapRef}
        className="w-full h-full min-h-[400px] rounded-xl z-0"
      />
      <p className="text-xs text-muted-foreground text-center bg-muted/50 p-2 rounded-b-xl">
        {propertiesWithCoords.length > 0 ? (
          <>
            Showing {propertiesWithCoords.length} propert{propertiesWithCoords.length === 1 ? "y" : "ies"} on map.
            {noCoordsCount > 0 && (
              <> {noCoordsCount} propert{noCoordsCount === 1 ? "y has" : "ies have"} no coordinates set in admin.</>
            )}
          </>
        ) : (
          "No properties with coordinates. Add latitude and longitude in the admin panel to show pins on the map."
        )}
      </p>
    </div>
  );
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
