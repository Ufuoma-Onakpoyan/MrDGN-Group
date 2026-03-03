import { useEffect, useRef } from "react";

interface VideoFramePosterProps {
  videoUrl: string;
  timestampSeconds: number;
  onFrameUrl: (dataUrl: string | null) => void;
}

/**
 * Renders a hidden video, seeks to timestampSeconds, captures a frame to canvas,
 * and passes the data URL to onFrameUrl. Calls onFrameUrl(null) on error or CORS.
 */
export function VideoFramePoster({ videoUrl, timestampSeconds, onFrameUrl }: VideoFramePosterProps) {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!videoUrl) {
      onFrameUrl(null);
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    const timeout = window.setTimeout(() => {
      if (mountedRef.current) onFrameUrl(null);
    }, 15000);

    const cleanup = () => {
      window.clearTimeout(timeout);
      video.pause();
      video.src = "";
      video.load();
    };

    const captureFrame = () => {
      try {
        if (!mountedRef.current) return;
        if (video.videoWidth === 0 || video.videoHeight === 0) {
          onFrameUrl(null);
          return;
        }
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          onFrameUrl(null);
          return;
        }
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        if (mountedRef.current) onFrameUrl(dataUrl);
      } catch {
        if (mountedRef.current) onFrameUrl(null);
      } finally {
        cleanup();
      }
    };

    const onSeeked = () => {
      window.clearTimeout(timeout);
      captureFrame();
    };

    const onError = () => {
      window.clearTimeout(timeout);
      if (mountedRef.current) onFrameUrl(null);
      cleanup();
    };

    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("error", onError, { once: true });

    video.src = videoUrl;
    video.load();

    const onLoadedMetadata = () => {
      const t = Math.max(0, Math.min(timestampSeconds, video.duration));
      video.currentTime = t;
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata, { once: true });

    return cleanup;
  }, [videoUrl, timestampSeconds, onFrameUrl]);

  return null;
}
