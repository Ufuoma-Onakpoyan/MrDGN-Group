import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { Building2, Clapperboard, Home, ArrowRight, Star, Users, TrendingUp, ExternalLink } from 'lucide-react';
const constructionLogo = '/assets/logo-construction.png';
const entertainmentLogo = '/assets/logo-entertainment.png';
const realtyLogo = '/assets/logo-mansaluxe.png';

const Businesses = () => {
  const businesses = [
    {
      name: 'MrDGN Entertainment',
      description: 'Leading the future of digital entertainment through innovative content creation, immersive experiences, and cutting-edge media production.',
      icon: Clapperboard,
      logo: '/assets/logo-entertainment.png',
      website: 'https://entertainment.mrdgngroup.com/',
      color: 'from-purple-500 to-pink-500',
      image: '/assets/entertainment-business.png',
      services: ['Content Production', 'Digital Media', 'Event Management', 'Brand Partnerships'],
      stats: ['50+ Projects Completed', '1M+ Audience Reached', '25+ Brand Partners'],
    },
    {
      name: 'MrDGN Construction',
      description: 'Building tomorrow\'s infrastructure with sustainable practices, innovative construction technologies, and unwavering commitment to quality.',
      icon: Building2,
      logo: '/assets/logo-construction.png',
      website: 'https://construction.mrdgngroup.com/',
      color: 'from-orange-500 to-red-500',
      image: '/assets/construction-business.png',
      services: ['Commercial Construction', 'Residential Development', 'Infrastructure Projects', 'Green Building Solutions'],
      stats: ['100+ Projects Delivered', '₦50M+ in Contracts', '15+ Years Experience'],
    },
    {
      name: 'Mansa Luxe Realty Limited',
      description: 'Connecting people with exceptional properties through personalized service, market expertise, and experienced real estate solutions.',
      icon: Home,
      logo: '/assets/logo-mansaluxe.png',
      website: 'https://mansaluxerealty.mrdgngroup.com/',
      color: 'from-green-500 to-teal-500',
      image: '/assets/realty-business.png',
      services: ['Property Sales', 'Investment Advisory', 'Property Management', 'Market Analysis'],
      stats: ['10+ Properties Sold', '₦3B+ in Transactions', 'Experienced Team'],
    },
    {
      name: 'Duerents',
      description: 'Revolutionizing property management with cutting-edge rental platforms, automated solutions, and streamlined tenant experiences.',
      icon: Home,
      logo: '/assets/duerents-logo.png',
      website: 'https://duerents.com/',
      color: 'from-blue-500 to-cyan-500',
      image: '/assets/duerents-business.png',
      services: ['Property Management', 'Rental Platforms', 'Automated Solutions', 'Tenant Management'],
      stats: ['1000+ Properties Managed', '99% Uptime', '24/7 Support'],
    },
  ];

  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Our Businesses
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover how our diverse portfolio of companies is shaping the future across entertainment, construction, and real estate industries.
          </p>
        </div>
      </section>

      {/* Businesses Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Portfolio Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each of our subsidiaries operates with autonomy while benefiting from our shared resources, expertise, and strategic vision.
            </p>
          </div>

          <div className="space-y-20">
            {businesses.map((business, index) => {
              const IconComponent = business.icon;
              const isEven = index % 2 === 0;
              
              return (
                 <div 
                  key={business.name} 
                  className={`grid lg:grid-cols-2 gap-16 items-center ${isEven ? 'animate-fade-in-left' : 'animate-fade-in-right'} ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`${isEven ? 'lg:pr-12' : 'lg:pl-12 lg:col-start-2'} space-y-6`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-16 sm:h-20 md:h-24 flex items-center justify-start ${business.name === 'MrDGN Construction' ? 'bg-gray-100 rounded-xl px-5 sm:px-8 py-4 sm:py-5 shadow-md border border-gray-200' : ''}`}>
                        <img 
                          src={business.logo} 
                          alt={`${business.name} logo`}
                          className="max-w-full max-h-full object-contain object-left transition-transform duration-300 hover:scale-105 drop-shadow-sm"
                        />
                      </div>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {business.description}
                    </p>
                    
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                        <Star className="w-5 h-5 text-primary mr-2" />
                        Key Services
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {business.services.map((service) => (
                          <div key={service} className="flex items-center text-muted-foreground">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                        <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                        Key Achievements
                      </h4>
                      <div className="space-y-3">
                        {business.stats.map((stat) => (
                          <div key={stat} className="flex items-center text-muted-foreground">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"></div>
                            <span className="text-sm font-medium">{stat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button 
                        className="button-hover hover-scale bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white shadow-lg"
                        onClick={() => window.open(business.website, '_blank')}
                      >
                        Visit Website
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className={isEven ? '' : 'lg:col-start-1'}>
                    <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                      <div className="relative group bg-muted flex items-center justify-center h-80 lg:h-96">
                        <img 
                          src={business.image} 
                          alt={business.name}
                          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${business.color} opacity-20 transition-opacity duration-300 group-hover:opacity-30 pointer-events-none`}></div>
                        <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/20 pointer-events-none"></div>
                        
                        {/* Floating business name overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <h3 className="text-lg font-bold text-gray-900">{business.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">Industry Leader</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Synergies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Creating Synergies
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our businesses work together to create unique opportunities and deliver enhanced value to our clients and partners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="tile-glassy text-center animate-bounce-in">
              <CardContent className="p-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary hover-scale" />
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Shared Expertise
                </h3>
                <p className="text-muted-foreground">
                  Cross-pollination of knowledge and skills across our portfolio companies drives innovation and efficiency.
                </p>
              </CardContent>
            </Card>

            <Card className="tile-glassy text-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-8">
                <Building2 className="w-12 h-12 mx-auto mb-4 text-primary hover-scale" />
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Integrated Solutions
                </h3>
                <p className="text-muted-foreground">
                  Our companies collaborate to offer comprehensive solutions that span multiple industries and services.
                </p>
              </CardContent>
            </Card>

            <Card className="tile-glassy text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-primary hover-scale" />
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Strategic Growth
                </h3>
                <p className="text-muted-foreground">
                  Coordinated growth strategies and shared resources amplify the success of each business unit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Businesses;
