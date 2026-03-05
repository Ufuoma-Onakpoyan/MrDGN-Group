import React, { createContext, useCallback, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const DUERENTS_VIDEO_SRC = "/assets/videos/duerents.mp4";

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

  const openVideo = useCallback(() => setOpen(true), []);
  const onOpenChange = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  return (
    <DuerentsVideoContext.Provider value={{ openVideo }}>
      {children}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 overflow-hidden bg-black">
          <DialogTitle className="sr-only">Duerents – MR DGN Group</DialogTitle>
          <div className="relative aspect-video w-full">
            <video
              src={DUERENTS_VIDEO_SRC}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
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
