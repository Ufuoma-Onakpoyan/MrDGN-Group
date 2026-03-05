# Duerents video

The Duerents intro/promo video is **hosted on Cloudinary** (public id: `duerents_1_ji1mp7`). It plays in a popup when users click "Duerents" across the MR DGN Group site.

## What you need to do

1. **Set your Cloudinary cloud name** (same as the one used by your backend/admin uploads):
   - **Local:** In `group/.env.local`, add:  
     `VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name`
   - **Vercel:** In Project → Settings → Environment Variables, add:  
     `VITE_CLOUDINARY_CLOUD_NAME` = your Cloudinary cloud name (e.g. the value of `CLOUDINARY_CLOUD_NAME` from your backend).

   The app will then load the video from:  
   `https://res.cloudinary.com/<your_cloud_name>/video/upload/duerents_1_ji1mp7`

2. **Optional override:** If you prefer a full URL (e.g. a different CDN), set **`VITE_DUERENTS_VIDEO_URL`** to that URL instead. It takes priority over the Cloudinary URL above.

No video file is stored in this folder or in the repo; the video is served from Cloudinary.
