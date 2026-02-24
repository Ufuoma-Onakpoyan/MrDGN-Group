import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ChevronLeft, ChevronRight, Quote, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTestimonials } from "@/hooks/useTestimonials";

const Testimonials = () => {
  const { testimonials, loading, error, refetch } = useTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (testimonials.length === 0) return;
    
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const stats = [
    { value: "10+", label: "Properties Sold" },
    { value: "₦3B+", label: "in Transactions" },
    { value: "10+", label: "Experienced Team" },
    { value: "100%", label: "Trusted Expertise" }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading testimonials...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <p className="text-destructive mb-4">{error}</p>
          <button 
            onClick={() => refetch()}
            className="btn-luxury"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">No testimonials available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Client <span className="text-gold-gradient">Testimonials</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Hear from our satisfied clients about their luxury real estate experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Testimonial Carousel */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="luxury-card p-8 md:p-12 relative">
              <Quote className="w-16 h-16 text-primary/20 absolute top-8 left-8" />
              
              <div className="text-center relative z-10">
                <div className="mb-8">
                  <img
                    src={testimonials[currentIndex].photo || `/assets/testimonial-${(currentIndex % 3) + 1}.jpg`}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover transition-opacity duration-500"
                  />
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: testimonials[currentIndex].rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-primary fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-xl md:text-2xl font-medium mb-8 text-foreground leading-relaxed animate-fade-in">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                
                <div className="text-center">
                  <h4 className="text-lg font-serif font-semibold text-foreground">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-primary font-medium mb-2">
                    {testimonials[currentIndex].role && testimonials[currentIndex].company
                      ? `${testimonials[currentIndex].role} at ${testimonials[currentIndex].company}`
                      : testimonials[currentIndex].role || testimonials[currentIndex].company || 'Client'}
                  </p>
                    <p className="text-muted-foreground text-sm">
                      {testimonials[currentIndex].property_id ? `Property: ${testimonials[currentIndex].property_id}` : 'General Review'}
                    </p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-primary-foreground" />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-primary-foreground" />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold mb-4">
              What Our <span className="text-gold-gradient">Clients Say</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Read more reviews from our satisfied clients across Nigeria.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="luxury-card p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.photo || `/assets/testimonial-${(index % 3) + 1}.jpg`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-primary fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium">{testimonial.property_id ? `Property: ${testimonial.property_id}` : 'General Review'}</p>
                  <p className="text-xs">{testimonial.role && testimonial.company ? `${testimonial.role} at ${testimonial.company}` : testimonial.role || testimonial.company || 'Client'}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/contact" className="btn-outline-luxury inline-block">
              Share Your Experience
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="luxury-card p-8 md:p-12 text-center">
            <h2 className="text-3xl font-serif font-bold mb-6">
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Experience the same exceptional service that has made our clients' real estate 
              dreams come true. Let us help you find your perfect luxury property.
            </p>
            <Button asChild className="btn-luxury">
              <Link to="/properties">
                Start Your Property Journey
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;