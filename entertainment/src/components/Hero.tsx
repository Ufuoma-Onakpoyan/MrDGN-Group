import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-primary/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)] transition-opacity duration-700" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto scroll-reveal animate-hero-reveal">
          {/* Subsidiary Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <img 
              src="/assets/8ab32aff-fbbf-4303-8bf1-acd410bb7261.png" 
              alt="MrDGN Group" 
              className="h-4 w-auto"
            />
            <span className="text-sm font-medium text-muted-foreground">
              A subsidiary of MrDGN Group
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Powering <span className="gradient-text">Entertainment</span>
            <br />
            Events Across
            <br />
            <span className="gradient-text">Nigeria</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            MrDGN Entertainment supports concerts, expos, comedy shows, and cultural events that celebrate Nigerian talent and bring communities together.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="hero-glow group transition-all duration-300" asChild>
              <Link to="/events">
                <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                Our Events
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="group transition-all duration-300" asChild>
              <Link to="/about">
                About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">3+</div>
              <div className="text-muted-foreground">Events Sponsored</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">5+</div>
              <div className="text-muted-foreground">Years in Entertainment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-2">Nationwide</div>
              <div className="text-muted-foreground">Lagos, Benin, Asaba &amp; More</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements - subtle animation */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-primary/60 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-primary/40 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }} />
    </section>
  );
};

export default Hero;