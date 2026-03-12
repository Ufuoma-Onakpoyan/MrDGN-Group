import React from 'react';
import { MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '2348135324467';
const PROMO_MESSAGE = "Hi, I'm interested in the offer: Buy 10,000 cement blocks, get 30 free. Free delivery only within Asaba and Okpanam. Please send me a quote.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PROMO_MESSAGE)}`;

const PromoBanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-b border-primary-foreground/20 pt-16">
      <div className="container mx-auto px-3 py-2 sm:py-2.5">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
          <p className="text-base md:text-lg font-bold shrink-0">
            Buy 10,000 Cement Blocks – Get 30 Free. Free Delivery Only Within Asaba & Okpanam
          </p>
          <div className="flex items-center justify-center gap-2 shrink-0">
            <Button
              asChild
              size="sm"
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-md border-0 h-8 px-3 text-sm"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4 shrink-0" />
                Order Blocks Now
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-white/95 text-primary hover:bg-white font-semibold shadow-md border-0 h-8 px-3 text-sm"
            >
              <Link to="/contact-us#contact" className="text-primary">
                <FileText className="mr-1.5 h-4 w-4 shrink-0" />
                Request Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
