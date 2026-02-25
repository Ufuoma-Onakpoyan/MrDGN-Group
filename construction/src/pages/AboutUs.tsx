import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, Award, Clock, Target, Lightbulb } from 'lucide-react';
import ceoPortrait from '@/assets/mrdgn-ceo-portrait.png';

const AboutUs = () => {
  useEffect(() => {
    document.title = 'About Us - MR DGN Constructions';
  }, []);
  const stats = [
    { icon: Building2, number: '10+', label: 'Projects Completed' },
    { icon: Users, number: '20', label: 'Expert Team Members' },
    { icon: Award, number: '5+', label: 'Years of Excellence' },
    { icon: Clock, number: '99%', label: 'On-Time Delivery' },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every project is executed with meticulous attention to detail and unwavering commitment to quality.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technology and sustainable practices to deliver future-ready solutions.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Our success is built on strong partnerships with clients, suppliers, and communities.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We set the highest standards in safety, quality, and environmental responsibility.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About <span className="text-primary">MrDGN Constructions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Building excellence for 5 years, we are your trusted partner for innovative construction solutions that stand the test of time. MR DGN Constructions is a subsidiary of MrDGN Group.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2020, MrDGN Constructions began as a small family business with a big vision: to transform the construction industry through innovation, quality, and unwavering commitment to our clients.
                </p>
                <p>
                  Since then, we have grown from a local contractor to a leading construction company, completing over 10 projects ranging from high-rise buildings to critical infrastructure development.
                </p>
                <p>
                  Our success is built on a foundation of trust, expertise, and a dedicated team of engineers, managers, and bricklayers who share our passion for building excellence.
                </p>
              </div>
              <Button className="btn-construction mt-6" size="lg">
                Learn More About Our Journey
              </Button>
            </div>
            <div className="relative">
              <img
                src="/our-story-premises.png"
                alt="MR DGN Construction and Developers – our premises"
                className="rounded-2xl shadow-construction hover-lift w-full object-cover max-h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CEO / Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Leadership</h2>
              <p className="text-xl text-muted-foreground">
                Meet the visionary behind MrDGN Constructions.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-muted/30 rounded-2xl p-8 md:p-12">
              <div className="relative">
                <img 
                  src={ceoPortrait} 
                  alt="Onakpoyan Success (MrDGN), CEO of MrDGN Constructions" 
                  className="rounded-2xl shadow-construction w-full max-w-md mx-auto object-cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Onakpoyan Success</h3>
                <p className="text-primary font-semibold mb-4">MrDGN — Chief Executive Officer</p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A seasoned businessman and developer from Delta State, Nigeria, Onakpoyan Success (MrDGN) brings a rare combination of technical expertise and construction industry leadership to MrDGN Constructions. His background in development and strategic business management has been instrumental in driving innovation, quality, and sustainable growth across our projects nationwide.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Under his leadership, we continue to deliver structures that stand the test of time while embracing modern building practices and community-focused development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do and define who we are as a company.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-elevated hover-lift text-center">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;