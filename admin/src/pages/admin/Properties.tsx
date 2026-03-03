import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { propertiesService, Property, ListingType } from '@/lib/properties-service';
import { adminAPI } from '@/lib/admin-api';
import { Plus, Edit, Trash2, Building2, MapPin, Bed, Bath, Square, Upload, X, Video, ImageIcon, ChevronUp, ChevronDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function isVideoUrl(url: string): boolean {
  return !!(url?.includes('.mp4') || url?.includes('.mov') || url?.includes('.avi') || url?.includes('webm') ||
    url?.includes('youtube') || url?.includes('youtu.be') || url?.includes('vimeo'));
}

type MediaItem = { url: string; type: 'image' | 'video' };

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    area: '',
    type: '',
    status: 'available' as 'available' | 'sold' | 'pending',
    listingType: 'sale' as ListingType,
    latitude: '' as string | number,
    longitude: '' as string | number,
    featured: false,
    images: [''],
    amenities: [] as string[],
    features: [] as string[],
    featuresText: '' as string,
    yearBuilt: '' as string | number,
    virtualTourUrl: '',
    videoUrl: '',
    floorPlanImages: [] as string[],
    droneVideo: '',
    walkthroughVideo: '',
    generalVideo: '',
    cardPosterUrl: '',
    cardPosterVideoTimestampSeconds: '' as string | number
  });

  useEffect(() => {
    loadProperties();
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loadProperties = async () => {
    try {
      const data = await propertiesService.getProperties();
      // Sort properties alphabetically by title
      const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
      setProperties(sortedData);
    } catch (error) {
      console.error('Failed to load properties:', error);
      toast({
        title: "Error",
        description: "Failed to load properties",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: 0,
      bathrooms: 0,
      area: '',
      type: '',
      status: 'available' as 'available' | 'sold' | 'pending',
      listingType: 'sale' as ListingType,
      latitude: '',
      longitude: '',
      featured: false,
      images: [''],
      amenities: [] as string[],
      features: [] as string[],
      featuresText: '',
      yearBuilt: '',
      virtualTourUrl: '',
      videoUrl: '',
      floorPlanImages: [] as string[],
      droneVideo: '',
      walkthroughVideo: '',
      generalVideo: '',
      cardPosterUrl: '',
      cardPosterVideoTimestampSeconds: ''
    });
    setEditingProperty(null);
    setUploadedMedia([]);
  };

  const openModal = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      setFormData({
        title: property.title,
        description: property.description || '',
        price: property.price != null ? property.price.toString() : '',
        location: property.location,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || '',
        type: property.type || '',
        status: property.status,
        listingType: property.listing_type || 'sale',
        latitude: property.latitude ?? '',
        longitude: property.longitude ?? '',
        featured: property.featured || false,
        images: property.images.length > 0 ? property.images : [''],
        amenities: property.amenities || [],
        features: property.features || [],
        featuresText: Array.isArray(property.features) && property.features.length > 0 ? property.features.join('\n') : '',
        yearBuilt: property.year_built ?? '',
        virtualTourUrl: property.virtualTourUrl || '',
        videoUrl: property.videoUrl || '',
        floorPlanImages: property.floorPlanImages || [],
        droneVideo: property.videos?.drone || '',
        walkthroughVideo: property.videos?.walkthrough || '',
        generalVideo: property.videos?.general || '',
        cardPosterUrl: property.card_poster_url ?? '',
        cardPosterVideoTimestampSeconds: property.card_poster_video_timestamp_seconds ?? ''
      });
      // Preserve order: build single list from property.images
      const media: MediaItem[] = (property.images || []).map(url => ({
        url,
        type: isVideoUrl(url) ? 'video' : 'image'
      }));
      setUploadedMedia(media);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    const newItems: MediaItem[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const publicUrl = await adminAPI.uploadFile(file, 'property-images');
        newItems.push({ url: publicUrl, type: 'image' });
      }
      const updated = [...uploadedMedia, ...newItems];
      setUploadedMedia(updated);
      setFormData({ ...formData, images: updated.map(m => m.url) });
      toast({ title: "Success", description: `${newItems.length} image(s) uploaded successfully` });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: "Error", description: "Failed to upload images", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);
    const newItems: MediaItem[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const publicUrl = await adminAPI.uploadFile(file, 'property-images');
        newItems.push({ url: publicUrl, type: 'video' });
      }
      const updated = [...uploadedMedia, ...newItems];
      setUploadedMedia(updated);
      setFormData({ ...formData, images: updated.map(m => m.url) });
      toast({ title: "Success", description: `${newItems.length} video(s) uploaded successfully` });
    } catch (error) {
      console.error('Video upload error:', error);
      toast({ title: "Error", description: "Failed to upload videos", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const removeMedia = (index: number) => {
    const updated = uploadedMedia.filter((_, i) => i !== index);
    setUploadedMedia(updated);
    setFormData({ ...formData, images: updated.map(m => m.url) });
  };

  const moveMediaUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...uploadedMedia];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setUploadedMedia(updated);
    setFormData({ ...formData, images: updated.map(m => m.url) });
  };

  const moveMediaDown = (index: number) => {
    if (index >= uploadedMedia.length - 1) return;
    const updated = [...uploadedMedia];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setUploadedMedia(updated);
    setFormData({ ...formData, images: updated.map(m => m.url) });
  };

  const handleLabeledVideoUpload = async (
    field: 'droneVideo' | 'walkthroughVideo' | 'generalVideo',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);
    try {
      const publicUrl = await adminAPI.uploadFile(files[0], 'property-images');
      setFormData((prev) => ({ ...prev, [field]: publicUrl }));
      toast({ title: "Success", description: "Video uploaded" });
    } catch (error) {
      console.error('Upload error:', error);
      toast({ title: "Error", description: "Failed to upload video", variant: "destructive" });
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const allMedia = uploadedMedia.map(m => m.url).filter(url => url.trim() !== '');
      const videos: { drone?: string; walkthrough?: string; general?: string } = {};
      if (formData.droneVideo?.trim()) videos.drone = formData.droneVideo.trim();
      if (formData.walkthroughVideo?.trim()) videos.walkthrough = formData.walkthroughVideo.trim();
      if (formData.generalVideo?.trim()) videos.general = formData.generalVideo.trim();

      const featuresList = formData.featuresText
        ? formData.featuresText.split('\n').map(f => f.trim()).filter(Boolean)
        : formData.features;
      const propertyData = {
        ...formData,
        images: allMedia,
        listing_type: formData.listingType,
        latitude: formData.latitude === '' || formData.latitude == null ? undefined : Number(formData.latitude),
        longitude: formData.longitude === '' || formData.longitude == null ? undefined : Number(formData.longitude),
        videos: Object.keys(videos).length > 0 ? videos : undefined,
        features: featuresList,
        year_built: formData.yearBuilt === '' || formData.yearBuilt == null ? undefined : Number(formData.yearBuilt),
        card_poster_url: formData.cardPosterUrl || null,
        card_poster_video_timestamp_seconds: formData.cardPosterVideoTimestampSeconds === '' || formData.cardPosterVideoTimestampSeconds == null ? null : Number(formData.cardPosterVideoTimestampSeconds),
      };

      if (editingProperty) {
        await propertiesService.updateProperty(editingProperty.id, propertyData);
        toast({
          title: "Success",
          description: "Property updated successfully",
        });
      } else {
        await propertiesService.createProperty(propertyData);
        toast({
          title: "Success",
          description: "Property created successfully",
        });
      }

      setIsModalOpen(false);
      resetForm();
      await loadProperties();
    } catch (error) {
      console.error('Failed to save property:', error);
      toast({
        title: "Error",
        description: "Failed to save property",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      await propertiesService.deleteProperty(id);

      toast({
        title: "Success",
        description: "Property deleted successfully",
      });
      await loadProperties();
    } catch (error) {
      console.error('Failed to delete property:', error);
      toast({
        title: "Error",
        description: "Failed to delete property",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">
            Properties
          </h1>
          <p className="text-muted-foreground mt-2">
            Listings for MansaLuxe Realty. Changes appear on the realty site.
          </p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openModal()} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Property</span>
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingProperty ? 'Edit Property' : 'Add New Property'}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Luxury Penthouse Victoria Island"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="description">Property Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Stunning property with panoramic views. Main paragraph shown on the details page."
                    rows={3}
                    required
                  />
                </div>

                <div className="col-span-2">
                  <Label htmlFor="featuresText">Key Features (one per line)</Label>
                  <Textarea
                    id="featuresText"
                    value={formData.featuresText}
                    onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                    placeholder={"Swimming pool\nPrivate garden\nSmart home system\n..."}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Shown in &quot;Property Description & Features&quot; on the details page.</p>
                </div>

                <div>
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    min="1800"
                    max="2030"
                    placeholder="e.g. 2020"
                    value={formData.yearBuilt === '' ? '' : formData.yearBuilt}
                    onChange={(e) => setFormData({ ...formData, yearBuilt: e.target.value === '' ? '' : e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Shown on the property details page.</p>
                </div>
                
                <div>
                  <Label htmlFor="price">Price (optional)</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="₦850,000,000"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Leave blank to show &quot;Price on request&quot; on the website.</p>
                </div>
                
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Victoria Island, Lagos"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                    min="0"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="area">Area</Label>
                  <Input
                    id="area"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="350 sqm"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Property Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Penthouse">Penthouse</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Duplex">Duplex</SelectItem>
                      <SelectItem value="Mansion">Mansion</SelectItem>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value: 'available' | 'sold' | 'pending') => 
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="pending">Under Contract</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="listingType">Listing type</Label>
                  <Select 
                    value={formData.listingType} 
                    onValueChange={(value: ListingType) => 
                      setFormData({ ...formData, listingType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="For Sale / Rent / New development" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="new_development">New development</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    Determines the Properties tab and badge. &quot;New development&quot; shows a sparkle badge on the property card.
                  </p>
                </div>

                <div>
                  <Label htmlFor="latitude">Latitude (optional)</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g. 6.4541"
                    value={formData.latitude === '' ? '' : formData.latitude}
                    onChange={(e) => setFormData({ ...formData, latitude: e.target.value === '' ? '' : e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude (optional)</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g. 3.3947"
                    value={formData.longitude === '' ? '' : formData.longitude}
                    onChange={(e) => setFormData({ ...formData, longitude: e.target.value === '' ? '' : e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-1">For map view on the main site.</p>
                </div>
                
                <div className="col-span-2">
                  <Label>Property media (images &amp; videos)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Order sets what visitors see first. You can put videos first—drag or use arrows to reorder.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent cursor-pointer text-sm font-medium">
                      <ImageIcon className="h-4 w-4" />
                      Upload images
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        disabled={isUploading}
                      />
                    </label>
                    <label className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent cursor-pointer text-sm font-medium">
                      <Video className="h-4 w-4" />
                      Upload videos
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        accept="video/*"
                        onChange={(e) => handleVideoUpload(e.target.files)}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  {uploadedMedia.length > 0 && (
                    <div className="space-y-2">
                      {uploadedMedia.map((item, index) => (
                        <div key={`${index}-${item.url}`} className="flex items-center gap-2 p-2 rounded-lg border bg-muted/30">
                          <div className="flex-shrink-0 flex gap-1">
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveMediaUp(index)} disabled={index === 0} aria-label="Move up">
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveMediaDown(index)} disabled={index === uploadedMedia.length - 1} aria-label="Move down">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-muted flex items-center justify-center">
                            {item.type === 'image' ? (
                              <img src={item.url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Video className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground flex-shrink-0">{index + 1}. {item.type}</span>
                          <button
                            type="button"
                            onClick={() => removeMedia(index)}
                            className="ml-auto p-1 rounded bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                            aria-label="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {isUploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                </div>

                {/* Labeled Video URLs & Uploads - Mansa Luxe Realty Limited */}
                <div className="col-span-2 space-y-4">
                  <Label>More Details - Videos (Mansa Luxe Realty Limited)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Add video URLs or upload files for drone footage, walkthrough, or general property video. Shown with &quot;Mansa Luxe Realty Limited&quot; on the site.
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="droneVideo" className="text-sm font-normal">Drone Video</Label>
                      <div className="flex gap-2">
                        <Input
                          id="droneVideo"
                          type="url"
                          placeholder="https://... or click Upload"
                          value={formData.droneVideo}
                          onChange={(e) => setFormData({ ...formData, droneVideo: e.target.value })}
                          className="flex-1"
                        />
                        <label className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm font-medium">
                          <Upload className="h-4 w-4" />
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleLabeledVideoUpload('droneVideo', e)}
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="walkthroughVideo" className="text-sm font-normal">Walkthrough Video</Label>
                      <div className="flex gap-2">
                        <Input
                          id="walkthroughVideo"
                          type="url"
                          placeholder="https://... or click Upload"
                          value={formData.walkthroughVideo}
                          onChange={(e) => setFormData({ ...formData, walkthroughVideo: e.target.value })}
                          className="flex-1"
                        />
                        <label className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm font-medium">
                          <Upload className="h-4 w-4" />
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleLabeledVideoUpload('walkthroughVideo', e)}
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="generalVideo" className="text-sm font-normal">General Video</Label>
                      <div className="flex gap-2">
                        <Input
                          id="generalVideo"
                          type="url"
                          placeholder="https://... or click Upload"
                          value={formData.generalVideo}
                          onChange={(e) => setFormData({ ...formData, generalVideo: e.target.value })}
                          className="flex-1"
                        />
                        <label className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm font-medium">
                          <Upload className="h-4 w-4" />
                          Upload
                          <input
                            type="file"
                            className="hidden"
                            accept="video/*"
                            onChange={(e) => handleLabeledVideoUpload('generalVideo', e)}
                            disabled={isUploading}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2">
                  <Label>Listing card thumbnail (when first media is video)</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    When the first media is a video, this image is used as the thumbnail on the property listing and home page. Upload a frame from the first few seconds of the video if desired.
                  </p>
                  <div className="flex gap-2 items-center flex-wrap">
                    <Input
                      type="url"
                      placeholder="Poster image URL or upload below"
                      value={formData.cardPosterUrl}
                      onChange={(e) => setFormData({ ...formData, cardPosterUrl: e.target.value })}
                      className="flex-1 min-w-[200px]"
                    />
                    <label className="flex items-center gap-2 px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer text-sm font-medium">
                      <Upload className="h-4 w-4" />
                      Upload
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setIsUploading(true);
                          try {
                            const url = await adminAPI.uploadFile(file, 'property-images');
                            setFormData((prev) => ({ ...prev, cardPosterUrl: url }));
                            toast({ title: 'Success', description: 'Poster image uploaded' });
                          } catch (err) {
                            toast({ title: 'Error', description: 'Failed to upload', variant: 'destructive' });
                          } finally {
                            setIsUploading(false);
                            e.target.value = '';
                          }
                        }}
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                  {formData.cardPosterUrl && (
                    <div className="mt-2">
                      <img src={formData.cardPosterUrl} alt="Card poster preview" className="h-20 w-auto rounded border object-cover" />
                    </div>
                  )}
                  <div className="mt-2">
                    <Label htmlFor="cardPosterVideoTimestampSeconds" className="text-xs">Poster time (seconds)</Label>
                    <Input
                      id="cardPosterVideoTimestampSeconds"
                      type="number"
                      min={0}
                      step={0.5}
                      placeholder="e.g. 12"
                      value={formData.cardPosterVideoTimestampSeconds === '' ? '' : formData.cardPosterVideoTimestampSeconds}
                      onChange={(e) => setFormData({ ...formData, cardPosterVideoTimestampSeconds: e.target.value === '' ? '' : e.target.value })}
                      className="max-w-[120px] mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Optional: time in the video (seconds) this poster image is from. The card image is still the uploaded poster.</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded border-border"
                  />
                  <Label htmlFor="featured">Featured Property</Label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isUploading}>
                  {editingProperty ? 'Update Property' : 'Create Property'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted flex items-center justify-center">
              {property.images && property.images.length > 0 ? (
                isVideoUrl(property.images[0]) ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Video className="h-12 w-12 text-muted-foreground" />
                  </div>
                ) : (
                  <img 
                    src={property.images[0]} 
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <Building2 className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif font-semibold text-lg truncate">
                  {property.title}
                </h3>
                {property.featured && (
                  <Badge variant="default" className="ml-2">Featured</Badge>
                )}
              </div>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                {property.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center">
                    <Square className="h-4 w-4 mr-1" />
                    {property.area}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-primary">{property.price != null ? `₦${property.price.toLocaleString()}` : 'Price on request'}</p>
                  <Badge variant={property.status === 'available' ? 'default' : property.status === 'sold' ? 'secondary' : 'outline'}>
                    {property.status === 'available' ? 'Available' : property.status === 'sold' ? 'Sold' : 'Under Contract'}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openModal(property)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(property.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No properties found. Add your first property to get started.</p>
        </div>
      )}
    </div>
  );
}