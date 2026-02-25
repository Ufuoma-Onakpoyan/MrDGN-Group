import { Router, type Request, type Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

function parseSources(s: string | null | undefined): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

function postMatchesSource(sourcesJson: string | null, source: string): boolean {
  const sources = parseSources(sourcesJson);
  return sources.length === 0 || sources.includes(source);
}

// GET /api/dashboard/stats - admin dashboard stats
router.get('/stats', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const [propertyCount, testimonialCount, adminCount, soldProperties, productCount, contactCount, blogCount, jobCount] = await Promise.all([
      prisma.property.count(),
      prisma.testimonial.count(),
      prisma.adminUser.count(),
      prisma.property.count({ where: { status: 'sold' } }),
      prisma.product.count(),
      prisma.contactSubmission.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.jobPosting.count({ where: { published: true } }),
    ]);

    const soldAgg = await prisma.property.aggregate({
      where: { status: 'sold' },
      _sum: { price: true },
    });
    const totalRevenue = soldAgg._sum.price ?? 0;

    const [recentContacts, recentBlog] = await Promise.all([
      prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: 'desc' }, take: 3 }),
    ]);

    res.json({
      totalProperties: propertyCount,
      totalProducts: productCount,
      totalContacts: contactCount,
      totalBlogPosts: blogCount,
      totalJobs: jobCount,
      pendingInquiries: contactCount,
      totalTestimonials: testimonialCount,
      adminUser: adminCount,
      propertiesSold: soldProperties,
      monthlyRevenue: `₦${(totalRevenue / 1_000_000).toFixed(1)}M`,
      recentContacts: recentContacts.map((c) => ({
        id: c.id,
        source: c.source,
        name: c.name,
        email: c.email,
        subject: c.subject,
        created_at: c.createdAt.toISOString(),
      })),
      recentBlogPosts: recentBlog.map((b) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        published_at: b.publishedAt?.toISOString() ?? null,
      })),
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

const BLOG_VIEW_BASE = 1000;

// GET /api/dashboard/blog-analytics?source=group - blog metrics for one site or all
router.get('/blog-analytics', authMiddleware, async (req: Request, res: Response) => {
  try {
    const source = (req.query.source as string) || undefined;
    const allPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        viewCount: true,
        publishedAt: true,
        sources: true,
        author: true,
      },
    });
    const postsForSource = source
      ? allPosts.filter((p) => postMatchesSource(p.sources, source))
      : allPosts;
    const totalRealViews = postsForSource.reduce((sum, p) => sum + p.viewCount, 0);
    const totalDisplayViews = postsForSource.length * BLOG_VIEW_BASE + totalRealViews;
    const topPosts = [...postsForSource]
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 20)
      .map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        author: p.author,
        real_views: p.viewCount,
        display_views: p.viewCount + BLOG_VIEW_BASE,
        published_at: p.publishedAt?.toISOString() ?? null,
      }));

    res.json({
      source: source ?? 'all',
      post_count: postsForSource.length,
      total_real_views: totalRealViews,
      total_display_views: totalDisplayViews,
      top_posts: topPosts,
    });
  } catch (e) {
    console.error('Blog analytics error:', e);
    res.status(500).json({ error: 'Failed to fetch blog analytics' });
  }
});

export { router as dashboardRouter };
