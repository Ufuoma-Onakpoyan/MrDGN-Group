import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  MapPin, Bed, Bath, Square, Search, 
  Building, Landmark, Home, Castle, Building2,
  SlidersHorizontal, Check, X, Loader2, AlertCircle, Star, Eye, ArrowRight,
  LayoutGrid, Map, Sparkles
} from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { Property, ListingType } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RevealAnimation } from "@/components/ui/reveal-animation";
import { PropertyMap } from "@/components/PropertyMap";

type ListingTab = 'all' | ListingType;

interface FilterState {
  location: string;
  minBedrooms: number;
  minBathrooms: number;
  priceRange: [number, number];
  type: string;
  featured: boolean;
  status: string;
  listingType: ListingTab;
}

const initialFilterState: FilterState = {
  location: "",
  minBedrooms: 0,
  minBathrooms: 0,
  priceRange: [0, 3000000000],
  type: "all",
  featured: false,
  status: "all",
  listingType: "all",
};

// Price formatter to convert string price to number (remove currency symbol and commas)
const priceToNumber = (price: string): number => {
  return parseInt(price.replace(/[^\d]/g, ''));
};

// Convert number back to formatted Nigerian Naira
const formatPrice = (price: number): string => {
  return `₦${price.toLocaleString()}`;
};

