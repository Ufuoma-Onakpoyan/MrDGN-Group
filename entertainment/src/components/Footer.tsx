import { Button } from "@/components/ui/button";
import { Mail, Phone, Youtube, Instagram, Twitter } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

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
        body: JSON.stringify({ source: 'entertainment', email: email.trim(), name: name.trim() || undefined }),
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

  const socialLinks = [
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Instagram, href: "https://www.instagram.com/mrdgn_entertainment", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" }
  ];

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/assets/logo-entertainment.png" 
                alt="MrDGN Entertainment" 
                className="h-11 md:h-12 w-auto object-contain drop-shadow-md"
                style={{ minHeight: '44px', maxHeight: '48px' }}
              />
            </div>
            <p className="text-secondary-foreground/80 mb-6 leading-relaxed max-w-md">
              Supporting Nigerian entertainment through event sponsorship. A subsidiary of MrDGN Group.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <a 
                  href="mailto:entertainment@mrdgngroup.com"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  entertainment@mrdgngroup.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <a 
                  href="tel:+2348135324467"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  +234 813 532 4467
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://wa.me/2348135324467"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <a 
                  href="https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">Newsletter</h4>
              <p className="text-secondary-foreground/80 text-sm mb-3">Get updates on new events and news.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background flex-1"
                  disabled={status === 'loading'}
                />
                <Button type="submit" size="sm" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </form>
              <Input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background mt-2 max-w-md"
                disabled={status === 'loading'}
              />
              {message && (
                <p className={`text-xs mt-2 ${status === 'success' ? 'text-green-400' : 'text-destructive'}`}>{message}</p>
              )}
            </div>
            <div className="flex flex-col justify-center">
            <div className="flex items-center flex-wrap gap-4">
              <span className="text-secondary-foreground/80 text-sm">Follow us:</span>
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="text-secondary-foreground/80 hover:text-primary hover:bg-primary/10"
                  asChild
                >
                  <a href={social.href} target={social.href.startsWith("http") ? "_blank" : undefined} rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined} aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
              <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer" className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm">
                WhatsApp +234 813 532 4467
              </a>
            </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mt-6">
            <div className="flex items-center space-x-2 text-sm text-secondary-foreground/60">
              <span>Part of</span>
              <img 
                src="/assets/logo-group.png" 
                alt="MrDGN Group" 
                className="h-5 w-auto object-contain opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-secondary-foreground/60 text-sm">
            © {currentYear} MrDGN Entertainment. All rights reserved. | A subsidiary of MrDGN Group
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;