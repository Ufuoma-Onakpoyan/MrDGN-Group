import { Button } from "@/components/ui/button";
import { Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ceoPortrait from "@/assets/mrdgn-ceo-portrait.png";
import { LAYOUT } from "@/lib/layout";

const About = () => {
  return (
    <section id="about" className={`${LAYOUT.section} bg-muted/30 scroll-reveal`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-8 w-8 text-primary" />
                <span className="text-sm font-medium text-primary">Event Sponsorship</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About <span className="gradient-text">MrDGN Entertainment</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We focus on supporting Nigerian entertainment through event sponsorship. As part of MrDGN Group, we partner with concerts, comedy shows, music and fashion expos, and cultural events that celebrate local talent and bring audiences together.
              </p>
              <Link to="/about">
                <Button size="lg" className="hero-glow group transition-all duration-300">
                  Learn more about us
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] max-w-sm w-full img-hover-scale">
                <img
                  src={ceoPortrait}
                  alt="Onakpoyan Success (MrDGN), CEO of MrDGN Group"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
