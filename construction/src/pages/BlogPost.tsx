import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: post, isLoading, error } = useBlogPost(slug!, 'construction');

  useEffect(() => {
    if (post) document.title = `${post.title} - MR DGN Constructions`;
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-16 flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-16 container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/blog')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <article className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>

          <div className="rounded-lg overflow-hidden mb-8 bg-muted flex items-center justify-center">
            <img
              src={post.featured_image_url || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=450&fit=crop'}
              alt={post.title}
              className="w-full h-auto max-w-full object-contain"
            />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground text-sm mb-8">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString()
                : new Date(post.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author}
            </span>
          </div>

          {(post.tags?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Card>
            <CardContent className="p-8 prose prose-lg max-w-none prose-img:max-w-full prose-img:h-auto prose-img:object-contain prose-img:rounded-lg">
              <div
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </CardContent>
          </Card>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
