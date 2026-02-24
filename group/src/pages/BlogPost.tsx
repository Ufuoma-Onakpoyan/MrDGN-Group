import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { Calendar, User, Eye, ArrowLeft, Loader2, Tag } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useBlogPost(slug!);

  React.useEffect(() => {
    if (post) document.title = `${post.title} | MrDGN Group`;
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen page-transition">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading blog post...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen page-transition">
        <Navigation />
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-foreground mb-4">Blog Post Not Found</h1>
              <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/media')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Media
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      
      {/* Hero Section with Featured Image */}
      <section className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button 
            variant="ghost" 
            onClick={() => {
              navigate('/media');
              window.scrollTo(0, 0);
            }}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Media
          </Button>
          
          {post.featured_image_url ? (
            <div className="relative rounded-lg overflow-hidden mb-8 shadow-xl bg-muted">
              <img 
                src={post.featured_image_url} 
                alt={post.title}
                className="w-full h-auto max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          ) : (
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                {post.title}
              </h1>
            </div>
          )}
        </div>
      </section>

      {/* Blog Content */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="tile-glassy">
            <CardContent className="p-8 md:p-12">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-8 pb-8 border-b border-border">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-2" />
                  {post.view_count} views
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <div className="text-xl text-muted-foreground italic mb-8 p-6 bg-muted/30 rounded-lg border-l-4 border-primary">
                  {post.excerpt}
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-img:max-w-full prose-img:h-auto prose-img:object-contain prose-img:rounded-lg">
                <div 
                  className="text-foreground leading-relaxed"
                  style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: post.content.replace(/\n/g, '<br />') 
                  }} 
                />
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Button 
              onClick={() => {
                navigate('/media');
                window.scrollTo(0, 0);
              }}
              size="lg"
              className="px-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Media Center
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;