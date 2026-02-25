import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authMiddleware } from '../middleware/auth.js';

const uploadsDir = path.join(process.cwd(), 'uploads');

const useCloudinary =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

// Ensure uploads dir exists (for disk fallback)
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Disk storage for local dev when Cloudinary is not configured
const diskStorage = multer.diskStorage({
  destination: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isVideo = /\.(mp4|mov|avi|webm)$/.test(ext);
    const dir = path.join(uploadsDir, isVideo ? 'videos' : 'images');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const ext = path.extname(file.originalname) || '.bin';
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});

const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: useCloudinary ? memoryStorage : diskStorage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB
  fileFilter: (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp|svg|mp4|mov|avi|webm)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

const router = Router();
const baseUrl = process.env.UPLOAD_URL || 'http://localhost:3001/uploads';

// POST /api/upload/:bucket - upload file (protected)
router.post('/:bucket', authMiddleware, upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  if (useCloudinary && req.file.buffer) {
    try {
      const { v2: cloudinary } = await import('cloudinary');
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      const folder = process.env.CLOUDINARY_FOLDER || 'mrdgn';
      const bucketFolder = `${folder}/${(req.params.bucket || 'uploads').replace(/-/g, '_')}`;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const isVideo = /\.(mp4|mov|avi|webm)$/.test(ext);
      const resourceType = isVideo ? 'video' : 'image';
      const b64 = req.file.buffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${b64}`;
      const result = await cloudinary.uploader.upload(dataUri, {
        resource_type: resourceType,
        folder: bucketFolder,
      });
      const url = result.secure_url;
      return res.json({ url });
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }
  }

  // Disk fallback (local or when Cloudinary not configured)
  const relativePath = path.relative(uploadsDir, (req.file as Express.Multer.File & { path: string }).path).replace(/\\/g, '/');
  const url = `${baseUrl.replace(/\/$/, '')}/${relativePath}`;
  res.json({ url });
});

export { router as uploadRouter };
