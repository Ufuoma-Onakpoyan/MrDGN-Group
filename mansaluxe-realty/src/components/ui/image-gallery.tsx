import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export const ImageGallery = ({ images, isOpen, onClose, initialIndex = 0 }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPrevious();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNext();
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentIndex, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsVideoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsVideoPlaying(false);
  };

  const isCurrentVideo = () => {
    const currentImage = images[currentIndex];
    return currentImage?.includes('.mp4') || currentImage?.includes('.mov') || currentImage?.includes('.avi');
  };

  const toggleVideoPlayback = () => {
    const video = document.querySelector('.gallery-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-black/95" />
        <DialogContent className="max-w-none w-screen h-screen p-0 bg-black border-none">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent">
            <div className="text-white/80 text-sm font-medium">
              {currentIndex + 1} of {images.length}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex items-center justify-center w-full h-full relative">
            {/* Previous Button */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevious}
                className="absolute left-6 z-40 text-white hover:bg-white/20 rounded-full backdrop-blur-sm bg-black/20"
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
            )}

            {/* Image/Video Display */}
            <div className="w-full h-full flex items-center justify-center p-6">
              {isCurrentVideo() ? (
                <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex items-center justify-center">
                  <video
                    key={currentIndex}
                    className="gallery-video w-full h-full object-contain rounded-lg shadow-2xl"
                    controls
                    preload="metadata"
                    playsInline
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src={images[currentIndex]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <img
                  src={images[currentIndex]}
                  alt={`Gallery image ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in bg-muted/10"
                />
              )}
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNext}
                className="absolute right-6 z-40 text-white hover:bg-white/20 rounded-full backdrop-blur-sm bg-black/20"
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-50 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <div className="flex justify-center space-x-2 overflow-x-auto scrollbar-hide">
                {images.map((image, index) => {
                  const isVideo = image?.includes('.mp4') || image?.includes('.mov') || image?.includes('.avi');
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === currentIndex
                          ? 'border-primary scale-110'
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      {isVideo ? (
                        <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};