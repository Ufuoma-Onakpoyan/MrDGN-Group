import { useParams, Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { usePortfolioItem } from "@/hooks/usePortfolio";
import { useEffect, useMemo } from "react";

/** Fallback project details when API has no data (for hardcoded portfolio items) */
const FALLBACK_PROJECTS: Record<string, { title: string; description: string; content: string; project_url: string; category: string; technologies: string[] }> = {
  "lagos-dreams": {
    title: "Lagos Dreams",
    description: "A compelling drama about ambition, family, and the pursuit of success in modern Lagos.",
    content: "Lagos Dreams captures the spirit of contemporary Nigeria through the lens of a young entrepreneur navigating the vibrant yet challenging landscape of Lagos. Our team worked with local talent and authentic locations to bring this story to life, highlighting themes of family, ambition, and cultural identity.",
    project_url: "https://www.youtube.com/watch?v=1R3JJdQn2Wo",
    category: "Movie",
    technologies: ["Drama", "Family", "Nigerian Culture"],
  },
  "stories-from-home": {
    title: "Stories from Home",
    description: "Long-form documentary series exploring Nigerian traditions.",
    content: "Stories from Home is our ongoing documentary series that explores Nigerian traditions and their evolution in contemporary society. Each episode delves into different aspects of our rich heritage.",
    project_url: "https://www.youtube.com/watch?v=1R3JJdQn2Wo",
    category: "YouTube Series",
    technologies: ["Documentary", "Culture", "Educational"],
  },
  "the-return": {
    title: "The Return",
    description: "A heartwarming short about a diaspora Nigerian's journey back to their roots.",
    content: "The Return tells the powerful story of identity and belonging. This award-winning short film follows a diaspora Nigerian as they reconnect with their homeland and family.",
    project_url: "https://www.youtube.com/watch?v=1R3JJdQn2Wo",
    category: "Short Film",
    technologies: ["Short Film", "Diaspora", "Drama"],
  },
  "making-of-lagos-dreams": {
    title: "Making of Lagos Dreams",
    description: "Behind-the-scenes content showcasing our production process.",
    content: "Go behind the camera with our team as we share the making of Lagos Dreams. From location scouting to final cut, see how we brought this story to the screen.",
    project_url: "https://www.youtube.com/watch?v=1R3JJdQn2Wo",
    category: "Behind the Scenes",
    technologies: ["BTS", "Production", "Documentary"],
  },
  "viral-nigerian-vibes": {
    title: "Viral Nigerian Vibes",
    description: "Short-form viral content celebrating Nigerian culture and humor.",
    content: "Our viral content division creates bite-sized entertainment that resonates across social media. From trending skits to cultural celebrations, we bring Nigerian stories to the world.",
    project_url: "https://www.youtube.com/watch?v=1R3JJdQn2Wo",
    category: "Viral Video",
    technologies: ["Comedy", "Culture", "Short Form"],
  },
  "street-tales-lagos": {
    title: "Street Tales: Lagos",
    description: "A collection of short Nigerian stories from the streets of Lagos.",
    content: "Street Tales captures the everyday magic of Lagos through short narrative vignettes. Each story offers a glimpse into the lives, dreams, and resilience of Lagosians.",
    project_url: "https://www.youtube.com/watch?v=1R3JJdQn2Wo",
    category: "Short Nigerian Stories",
    technologies: ["Drama", "Anthology", "Urban"],
  },
};

/** Extract YouTube or Vimeo embed URL from watch link */
function getEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const v = u.searchParams.get("v") || u.pathname.slice(1);
      return v ? `https://www.youtube.com/embed/${v}` : null;
    }
    if (u.hostname.includes("vimeo.com")) {
      const m = u.pathname.match(/\/(\d+)/);
      return m ? `https://player.vimeo.com/video/${m[1]}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  useScrollReveal();
  const { data: apiItem, isLoading, isError } = usePortfolioItem(slug || "");
  const fallbackItem = slug ? FALLBACK_PROJECTS[slug] : null;
  const item = apiItem || (fallbackItem ? { ...fallbackItem, id: "", slug: slug!, featured_image_url: null, images: [], published: true, created_at: new Date().toISOString(), updated_at: new Date().toISOString(), description: fallbackItem.description } : null);

  const embedUrl = useMemo(
    () => (item?.project_url ? getEmbedUrl(item.project_url) : null),
    [item?.project_url]
  );

  const API_BASE = import.meta.env.VITE_API_URL || "";
  const imageSrc = item?.featured_image_url
    ? item.featured_image_url.startsWith("http") || item.featured_image_url.startsWith("//")
      ? item.featured_image_url
      : `${API_BASE.replace(/\/$/, "")}${item.featured_image_url.startsWith("/") ? "" : "/"}${item.featured_image_url}`
    : null;

  useEffect(() => {
    if (item?.title) document.title = `${item.title} | MrDGN Entertainment`;
  }, [item?.title]);

  if (isLoading && !fallbackItem) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-32 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">This project may have been moved or is no longer available.</p>
          <Link to="/portfolio">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4 max-w-4xl">
            <Link to="/portfolio">
              <Button variant="ghost" className="mb-6 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Portfolio
              </Button>
            </Link>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">{item.category}</Badge>
              {item.technologies?.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{item.title}</h1>
            {item.created_at && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{new Date(item.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
            )}
          </div>
        </section>

        {/* Video Section */}
        {(embedUrl || item.project_url) && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">Watch</h2>
              {embedUrl ? (
                <div className="aspect-video rounded-xl overflow-hidden bg-muted shadow-xl">
                  <iframe
                    src={embedUrl}
                    title={item.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={item.project_url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-muted flex items-center justify-center group">
                    {imageSrc ? (
                      <img src={imageSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    ) : (
                      <div className="text-muted-foreground">Thumbnail</div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                      <Button size="lg" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Watch on External Site
                      </Button>
                    </div>
                  </div>
                </a>
              )}
              {item.project_url && embedUrl && (
                <a
                  href={item.project_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in new tab
                </a>
              )}
            </div>
          </section>
        )}

        {/* Write-up / Content */}
        {(item.content || item.description) && (
          <section className="py-12 bg-muted/20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold mb-6">About This Project</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {item.content ? (
                  <div className="whitespace-pre-wrap text-muted-foreground leading-relaxed">{item.content}</div>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {!item.content && !item.description && !embedUrl && !item.project_url && (
          <section className="py-12">
            <div className="container mx-auto px-4 max-w-4xl text-center text-muted-foreground">
              <p>No additional details available for this project.</p>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioDetail;
