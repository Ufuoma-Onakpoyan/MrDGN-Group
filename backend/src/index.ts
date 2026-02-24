import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { authRouter } from './routes/auth.js';
import { propertiesRouter } from './routes/properties.js';
import { testimonialsRouter } from './routes/testimonials.js';
import { blogRouter } from './routes/blog.js';
import { portfolioRouter } from './routes/portfolio.js';
import { contactRouter } from './routes/contact.js';
import { productsRouter } from './routes/products.js';
import { jobsRouter } from './routes/jobs.js';
import { constructionProjectsRouter } from './routes/construction-projects.js';
import { uploadRouter } from './routes/upload.js';
import { dashboardRouter } from './routes/dashboard.js';
import { newsletterRouter } from './routes/newsletter.js';
import { eventsRouter } from './routes/events.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// CORS - allow Group(5173), Admin(5174), Realty(5175), Entertainment(5176), Construction(5177)
const defaultOrigins = 'http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:5176,http://localhost:5177';
const origins = (process.env.CORS_ORIGINS || defaultOrigins).split(',').map((o) => o.trim());
app.use(cors({ origin: origins, credentials: true }));

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/properties', propertiesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/portfolio', portfolioRouter);
app.use('/api/contact', contactRouter);
app.use('/api/products', productsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/construction/projects', constructionProjectsRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/events', eventsRouter);

// 404
app.use('/api/*', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});
