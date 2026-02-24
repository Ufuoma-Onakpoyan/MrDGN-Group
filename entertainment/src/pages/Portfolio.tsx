import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Calendar, Eye, Award, ExternalLink } from "lucide-react";
import { usePortfolio } from "@/hooks/usePortfolio";
import moviePoster1 from "@/assets/movie-poster-1.jpg";
import youtubeThumb1 from "@/assets/youtube-thumb-1.jpg";
import studioScene from "@/assets/studio-scene.jpg";
import behindScenes from "@/assets/behind-scenes.jpg";

const Portfolio = () => {
  useScrollReveal();
  const { data: apiItems = [], isLoading } = usePortfolio();

  // Fallback: entertainment-focused projects when API has no items
  const fallbackProjects = [
    {
      slug: "lagos-dreams",
      type: "Movie",
      title: "Lagos Dreams",
      description: "A compelling drama about ambition, family, and the pursuit of success in modern Lagos.",
      image: moviePoster1,
      year: "2024",
      duration: "2h 15m",
      views: "2.5M",
      awards: ["Best Cinematography", "Outstanding Nigerian Film"],
      tags: ["Drama", "Family", "Nigerian Culture"],
      status: "Released"
    },
    {
      slug: "stories-from-home",
      type: "YouTube Series",
      title: "Stories from Home",
      description: "Long-form documentary series exploring Nigerian traditions and their evolution in contemporary society.",
      image: youtubeThumb1,
      year: "2024",
      duration: "45-60min episodes",
      views: "850K",
      awards: ["Digital Content Excellence"],
      tags: ["Documentary", "Culture", "Educational"],
      status: "Ongoing"
    },
    {
      slug: "street-tales-lagos",
      type: "Short Nigerian Stories",
      title: "Street Tales: Lagos",
      description: "A collection of short stories from the streets of Lagos—everyday magic, dreams, and resilience.",
      image: studioScene,
      year: "2024",
      duration: "12min each",
      views: "1.1M",
      awards: ["Short Form Excellence"],
      tags: ["Drama", "Anthology", "Urban"],
      status: "Released"
    },
    {
      slug: "viral-nigerian-vibes",
      type: "Viral Video",
      title: "Viral Nigerian Vibes",
      description: "Short-form viral content celebrating Nigerian culture, humor, and everyday moments that resonate worldwide.",
      image: behindScenes,
      year: "2024",
      duration: "1-3min",
      views: "4.2M",
      awards: [],
      tags: ["Comedy", "Culture", "Short Form"],
      status: "Ongoing"
    },
    {
      slug: "the-return",
      type: "Short Film",
      title: "The Return",
      description: "A heartwarming short about a diaspora Nigerian's journey back to their roots.",
      image: studioScene,
      year: "2023",
      duration: "18m",
      views: "1.2M",
      awards: ["Short Film Festival Winner"],
      tags: ["Short Film", "Diaspora", "Drama"],
      status: "Festival Circuit"
    },
    {
      slug: "making-of-lagos-dreams",
      type: "Behind the Scenes",
      title: "Making of Lagos Dreams",
      description: "Exclusive behind-the-scenes content showcasing our production process and attention to detail.",
      image: behindScenes,
      year: "2024",
      duration: "25m",
      views: "450K",
      awards: [],
      tags: ["BTS", "Production", "Documentary"],
      status: "Released"
    }
  ];

  const API_BASE = import.meta.env.VITE_API_URL || "";
  const toImageSrc = (url: string | null) => {
    if (!url) return studioScene;
    if (url.startsWith("http") || url.startsWith("//")) return url;
    return `${API_BASE.replace(/\/$/, "")}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  // Use API items when available, otherwise fallback to hardcoded
  const projects = apiItems.length > 0
    ? apiItems.map((item) => ({
        slug: item.slug,
        type: item.category || "Project",
        title: item.title,
        description: item.description || "",
        image: toImageSrc(item.featured_image_url),
        year: item.created_at ? new Date(item.created_at).getFullYear().toString() : "-",
        duration: "-",
        views: "-",
        awards: [] as string[],
        tags: item.technologies || [],
        status: "Released"
      }))
    : fallbackProjects;

  const achievements = [
    { number: "15+", label: "Award-Winning Projects" },
    { number: "50M+", label: "Total Views Across Platforms" },
    { number: "25+", label: "International Film Festivals" },
    { number: "100+", label: "Talented Professionals" }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="scroll-reveal">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Our <span className="gradient-text">Portfolio</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
                  Short Nigerian stories, movies, viral videos, and documentaries that celebrate our culture 
                  and captivate audiences worldwide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievement Stats */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center scroll-reveal">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-sm md:text-base text-muted-foreground">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 scroll-reveal">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Featured <span className="gradient-text">Projects</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Short films, Nigerian stories, viral videos, and award-winning cinema.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                  <Card key={index} className="group card-hover scroll-reveal border-0 shadow-xl overflow-hidden">
                    <div className="relative">
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge variant="secondary" className="bg-black/50 text-white border-0">
                          {project.type}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={project.status === "Released" ? "default" : "secondary"} 
                          className="bg-primary/90 text-white border-0"
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity group">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                      </button>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{project.year}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>{project.views}</span>
                          </div>
                        </div>
                        <span className="font-medium">{project.duration}</span>
                      </div>

                      {project.awards.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Awards & Recognition</span>
                          </div>
                          <div className="space-y-1">
                            {project.awards.map((award, idx) => (
                              <div key={idx} className="text-xs text-muted-foreground">
                                • {award}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button variant="outline" className="w-full group" asChild>
                        <Link to={`/portfolio/${project.slug}`}>
                          View Project Details
                          <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Production Process */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 scroll-reveal">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Our <span className="gradient-text">Production Process</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  From concept to completion, we ensure every project meets our exacting standards.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "01", title: "Concept Development", description: "Story ideation and script development with cultural authenticity" },
                  { step: "02", title: "Pre-Production", description: "Casting, location scouting, and meticulous planning" },
                  { step: "03", title: "Production", description: "Professional filming with state-of-the-art equipment" },
                  { step: "04", title: "Post-Production", description: "Editing, sound design, and final delivery" }
                ].map((process, index) => (
                  <div key={index} className="text-center scroll-reveal">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold text-lg">{process.step}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{process.title}</h3>
                    <p className="text-sm text-muted-foreground">{process.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;