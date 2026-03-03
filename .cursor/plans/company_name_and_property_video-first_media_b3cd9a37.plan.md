---
name: Company name and property video-first media
overview: (1) Update the construction company name to "Mr DGN construction and developers limited" across the codebase. (2) Restructure Mansaluxe Realty admin property media so videos can be first; on the front-facing site, show that first media (including video) on listing cards and on the property detail page with videos paused until the user clicks to play.
todos: []
isProject: false
---

# Company name update and property video-first media

## Part 1 – Company name: "Mr DGN construction and developers limited"

The construction subsidiary is currently referred to as "MR DGN Constructions", "MrDGN Constructions", or similar. Update all **display and copy** to the full legal name **"Mr DGN construction and developers limited"** (or your preferred casing, e.g. "Mr DGN Construction and Developers Limited").

**Scope (construction app and shared references):**

- [construction/src/components/Footer.tsx](construction/src/components/Footer.tsx) – Logo alt, subtitle ("MR DGN Constructions" / "subsidiary of MrDGN Group"), copyright "MR DGN Constructions", link text.
- [construction/src/pages/AboutUs.tsx](construction/src/pages/AboutUs.tsx) – Page title, headings ("MrDGN Constructions"), body copy, image alts, CEO section text.
- [mansaluxe-realty/src/components/layout/Footer.tsx](mansaluxe-realty/src/components/layout/Footer.tsx) – Facebook link text "Mr-DGN-Construction-and-Developers-Limited" is in the URL (third-party); only update any visible label if it says "Construction" company name.
- [entertainment/src/components/Footer.tsx](entertainment/src/components/Footer.tsx) – Google Maps link is third-party URL; no change to URL. Update any visible text that mentions the construction company name.
- [DEPLOYMENT.md](DEPLOYMENT.md) – Update any project/site naming that refers to the construction company (e.g. "MrDGN" project names) if you want docs to match the new name.

**Leave unchanged:** External URLs (Facebook, Google Maps, Instagram) that contain "Mr-DGN-Construction-and-Developers-Limited" or similar; these are third-party and changing them could break links. Only in-app display text and meta/alt text should change.

---

## Part 2 – Property media: videos as first media, paused until click

### Current flow (brief)

- **Backend:** Property has `images` (JSON array of URLs, any order) and optional `videos` (drone, walkthrough, general). Order of `images` is preserved.
- **Admin:** [admin/src/pages/admin/Properties.tsx](admin/src/pages/admin/Properties.tsx) keeps `uploadedImages` and `uploadedVideos` **separate** and always sends `images: [...uploadedImages, ...uploadedVideos]`, so images always come first. There is a rule: "at least one image before adding videos."
- **When editing:** Property’s `images` is split into images vs videos by URL type; the **original order is lost** because they’re put into two lists and recombined as images then videos.
- **Frontend listing:** [mansaluxe-realty/src/pages/Properties.tsx](mansaluxe-realty/src/pages/Properties.tsx) and [mansaluxe-realty/src/pages/Home.tsx](mansaluxe-realty/src/pages/Home.tsx) use `property.images[0]` inside `<img src={...}>`. If the first item were a video URL, the image would fail to load.
- **Property detail:** [mansaluxe-realty/src/pages/PropertyDetail.tsx](mansaluxe-realty/src/pages/PropertyDetail.tsx) builds `mediaItems` from `property.images` (order preserved) plus labeled `videos`. Videos are rendered with `<video controls>` or iframe with no explicit "paused by default; play on click" behavior. YouTube/Vimeo iframes often autoplay when visible.

### Target flow

1. **Admin:** One ordered media list (images and videos together). Admin can add videos first, reorder, and have video as the first item. That order is saved in `property.images`.
2. **Listing (Properties + Home + map):** First media = `property.images[0]`. If it’s a video URL, show a **thumbnail/poster with play icon** (no `<img src={videoUrl}>`, no autoplay). If image, keep current `<img>`.
3. **Property detail (only when viewing that property in more detail):** Same order; first item can be video. **Videos start paused;** user clicks to play. Native `<video>`: no autoplay, click to play. YouTube/Vimeo: show poster/thumbnail and load (and optionally play) iframe only on first click to avoid autoplay and many iframes.

---

## Implementation plan

### 2.1 Admin panel – single ordered media list

**File:** [admin/src/pages/admin/Properties.tsx](admin/src/pages/admin/Properties.tsx)

- Replace state `uploadedImages` + `uploadedVideos` with a single list, e.g.  
`uploadedMedia: { url: string; type: 'image' | 'video' }[]`.  
Use a shared `isVideoUrl(url)` helper (same logic as in PropertyDetail: `.mp4`, `.mov`, `.avi`, `webm`, `youtube`, `youtu.be`, `vimeo`).
- **Add media:**  
  - "Add images" appends items with `type: 'image'`.  
  - "Add videos" appends items with `type: 'video'`.  
  Remove the validation that blocks adding videos until at least one image exists; optionally require at least one media item (image or video) on submit.
- **Reordering:** Add simple reorder controls (e.g. up/down buttons or drag-and-drop) so the first item can be a video.
- **When opening edit:** Build `uploadedMedia` from `property.images` **in order**: for each URL, push `{ url, type: isVideoUrl(url) ? 'video' : 'image' }`. Do not split into two lists and re-merge (that loses order).
- **Submit:** Send `images: uploadedMedia.map(m => m.url)` so backend receives the chosen order (videos can be first).
- **UI:** Single "Property media" section: one ordered list showing thumbnails + type icon (image/video), with remove and reorder. Two actions: "Upload images" and "Upload videos", both appending to the same list. Update the "Property Videos (file upload)" copy so it’s clear videos can be first and order is customizable.

No backend or API changes: backend already stores and returns `images` as an ordered array.

### 2.2 Mansaluxe frontend – listing and home

**Files:**  
[mansaluxe-realty/src/pages/Properties.tsx](mansaluxe-realty/src/pages/Properties.tsx),  
[mansaluxe-realty/src/pages/Home.tsx](mansaluxe-realty/src/pages/Home.tsx)

- **Shared helper:** Add a small util (e.g. in [mansaluxe-realty/src/lib/utils.ts](mansaluxe-realty/src/lib/utils.ts) or next to the API) `isVideoUrl(url: string): boolean` (same logic as PropertyDetail). Use it wherever you need to branch on first media type.
- **First media on cards:**  
  - If `property.images?.length > 0`:  
    - If `isVideoUrl(property.images[0])`: render a **video placeholder** (e.g. a div with background from a poster if available, or a neutral background + Play icon). Do **not** use `<img src={property.images[0]}>` and do **not** load the video file on the listing page (no `<video src={...}>` with preload). Optionally for YouTube/Vimeo you can show a thumbnail (e.g. `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg`) and a play overlay.  
    - Else: keep current `<img src={property.images[0]} ... />`.
  - If no media: keep current placeholder (icon + "View Details").
- Apply this in:
  - **Properties.tsx:** main grid cards (around line 562) and map view cards (around line 499).
  - **Home.tsx:** featured property cards (around line 189).

Result: users see the first media (image or video thumbnail) on listing and home; no broken image when first item is video; no video autoplay on listing.

### 2.3 Property detail – paused by default, play on click

**File:** [mansaluxe-realty/src/pages/PropertyDetail.tsx](mansaluxe-realty/src/pages/PropertyDetail.tsx)

- **Native `<video>` (direct MP4 etc.):**
  - Do not use `autoPlay`. Use `preload="metadata"` (or `preload="none"`) so it loads paused.
  - Add a `ref` to the video element and an overlay or click handler on the container: on first click, call `videoRef.current?.play()`. Optionally show a "Play" overlay until played. Keep `controls` so user can pause/seek. If the browser requires it for programmatic play, add `muted` and then unmute after play (or keep unmuted and rely on user gesture).
  - Ensure the video is **paused** when the slide is first shown (e.g. in a `useEffect` when `current` changes to a video, call `videoRef.current?.pause()`).
- **YouTube / Vimeo iframes:**
  - **Option A (simplest):** Do not render the iframe until the user clicks "Play". Show a poster (e.g. YouTube: `https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg` or `0.jpg`; Vimeo: optional placeholder or first frame if you have an API). On click, render the iframe with `?autoplay=1` so it starts on user gesture. This keeps "paused" (no iframe loaded) until click and avoids multiple iframes on the page.
  - **Option B:** Render iframe with `?autoplay=0` and use an overlay + postMessage or embed API to call play() on click. More code; use if you prefer to always load the iframe.

Recommendation: Option A for embeds; native video with ref + click-to-play and no autoplay.

- **SEO:** For `og:image`, prefer the first **image** URL from `mediaItems` (if any) so social previews show a static image; fallback to `property.images?.[0]` only if it’s an image. Avoid using a video URL for `og:image` (many platforms don’t support video OG well).

---

## Possible errors and edge cases


| Risk                                                               | Mitigation                                                                                                                                                                              |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Listing card uses `<img src={videoUrl}>` when first media is video | Always branch on `isVideoUrl(property.images[0])` and render placeholder/play icon for video; never use video URL in `<img>`.                                                           |
| Many videos on listing page if we used `<video>`                   | Do not use `<video src={...}>` on listing; use only a static placeholder (div + play icon or YouTube thumbnail).                                                                        |
| Property detail video autoplays                                    | No `autoPlay`; use ref + click handler to play(); for iframes, load on click (Option A) or use autoplay=0.                                                                              |
| Admin edit loses media order                                       | When opening edit, build one list from `property.images` in order with type; when saving, send that order as `images`.                                                                  |
| Existing properties have images-first order                        | No migration needed; existing data stays. New/edited properties can have video-first once admin uses the new reorderable list.                                                          |
| YouTube thumbnail URL                                              | Use `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` (fallback `0.jpg` or `hqdefault.jpg` if needed). Extract `videoId` from URL (e.g. youtu.be/ID or youtube.com/watch?v=ID). |
| Map view and list view both use first media                        | Apply the same "first media image vs video" logic in both the grid cards and the map sidebar cards in Properties.tsx.                                                                   |


---

## Summary of files to touch

- **Company name:**  
[construction/src/components/Footer.tsx](construction/src/components/Footer.tsx), [construction/src/pages/AboutUs.tsx](construction/src/pages/AboutUs.tsx), optionally [mansaluxe-realty/src/components/layout/Footer.tsx](mansaluxe-realty/src/components/layout/Footer.tsx), [entertainment/src/components/Footer.tsx](entertainment/src/components/Footer.tsx), [DEPLOYMENT.md](DEPLOYMENT.md).
- **Admin media restructure:**  
[admin/src/pages/admin/Properties.tsx](admin/src/pages/admin/Properties.tsx) (single ordered media list, reorder, allow videos first; preserve order on load/save).
- **Mansaluxe frontend:**  
[mansaluxe-realty/src/pages/Properties.tsx](mansaluxe-realty/src/pages/Properties.tsx) (grid + map first-media logic), [mansaluxe-realty/src/pages/Home.tsx](mansaluxe-realty/src/pages/Home.tsx) (featured cards), shared `isVideoUrl` (e.g. [mansaluxe-realty/src/lib/utils.ts](mansaluxe-realty/src/lib/utils.ts) or [mansaluxe-realty/src/services/api.ts](mansaluxe-realty/src/services/api.ts)).
- **Property detail – paused, click to play:**  
[mansaluxe-realty/src/pages/PropertyDetail.tsx](mansaluxe-realty/src/pages/PropertyDetail.tsx) (native video: ref, no autoplay, click to play; iframe: poster + load/play on click; og:image from first image when available).

No backend or Prisma changes required; `images` array order is already persisted and returned as-is.