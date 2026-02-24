import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useJobs } from "@/hooks/useJobs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Loader2, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { LAYOUT } from "@/lib/layout";

const benefits = [
  { icon: Users, title: 'Collaborative Culture', description: 'Work with a small team focused on supporting Nigerian entertainment and live events.' },
  { icon: TrendingUp, title: 'Career Growth', description: 'Grow with us as we expand our event sponsorship footprint across Nigeria.' },
  { icon: Award, title: 'Meaningful Work', description: 'Help bring concerts, comedy shows, and cultural expos to communities.' },
];

const CareersPage = () => {
  useScrollReveal();
  const { data: openPositions = [], isLoading } = useJobs('entertainment');

  return (
    <div className="min-h-screen">
      <Header />

      <main className={LAYOUT.pageTop}>
        <div className="container mx-auto px-4">
          {/* Hero */}
          <section className="mb-16 md:mb-20">
            <div className={`${LAYOUT.containerNarrow} text-center scroll-reveal`}>
              <h1 className={LAYOUT.title}>
                Join Our <span className="gradient-text">Team</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We&apos;re always looking for people passionate about Nigerian entertainment and live events. If that sounds like you, get in touch.
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section className={LAYOUT.section}>
            <div className={LAYOUT.containerWide}>
              <h2 className={`${LAYOUT.sectionTitle} text-center mb-10 scroll-reveal`}>Why Work With Us</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {benefits.map((benefit) => {
                  const IconComponent = benefit.icon;
                  return (
                    <Card key={benefit.title} className="scroll-reveal border-0 shadow-lg">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Open Positions */}
          <section className={LAYOUT.section}>
            <div className={LAYOUT.containerNarrow}>
              <h2 className={`${LAYOUT.sectionTitle} text-center mb-10 scroll-reveal`}>Open Positions</h2>
              {isLoading ? (
                <div className="flex justify-center items-center py-12 scroll-reveal">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                  <span className="text-muted-foreground">Loading positions...</span>
                </div>
              ) : openPositions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground scroll-reveal rounded-xl bg-muted/30 border border-border p-8">
                  <p className="font-medium">No open positions at the moment.</p>
                  <p className="text-sm mt-2">Check back later or reach out via our Contact page.</p>
                  <Link to="/contact">
                    <Button className="mt-6">Contact Us</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {openPositions.map((position) => (
                    <Card key={position.id} className="scroll-reveal border-0 shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{position.title}</h3>
                            {position.department && (
                              <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
                                {position.department}
                              </span>
                            )}
                            <p className="text-muted-foreground text-sm mb-3">{position.description || 'Join our team in this role.'}</p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              {position.location && (
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="h-4 w-4" />
                                  {position.location}
                                </span>
                              )}
                              {position.employment_type && (
                                <span className="flex items-center gap-1.5">
                                  <Clock className="h-4 w-4" />
                                  {position.employment_type}
                                </span>
                              )}
                              {position.salary && (
                                <span className="flex items-center gap-1.5 font-medium text-primary">
                                  <DollarSign className="h-4 w-4" />
                                  {position.salary}
                                </span>
                              )}
                            </div>
                          </div>
                          <Link to={`/contact?job=${encodeURIComponent(position.title)}`} className="shrink-0">
                            <Button size="lg" className="hero-glow w-full lg:w-auto">Apply Now</Button>
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
      </main>

      <Footer />
    </div>
  );
};

export default CareersPage;
