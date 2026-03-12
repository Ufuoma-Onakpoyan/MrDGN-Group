import React, { useEffect, useRef, useState } from 'react';
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
  const rootRef = useRef<HTMLDivElement>(null);

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

  // #region agent log
  useEffect(() => {
    const log = () => {
      const root = rootRef.current;
      const bodySh = document.body.scrollHeight;
      const docSh = document.documentElement.scrollHeight;
      const winH = window.innerHeight;
      fetch('http://127.0.0.1:7729/ingest/a34b21ca-c51d-4e94-a26f-273b68fd62c8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'361340'},body:JSON.stringify({sessionId:'361340',hypothesisId:'H1',location:'Index.tsx:mount',message:'Document dimensions on mount',data:{bodyScrollHeight:bodySh,docScrollHeight:docSh,innerHeight:winH,rootOffsetHeight:root?.offsetHeight},timestamp:Date.now()})}).catch(()=>{});
      fetch('http://127.0.0.1:7729/ingest/a34b21ca-c51d-4e94-a26f-273b68fd62c8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'361340'},body:JSON.stringify({sessionId:'361340',hypothesisId:'H2',location:'Index.tsx:mount',message:'Root wrapper dimensions',data:{rootOffsetHeight:root?.offsetHeight,rootScrollHeight:root?.scrollHeight},timestamp:Date.now()})}).catch(()=>{});
    };
    log();
    const t = setTimeout(log, 800);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    let tick = 0;
    const onScroll = () => {
      if (Date.now() - tick < 400) return;
      tick = Date.now();
      const el = document.querySelector('[data-section="project-gallery"]');
      const rect = el ? (el as HTMLElement).getBoundingClientRect() : null;
      const bodySh = document.body.scrollHeight;
      const docSh = document.documentElement.scrollHeight;
      fetch('http://127.0.0.1:7729/ingest/a34b21ca-c51d-4e94-a26f-273b68fd62c8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'361340'},body:JSON.stringify({sessionId:'361340',hypothesisId:'H1',location:'Index.tsx:scroll',message:'Scroll dimensions',data:{scrollY:window.scrollY,bodyScrollHeight:bodySh,docScrollHeight:docSh,innerHeight:window.innerHeight},timestamp:Date.now()})}).catch(()=>{});
      fetch('http://127.0.0.1:7729/ingest/a34b21ca-c51d-4e94-a26f-273b68fd62c8',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'361340'},body:JSON.stringify({sessionId:'361340',hypothesisId:'H5',location:'Index.tsx:scroll',message:'ProjectGallery in viewport',data:{projectGalleryTop:rect?.top,projectGalleryHeight:rect?.height,scrollY:window.scrollY},timestamp:Date.now()})}).catch(()=>{});
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // #endregion

  const handleClosePromoPopup = () => {
    setPromoPopupOpen(false);
    sessionStorage.setItem(PROMO_POPUP_SESSION_KEY, '1');
  };

  return (
    <div ref={rootRef} className="min-h-screen overflow-x-hidden min-w-0 bg-background">
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
