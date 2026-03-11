import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            About <span className="text-gradient">Mr DGN Construction and Developers Limited</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Based in Asaba, Mr DGN is first your building materials supplier—quality cement, blocks, and construction materials for Delta State and Nigeria. We also deliver construction projects and have established ourselves as a trusted partner in the industry. Our 20-strong team of engineers, managers, and bricklayers specializes in materials supply and in residential, commercial, and infrastructure projects, combining traditional Nigerian building techniques with cutting-edge international standards.
          </p>
          <Button asChild size="lg" className="btn-construction group">
            <Link to="/about-us">
              Read More About Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;