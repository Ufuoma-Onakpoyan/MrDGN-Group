import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { MapPin, Clock, DollarSign, Users, TrendingUp, Award, Loader2 } from 'lucide-react';
import { useJobs } from '@/hooks/useJobs';
import { Link } from 'react-router-dom';
const sourceToDepartment: Record<string, string> = {
  group: 'MrDGN Group',
  entertainment: 'MrDGN Entertainment',
  construction: 'MrDGN Construction',
  'mansaluxe-realty': 'Mansa Luxe Realty Limited',
};

const Careers = () => {
  const { data: openPositions = [], isLoading } = useJobs('group');

  const benefits = [
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work alongside talented professionals in a supportive, team-oriented environment.',
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear advancement paths and opportunities to grow across multiple business units.',
    },
    {
      icon: Award,
      title: 'Competitive Benefits',
      description: 'Comprehensive health coverage, retirement plans, and performance-based bonuses.',
    },
  ];

  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Join Our Team
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Build your career with MrDGN Group and help shape the future across entertainment, construction, and real estate industries.
          </p>
        </div>
      </section>

      {/* Why Work With Us Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Work With Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join a dynamic organization that values innovation, growth, and making a positive impact.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card 
                  key={benefit.title} 
                  className="tile-glassy text-center animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore current opportunities across our portfolio of companies.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary mr-2" />
              <span className="text-muted-foreground">Loading positions...</span>
            </div>
          ) : openPositions.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No open positions at the moment.</p>
              <p className="text-sm mt-2">Check back soon or reach out via our Contact page.</p>
            </div>
          ) : (
          <div className="space-y-6">
            {openPositions.map((position, index) => (
               <Card 
                 key={position.title} 
                 className="tile-glassy animate-fade-in-up"
                 style={{ animationDelay: `${index * 0.1}s` }}
               >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 mb-6 lg:mb-0">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <h3 className="text-2xl font-semibold text-foreground">
                          {position.title}
                        </h3>
                        <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {position.department || sourceToDepartment[position.source] || position.source}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {position.description || 'Join our team in this exciting role.'}
                      </p>
                      <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                        {position.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {position.location}
                          </div>
                        )}
                        {position.employment_type && (
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {position.employment_type}
                          </div>
                        )}
                        {position.salary && (
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2" />
                            {position.salary}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="lg:ml-8">
                      <Link to={`/contact?job=${encodeURIComponent(position.title)}`}>
                        <Button size="lg" className="w-full lg:w-auto px-8">
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Our Hiring Process
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Apply Online', description: 'Submit your application and resume through our online portal.' },
              { step: '2', title: 'Initial Screening', description: 'Our HR team will review your application and conduct a phone interview.' },
              { step: '3', title: 'Team Interview', description: 'Meet with department managers and potential team members.' },
              { step: '4', title: 'Final Decision', description: 'Receive feedback and, if selected, a competitive offer package.' },
            ].map((item, index) => (
               <Card 
                 key={item.step} 
                 className="text-center tile-glassy animate-bounce-in"
                 style={{ animationDelay: `${index * 0.1}s` }}
               >
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
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

export default Careers;
