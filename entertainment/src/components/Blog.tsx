import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { processContentForParagraphs } from "@/lib/utils";
import { Calendar, User, ArrowRight, Eye } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import blogFeatured1 from "@/assets/blog-featured-1.jpg";
import blogFeatured2 from "@/assets/blog-featured-2.jpg";
import blogFeatured3 from "@/assets/blog-featured-3.jpg";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  published_at: string;
  created_at: string;
  tags: string[] | null;
  view_count: number | null;
  featured_image_url?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const api = import.meta.env.VITE_API_URL;
      if (api) {
        const res = await fetch(`${api}/api/blog?source=entertainment`);
        if (res.ok) {
          const data = await res.json();
          if (data?.length > 0) {
            const mapped = data.map((p: Record<string, unknown>, i: number) => ({
              id: p.id,
              title: p.title,
              slug: p.slug,
              excerpt: p.excerpt || '',
              author: p.author || 'MrDGN',
              published_at: p.published_at || p.created_at,
              created_at: p.created_at,
              tags: p.tags || [],
              view_count: p.view_count ?? 0,
              featured_image_url: normalizeImageUrl(p.featured_image_url) || getFeaturedImage(i),
            }));
            setPosts(mapped);
            setLoading(false);
            return;
          }
        }
      }
      setPosts(getEnhancedFallbackPosts());
    } catch (error) {
      console.error('Error:', error);
      setPosts(getEnhancedFallbackPosts());
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedImage = (index: number) => {
    const images = [blogFeatured1, blogFeatured2, blogFeatured3];
    return images[index % images.length];
  };

  /** Resolve relative image URLs from API so they load on this origin. */
  const normalizeImageUrl = (url: unknown): string | undefined => {
    if (!url || typeof url !== 'string') return undefined;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url;
    const api = import.meta.env.VITE_API_URL;
    if (url.startsWith('/') && api) return `${api.replace(/\/$/, '')}${url}`;
    return url;
  };

  const getEnhancedFallbackPosts = (): BlogPost[] => [
    {
      id: "1",
      title: "The Future of Nigerian Cinema: Bridging Tradition and Innovation",
      slug: "future-nigerian-cinema",
      excerpt: "Exploring how modern Nigerian filmmakers are revolutionizing storytelling while honoring cultural heritage, creating content that resonates globally.",
      author: "Adaora Okafor",
      published_at: "2024-01-15T10:00:00Z",
      created_at: "2024-01-15T10:00:00Z",
      tags: ["Nigerian Cinema", "Innovation", "Culture"],
      view_count: 2456,
      featured_image_url: blogFeatured2
    },
    {
      id: "2", 
      title: "YouTube Success: Creating Engaging Long-Form Content",
      slug: "youtube-long-form-success",
      excerpt: "Master the art of YouTube long-form content creation with proven strategies for audience engagement, storytelling, and building a loyal subscriber base.",
      author: "Emeka Okonkwo",
      published_at: "2024-01-10T14:30:00Z",
      created_at: "2024-01-10T14:30:00Z",
      tags: ["YouTube", "Content Creation", "Digital Marketing"],
      view_count: 1823,
      featured_image_url: blogFeatured3
    },
    {
      id: "3",
      title: "Short-Form Content Revolution: TikTok and Beyond",
      slug: "short-form-content-revolution", 
      excerpt: "Understanding the power of short-form content and how it's reshaping entertainment consumption patterns across Africa and globally.",
      author: "Kemi Afolabi",
      published_at: "2024-01-05T09:15:00Z",
      created_at: "2024-01-05T09:15:00Z",
      tags: ["Short-Form", "TikTok", "Social Media"],
      view_count: 3102,
      featured_image_url: blogFeatured1
    }
  ];


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="blog" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="text-muted-foreground mt-4">Loading latest articles...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 scroll-reveal">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Latest <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Thoughts on Nigerian entertainment, event culture, and industry updates.
            </p>
          </div>

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {posts.map((post, index) => (
                <Card key={post.id} className="group card-hover scroll-reveal border-0 bg-gradient-to-br from-card to-card/50 overflow-hidden backdrop-blur-sm transition-all duration-300" style={{boxShadow: 'var(--shadow-card)'}}>
                  {/* Featured Image */}
                  <div className="relative min-h-52 overflow-hidden bg-muted flex items-center justify-center">
                    {post.featured_image_url ? (
                      <img 
                        src={post.featured_image_url} 
                        alt={post.title}
                        className="w-full h-auto max-h-52 object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <div className="text-primary/40 text-6xl">📖</div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardHeader className="pb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {(post.tags || []).slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div 
                      className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed prose prose-sm max-w-none font-blog"
                      dangerouslySetInnerHTML={{ __html: processContentForParagraphs(post.excerpt || '') }}
                    />

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.published_at || post.created_at)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.view_count || 0}</span>
                      </div>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" size="sm" className="w-full group">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 scroll-reveal">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
              <p className="text-muted-foreground">
                We're working on some exciting content. Check back soon!
              </p>
            </div>
          )}

          {/* View All Button */}
          {posts.length > 0 && (
            <div className="text-center mt-10 scroll-reveal">
              <Link to="/blog">
                <Button variant="outline" size="lg" className="group transition-all duration-300">
                  View all articles
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;