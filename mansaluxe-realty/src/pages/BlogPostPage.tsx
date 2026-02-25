import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { useBlogPost } from '@/hooks/useBlogPosts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft, Loader2, Sparkles, Eye } from 'lucide-react';

const DEFAULT_FEATURED_IMAGE = '/assets/blog/blog-placeholder.svg';

function isLifestylePost(tags: string[] | undefined): boolean {
  return (tags ?? []).some((t) => String(t).toLowerCase() === 'lifestyle');
}

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error, refetch } = useBlogPost(slug!, 'mansaluxe-realty');

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-serif font-bold mb-4">Failed to load post</h1>
        <p className="text-muted-foreground mb-6">{error.message ?? "Please try again."}</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button onClick={() => refetch()}>Try again</Button>
          <Button variant="outline" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-4xl font-serif font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <SEO title={post.title} description={post.excerpt || undefined} canonical={`/blog/${post.slug}`} ogImage={post.featured_image_url || undefined} ogType="article" />
      {/* Hero */}
      <section className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </section>

      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Featured image from backend; fallback to placeholder */}
          <div className="rounded-lg overflow-hidden mb-8 bg-muted flex items-center justify-center">
            <img
              src={post.featured_image_url || DEFAULT_FEATURED_IMAGE}
              alt={post.title}
              className="w-full h-auto max-w-full object-contain"
            />
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm mb-6">
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
            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {post.view_count?.toLocaleString() ?? '0'} views
            </span>
            {isLifestylePost(post.tags) && (
              <Badge className="bg-primary/90 text-primary-foreground flex items-center gap-1 w-fit">
                <Sparkles className="h-3 w-3" />
                Lifestyle
              </Badge>
            )}
          </div>

          {(post.tags?.filter((t) => String(t).toLowerCase() !== 'lifestyle').length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags!
                .filter((tag) => String(tag).toLowerCase() !== 'lifestyle')
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          )}

          <Card className="border-primary/20 shadow-luxury">
            <CardContent className="p-8 prose prose-lg max-w-none prose-img:max-w-full prose-img:h-auto prose-img:object-contain prose-img:rounded-lg">
              <div
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
