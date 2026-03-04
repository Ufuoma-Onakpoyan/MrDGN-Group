import React from 'react';
import { Award, Clock, Users, Shield, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: Award,
      title: "half a decade in Business",
      description: "Five years of proven expertise in Nigeria's construction industry"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "100% of our projects completed on schedule with zero compromise on quality"
    },
    {
      icon: Users,
      title: "50+ Expert Team",
      description: "Skilled engineers, managers, and bricklayers dedicated to excellence"
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Zero-accident workplace with comprehensive safety protocols"
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "Rigorous quality control at every stage of construction"
    },
    {
      icon: Star,
      title: "100% Client Satisfaction",
      description: "Exceptional customer service and long-term partnerships"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient">Mr DGN Construction and Developers Limited</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference that comes with working with Nigeria's construction industry leaders committed to excellence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image - same as Our Story on About Us */}
          <div className="order-2 lg:order-1">
            <img
              src="/our-story-premises.png"
              alt="Mr DGN construction and developers limited – our premises"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Reasons Grid */}
          <div className="order-1 lg:order-2 grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <Card key={index} className="card-elevated hover-lift">
                <CardHeader className="pb-3">
                  <reason.icon className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;