import { useState, useEffect } from "react";
import type { Property } from "@/services/api";
import {
  isVideoUrl,
  getYouTubeThumbnailUrl,
  isVimeoUrl,
  getVimeoThumbnailUrl,
  isDirectVideoUrl,
} from "@/lib/utils";

export interface PropertyCardPosterResult {
  /** Resolved poster URL (uploaded, YouTube, or Vimeo). Null when direct video or not yet loaded. */
  posterUrl: string | null;
  /** True while Vimeo thumbnail is being fetched. */
  loading: boolean;
  /** When first media is direct video and no poster URL, pass this to VideoFramePoster. */
  directVideo: { videoUrl: string; timestampSeconds: number } | null;
}

/**
 * Resolves the poster image URL for a property card when the first media is a video.
 * Priority: card_poster_url > YouTube thumbnail > Vimeo thumbnail (async).
 * For direct video URLs, returns directVideo so the card can use VideoFramePoster.
 */
export function usePropertyCardPoster(property: Property | null): PropertyCardPosterResult {
  const firstMedia = property?.images?.[0] ?? null;
  const [vimeoThumb, setVimeoThumb] = useState<string | null>(null);
  const [vimeoLoading, setVimeoLoading] = useState(false);

  const cardPosterUrl = property?.card_poster_url ?? null;
  const timestampSeconds = property?.card_poster_video_timestamp_seconds ?? 0;

  useEffect(() => {
    if (!firstMedia || !isVideoUrl(firstMedia) || cardPosterUrl || getYouTubeThumbnailUrl(firstMedia))
      return;
    if (!isVimeoUrl(firstMedia)) return;
    setVimeoLoading(true);
    setVimeoThumb(null);
    getVimeoThumbnailUrl(firstMedia).then((url) => {
      setVimeoThumb(url);
      setVimeoLoading(false);
    });
  }, [firstMedia, cardPosterUrl]);

  if (!property || !firstMedia || !isVideoUrl(firstMedia)) {
    return { posterUrl: null, loading: false, directVideo: null };
  }

  if (cardPosterUrl) {
    return { posterUrl: cardPosterUrl, loading: false, directVideo: null };
  }

  const ytThumb = getYouTubeThumbnailUrl(firstMedia);
  if (ytThumb) {
    return { posterUrl: ytThumb, loading: false, directVideo: null };
  }

  if (isVimeoUrl(firstMedia)) {
    return { posterUrl: vimeoThumb, loading: vimeoLoading, directVideo: null };
  }

  if (isDirectVideoUrl(firstMedia)) {
    return {
      posterUrl: null,
      loading: false,
      directVideo: { videoUrl: firstMedia, timestampSeconds },
    };
  }

  return { posterUrl: null, loading: false, directVideo: null };
}
