import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ServicesSection from '@/components/ServicesSection';
const OurServices = () => {
  useEffect(() => {
    document.title = 'Our Services - MR DGN Constructions';
  }, []);
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      

      <ServicesSection />
      <Footer />
    </div>;
};
export default OurServices;