const Properties = () => {
  const { properties, loading, error } = useProperties();
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const propertiesPerPage = 9;

  // Predefined locations
  const locations = ['Abuja', 'Lagos', 'Asaba'];

  // Apply filters to properties
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      // Listing taxonomy: For Sale / For Rent / New developments
      if (filters.listingType !== "all") {
        const propListing = (property.listing_type || "sale").toLowerCase();
        const want = filters.listingType;
        if (propListing !== want) return false;
      }

      // Search term filter
      const desc = (property.description || "").toLowerCase();
      if (searchTerm && !property.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !property.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !desc.includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Location filter
      if (filters.location && !property.location.includes(filters.location)) {
        return false;
      }

      // Bedroom filter
      if ((property.bedrooms ?? 0) < filters.minBedrooms) {
        return false;
      }

      // Bathroom filter
      if ((property.bathrooms ?? 0) < filters.minBathrooms) {
        return false;
      }

      // Price range filter
      const propertyPrice = property.price;
      if (propertyPrice < filters.priceRange[0] || propertyPrice > filters.priceRange[1]) {
        return false;
      }

      // Property type filter
      if (filters.type !== "all" && property.property_type !== filters.type) {
        return false;
      }

      // Featured filter
      if (filters.featured && !property.featured) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && property.status !== filters.status) {
        return false;
      }

      return true;
    }).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); // Featured first
  }, [properties, searchTerm, filters]);

  // Calculate pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  // Reset filters
  const resetFilters = () => {
    setFilters(initialFilterState);
    setSearchTerm("");
  };

  // Calculate price range for slider
  const minPrice = useMemo(() => (properties.length ? Math.min(...properties.map(p => p.price)) : 0), [properties]);
  const maxPrice = useMemo(() => (properties.length ? Math.max(...properties.map(p => p.price)) : 3000000000), [properties]);
  const priceRangeWidth = maxPrice > minPrice ? ((filters.priceRange[1] - filters.priceRange[0]) / (maxPrice - minPrice)) * 100 : 100;
  const priceRangeLeft = maxPrice > minPrice ? ((filters.priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100 : 0;

  // Get icon for property type
  const getPropertyIcon = (type: string) => {
    switch (type) {
      case "penthouse": return <Building2 className="w-4 h-4" />;
      case "villa": return <Home className="w-4 h-4" />;
      case "mansion": return <Castle className="w-4 h-4" />;
      case "estate": return <Landmark className="w-4 h-4" />;
      case "apartment": return <Building className="w-4 h-4" />;
      case "duplex": return <Building2 className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  // Property types for filter
  const propertyTypes = [
    { value: "all", label: "All Types", icon: <Home className="w-4 h-4" /> },
    { value: "penthouse", label: "Penthouse", icon: <Building2 className="w-4 h-4" /> },
    { value: "villa", label: "Villa", icon: <Home className="w-4 h-4" /> },
    { value: "mansion", label: "Mansion", icon: <Castle className="w-4 h-4" /> },
    { value: "estate", label: "Estate", icon: <Landmark className="w-4 h-4" /> },
    { value: "apartment", label: "Apartment", icon: <Building className="w-4 h-4" /> },
    { value: "duplex", label: "Duplex", icon: <Building2 className="w-4 h-4" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-luxury"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-background via-secondary to-background overflow-hidden">
        <div className="absolute inset-0 bg-luxury-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Luxury <span className="text-gold-gradient">Properties</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Discover Nigeria's most prestigious residential and commercial properties. 
              Where extraordinary architecture meets exceptional lifestyle.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-primary rounded-full animate-pulse opacity-60" />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-accent rounded-full animate-pulse opacity-40" />
        <div className="absolute top-1/2 right-20 w-1 h-1 bg-primary rounded-full animate-pulse opacity-80" />
      </section>

      {/* Listing taxonomy tabs */}
      <section className="border-b border-border bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 py-4">
            {[
              { value: "all" as const, label: "All" },
              { value: "sale" as const, label: "For Sale" },
              { value: "rent" as const, label: "For Rent" },
              { value: "new_development" as const, label: "New developments" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setFilters((f) => ({ ...f, listingType: tab.value }));
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.listingType === tab.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 z-10 py-6 bg-card border-b border-border shadow-md backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties or locations..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* View mode: List / Map */}
            <div className="flex items-center gap-2 border border-border rounded-lg p-1 bg-muted/30">
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "map" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Map className="w-4 h-4" />
                Map
              </button>
            </div>

            {/* Filter Toggle */}
            <div className="flex space-x-4">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
                {(filters.listingType !== initialFilterState.listingType || Object.values(filters).some(v => 
                  v !== initialFilterState.location && 
                  v !== initialFilterState.type &&
                  v !== initialFilterState.priceRange &&
                  v !== initialFilterState.featured &&
                  v !== initialFilterState.minBathrooms &&
                  v !== initialFilterState.minBedrooms &&
                  v !== initialFilterState.status
                )) && (
                  <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                    !
                  </span>
                )}
              </button>

              {/* Reset Filters */}
              {(filters.listingType !== initialFilterState.listingType || Object.values(filters).some(v => 
                v !== initialFilterState.location && 
                v !== initialFilterState.type &&
                v !== initialFilterState.priceRange &&
                v !== initialFilterState.featured &&
                v !== initialFilterState.minBathrooms &&
                v !== initialFilterState.minBedrooms &&
                v !== initialFilterState.status
              )) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-1 px-3 py-1 text-sm text-muted-foreground hover:text-primary"
                >
                  <X className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {isFilterOpen && (
            <div className="mt-6 p-6 bg-card rounded-lg border border-border animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Location</label>
                  <select
                    className="w-full bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  >
                    <option value="">Any Location</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                {/* Property Type Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Property Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors ${
                          filters.type === type.value
                            ? "bg-primary/20 text-primary border border-primary"
                            : "bg-background border border-border text-foreground hover:bg-secondary"
                        }`}
                        onClick={() => setFilters({...filters, type: type.value})}
                      >
                        {type.icon}
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Minimum Bedrooms</label>
                  <div className="flex">
                    {[0, 1, 2, 3, 4, 5, 6, "7+"].map((num) => (
                      <button
                        key={num}
                        className={`flex-1 py-2 text-center text-sm border-r last:border-r-0 transition-colors ${
                          filters.minBedrooms === (num === "7+" ? 7 : Number(num))
                            ? "bg-primary/20 text-primary border-t border-b border-primary"
                            : "bg-background border-t border-b border-border text-foreground hover:bg-secondary"
                        }`}
                        onClick={() => setFilters({...filters, minBedrooms: num === "7+" ? 7 : Number(num)})}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  
                  <label className="block text-sm font-medium mb-2 mt-4 text-muted-foreground">Minimum Bathrooms</label>
                  <div className="flex">
                    {[0, 1, 2, 3, 4, 5, "6+"].map((num) => (
                      <button
                        key={num}
                        className={`flex-1 py-2 text-center text-sm border-r last:border-r-0 transition-colors ${
                          filters.minBathrooms === (num === "6+" ? 6 : Number(num))
                            ? "bg-primary/20 text-primary border-t border-b border-primary"
                            : "bg-background border-t border-b border-border text-foreground hover:bg-secondary"
                        }`}
                        onClick={() => setFilters({...filters, minBathrooms: num === "6+" ? 6 : Number(num)})}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status & Featured Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Property Status</label>
                  <select
                    className="w-full bg-background border border-border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="all">All Properties</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                  </select>

                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Show Featured Only</label>
                  <button
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border ${
                      filters.featured
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-background border-border hover:bg-secondary"
                    }`}
                    onClick={() => setFilters({...filters, featured: !filters.featured})}
                  >
                    <span>Featured Properties</span>
                    {filters.featured && <Check className="w-4 h-4" />}
                  </button>

                  <label className="block text-sm font-medium mb-2 mt-4 text-muted-foreground">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">₦{(filters.priceRange[0]/1000000).toFixed(0)}M</span>
                    <div className="flex-1 h-2 bg-background rounded-full relative">
                      <div 
                        className="absolute top-0 left-0 h-2 bg-primary rounded-full"
                        style={{ width: `${priceRangeWidth}%`, left: `${priceRangeLeft}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">₦{(filters.priceRange[1]/1000000).toFixed(0)}M</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button 
                      className="bg-background hover:bg-secondary border border-border rounded-lg px-2 py-1 text-xs"
                      onClick={() => setFilters({...filters, priceRange: [0, 500000000]})}
                    >
                      Under ₦500M
                    </button>
                    <button 
                      className="bg-background hover:bg-secondary border border-border rounded-lg px-2 py-1 text-xs"
                      onClick={() => setFilters({...filters, priceRange: [500000000, 1000000000]})}
                    >
                      ₦500M - ₦1B
                    </button>
                    <button 
                      className="bg-background hover:bg-secondary border border-border rounded-lg px-2 py-1 text-xs"
                      onClick={() => setFilters({...filters, priceRange: [1000000000, 2000000000]})}
                    >
                      ₦1B - ₦2B
                    </button>
                    <button 
                      className="bg-background hover:bg-secondary border border-border rounded-lg px-2 py-1 text-xs"
                      onClick={() => setFilters({...filters, priceRange: [2000000000, maxPrice]})}
                    >
                      Over ₦2B
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Properties Grid or Map View */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Showing {viewMode === "list" ? currentProperties.length : filteredProperties.length} of {filteredProperties.length} properties
              {filteredProperties.length !== properties.length && ` (filtered from ${properties.length} total)`}
            </p>
          </div>

          {viewMode === "map" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)] min-h-[500px]">
              <div className="lg:col-span-1 overflow-y-auto pr-2 space-y-4">
                {filteredProperties.length === 0 ? (
                  <p className="text-muted-foreground">No properties to show on map.</p>
                ) : (
                  filteredProperties.map((property) => (
                    <Link key={property.id} to={`/properties/${property.id}`}>
                      <Card className="luxury-card overflow-hidden hover-lift cursor-pointer p-0 relative">
                        {property.listing_type === 'new_development' && (
                          <Badge className="absolute top-1 left-1 z-10 bg-accent text-accent-foreground text-[10px] px-1.5 py-0 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>New dev</span>
                          </Badge>
                        )}
                        <div className="flex gap-3">
                          <div className="w-24 h-24 flex-shrink-0 bg-muted">
                            {property.images?.[0] ? (
                              <img src={property.images[0]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">{getPropertyIcon(property.property_type || "apartment")}</div>
                            )}
                          </div>
                          <div className="p-2 flex-1 min-w-0">
                            <h3 className="font-serif font-semibold text-sm truncate">{property.title}</h3>
                            <p className="text-xs text-muted-foreground truncate">{property.location}</p>
                            <p className="text-sm font-semibold text-primary">₦{property.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))
                )}
              </div>
              <div className="lg:col-span-2 rounded-xl overflow-hidden border border-border bg-muted/30 min-h-[400px]">
                <PropertyMap
                  properties={properties}
                  filteredPropertiesWithCoords={filteredProperties}
                />
              </div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
              <button 
                className="mt-4 btn-outline-luxury !py-2 !text-sm"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentProperties.map((property, index) => (
                <RevealAnimation 
                  key={property.id} 
                  animation="fade-up" 
                  delay={index * 100}
                >
                  <Link to={`/properties/${property.id}`} className="block">
                  <Card className="luxury-card overflow-hidden group hover-lift cursor-pointer h-full">
                    {/* Property Status Badge */}
                    {property.status === 'sold' && (
                      <Badge className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground">
                        SOLD
                      </Badge>
                    )}
                    {property.status !== 'sold' && (property.listing_type === 'new_development') && (
                      <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground flex items-center space-x-1 border border-primary/30">
                        <Sparkles className="w-3 h-3" />
                        <span>New development</span>
                      </Badge>
                    )}
                    {property.featured && (
                      <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </Badge>
                    )}
                    
                    <div className="aspect-card bg-muted/20 relative overflow-hidden">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-muted-foreground">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-border rounded-full flex items-center justify-center mx-auto mb-2">
                              {getPropertyIcon(property.property_type || 'apartment')}
                            </div>
                            <p className="text-sm">{property.property_type?.charAt(0).toUpperCase() + property.property_type?.slice(1) || 'Property'}</p>
                          </div>
                        </div>
                      )}

                      {/* Always Visible View Details Button - visual only, card is clickable */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-none">
                        <span className="inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium bg-white/90 backdrop-blur-sm text-black shadow-md border border-white/20">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-serif font-bold line-clamp-2 flex-1 mr-4">{property.title}</h3>
                        <div className="text-2xl font-bold text-gold-gradient whitespace-nowrap">
                          ₦{property.price.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {property.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm font-medium border-t border-border pt-4">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Bed className="w-4 h-4 text-primary" />
                          <span>{property.bedrooms || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Bath className="w-4 h-4 text-primary" />
                          <span>{property.bathrooms || 'N/A'}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Square className="w-4 h-4 text-primary" />
                          <span>{property.square_feet ? `${property.square_feet} sqft` : 'N/A'}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                </RevealAnimation>
              ))}
            </div>
          )}

          {/* Pagination - list view only */}
          {viewMode === "list" && totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex border border-border rounded-lg overflow-hidden">
                <button 
                  className={`px-4 py-2 ${currentPage === 1 ? 'text-muted-foreground' : 'text-foreground hover:bg-secondary'}`}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-10 text-center py-2 ${
                      currentPage === index + 1
                        ? 'bg-primary/20 text-primary'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button 
                  className={`px-4 py-2 ${currentPage === totalPages ? 'text-muted-foreground' : 'text-foreground hover:bg-secondary'}`}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-background via-secondary to-background">
        <div className="container mx-auto px-4">
          <RevealAnimation animation="fade-up">
            <Card className="luxury-card p-8 md:p-12 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Can't Find What You're <span className="text-gold-gradient">Looking For</span>?
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
                Our team specializes in finding exclusive off-market properties that match your specific requirements. 
                Let us help you discover your perfect luxury home in Nigeria's most prestigious locations.
              </p>
              <Button asChild size="lg" className="btn-luxury hover-scale">
                <Link to="/contact">
                  Contact Our Property Experts
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </Card>
          </RevealAnimation>
        </div>
      </section>
    </div>
  );
};

export default Properties;