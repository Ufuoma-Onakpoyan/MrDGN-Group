import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { servicesData } from '@/data/services';
const ServicesSection = () => {
  return <section id="our-work" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h3 className="lg:text-5xl font-bold mb-4 text-5xl">
            Our <span className="text-primary">Services</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive construction services delivered by our 20-strong team of engineers, managers, and bricklayers—backed by 5 years of experience and a commitment to quality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
          const IconComponent = service.icon;
          return (
            <Link key={service.slug} to={`/our-services/${service.slug}`}>
              <Card className="card-elevated hover-lift group h-full">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-center">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>)}
                  </ul>
                </CardContent>
              </Card>
            </Link>
        );
        })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10+</div>
              <div className="text-primary-foreground/80">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">5+</div>
              <div className="text-primary-foreground/80">Years in Business</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">20</div>
              <div className="text-primary-foreground/80">Expert Team</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">99%</div>
              <div className="text-primary-foreground/80">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesSection;