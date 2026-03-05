---
name: Mansaluxe video play from listing
overview: (1) Make video cards on the listing page navigate to the property detail page with a playVideo flag so users can play the video there; (2) Remove PropertyCardMedia, VideoFramePoster, usePropertyCardPoster, and Vimeo/frame-capture logic; (3) Simplify card display to card_poster_url, YouTube thumbnail, or soft placeholder; (4) Verify the flow works.
todos: []
isProject: false
---

# Mansaluxe Realty: Video play from listing and cleanup

## Current state

- **Listing cards (Properties, Home, map sidebar):** Use [mansaluxe-realty/src/components/PropertyCardMedia.tsx](mansaluxe-realty/src/components/PropertyCardMedia.tsx), which relies on [mansaluxe-realty/src/hooks/usePropertyCardPoster.ts](mansaluxe-realty/src/hooks/usePropertyCardPoster.ts) and [mansaluxe-realty/src/components/VideoFramePoster.tsx](mansaluxe-realty/src/components/VideoFramePoster.tsx). Posters come from: `card_poster_url`, YouTube thumbnail, Vimeo oEmbed (async), or client-side frame capture at timestamp.
- **Detail page:** Full media gallery; videos are paused by default and play on click (poster then iframe or native video).
- **Card click:** Whole card is wrapped in `<Link to={`/properties/${property.id}`}>`; clicking anywhere goes to the detail page.

## User intent

1. When the first media is a video, users should be able to **play it from the property page** (the listing cards area), not only on the detail page.
2. On click-to-play: either show a message that they can see the video clearly, or **navigate to the detail page**. Recommendation: **navigate to the detail page** (simpler, detail page already has the full player).
3. **Remove** the complex poster/frame-capture setup.
4. **Verify** everything works.

---

## Phase 1: Video play from listing page (click goes to detail with playVideo hint)

**Behavior:** When a listing card shows a video as first media and the user clicks it, go to the detail page and give a clear way to play the video (scroll to it, optional hint).

**Changes:**

1. **Properties page** – [mansaluxe-realty/src/pages/Properties.tsx](mansaluxe-realty/src/pages/Properties.tsx):
  - For each property card, detect when first media is a video (`isVideoUrl(property.images?.[0])`).
  - Use `<Link to={`/properties/${property.id}${isVideo ? '?playVideo=1' : ''}`}>` so video cards add `?playVideo=1`.
  - Apply the same logic to the map sidebar cards.
2. **Home page** – [mansaluxe-realty/src/pages/Home.tsx](mansaluxe-realty/src/pages/Home.tsx):
  - Featured cards: for each property, use `<Link to={`/properties/${property.id}${isVideo ? '?playVideo=1' : ''}`}>` (or equivalent) where `isVideo` means first media is a video.
  - Note: Home uses separate "View Details" button links; update that button’s `to` when first media is video so the detail page opens with `?playVideo=1`.
3. **Property detail page** – [mansaluxe-realty/src/pages/PropertyDetail.tsx](mansaluxe-realty/src/pages/PropertyDetail.tsx):
  - On mount, read `?playVideo=1` from the URL.
  - If present and the first media item is a video, scroll the media section into view (or scroll to top so the main media is visible) and optionally show a small toast or hint: e.g. “Click the video to play.”
  - Keep existing click-to-play behavior for the video player.

---

## Phase 2: Remove poster/frame-capture complexity

**Remove these files:**

- [mansaluxe-realty/src/components/PropertyCardMedia.tsx](mansaluxe-realty/src/components/PropertyCardMedia.tsx)
- [mansaluxe-realty/src/components/VideoFramePoster.tsx](mansaluxe-realty/src/components/VideoFramePoster.tsx)
- [mansaluxe-realty/src/hooks/usePropertyCardPoster.ts](mansaluxe-realty/src/hooks/usePropertyCardPoster.ts)

**Revert [mansaluxe-realty/src/lib/utils.ts](mansaluxe-realty/src/lib/utils.ts):**

- Remove `isVimeoUrl`, `getVimeoThumbnailUrl`, and `isDirectVideoUrl`.
- Keep `getYouTubeThumbnailUrl` and `isVideoUrl`.

**Simplify card media in Properties and Home:**

- In [mansaluxe-realty/src/pages/Properties.tsx](mansaluxe-realty/src/pages/Properties.tsx) (grid and map sidebar): restore inline logic:
  - If first media is image: render `<img src={...} />`.
  - If first media is video: render a div with:
    - `backgroundImage`: `property.card_poster_url` → `url(card_poster_url)`; else `getYouTubeThumbnailUrl(firstMedia)` → YouTube thumb; else `undefined`.
    - When no background image: use soft placeholder class (e.g. `bg-gradient-to-br from-muted to-muted/70`).
    - Overlay with play icon (`PlayCircle`).
- In [mansaluxe-realty/src/pages/Home.tsx](mansaluxe-realty/src/pages/Home.tsx): same pattern.
- Remove imports of `PropertyCardMedia`, `VideoFramePoster`, `usePropertyCardPoster`.
- Re-add `getYouTubeThumbnailUrl` and `isVideoUrl` imports from utils where needed.

**Property type:**

- Keep `card_poster_video_timestamp_seconds` on the API/Property type if the backend already exposes it; no need to use it in the simplified UI.

---

## Phase 3: Verification

- Listing page: video cards show poster (card_poster_url or YouTube thumb) or soft placeholder; no black screen; no frame capture.
- Clicking a video card: navigates to `/properties/:id?playVideo=1`.
- Detail page: media gallery shows video; with `?playVideo=1`, scrolls media into view and optionally shows “Click to play” hint; click-to-play works for videos.
- Home featured cards: same poster logic and link behavior when first media is video.
- Map sidebar cards: same poster logic; map popup links already go to detail; optionally add `?playVideo=1` when first media is video.
- No runtime errors; no references to removed components or utils.

---

## Summary


| Step | Action                                                                                    |
| ---- | ----------------------------------------------------------------------------------------- |
| 1    | Add `?playVideo=1` to card links when first media is video (Properties grid + map, Home). |
| 2    | Detail page: read `playVideo=1`, scroll to media, optionally show “Click to play” hint.   |
| 3    | Delete PropertyCardMedia, VideoFramePoster, usePropertyCardPoster.                        |
| 4    | Simplify utils: remove Vimeo and direct-video helpers.                                    |
| 5    | Inline card media logic: card_poster_url > YouTube thumb > soft placeholder.              |
| 6    | Verify full flow.                                                                         |


