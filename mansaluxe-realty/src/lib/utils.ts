import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** True if URL is a video (file or YouTube/Vimeo). */
export function isVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false
  return !!(
    url.includes(".mp4") ||
    url.includes(".mov") ||
    url.includes(".avi") ||
    url.includes("webm") ||
    url.includes("youtube") ||
    url.includes("youtu.be") ||
    url.includes("vimeo")
  )
}

/** YouTube thumbnail URL for poster, or null if not YouTube. */
export function getYouTubeThumbnailUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  if (!ytMatch) return null
  return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`
}

/** Whether the URL is a Vimeo video. */
export function isVimeoUrl(url: string | null | undefined): boolean {
  if (!url) return false
  return url.includes('vimeo.com')
}

/** Vimeo thumbnail URL via oEmbed (async). Returns null for non-Vimeo or on error. */
export async function getVimeoThumbnailUrl(url: string | null | undefined): Promise<string | null> {
  if (!url || !isVimeoUrl(url)) return null
  try {
    const oembedUrl = `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`
    const res = await fetch(oembedUrl)
    if (!res.ok) return null
    const data = (await res.json()) as { thumbnail_url?: string }
    return data?.thumbnail_url ?? null
  } catch {
    return null
  }
}

/** Whether the URL is a direct video file (not YouTube/Vimeo). */
export function isDirectVideoUrl(url: string | null | undefined): boolean {
  if (!url) return false
  if (url.includes('youtube') || url.includes('youtu.be') || url.includes('vimeo')) return false
  return !!(url.includes('.mp4') || url.includes('.mov') || url.includes('.avi') || url.includes('webm'))
}

/** Display price or luxury "Price on request" when null. */
export function formatPriceDisplay(price: number | null | undefined): string {
  if (price == null) return "Price on request"
  return `₦${price.toLocaleString()}`
}
