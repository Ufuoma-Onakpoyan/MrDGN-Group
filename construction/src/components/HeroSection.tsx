import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoModal from './VideoModal';
import heroImage from '@/assets/hero-construction.jpg';

const HeroSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay - full width */}
      <div className="absolute inset-0 -mx-4 md:-mx-6 lg:-mx-8">
        <img 
          src={heroImage} 
          alt="Construction site with diverse workers and heavy machinery"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-hero-pattern"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 my-4 md:my-6 lg:my-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-white px-2 sm:px-4 lg:px-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              Building Nigeria's 
              <span className="text-gradient block">Future</span>
              Together
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl">
              MR DGN Constructions delivers excellence across Nigeria. From Lagos to Abuja, we build with precision, safety, and innovation that meets international standards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="btn-construction group">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-construction-outline"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Our Story
              </Button>
            </div>
          </div>

          {/* Construction Stats */}
          <div className="px-2 sm:px-0">
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">10+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Projects Completed</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">5+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Years in Business</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">20</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Expert Team</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">99%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video placeholder overlay for future video integration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
        <div className="text-sm">Scroll to explore</div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;