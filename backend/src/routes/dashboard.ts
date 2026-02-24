import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/dashboard/stats - admin dashboard stats
router.get('/stats', authMiddleware, async (_req, res) => {
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

export { router as dashboardRouter };
