import { Link } from "react-router-dom";
import { MapPin, Clock, DollarSign, Loader2, Users, Award, TrendingUp } from "lucide-react";
import { useJobs } from "@/hooks/useJobs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: Users, title: 'Collaborative Culture', description: 'Work with top professionals in luxury real estate.' },
  { icon: TrendingUp, title: 'Career Growth', description: 'Clear advancement paths in sales and property management.' },
  { icon: Award, title: 'Competitive Benefits', description: 'Commission structures, health coverage, and recognition programs.' },
];

const Careers = () => {
  const { data: openPositions = [], isLoading } = useJobs('mansaluxe-realty');

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Careers at <span className="text-gold-gradient">Mansa Luxe Realty Limited</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join our team of luxury real estate professionals. We're always looking for talented individuals passionate about property and client service.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Why Work With Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={benefit.title} className="border-primary/20 shadow-luxury">
                  <CardContent className="p-8 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Open Positions</h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
              <span className="text-muted-foreground">Loading positions...</span>
            </div>
          ) : openPositions.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground max-w-md mx-auto">
              <p className="text-lg">No open positions at the moment.</p>
              <p className="text-sm mt-2">Check back soon or reach out via our Contact page.</p>
              <Link to="/contact">
                <Button className="mt-6">Contact Us</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {openPositions.map((position) => (
                <Card key={position.id} className="border-primary/20 shadow-luxury">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-2">{position.title}</h3>
                        {position.department && (
                          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                            {position.department}
                          </span>
                        )}
                        <p className="text-muted-foreground mb-4">
                          {position.description || 'Join our luxury real estate team in this exciting role.'}
                        </p>
                        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                          {position.location && (
                            <span className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {position.location}
                            </span>
                          )}
                          {position.employment_type && (
                            <span className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              {position.employment_type}
                            </span>
                          )}
                          {position.salary && (
                            <span className="flex items-center gap-2 font-medium text-primary">
                              <DollarSign className="h-4 w-4" />
                              {position.salary}
                            </span>
                          )}
                        </div>
                      </div>
                      <Link to={`/contact?job=${encodeURIComponent(position.title)}`}>
                        <Button className="w-full lg:w-auto">Apply Now</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Careers;
