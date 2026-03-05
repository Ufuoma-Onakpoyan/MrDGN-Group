# Duerents video

Place the Duerents intro/promo video here.

**File name:** `duerents.mp4` (exact, lowercase)

**Full path:** The video **must** be at **`group/public/assets/videos/duerents.mp4`**. Putting it only in the "group folder" (e.g. group root or `group/public`) will not work—the app loads only from this path.

Supported format: MP4 (H.264). The video will play in a popup when users click "Duerents" across the MR DGN Group site.

**Deployed builds (Vercel):** This file is tracked with Git LFS. Running `git lfs pull` in the build command can fail on Vercel ("missing protocol" / empty URL). To get the video on the live site: (1) In Vercel, go to **Project → Settings → Git** and enable **Git LFS** so Vercel fetches LFS files during clone; redeploy. Or (2) host the video elsewhere (e.g. Cloudinary, Vercel Blob), set the env var **`VITE_DUERENTS_VIDEO_URL`** to that URL in Vercel, and redeploy—the app will use that URL and the video will play without LFS.

## Troubleshooting

- **Local:** If the video doesn’t play when running `npm run dev`, open DevTools → Network, open the Duerents modal, and check the request to `…/duerents.mp4`. You should see status 200 and a large size (tens of MB). If you get 404 or a very small size, the file is missing or in the wrong place—confirm it is at `group/public/assets/videos/duerents.mp4` with the exact filename.
- **Deployed:** If it works locally but not on Vercel, enable **Git LFS** in the project’s Git settings (Vercel will fetch LFS on clone) and redeploy. If LFS still fails in build, use **`VITE_DUERENTS_VIDEO_URL`**: upload the video to Cloudinary, Vercel Blob, or similar, add that URL as the env var in Vercel, and redeploy—the video will play from that URL and the build no longer depends on LFS.
