import React, { useRef, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import { Target, Eye, Users, Award } from 'lucide-react';
import ceoPortrait from '@/assets/mrdgn-ceo-portrait.png';
const About = () => {
  const storySectionRef = useRef<HTMLElement>(null);
  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7729/ingest/3a7a69ee-46c6-491b-bc79-669dc68eb5b5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ad1f7'},body:JSON.stringify({sessionId:'2ad1f7',location:'About.tsx:mount',message:'About mounted',data:{},timestamp:Date.now(),hypothesisId:'D'})}).catch(()=>{});
  }, []);
  useEffect(() => {
    const el = storySectionRef.current;
    if (!el) return;
    const style = typeof getComputedStyle !== 'undefined' ? getComputedStyle(el) : null;
    const firstChild = el.querySelector('.animate-fade-in-left');
    const childStyle = firstChild && typeof getComputedStyle !== 'undefined' ? getComputedStyle(firstChild as Element) : null;
    fetch('http://127.0.0.1:7729/ingest/3a7a69ee-46c6-491b-bc79-669dc68eb5b5',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2ad1f7'},body:JSON.stringify({sessionId:'2ad1f7',location:'About.tsx:storySection',message:'Story section computed style',data:{sectionOpacity:style?.opacity,sectionAnimation:style?.animation,childOpacity:childStyle?.opacity,childAnimation:childStyle?.animation,prefersReducedMotion:typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion: reduce)').matches},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
  }, []);
  // #endregion
  const values = [
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to stay ahead of industry trends.',
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'We see opportunities where others see challenges, building sustainable businesses for the future.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Our success comes from fostering partnerships and building strong relationships across all sectors.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, delivering exceptional results consistently.',
    },
  ];

  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            About MrDGN Group
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Building tomorrow's industries through strategic investments, innovative leadership, and unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storySectionRef} className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded by Onakpoyan Success (MrDGN), a seasoned businessman and developer from Delta State, Nigeria, MrDGN Group has grown from a single entrepreneurial vision into a diversified holding company that shapes the future of entertainment, construction, and real estate. His blend of technical expertise and strategic business acumen continues to drive growth across every subsidiary.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our journey began with the understanding that true success comes from building businesses that not only generate returns but also contribute meaningfully to society. Today, we continue to identify and nurture opportunities that align with our core values of innovation, sustainability, and excellence.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                As we look to the future, MrDGN Group remains committed to expanding our portfolio with businesses that share our vision of creating positive change while delivering exceptional value to our stakeholders.
              </p>
            </div>
            <div className="animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
              <div className="relative card-hover">
                <img 
                  src={ceoPortrait}
                  alt="Onakpoyan Success (MrDGN) - CEO and Founder of MrDGN Group"
                  className="rounded-lg shadow-2xl image-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg transition-opacity duration-300 hover:opacity-80"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                  <p className="text-white font-semibold">Onakpoyan Success</p>
                  <p className="text-white/90 text-sm">MrDGN — CEO & Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide every decision we make and every relationship we build.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card 
                  key={value.title} 
                  className="tile-glassy text-center animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Leadership Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our leadership team brings decades of combined experience across diverse industries, driving strategic growth and operational excellence.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl animate-slide-up tile-glassy border border-border">
            <div className="flex flex-col md:flex-row gap-8 items-center text-left mb-8">
              <div className="flex-shrink-0">
                <img 
                  src={ceoPortrait} 
                  alt="Onakpoyan Success (MrDGN), CEO of MrDGN Group" 
                  className="w-48 h-48 rounded-xl object-cover shadow-lg"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">Onakpoyan Success</h3>
                <p className="text-primary font-medium mb-4">MrDGN — Chief Executive Officer & Founder</p>
                <p className="text-muted-foreground leading-relaxed">
                  A seasoned businessman and developer from Delta State, Nigeria, Onakpoyan Success (MrDGN) leads MrDGN Group with a unique combination of technical depth and strategic vision. His hands-on experience in both business and software development has shaped the Group's culture of innovation and operational excellence across entertainment, construction, and real estate.
                </p>
              </div>
            </div>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our executive team combines deep industry expertise with innovative thinking, ensuring that each of our subsidiaries operates at the highest level while contributing to our overall strategic objectives. We believe in empowering our leaders to make bold decisions that drive sustainable growth.
              </p>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">15+</div>
                  <div className="text-muted-foreground">Years of Combined Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">3</div>
                  <div className="text-muted-foreground">Industry Sectors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-muted-foreground">Commitment to Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
