import React, { createContext, useCallback, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const CLOUDINARY_PUBLIC_ID = "duerents_1_ji1mp7";
const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined)?.trim();
const cloudinaryVideoUrl =
  cloudName ? `https://res.cloudinary.com/${cloudName}/video/upload/${CLOUDINARY_PUBLIC_ID}` : "";

const DUERENTS_VIDEO_SRC =
  (import.meta.env.VITE_DUERENTS_VIDEO_URL as string | undefined)?.trim() ||
  cloudinaryVideoUrl ||
  `${(import.meta.env.BASE_URL || "/").replace(/\/$/, "")}/assets/videos/duerents.mp4`;

type DuerentsVideoContextValue = {
  openVideo: () => void;
};

const DuerentsVideoContext = createContext<DuerentsVideoContextValue | null>(null);

export function useDuerentsVideo() {
  const ctx = useContext(DuerentsVideoContext);
  if (!ctx) return { openVideo: () => {} };
  return ctx;
}

export function DuerentsVideoProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const openVideo = useCallback(() => {
    setLoadError(false);
    setOpen(true);
  }, []);
  const onOpenChange = useCallback((value: boolean) => {
    setOpen(value);
    if (!value) setLoadError(false);
  }, []);

  return (
    <DuerentsVideoContext.Provider value={{ openVideo }}>
      {children}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 overflow-hidden bg-black">
          <DialogTitle className="sr-only">Duerents – MR DGN Group</DialogTitle>
          <div className="relative aspect-video w-full">
            {loadError ? (
              <div className="flex flex-col items-center justify-center gap-3 p-6 text-white text-center min-h-[200px]">
                <p>Video could not be loaded.</p>
                <p className="text-sm text-white/80">
                  The file may be missing from this build. Try again later or visit{" "}
                  <a href="https://duerents.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">
                    duerents.com
                  </a>
                  .
                </p>
              </div>
            ) : (
              <video
                src={DUERENTS_VIDEO_SRC}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                onError={() => setLoadError(true)}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DuerentsVideoContext.Provider>
  );
}

/** Use wherever "Duerents" appears: clickable text that opens the video popup */
export function DuerentsLink({ className }: { className?: string }) {
  const { openVideo } = useDuerentsVideo();
  return (
    <button
      type="button"
      onClick={openVideo}
      className={className ?? "text-primary hover:underline cursor-pointer font-medium"}
      aria-label="Watch Duerents video"
    >
      Duerents
    </button>
  );
}
