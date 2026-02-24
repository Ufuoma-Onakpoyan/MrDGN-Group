import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import constructionsUpdates from '@/assets/our-story-constructions-updates.mp4';
import deliveryUpdates from '@/assets/our-story-delivery-updates.mp4';
import siteUpdates from '@/assets/our-story-site-updates.mp4';

const VIDEOS = [
  { src: constructionsUpdates, title: 'Constructions Updates' },
  { src: deliveryUpdates, title: 'Delivery Updates' },
  { src: siteUpdates, title: 'Site Updates' },
];

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = VIDEOS[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < VIDEOS.length - 1;

  const goPrev = () => {
    if (hasPrev) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const goNext = () => {
    if (hasNext) {
      setCurrentIndex((i) => i + 1);
    }
  };

  // Reset to first video when modal opens; play when current video changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;
    video.load();
    video.play().catch(() => {});
  }, [currentIndex, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl">
        {/* Close button */}
        <div className="absolute top-3 right-3 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full h-10 w-10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Video title bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent px-4 py-3 pt-4">
          <h3 className="text-lg font-semibold text-white pr-12">
            Our Story — {current.title}
          </h3>
          <p className="text-sm text-white/80 mt-0.5">
            Video {currentIndex + 1} of {VIDEOS.length}
          </p>
        </div>

        {/* Video player */}
        <div className="aspect-video bg-black">
          <video
            ref={videoRef}
            src={current.src}
            className="w-full h-full object-contain"
            controls
            playsInline
            onEnded={() => {
              if (hasNext) setCurrentIndex((i) => i + 1);
            }}
          />
        </div>

        {/* Navigation bar */}
        <div className="flex items-center justify-between gap-4 bg-neutral-900 px-4 py-3">
          <Button
            variant="outline"
            size="sm"
            onClick={goPrev}
            disabled={!hasPrev}
            className="gap-2 text-white border-white/30 hover:bg-white/10 hover:border-white/50 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex gap-1.5">
            {VIDEOS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? 'w-6 bg-primary'
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to video ${i + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={goNext}
            disabled={!hasNext}
            className="gap-2 text-white border-white/30 hover:bg-white/10 hover:border-white/50 disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
