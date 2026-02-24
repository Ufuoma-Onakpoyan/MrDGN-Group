import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Youtube, Zap, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import moviePoster from "@/assets/movie-poster-1.jpg";
import youtubeThumb from "@/assets/youtube-thumb-1.jpg";
import studioScene from "@/assets/studio-scene.jpg";
import behindScenes from "@/assets/behind-scenes.jpg";

const Services = () => {
  const services = [
    { icon: Film, title: "Movie Production", snippet: "Feature films with Nigerian storytelling and international standards.", image: moviePoster },
    { icon: Youtube, title: "YouTube Long-Form", snippet: "Documentaries and series that celebrate culture and build global audiences.", image: youtubeThumb },
    { icon: Zap, title: "Short-Form Content", snippet: "Viral-ready clips and social content for modern platforms.", image: studioScene },
    { icon: Sparkles, title: "Event Sponsorship", snippet: "Film festivals, awards, concerts, and cultural showcases.", image: behindScenes },
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Nollywood blockbusters to viral content—we bring Nigerian stories to life across all platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {services.map((service) => (
              <Card
                key={service.title}
                className="card-hover scroll-reveal border-0 shadow-lg overflow-hidden group transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                      <service.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{service.snippet}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center scroll-reveal">
            <Link to="/services">
              <Button size="lg" className="hero-glow group transition-all duration-300">
                View all services
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
