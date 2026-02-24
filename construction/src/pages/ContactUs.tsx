import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
const ContactUs = () => {
  useEffect(() => {
    document.title = 'Contact Us - MR DGN Constructions';
  }, []);
  return <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      

      <ContactSection />
      <Footer />
    </div>;
};
export default ContactUs;