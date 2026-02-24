import React from 'react';
import { ArrowRight, Building, Hammer, Home, Wrench, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const ServicesOverviewSection = () => {
  const services = [
    { icon: Building, title: "Commercial Construction", slug: "commercial-buildings", description: "Modern office buildings, retail spaces, and commercial complexes built to industry standards." },
    { icon: Home, title: "Residential Construction", slug: "residential-projects", description: "Custom homes, apartments, and residential developments designed for comfort and durability." },
    { icon: Hammer, title: "Infrastructure Development", slug: "infrastructure-development", description: "Roads, bridges, and public infrastructure projects that serve communities for generations." },
    { icon: Wrench, title: "Renovation & Remodeling", slug: "renovation-modernization", description: "Transform existing spaces with our expert renovation and modernization services." },
    { icon: Truck, title: "Project Management", slug: "project-management", description: "End-to-end project coordination ensuring timely delivery and quality outcomes." },
    { icon: Shield, title: "Safety Consulting", slug: "safety-compliance", description: "Comprehensive safety assessments and compliance management for construction sites." },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive construction solutions delivered by our 20-strong team—5 years of experience tailored to meet your needs across Nigeria.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Link key={index} to={`/our-services/${service.slug}`}>
              <Card className="card-elevated hover-lift h-full cursor-pointer">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="btn-construction-outline group">
            <Link to="/our-services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesOverviewSection;