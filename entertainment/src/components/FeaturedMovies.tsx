import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Film, ArrowRight, Calendar, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import moviePoster1 from "@/assets/movie-poster-1.jpg";
import youtubeThumb1 from "@/assets/youtube-thumb-1.jpg";
import studioScene from "@/assets/studio-scene.jpg";

const featuredMovies = [
  {
    slug: "lagos-dreams",
    title: "Lagos Dreams",
    type: "Feature Film",
    description: "Ambition, family, and the pursuit of success in modern Lagos.",
    image: moviePoster1,
    year: "2024",
    views: "2.5M",
    tags: ["Drama", "Family"],
  },
  {
    slug: "stories-from-home",
    title: "Stories from Home",
    type: "YouTube Series",
    description: "Documentary series exploring Nigerian traditions and their evolution.",
    image: youtubeThumb1,
    year: "2024",
    views: "850K",
    tags: ["Documentary", "Culture"],
  },
  {
    slug: "street-tales-lagos",
    title: "Street Tales: Lagos",
    type: "Short Film",
    description: "Short stories from the streets of Lagos—everyday magic and resilience.",
    image: studioScene,
    year: "2024",
    views: "1.1M",
    tags: ["Drama", "Anthology"],
  },
];

const FeaturedMovies = () => {
  return (
    <section id="movies" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Movies</span> & Content
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Feature films, YouTube series, and shorts—Nigerian stories for the world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredMovies.map((movie) => (
              <Card
                key={movie.slug}
                className="group card-hover scroll-reveal border-0 shadow-xl overflow-hidden transition-all duration-300"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
                      <Play className="h-8 w-8 text-white ml-1 fill-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/60 text-white border-0">
                      {movie.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {movie.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {movie.views} views
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {movie.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full group" asChild>
                    <Link to={`/portfolio/${movie.slug}`}>
                      Watch Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10 scroll-reveal">
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="group transition-all duration-300">
                <Film className="mr-2 h-5 w-5" />
                View full portfolio
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
