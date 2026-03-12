import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WHATSAPP_NUMBER = '2348135324467';
const PROMO_MESSAGE = "Hi, I'm interested in the offer: Buy 10,000 cement blocks, get 30 free. Free delivery only within Asaba and Okpanam. Please send me a quote.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PROMO_MESSAGE)}`;

interface PromoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoPopup = ({ isOpen, onClose }: PromoPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="overflow-auto">
          <img
            src="/assets/promo-blocks-offer.png"
            alt="MR DGN Constructions: Buy 10,000 Cement Blocks – Get 30 Free. Free Delivery within Asaba. Quality Blocks for Quality Homes."
            className="w-full h-auto object-contain"
          />
          <div className="p-6 pt-4 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Quality Blocks for Quality Homes. Free delivery only within Asaba & Okpanam. Limited-time offer – order now.
            </p>
            <Button
              asChild
              className="btn-construction w-full sm:w-auto"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Order Blocks Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
