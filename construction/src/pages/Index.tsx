import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutUsSection from '@/components/AboutUsSection';
import ServicesOverviewSection from '@/components/ServicesOverviewSection';
import ProductsSection from '@/components/ProductsSection';
import ProjectGallerySection from '@/components/ProjectGallerySection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    document.title = 'MR DGN Constructions - Building Excellence Since 2020 | Nigeria';
  }, []);
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="mt-6 md:mt-8 lg:mt-12">
        <HeroSection />
      </div>
      <AboutUsSection />
      <ServicesOverviewSection />
      <ProductsSection />
      <ProjectGallerySection />
      <WhyChooseUsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
