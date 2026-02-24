import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { useNavigate } from 'react-router-dom';
import { Calendar, Loader2, ArrowRight } from 'lucide-react';

/** Placeholder when no featured image is set. Same pattern as entertainment/group so blog pictures show on all sites. */
const BLOG_IMAGE_PLACEHOLDER = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=450&fit=crop';

const Blog = () => {
  const navigate = useNavigate();
  const { data: posts = [], isLoading } = useBlogPosts('construction');

  useEffect(() => {
    document.title = 'Blog - MR DGN Constructions';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Construction <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              News, insights, and updates from MrDGN Construction. Stay informed on industry trends and our latest projects.
            </p>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span className="text-muted-foreground">Loading posts...</span>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg">No blog posts yet.</p>
              <p className="text-sm mt-2">Check back soon for updates.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="card-elevated hover-lift cursor-pointer overflow-hidden"
                  onClick={() => navigate(`/blog/${post.slug}`)}
                >
                  <div className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
                    <img
                      src={post.featured_image_url || BLOG_IMAGE_PLACEHOLDER}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt || 'Read more...'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString()
                          : new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <Button variant="ghost" size="sm" className="text-primary">
                        Read more <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
