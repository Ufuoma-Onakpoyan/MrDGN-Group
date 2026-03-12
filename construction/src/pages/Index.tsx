import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import PromoBanner from '@/components/PromoBanner';
import PromoPopup from '@/components/PromoPopup';
import HeroSection from '@/components/HeroSection';
import AboutUsSection from '@/components/AboutUsSection';
import ServicesOverviewSection from '@/components/ServicesOverviewSection';
import ProductsSection from '@/components/ProductsSection';
import ProjectGallerySection from '@/components/ProjectGallerySection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const PROMO_POPUP_SESSION_KEY = 'construction_promo_popup_shown';

const Index = () => {
  const [promoPopupOpen, setPromoPopupOpen] = useState(false);

  useEffect(() => {
    document.title = 'Building Materials & Construction in Asaba | MR DGN Constructions';
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(PROMO_POPUP_SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setPromoPopupOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePromoPopup = () => {
    setPromoPopupOpen(false);
    sessionStorage.setItem(PROMO_POPUP_SESSION_KEY, '1');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <PromoBanner />
      <PromoPopup isOpen={promoPopupOpen} onClose={handleClosePromoPopup} />
      <HeroSection />
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
