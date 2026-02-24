import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { adminAPI, DashboardStats } from '@/lib/admin-api';
import { Building2, MessageSquareText, TrendingUp, DollarSign, Home, FileText, Package, Mail, Briefcase } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardStats = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const dashboardStats = await adminAPI.getDashboardStats();
      setStats(dashboardStats);
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6">
        <div className="text-center py-12 max-w-md mx-auto">
          <p className="text-destructive font-medium mb-2">{error ?? 'Failed to load dashboard data'}</p>
          <p className="text-muted-foreground text-sm mb-4">Check your connection and try again.</p>
          <button
            onClick={() => loadDashboardStats()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Properties',
      value: stats.totalProperties,
      icon: Building2,
      description: 'MansaLuxe Realty listings',
      color: 'text-red-500'
    },
    {
      title: 'Sold',
      value: stats.propertiesSold,
      icon: Home,
      description: 'Properties sold',
      color: 'text-green-500'
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: MessageSquareText,
      description: 'MansaLuxe Realty reviews',
      color: 'text-red-400'
    },
    {
      title: 'Products',
      value: stats.totalProducts ?? 0,
      icon: Package,
      description: 'Construction products',
      color: 'text-red-400'
    },
    {
      title: 'Contact Inquiries',
      value: stats.totalContacts ?? stats.pendingInquiries ?? 0,
      icon: Mail,
      description: 'Form submissions',
      color: 'text-blue-500'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogPosts ?? 0,
      icon: FileText,
      description: 'Published articles',
      color: 'text-orange-500'
    },
    {
      title: 'Job Postings',
      value: stats.totalJobs ?? 0,
      icon: Briefcase,
      description: 'Published jobs',
      color: 'text-purple-500'
    },
    {
      title: 'Total Revenue',
      value: stats.monthlyRevenue,
      icon: DollarSign,
      description: 'From sold properties',
      color: 'text-primary',
      isSpecial: true
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Overview of content across MrDGN Group websites: MansaLuxe Realty, Group, Entertainment, and Construction.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className={`transition-all hover:shadow-lg ${card.isSpecial ? 'border-primary/50 bg-gradient-to-br from-card to-primary/5' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${card.isSpecial ? 'text-primary' : 'text-foreground'}`}>
                  {card.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-serif">Recent Contact Inquiries</CardTitle>
              <Link to="/admin/contacts" className="text-sm text-primary hover:underline">View all</Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(stats.recentContacts?.length ?? 0) > 0 ? (
                stats.recentContacts!.map((c) => (
                  <div key={c.id} className="flex items-center space-x-3">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{c.subject || c.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.name || c.email} · {c.source} · {new Date(c.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent contact submissions</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/admin/properties" className="p-4 text-left border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors block">
                <Building2 className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium">Add Property</p>
                <p className="text-xs text-muted-foreground">MansaLuxe Realty</p>
              </Link>
              <Link to="/admin/testimonials" className="p-4 text-left border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors block">
                <MessageSquareText className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium">Add Testimonial</p>
                <p className="text-xs text-muted-foreground">Client review</p>
              </Link>
              <Link to="/admin/blog" className="p-4 text-left border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors block">
                <FileText className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium">Manage Blog</p>
                <p className="text-xs text-muted-foreground">All sites</p>
              </Link>
              <Link to="/admin/jobs" className="p-4 text-left border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors block">
                <Briefcase className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium">Manage Jobs</p>
                <p className="text-xs text-muted-foreground">Careers</p>
              </Link>
              <Link to="/admin/contacts" className="p-4 text-left border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors block">
                <Mail className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium">Contact Inquiries</p>
                <p className="text-xs text-muted-foreground">Form submissions</p>
              </Link>
              <Link to="/admin/products" className="p-4 text-left border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors block">
                <Package className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium">Manage Products</p>
                <p className="text-xs text-muted-foreground">Construction</p>
              </Link>
              <Link to="/admin/reports" className="p-4 text-left border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors block">
                <TrendingUp className="h-5 w-5 text-primary mb-2" />
                <p className="text-sm font-medium">View Reports</p>
                <p className="text-xs text-muted-foreground">Analytics</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}