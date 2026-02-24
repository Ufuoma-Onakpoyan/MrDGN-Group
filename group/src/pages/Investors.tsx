import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { BarChart3, Target, TrendingUp, FileText, Building2, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Investors = () => {
  const pillars = [
    {
      icon: Target,
      title: 'Strategic Focus',
      description: 'We concentrate on high-growth sectors—entertainment, construction, and real estate—where we have deep expertise and a proven ability to create value. Our portfolio is built for resilience and long-term returns.',
    },
    {
      icon: TrendingUp,
      title: 'Sustainable Growth',
      description: 'We combine operational excellence with disciplined capital allocation. Each subsidiary is run for sustainable growth, with clear metrics and accountability.',
    },
    {
      icon: Building2,
      title: 'Portfolio Synergy',
      description: 'Our businesses benefit from shared leadership, best practices, and strategic alignment. Cross-sector insights and shared resources strengthen the group as a whole.',
    },
    {
      icon: Leaf,
      title: 'Long-Term Value',
      description: 'We invest in people, innovation, and responsible practices. Our vision is to build businesses that deliver value to stakeholders and communities for decades.',
    },
  ];

  return (
    <div className="min-h-screen page-transition">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Investor Relations
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Our strategy, vision, and commitment to building lasting value across entertainment, construction, and real estate.
          </p>
        </div>
      </section>

      {/* Strategy & Vision Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Strategy & Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              MrDGN Group operates as a diversified holding company with a clear mandate: to identify, acquire, and grow businesses that align with our core competencies and deliver sustainable returns.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <Card
                  key={pillar.title}
                  className="tile-glassy animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center mb-6">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Approach */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Our Investment Approach
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            We focus on businesses where we can add real value through leadership, operational improvement, and access to group resources. We are patient capital: we back management teams, invest in growth, and build for the long term rather than short-term gains.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our current portfolio spans <strong className="text-foreground">MrDGN Entertainment</strong>, <strong className="text-foreground">MrDGN Construction</strong>, <strong className="text-foreground">Mansa Luxe Realty Limited</strong>, and <strong className="text-foreground">Duerents</strong>—each chosen for its fit with our strategy and potential to contribute to the group&apos;s overall success.
          </p>
        </div>
      </section>

      {/* Reports & Resources (placeholder for future content) */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Reports & Resources
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key documents and updates for investors will be published here as they become available.
            </p>
          </div>
          <Card className="tile-glassy border border-dashed border-border">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground mb-6">
                Annual reports, investor presentations, and other materials will be added to this section in the future.
              </p>
              <p className="text-sm text-muted-foreground">
                For investor inquiries in the meantime, please contact us via our <Link to="/contact" className="text-primary hover:underline">Contact</Link> page.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Interested in learning more?
          </h2>
          <p className="text-muted-foreground mb-8">
            Explore our businesses, read our story, or get in touch with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/businesses">
              <Card className="tile-glassy cursor-pointer hover:border-primary/50 transition-colors p-6">
                <CardContent className="p-0 flex items-center gap-3">
                  <BarChart3 className="w-8 h-8 text-primary" />
                  <span className="font-medium">Our Businesses</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/about">
              <Card className="tile-glassy cursor-pointer hover:border-primary/50 transition-colors p-6">
                <CardContent className="p-0 flex items-center gap-3">
                  <Target className="w-8 h-8 text-primary" />
                  <span className="font-medium">About Us</span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/contact">
              <Card className="tile-glassy cursor-pointer hover:border-primary/50 transition-colors p-6">
                <CardContent className="p-0 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary" />
                  <span className="font-medium">Contact</span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investors;
