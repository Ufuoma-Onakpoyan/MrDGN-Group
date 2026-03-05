# Duerents video

Place the Duerents intro/promo video here.

**File name:** `duerents.mp4` (exact, lowercase)

**Full path:** The video **must** be at **`group/public/assets/videos/duerents.mp4`**. Putting it only in the "group folder" (e.g. group root or `group/public`) will not work—the app loads only from this path.

Supported format: MP4 (H.264). The video will play in a popup when users click "Duerents" across the MR DGN Group site.

**Deployed builds:** This file is tracked with Git LFS. If you deploy from CI (e.g. Netlify, Vercel), run `git lfs pull` before `npm run build` so the real video is copied into `dist/`. Otherwise the deployed site may serve an LFS pointer and the video will not play. For the group site on Vercel, the build command in `vercel.json` already includes `git lfs install && git lfs pull`; you can also enable Git LFS in the Vercel project’s Git settings.

## Troubleshooting

- **Local:** If the video doesn’t play when running `npm run dev`, open DevTools → Network, open the Duerents modal, and check the request to `…/duerents.mp4`. You should see status 200 and a large size (tens of MB). If you get 404 or a very small size, the file is missing or in the wrong place—confirm it is at `group/public/assets/videos/duerents.mp4` with the exact filename.
- **Deployed:** If it works locally but not on Vercel, enable Git LFS for the project (or ensure the build command runs `git lfs pull`) and redeploy. Alternatively, set the env var `VITE_DUERENTS_VIDEO_URL` to a public URL where the video is hosted (e.g. Cloudinary, Vercel Blob) so the app loads the video from there and LFS is not needed for the build.
