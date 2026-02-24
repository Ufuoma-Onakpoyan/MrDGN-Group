import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { processContentForParagraphs } from "@/lib/utils";
import { Calendar, User, ArrowLeft, Eye, Share2 } from "lucide-react";
import { toast } from "sonner";
import blogFeatured1 from "@/assets/blog-featured-1.jpg";
import blogFeatured2 from "@/assets/blog-featured-2.jpg";
import blogFeatured3 from "@/assets/blog-featured-3.jpg";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  published_at: string;
  created_at: string;
  tags: string[];
  view_count: number;
  featured_image_url?: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
      incrementViewCount(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${post.title} | MrDGN Entertainment`;
  }, [post]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const incrementViewCount = async (_slug: string) => {
    // View count is incremented by the backend when fetching by slug
  };

  const fetchBlogPost = async (slug: string) => {
    try {
      const api = import.meta.env.VITE_API_URL;
      let data: BlogPost | null = null;

      if (api) {
        const res = await fetch(`${api}/api/blog/slug/${slug}?source=entertainment`);
        if (res.ok) {
          const raw = await res.json();
          const normalizedImage = (() => {
            const u = raw.featured_image_url;
            if (!u || typeof u !== 'string') return undefined;
            if (u.startsWith('http://') || u.startsWith('https://') || u.startsWith('//')) return u;
            if (u.startsWith('/')) return `${api.replace(/\/$/, '')}${u}`;
            return u;
          })();
          data = {
            id: raw.id,
            title: raw.title,
            slug: raw.slug,
            content: raw.content,
            excerpt: raw.excerpt || '',
            author: raw.author || 'MrDGN',
            published_at: raw.published_at || raw.created_at,
            created_at: raw.created_at,
            tags: raw.tags || [],
            view_count: raw.view_count ?? 0,
            featured_image_url: normalizedImage || raw.featured_image_url,
          };
        }
      }

      if (!data) {
        // Use fallback data for demo
        const fallbackPost = getFallbackPost(slug);
        if (fallbackPost) {
          setPost(fallbackPost);
        } else {
          toast.error("Blog post not found");
          navigate('/blog');
        }
      } else {
        setPost({
          ...data,
          featured_image_url: data.featured_image_url || blogFeatured1,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      const fallbackPost = getFallbackPost(slug);
      if (fallbackPost) {
        setPost(fallbackPost);
      } else {
        toast.error("Failed to load blog post");
        navigate('/blog');
      }
    } finally {
      setLoading(false);
    }
  };

  const getFallbackPost = (slug: string): BlogPost | null => {
    const fallbackPosts: Record<string, BlogPost> = {
      "future-nigerian-cinema": {
        id: "1",
        title: "The Future of Nigerian Cinema: Bridging Tradition and Innovation",
        slug: "future-nigerian-cinema",
        excerpt: "Exploring how modern Nigerian filmmakers are revolutionizing storytelling while honoring cultural heritage, creating content that resonates globally.",
        content: `
          <h2>The Renaissance of Nigerian Cinema</h2>
          
          <p><em>Nigerian cinema, affectionately known as Nollywood, stands at a pivotal crossroads where tradition meets innovation.</em> As the industry continues to evolve, filmmakers are discovering new ways to honor their cultural heritage while embracing cutting-edge storytelling techniques that captivate global audiences.</p>
          
          <p>The transformation has been nothing short of remarkable. <strong>From humble beginnings in the 1990s to becoming the world's second-largest film industry by volume</strong>, Nollywood has proven that authentic storytelling resonates universally.</p>
          
          <h3>Cultural Heritage in Modern Storytelling</h3>
          
          <p>At the heart of Nigerian cinema's evolution lies a deep respect for cultural authenticity. Contemporary filmmakers are weaving traditional folklore, customs, and languages into their narratives, creating a rich tapestry that celebrates Nigeria's diverse heritage.</p>
          
          <p><em>This approach not only preserves cultural identity but also introduces international audiences to the beauty and complexity of Nigerian society.</em> <strong>The result is cinema that feels both deeply rooted and refreshingly contemporary.</strong></p>
          
          <blockquote>
            "Cinema is our bridge between the old and the new. It's how we tell our ancestors' stories to the world while creating new ones for future generations." - Genevieve Nnaji, Acclaimed Nollywood Actress and Director
          </blockquote>
          
          <h3>Technological Innovation and Production Quality</h3>
          
          <p>The adoption of advanced filming techniques, high-quality equipment, and professional post-production processes has elevated Nigerian films to international standards. <strong>From improved cinematography to sophisticated sound design</strong>, these technological advances are helping Nigerian stories compete on the global stage.</p>
          
          <p><em>Directors are now experimenting with drone cinematography, 4K resolution, and advanced color grading techniques</em> that rival Hollywood productions. This technical excellence serves the story, never overwhelming it.</p>
          
          <h3>Global Distribution and Streaming Platforms</h3>
          
          <p>The rise of streaming platforms has opened unprecedented opportunities for Nigerian filmmakers. <strong>Movies that once had limited theatrical releases can now reach millions of viewers worldwide</strong>, creating new revenue streams and building international fan bases.</p>
          
          <p><em>Netflix, Amazon Prime, and other platforms have become crucial partners</em> in bringing Nigerian stories to global audiences, validating the universal appeal of well-crafted narratives.</p>
          
          <h3>The Next Generation of Filmmakers</h3>
          
          <p>Young Nigerian filmmakers are bringing fresh perspectives, diverse narratives, and innovative approaches to the industry. <strong>They're not afraid to tackle complex social issues</strong> while maintaining the entertainment value that has made Nollywood beloved worldwide.</p>
          
          <p><em>These emerging voices represent the future of Nigerian cinema</em> - bold, uncompromising, and deeply connected to both their roots and global cinema trends.</p>
          
          <p>As we look toward the future, Nigerian cinema continues to prove that great storytelling transcends borders. <strong>By honoring their roots while embracing innovation, Nigerian filmmakers are creating a blueprint for authentic, culturally rich cinema</strong> that resonates with audiences everywhere.</p>
        `,
        author: "Adaora Okafor",
        published_at: "2024-01-15T10:00:00Z",
        created_at: "2024-01-15T10:00:00Z",
        tags: ["Nigerian Cinema", "Innovation", "Culture", "Nollywood"],
        view_count: 2456,
        featured_image_url: blogFeatured2
      },
      "youtube-long-form-success": {
        id: "2",
        title: "YouTube Success: Creating Engaging Long-Form Content",
        slug: "youtube-long-form-success",
        excerpt: "Master the art of YouTube long-form content creation with proven strategies for audience engagement, storytelling, and building a loyal subscriber base.",
        content: `
          <h2>The Power of Long-Form Content on YouTube</h2>
          
          <p>In an era dominated by short-form content, long-form YouTube videos offer unique opportunities for deeper storytelling, comprehensive education, and meaningful audience connection. Understanding how to create engaging long-form content is crucial for content creators looking to build lasting relationships with their viewers.</p>
          
          <h3>Why Long-Form Content Matters</h3>
          
          <p>Long-form content allows creators to:</p>
          <ul>
            <li>Establish thought leadership and expertise</li>
            <li>Create deeper emotional connections with viewers</li>
            <li>Provide comprehensive value through detailed tutorials or discussions</li>
            <li>Increase watch time, which positively impacts YouTube's algorithm</li>
            <li>Generate higher ad revenue per video</li>
          </ul>
          
          <h3>Structuring Your Long-Form Content</h3>
          
          <p>The key to successful long-form content lies in proper structure. Your video should have a clear beginning, middle, and end, with strategic pacing that keeps viewers engaged throughout the entire duration.</p>
          
          <h4>The Hook (First 15 seconds)</h4>
          <p>Your opening moments are critical. Use them to clearly state what value the viewer will receive and why they should continue watching.</p>
          
          <h4>Value Delivery (Middle Section)</h4>
          <p>This is where you deliver on your promise. Break complex topics into digestible segments, use visual aids, and maintain energy throughout.</p>
          
          <h4>Call to Action (Final Minutes)</h4>
          <p>End with a strong call to action that encourages engagement, subscriptions, or further exploration of your content.</p>
          
          <h3>Engagement Strategies</h3>
          
          <p>Keeping viewers engaged in long-form content requires strategic planning:</p>
          
          <ul>
            <li><strong>Storytelling:</strong> Weave narratives throughout your content to maintain emotional investment</li>
            <li><strong>Visual Variety:</strong> Use different camera angles, graphics, and b-roll footage</li>
            <li><strong>Pacing:</strong> Vary your speaking pace and energy levels to maintain interest</li>
            <li><strong>Interactive Elements:</strong> Ask questions and encourage comments throughout the video</li>
          </ul>
          
          <h3>Building Your Community</h3>
          
          <p>Long-form content is particularly effective for community building. Viewers who watch your content for extended periods are more likely to become loyal subscribers and advocates for your channel.</p>
          
          <p>Remember, success with long-form content doesn't happen overnight. It requires consistency, patience, and a genuine commitment to providing value to your audience. But when done right, it can be one of the most rewarding forms of content creation on YouTube.</p>
        `,
        author: "Emeka Okonkwo",
        published_at: "2024-01-10T14:30:00Z",
        created_at: "2024-01-10T14:30:00Z",
        tags: ["YouTube", "Content Creation", "Digital Marketing", "Long-Form"],
        view_count: 1823,
        featured_image_url: blogFeatured3
      },
      "short-form-content-revolution": {
        id: "3",
        title: "Short-Form Content Revolution: TikTok and Beyond",
        slug: "short-form-content-revolution",
        excerpt: "Understanding the power of short-form content and how it's reshaping entertainment consumption patterns across Africa and globally.",
        content: `
          <h2>The Short-Form Content Revolution</h2>
          
          <p>The rise of short-form content has fundamentally transformed how we consume and create entertainment. From TikTok's explosive growth to Instagram Reels and YouTube Shorts, this content format has captured the attention of billions worldwide, particularly resonating with African audiences seeking quick, engaging entertainment.</p>
          
          <h3>Understanding the Short-Form Phenomenon</h3>
          
          <p>Short-form content, typically ranging from 15 seconds to 3 minutes, has revolutionized digital entertainment by offering:</p>
          
          <ul>
            <li>Instant gratification and quick entertainment</li>
            <li>Lower barriers to content creation</li>
            <li>Algorithm-driven discovery that promotes viral content</li>
            <li>Mobile-first viewing experiences</li>
            <li>Democratized content creation tools</li>
          </ul>
          
          <h3>The African Context</h3>
          
          <p>In Africa, short-form content has found particular success due to several factors:</p>
          
          <h4>Mobile-First Internet Usage</h4>
          <p>With mobile phones being the primary internet access point for many Africans, short-form content aligns perfectly with mobile consumption patterns and data limitations.</p>
          
          <h4>Cultural Expression</h4>
          <p>Platforms like TikTok have become showcases for African creativity, from dance challenges to comedy skits, allowing creators to share their cultural heritage with global audiences.</p>
          
          <h4>Economic Opportunities</h4>
          <p>Short-form content has created new income streams for African creators through brand partnerships, creator funds, and viral marketing campaigns.</p>
          
          <h3>Creating Compelling Short-Form Content</h3>
          
          <p>Success in short-form content requires understanding its unique characteristics:</p>
          
          <h4>Hook Within 3 Seconds</h4>
          <p>You have an extremely short window to capture attention. Start with your most compelling element.</p>
          
          <h4>Visual Storytelling</h4>
          <p>Every frame must contribute to your message. Use dynamic visuals, quick cuts, and engaging graphics.</p>
          
          <h4>Trend Participation</h4>
          <p>Stay current with platform trends, sounds, and hashtags to increase discoverability.</p>
          
          <h4>Authentic Voice</h4>
          <p>Audiences connect with genuine, authentic content. Don't be afraid to show your personality.</p>
          
          <h3>Platform-Specific Strategies</h3>
          
          <h4>TikTok</h4>
          <p>Focus on entertainment, trends, and creative expression. Use popular sounds and participate in challenges.</p>
          
          <h4>Instagram Reels</h4>
          <p>Leverage Instagram's broader ecosystem by creating content that complements your main feed and Stories.</p>
          
          <h4>YouTube Shorts</h4>
          <p>Use Shorts to drive traffic to your long-form content and showcase highlights from longer videos.</p>
          
          <h3>The Future of Short-Form Content</h3>
          
          <p>As technology continues to evolve, we can expect short-form content to become even more sophisticated, with enhanced AR features, better monetization options, and more sophisticated creation tools. For creators and brands, understanding and mastering this format is no longer optional—it's essential for staying relevant in the digital landscape.</p>
          
          <p>The short-form content revolution represents more than just a trend; it's a fundamental shift in how we communicate, entertain, and connect with audiences in our increasingly fast-paced digital world.</p>
        `,
        author: "Kemi Afolabi",
        published_at: "2024-01-05T09:15:00Z",
        created_at: "2024-01-05T09:15:00Z",
        tags: ["Short-Form", "TikTok", "Social Media", "Africa"],
        view_count: 3102,
        featured_image_url: blogFeatured1
      }
    };

    return fallbackPosts[slug] || null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/80 z-50 transition-all duration-150 shadow-lg"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Article Header */}
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Article Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground leading-tight">
            {post.title}
          </h1>
          
          {/* Author and Meta Info */}
          <div className="flex items-center justify-center space-x-8 text-muted-foreground text-sm md:text-base mb-8">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.published_at || post.created_at)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>{post.view_count} views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-4xl mx-auto bg-muted rounded-2xl overflow-hidden flex items-center justify-center">
          <img 
            src={post.featured_image_url} 
            alt={post.title}
            className="w-full h-auto max-w-full object-contain rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-4 py-2 text-sm font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-border/50">
            <Link to="/blog">
              <Button variant="outline" size="lg" className="group hover:scale-105 transition-all duration-300">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Button>
            </Link>
            <Button variant="outline" size="lg" onClick={handleShare} className="group hover:scale-105 transition-all duration-300">
              <Share2 className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
              Share Article
            </Button>
          </div>

          {/* Article Body */}
          <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div 
                className="prose prose-xl max-w-none leading-relaxed font-blog
                  prose-headings:font-bold prose-headings:text-foreground prose-headings:mb-8 prose-headings:mt-12 prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-10 prose-h2:mt-16 prose-h2:text-foreground prose-h2:font-blog prose-h2:border-b prose-h2:border-border/20 prose-h2:pb-4
                  prose-h3:text-2xl prose-h3:font-semibold prose-h3:mb-8 prose-h3:mt-14 prose-h3:text-foreground prose-h3:font-blog
                  prose-h4:text-xl prose-h4:font-semibold prose-h4:mb-6 prose-h4:mt-10 prose-h4:text-foreground prose-h4:font-blog
                  prose-p:text-foreground prose-p:leading-[1.8] prose-p:mb-10 prose-p:text-lg prose-p:font-blog prose-p:tracking-wide prose-p:text-justify
                  prose-strong:text-foreground prose-strong:font-semibold prose-strong:bg-primary/10 prose-strong:px-1 prose-strong:rounded
                  prose-em:text-muted-foreground prose-em:italic prose-em:font-medium
                  prose-blockquote:border-l-[6px] prose-blockquote:border-primary prose-blockquote:bg-gradient-to-r prose-blockquote:from-muted/50 prose-blockquote:to-muted/20
                  prose-blockquote:p-8 prose-blockquote:rounded-r-xl prose-blockquote:text-foreground prose-blockquote:shadow-lg
                  prose-blockquote:italic prose-blockquote:text-xl prose-blockquote:my-12 prose-blockquote:font-blog prose-blockquote:leading-relaxed
                  prose-li:text-foreground prose-li:leading-[1.7] prose-li:mb-4 prose-li:text-lg prose-li:font-blog prose-li:pl-2
                  prose-ul:my-10 prose-ul:space-y-4 prose-ol:my-10 prose-ol:space-y-4
                  prose-ul:border-l-2 prose-ul:border-primary/20 prose-ul:pl-8 prose-ul:py-4
                  prose-a:text-primary prose-a:font-medium prose-a:underline prose-a:underline-offset-4 prose-a:decoration-2 
                  hover:prose-a:text-primary/80 hover:prose-a:decoration-primary/60
                  prose-code:bg-muted prose-code:px-3 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:p-6 prose-pre:my-10 prose-pre:shadow-inner
                  prose-img:max-w-full prose-img:h-auto prose-img:object-contain prose-img:rounded-xl prose-img:shadow-2xl prose-img:my-12 prose-img:border prose-img:border-border/30"
                dangerouslySetInnerHTML={{ __html: processContentForParagraphs(post.content) }}
              />
            </CardContent>
          </Card>

          {/* Related Articles Section */}
          <div className="mt-16 p-8 bg-muted/30 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold text-center mb-8">Continue Reading</h3>
            <div className="text-center space-y-4">
              <p className="text-muted-foreground text-lg">
                Discover more insights and stories from our blog
              </p>
              <Link to="/blog">
                <Button size="lg" className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300">
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Explore All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;