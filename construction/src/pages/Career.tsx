import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CareerSection from '@/components/CareerSection';
const Career = () => {
  useEffect(() => {
    document.title = 'Careers - MR DGN Constructions';
  }, []);
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      

      <CareerSection />
      <Footer />
    </div>;
};
export default Career;