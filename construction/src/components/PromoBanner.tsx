import React from 'react';
import { MessageCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WHATSAPP_NUMBER = '2348135324467';
const PROMO_MESSAGE = "Hi, I'm interested in the offer: Buy 10,000 cement blocks, get 30 free with free delivery in Asaba. Please send me a quote.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PROMO_MESSAGE)}`;

const PromoBanner = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-b border-primary-foreground/20 pt-16">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
          <p className="text-lg md:text-xl font-bold shrink-0">
            Buy 10,000 Cement Blocks – Get 30 Blocks Free + Free Delivery in Asaba
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-semibold shadow-md"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Order Blocks Now
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/contact-us#contact">
                <FileText className="mr-2 h-4 w-4" />
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
