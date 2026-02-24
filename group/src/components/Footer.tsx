import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail } from "lucide-react";
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
        body: JSON.stringify({ source: 'group', email: email.trim(), name: name.trim() || undefined }),
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
  const businesses = [
    { name: "MrDGN Entertainment", logo: "/assets/logo-entertainment.png", url: "https://entertainment.mrdgngroup.com/" },
    { name: "MrDGN Construction", logo: "/assets/logo-construction.png", url: "https://construction.mrdgngroup.com/" },
    { name: "Mansa Luxe Realty Limited", logo: "/assets/logo-mansaluxe.png", url: "https://mansaluxerealty.mrdgngroup.com/" },
    { name: "DueRent", logo: "/assets/duerent-logo.png", url: "https://duerents.com/" }
  ];

  return (
    <footer className="bg-muted text-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/assets/logo-group.png" 
                alt="MrDGN Group Logo" 
                className="h-12 md:h-14 w-auto object-contain drop-shadow-md"
                style={{ minHeight: '48px', maxHeight: '56px' }}
              />
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              A modern holding company building the future across entertainment, construction, and real estate industries.
            </p>
            <p className="text-muted-foreground text-sm">
              Head Office: Jossie Excel School, After Okpanam City Gate by the Express, Asaba, Delta State · <a href="tel:+2348135324467" className="hover:text-foreground">+234 813 532 4467</a> · <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">WhatsApp</a>
            </p>
            <div className="flex items-center gap-3 mt-4">
              <span className="text-muted-foreground text-sm">Follow us:</span>
              <a href="https://www.instagram.com/mrdgngroup" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/p/Mr-DGN-Construction-and-Developers-Limited-100076096784485/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors text-sm">WhatsApp</a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Our Businesses</h4>
            <ul className="space-y-3">
              {businesses.map((business) => (
                <li key={business.name} className="flex items-center space-x-3">
                  <img 
                    src={business.logo} 
                    alt={`${business.name} Logo`}
                    className="h-9 w-9 object-contain flex-shrink-0 drop-shadow-sm"
                  />
                  <a 
                    href={business.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {business.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link 
                  to="/about" 
                  className="hover:text-foreground transition-colors" 
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/businesses" 
                  className="hover:text-foreground transition-colors" 
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Our Businesses
                </Link>
              </li>
              <li>
                <Link 
                  to="/investors" 
                  className="hover:text-foreground transition-colors" 
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link 
                  to="/media" 
                  className="hover:text-foreground transition-colors" 
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Media
                </Link>
              </li>
              <li>
                <Link 
                  to="/careers" 
                  className="hover:text-foreground transition-colors" 
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link 
                  to="/faq" 
                  className="hover:text-foreground transition-colors" 
                  onClick={() => window.scrollTo(0, 0)}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline-flex items-center font-semibold text-primary hover:text-primary/90 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-4 w-4" /> Newsletter
            </h4>
            <p className="text-muted-foreground text-sm mb-3">Stay updated with MrDGN Group news.</p>
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
              <Button type="submit" size="sm" className="w-full" disabled={status === 'loading'}>
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
              {message && (
                <p className={`text-xs ${status === 'success' ? 'text-green-600' : 'text-destructive'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
        <div className="border-t border-border pt-8 mt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} MrDGN Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
















