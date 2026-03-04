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

/** Embed URL for YouTube/Vimeo, or null for direct video files. */
export function getEmbedUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return null
}

/** YouTube thumbnail URL for poster, or null if not YouTube. */
export function getYouTubeThumbnailUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  if (!ytMatch) return null
  return `https://img.youtube.com/vi/${ytMatch[1]}/maxresdefault.jpg`
}

/** Display price or luxury "Price on request" when null. */
export function formatPriceDisplay(price: number | null | undefined): string {
  if (price == null || price === "") return "Price on request"
  const n = typeof price === "number" ? price : Number(price)
  if (Number.isNaN(n)) return "Price on request"
  return `₦${n.toLocaleString()}`
}
