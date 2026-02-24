import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import TypingEffect from '@/components/TypingEffect';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { ArrowRight, Building2, Clapperboard, Home, Target, FileText } from 'lucide-react';
import Map from '@/components/Map';
import { Link } from 'react-router-dom';
import Autoplay from "embla-carousel-autoplay";
const Index = () => {
  const [businessApi, setBusinessApi] = useState<CarouselApi>();
  const [businessCurrent, setBusinessCurrent] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  useEffect(() => {
    if (!businessApi) {
      return;
    }
    setBusinessCount(businessApi.scrollSnapList().length);
    setBusinessCurrent(businessApi.selectedScrollSnap() + 1);
    businessApi.on("select", () => {
      setBusinessCurrent(businessApi.selectedScrollSnap() + 1);
    });
  }, [businessApi]);
  const businesses = [{
    name: 'MrDGN Entertainment',
    description: 'Creating captivating content and experiences across digital and traditional media platforms.',
    logo: '/assets/logo-entertainment.png',
    icon: Clapperboard,
    color: 'from-purple-500 to-pink-500'
  }, {
    name: 'MrDGN Construction',
    description: 'Building tomorrow\'s infrastructure with innovative construction solutions and sustainable practices.',
    logo: '/assets/logo-construction.png',
    icon: Building2,
    color: 'from-orange-500 to-red-500'
  }, {
    name: 'Mansa Luxe Realty Limited',
    description: 'Premium real estate services connecting people with their perfect properties and investment opportunities.',
    logo: '/assets/logo-mansaluxe.png',
    icon: Home,
    color: 'from-green-500 to-teal-500'
  }, {
    name: 'Duerents',
    description: 'Revolutionary tech company focused on modernizing real estate rentals and property management solutions.',
    logo: '/assets/duerents-logo.png',
    icon: Building2,
    color: 'from-blue-500 to-cyan-500'
  }];
  const previewSnippets = [{
    title: 'About Us',
    icon: Target,
    description: 'Building tomorrow\'s industries through strategic investments, innovative leadership, and unwavering commitment to excellence.',
    link: '/about',
    color: 'from-blue-600 to-purple-600'
  }, {
    title: 'Our Businesses',
    icon: Building2,
    description: 'Discover how our diverse portfolio of companies is shaping the future across entertainment, construction, and real estate.',
    link: '/businesses',
    color: 'from-green-600 to-teal-600'
  }, {
    title: 'Media',
    icon: FileText,
    description: 'Stay updated with the latest news, press releases, and media coverage about MrDGN Group and our subsidiaries.',
    link: '/media',
    color: 'from-orange-600 to-red-600'
  }];
  const portfolioItems = [{
    title: 'Digital Entertainment Leadership',
    description: 'MrDGN Entertainment has produced over 50 innovative projects, reaching more than 1 million viewers worldwide.',
    images: ['/assets/entertainment-portfolio-1.png', '/assets/entertainment-portfolio-2.png', '/assets/entertainment-portfolio-3.png', '/assets/entertainment-portfolio-4.png', '/assets/entertainment-portfolio-5.png'],
    category: 'Entertainment'
  }, {
    title: 'Sustainable Construction Excellence',
    description: 'MrDGN Construction has delivered 100+ projects worth over ₦50M, pioneering green building solutions.',
    images: ['/assets/construction-portfolio-1.png', '/assets/construction-portfolio-2.png', '/assets/construction-portfolio-3.png', '/assets/construction-portfolio-4.png'],
    category: 'Construction'
  }, {
    title: 'Premium Real Estate Success',
    description: 'Mansa Luxe Realty Limited has facilitated over ₦3 billion in property transactions and delivered 10+ successful sales, bringing experienced, trusted expertise to every client.',
    images: ['/assets/realty-portfolio-1.png', '/assets/realty-portfolio-2.png', '/assets/realty-portfolio-3.png', '/assets/realty-portfolio-4.png'],
    category: 'Real Estate'
  }, {
    title: 'Technology Innovation',
    description: 'Duerents is revolutionizing property management with cutting-edge rental platforms and automated solutions.',
    images: ['/assets/duerents-portfolio-1.png', '/assets/duerents-portfolio-2.png', '/assets/duerents-portfolio-3.png', '/assets/duerents-portfolio-4.png'],
    category: 'Technology'
  }];

  // Portfolio image carousel state
  const [portfolioImages, setPortfolioImages] = useState<{
    [key: string]: number;
  }>({});
  useEffect(() => {
    const intervals: {
      [key: string]: NodeJS.Timeout;
    } = {};
    portfolioItems.forEach((item, index) => {
      intervals[item.title] = setInterval(() => {
        setPortfolioImages(prev => ({
          ...prev,
          [item.title]: ((prev[item.title] || 0) + 1) % item.images.length
        }));
      }, 3000 + index * 500); // Stagger the intervals slightly
    });
    return () => {
      Object.values(intervals).forEach(clearInterval);
    };
  }, []);
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-section relative h-screen flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-20 grid-rows-20 h-full w-full">
            {Array.from({
            length: 400
          }).map((_, i) => <div key={i} className="border border-white/10 animate-pulse" style={{
            animationDelay: `${Math.random() * 5}s`
          }} />)}
          </div>
        </div>

        {/* Simplified Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full animate-float opacity-60"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-gradient-to-r from-red-500 to-red-700 rounded-full animate-float opacity-50" style={{
        animationDelay: '2s'
      }}></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-gradient-to-r from-red-300 to-red-500 rounded-full animate-float opacity-40" style={{
        animationDelay: '4s'
      }}></div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold text-black mb-8 animate-fade-in leading-tight">
              <TypingEffect 
                staticText="Creating"
                words={["Spaces", "Stories", "Solutions"]}
                className="block text-black font-extrabold glow-text-subtle"
              />
            </h1>
            
            {/* Decorative Line */}
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-destructive mx-auto mb-8 animate-fade-in" style={{
            animationDelay: '0.3s'
          }}></div>
          </div>
          
          <p className="text-2xl md:text-3xl text-black/95 mb-12 max-w-3xl mx-auto animate-fade-in font-light leading-relaxed" style={{
          animationDelay: '0.5s'
        }}>
            MrDGN Group is a <span className="font-bold text-red-600">conglomerate</span> driving innovation across construction, entertainment, and real estate industries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{
          animationDelay: '0.7s'
        }}>
            <Button size="lg" className="bg-red-600 text-white hover:bg-red-700 hover:scale-105 transform transition-all duration-300 px-10 py-4 text-lg shadow-glow hover:shadow-glow-intense group">
              <Link to="/about" className="flex items-center gap-3">
                Discover Our Story
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-black text-white bg-black hover:bg-black/90 px-10 py-4 text-lg backdrop-blur-sm hover:scale-105 transform transition-all duration-300 group">
              <Link to="/businesses" className="flex items-center gap-3">
                Explore Our Businesses
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Preview Snippets Section */}
      <section className="snippets-section py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Discover MrDGN Group
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our story, businesses, and latest updates through these quick previews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {previewSnippets.map((snippet, index) => {
            const IconComponent = snippet.icon;
            return <Card key={snippet.title} className="tile-glassy cursor-pointer group animate-scale-in" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${snippet.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {snippet.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {snippet.description}
                    </p>
                    <Button variant="outline" className="w-full">
                      <Link to={snippet.link} className="flex items-center gap-2 justify-center" onClick={() => window.scrollTo(0, 0)}>
                        Learn More
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>;
          })}
            </div>
          </div>
        </section>

      {/* Our Businesses Carousel Section */}
      <section className="businesses-section py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Our Businesses
            </h2>
            <p className="text-xl text-black/70 max-w-3xl mx-auto">
              We operate diverse businesses united by a commitment to excellence, innovation, and sustainable growth.
            </p>
          </div>

          <div className="relative">
            <Carousel className="w-full max-w-6xl mx-auto" setApi={setBusinessApi} opts={{
            align: "start",
            loop: true
          }} plugins={[Autoplay({
            delay: 4000,
            stopOnInteraction: false
          })]}>
              <CarouselContent>
                {businesses.map((business, index) => {
                const IconComponent = business.icon;
                return <CarouselItem key={business.name} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="bg-black border border-gray-800 hover:border-primary/50 transition-all duration-500 group hover:scale-[1.08] hover:-translate-y-4 backdrop-blur-sm h-[17rem] relative overflow-hidden hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(59,130,246,0.3)] hover:bg-gradient-to-br hover:from-gray-900 hover:to-black">
                        <CardContent className="p-8 text-center relative h-full flex flex-col justify-center">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-destructive/20 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-destructive/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
                          <div className="relative z-10">
                            <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 shadow-lg relative overflow-hidden ${business.name === 'MrDGN Construction' ? 'bg-gray-100' : 'bg-white/10 backdrop-blur-sm'}`}>
                              <img 
                                src={business.logo} 
                                alt={`${business.name} Logo`}
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300 group-hover:drop-shadow-lg">
                              {business.name}
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm group-hover:text-white transition-colors duration-300 group-hover:drop-shadow-md">
                              {business.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>;
              })}
              </CarouselContent>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <CarouselPrevious className="relative left-0 border-none bg-black/20 hover:bg-black/40 text-white opacity-50 hover:opacity-100 transition-all duration-300 w-10 h-10" />
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <CarouselNext className="relative right-0 border-none bg-black/20 hover:bg-black/40 text-white opacity-50 hover:opacity-100 transition-all duration-300 w-10 h-10" />
              </div>
            </Carousel>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({
              length: businessCount
            }).map((_, index) => <button key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === businessCurrent - 1 ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'}`} onClick={() => businessApi?.scrollTo(index)} />)}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="px-8 py-3 bg-black text-white hover:bg-black/90">
              <Link to="/businesses" className="flex items-center gap-2" onClick={() => window.scrollTo(0, 0)}>
                Learn More About Our Businesses
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Portfolio Section */}
      <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Portfolio
              </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing the remarkable achievements and innovative work of our subsidiary companies across diverse industries.
            </p>
          </div>

           <div className="grid md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => {
            const currentImageIndex = portfolioImages[item.title] || 0;
            const getBusinessLink = (title: string) => {
              if (title.includes('Entertainment') || title.includes('Content Creation')) return 'https://entertainment.mrdgngroup.com/';
              if (title.includes('Construction') || title.includes('Infrastructure')) return 'https://construction.mrdgngroup.com/';
              if (title.includes('Real Estate') || title.includes('Realty')) return 'https://mansaluxerealty.mrdgngroup.com/';
              if (title.includes('Technology') || title.includes('Duerents')) return 'https://duerents.com/';
              return null;
            };
            
            const businessLink = getBusinessLink(item.title);
            
            return <Card 
              key={item.title} 
              className="tile-glassy cursor-pointer group animate-scale-in overflow-hidden" 
              style={{ animationDelay: `${index * 0.2}s` }}
              onClick={() => businessLink && window.open(businessLink, '_blank')}
            >
                  <div className="relative bg-muted flex items-center justify-center h-72 lg:h-80">
                    <img src={item.images[currentImageIndex]} alt={item.title} className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-500" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                    {/* Image Carousel Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {item.images.map((_, imgIndex) => <div key={imgIndex} className={`w-2 h-2 rounded-full transition-all duration-300 ${imgIndex === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />)}
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>;
          })}
            </div>
          </div>
        </section>

      {/* Ready to Partner Section */}
      <section className="cta-section py-24 gradient-hero text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join forces with MrDGN Group and be part of building tomorrow&apos;s industries. Together, we can create extraordinary value and lasting impact.
          </p>
          <Link to="/contact" onClick={() => window.scrollTo(0, 0)} className="inline-flex">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/95 px-8 py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 animate-fade-in ring-2 ring-white/30 hover:ring-white/50"
              style={{ animationDelay: '0.4s' }}
            >
              Get in Touch
              <ArrowRight size={22} className="ml-2" />
            </Button>
          </Link>
          <p className="text-white/80 text-sm mt-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            We respond within 24 hours · Asaba, Lagos, Abuja & Dubai
          </p>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="contact-section py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-black">
                Visit Our Office
              </h2>
              <p className="text-xl max-w-2xl mx-auto text-black/80">
                Head Office, Asaba, Delta State. Use the map below for directions.
              </p>
            </div>
            <div className="max-w-4xl mx-auto transition-opacity duration-500">
              <Map />
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};
export default Index;