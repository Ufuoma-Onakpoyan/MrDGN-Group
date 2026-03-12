import React, { useEffect, useState } from 'react';
import { Award, Clock, Users, Shield, CheckCircle, Star, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WhyChooseUsSection = () => {
  const [imageError, setImageError] = useState(false);

  // #region agent log
  useEffect(() => {
    fetch('http://127.0.0.1:7729/ingest/a34b21ca-c51d-4e94-a26f-273b68fd62c8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'361340'},body:JSON.stringify({sessionId:'361340',hypothesisId:'H3',location:'WhyChooseUsSection.tsx:mount',message:'Section mounted',data:{mounted:true},timestamp:Date.now()})}).catch(()=>{});
  }, []);
  // #endregion
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
    <section data-section="why-choose-us" className="section-ios-paint py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient">Mr DGN Construction and Developers Limited</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quality materials supply and construction expertise. Why builders and project owners in Asaba and beyond trust us.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image - same as Our Story on About Us */}
          <div className="order-2 lg:order-1 min-h-[240px]">
            {!imageError ? (
              <img
                src="/our-story-premises.png"
                alt="Mr DGN construction and developers limited – our premises"
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-[400px] min-h-[240px] flex items-center justify-center bg-muted rounded-lg shadow-lg text-muted-foreground">
                <div className="text-center px-4">
                  <Building2 className="h-16 w-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Our premises</p>
                </div>
              </div>
            )}
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