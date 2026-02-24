import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getServiceBySlug } from '@/data/services';
import { CheckCircle } from 'lucide-react';

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} - MR DGN Constructions`;
    }
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/our-services">View All Services</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const IconComponent = service.icon;

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <Link to="/our-services" className="hover:text-primary">Our Services</Link>
            <span>/</span>
            <span className="text-foreground">{service.title}</span>
          </div>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <IconComponent className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl">{service.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Details */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Project Timeline</h2>
              <p className="text-muted-foreground">{service.timeline}</p>
              {service.materials && (
                <>
                  <h2 className="text-2xl font-bold mt-8 mb-4">Materials</h2>
                  <p className="text-muted-foreground">{service.materials}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible>
              {service.faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-6">Interested in {service.title}?</p>
          <Button asChild size="lg" className="btn-construction">
            <Link to="/contact-us">Request a Quote</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
