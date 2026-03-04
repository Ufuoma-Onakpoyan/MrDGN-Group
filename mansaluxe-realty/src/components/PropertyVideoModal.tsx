import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { getEmbedUrl } from "@/lib/utils";

interface PropertyVideoModalProps {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export function PropertyVideoModal({
  open,
  onClose,
  videoUrl,
  title = "Property Video",
}: PropertyVideoModalProps) {
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] p-0 gap-0 overflow-hidden bg-black">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="aspect-video w-full bg-black">
          {embedUrl ? (
            <iframe
              src={open ? `${embedUrl}?autoplay=1` : embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title}
            />
          ) : (
            <video
              src={videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
