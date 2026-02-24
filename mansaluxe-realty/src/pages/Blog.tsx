import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Loader2, ArrowRight, Sparkles } from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import type { BlogPost } from "@/hooks/useBlogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const POSTS_PER_PAGE = 12;
const LIFESTYLE_VIDEO_URL = import.meta.env.VITE_LIFESTYLE_VIDEO_URL || "";
/** Placeholder when backend returns no featured_image_url. Replace in admin with uploaded image URL. */
const DEFAULT_FEATURED_IMAGE = "/assets/blog/blog-placeholder.svg";

function isLifestylePost(post: BlogPost): boolean {
  return (post.tags ?? []).some((t) => String(t).toLowerCase() === "lifestyle");
}

const Blog = () => {
  const { data: posts = [], isLoading, isError, error, refetch } = useBlogPosts("mansaluxe-realty");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  return (
    <div>
      {/* Hero: Blog & Lifestyle */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Blog & <span className="text-gold-gradient">Lifestyle</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, market updates, luxury trends, and lifestyle stories from our experts.
            </p>
          </div>
        </div>
      </section>

      {/* Optional lifestyle video */}
      {LIFESTYLE_VIDEO_URL && (
        <section className="py-12 border-b border-border">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center">Watch</h2>
            <div className="rounded-xl overflow-hidden shadow-luxury bg-muted/30 aspect-video">
              {LIFESTYLE_VIDEO_URL.includes("youtube") || LIFESTYLE_VIDEO_URL.includes("youtu.be") ? (
                <iframe
                  src={LIFESTYLE_VIDEO_URL.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                  title="Lifestyle video"
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <video controls className="w-full h-full object-contain" src={LIFESTYLE_VIDEO_URL} />
              )}
            </div>
          </div>
        </section>
      )}

      {/* All posts with images and Lifestyle tag */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span className="text-muted-foreground">Loading posts...</span>
            </div>
          ) : isError ? (
            <div className="text-center py-20 max-w-md mx-auto">
              <p className="text-destructive font-medium mb-2">Failed to load posts</p>
              <p className="text-muted-foreground text-sm mb-4">{error?.message ?? "Please try again."}</p>
              <Button onClick={() => refetch()} variant="outline">Try again</Button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground max-w-md mx-auto">
              <p className="text-lg">No posts yet.</p>
              <p className="text-sm mt-2">Posts are loaded from the backend. Add and publish posts in the admin panel to see them here.</p>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-8 text-center">
                Showing {paginatedPosts.length} of {posts.length} posts
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {paginatedPosts.map((post) => (
                  <Link key={post.id} to={`/blog/${post.slug}`}>
                    <Card className="border-primary/20 shadow-luxury overflow-hidden h-full hover:shadow-xl transition-shadow group">
                      {/* Image from backend (featured_image_url); fallback to placeholder */}
                      <div className="aspect-video bg-muted relative overflow-hidden flex items-center justify-center">
                        <img
                          src={post.featured_image_url || DEFAULT_FEATURED_IMAGE}
                          alt=""
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                        {isLifestylePost(post) && (
                          <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Lifestyle
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-serif font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {post.excerpt || "Read more..."}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.published_at
                              ? new Date(post.published_at).toLocaleDateString()
                              : new Date(post.created_at).toLocaleDateString()}
                          </span>
                          <span className="text-primary text-sm font-medium inline-flex items-center">
                            Read full post <ArrowRight className="h-4 w-4 ml-1" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {/* Pagination: view all posts across pages */}
              {totalPages > 1 && (
                <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
