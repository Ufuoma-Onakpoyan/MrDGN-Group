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
            About <span className="text-gradient">MR DGN Constructions</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Since 2020, MR DGN Constructions has brought excellence to Nigeria's construction industry
            and established itself as a premier construction company, delivering innovative
            solutions and superior craftsmanship across the nation. Our 20-strong team of engineers,
            managers, and bricklayers specializes in residential, commercial, and infrastructure
            projects, combining traditional Nigerian building techniques with cutting-edge
            international technology to create structures that stand the test of time and climate.
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