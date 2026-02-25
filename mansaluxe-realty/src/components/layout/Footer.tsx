import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const API_BASE = import.meta.env.VITE_API_URL || '';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'mansaluxe-realty', email: email.trim(), name: name.trim() || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('success');
        setEmail('');
        setName('');
        setMessage(data.message || 'Thank you for subscribing!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Failed to subscribe. Try again.');
    }
  };
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img 
                src="/assets/logo-mansaluxe.png" 
                alt="Mansa Luxe Realty Limited"
                className="h-11 md:h-12 w-auto object-contain drop-shadow-md"
                style={{ minHeight: '44px', maxHeight: '48px' }}
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Nigeria's premier luxury real estate company, delivering exceptional properties and unmatched service since 2020. Mansa Luxe Realty Limited is a subsidiary of MrDGN Group.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://www.instagram.com/mansaluxerealty" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/p/Mr-DGN-Construction-and-Developers-Limited-100076096784485/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                WhatsApp +234 813 532 4467
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-foreground font-serif font-semibold text-lg">Quick Links</h3>
            <nav className="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-2" aria-label="Footer navigation">
              <Link to="/properties" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Properties
              </Link>
              <Link to="/buying" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Buying with us
              </Link>
              <Link to="/selling" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Selling with us
              </Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Services
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Blog & Lifestyle
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                About Us
              </Link>
              <Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Careers
              </Link>
              <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Testimonials
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-foreground font-serif font-semibold text-lg">Services</h3>
            <div className="space-y-2">
              <p className="text-muted-foreground text-sm">Property Sales</p>
              <p className="text-muted-foreground text-sm">Property Management</p>
              <p className="text-muted-foreground text-sm">Investment Advisory</p>
              <p className="text-muted-foreground text-sm">Luxury Rentals</p>
              <p className="text-muted-foreground text-sm">Property Valuation</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-foreground font-serif font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-sm">
                    Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state
                  </p>
                  <a href="https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs">
                    Get directions
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+2348135324467" className="text-muted-foreground text-sm hover:text-primary">+234 813 532 4467</a>
              </div>
              <div className="flex items-center space-x-3">
                <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground text-sm">MansaLuxeRealty@mrdgngroup.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="max-w-md">
            <h3 className="text-foreground font-serif font-semibold text-lg mb-2">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-3">Get property updates and market insights.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
                disabled={status === 'loading'}
              />
              <Input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
                disabled={status === 'loading'}
              />
              <Button type="submit" size="sm" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
              {message && (
                <p className={`text-xs ${status === 'success' ? 'text-green-600' : 'text-destructive'}`}>{message}</p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-muted-foreground text-sm">
                © {currentYear} Mansa Luxe Realty Limited. All rights reserved.
              </p>
              <a href="https://mrdgngroup.com" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors" aria-label="MrDGN Group">
                <span className="text-xs">A subsidiary of MrDGN Group</span>
                <img 
                  src="/assets/logo-group.png" 
                  alt="MrDGN Group" 
                  className="h-5 md:h-6 w-auto object-contain"
                />
                <span className="text-primary text-xs hover:underline">mrdgngroup.com</span>
              </a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
