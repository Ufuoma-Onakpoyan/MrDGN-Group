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
  const [scrolledPastProducts, setScrolledPastProducts] = useState(false);

  useEffect(() => {
    document.title = 'Building Materials & Construction in Asaba | MR DGN Constructions';
  }, []);

  useEffect(() => {
    sessionStorage.removeItem(PROMO_POPUP_SESSION_KEY);
    const timer = setTimeout(() => {
      setPromoPopupOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  /* iOS Safari: apply below-fold compositing layer after first paint so content is not clipped */
  useEffect(() => {
    const t = setTimeout(() => setScrolledPastProducts(true), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.min(600, window.innerHeight * 0.6);
      if (window.scrollY >= threshold) setScrolledPastProducts(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClosePromoPopup = () => {
    setPromoPopupOpen(false);
    sessionStorage.setItem(PROMO_POPUP_SESSION_KEY, '1');
  };

  return (
    <div className="min-h-screen min-w-0 bg-background relative z-0 isolate">
      <Navigation />
      <PromoBanner />
      <PromoPopup isOpen={promoPopupOpen} onClose={handleClosePromoPopup} />
      <HeroSection />
      <AboutUsSection />
      <ServicesOverviewSection />
      <ProductsSection />
      {/* iOS Safari: apply compositing layer when user scrolls to force below-fold paint */}
      <div className={scrolledPastProducts ? 'section-ios-paint' : 'section-ios-paint-placeholder'}>
        <ProjectGallerySection />
        <WhyChooseUsSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
