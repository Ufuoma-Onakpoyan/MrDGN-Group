import * as React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import NewsletterModal from './NewsletterModal';

const Footer = () => {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { label: 'High-Rise Construction', href: '/our-services/high-rise-construction' },
      { label: 'Infrastructure Development', href: '/our-services/infrastructure-development' },
      { label: 'Residential Projects', href: '/our-services/residential-projects' },
      { label: 'Commercial Buildings', href: '/our-services/commercial-buildings' },
    ],
    company: [
      { label: 'About Us', href: '/about-us' },
      { label: 'Our Work', href: '/projects' },
      { label: 'Process', href: '/process' },
      { label: 'Careers', href: '/career' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
    quickLinks: [
      { label: 'Projects', href: '/projects' },
      { label: 'Products', href: '/products' },
      { label: 'Blog', href: '/blog' },
      { label: 'Testimonials', href: '/testimonials' },
      { label: 'FAQ', href: '/faq' },
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/p/Mr-DGN-Construction-and-Developers-Limited-100076096784485/', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/mrdgn_constructions', label: 'Instagram' },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src="/assets/logo-construction.png" alt="MrDGN Construction" className="h-12 md:h-14 w-auto object-contain drop-shadow-md" style={{ minHeight: '48px', maxHeight: '56px' }} />
            </div>
            <p className="text-secondary-foreground/80 mb-6">
              Building excellence across Nigeria since 2020. Your trusted partner for all construction needs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+2348135324467" className="hover:underline">+234 813 532 4467</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>construction@mrdgngroup.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <a href="https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu" target="_blank" rel="noopener noreferrer" className="hover:underline">Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state</a>
              </div>
              <div className="flex items-center gap-2">
                <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link 
                      to={link.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links (Projects, Products, Blog, FAQ) */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('/') ? (
                    <Link 
                      to={link.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-secondary-foreground/80 hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className="font-medium mb-2">Newsletter</h4>
              <p className="text-sm text-secondary-foreground/80 mb-3">
                Get project updates and construction tips
              </p>
              <Button 
                className="btn-construction w-full" 
                size="sm"
                onClick={() => setIsNewsletterModalOpen(true)}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-secondary-foreground/80">
              © {currentYear} MR DGN Constructions. All rights reserved.
            </div>

            {/* Social Links & WhatsApp */}
            <div className="flex items-center gap-4 flex-wrap">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5 text-primary" />
                  </a>
                );
              })}
              <a
                href="https://wa.me/2348135324467"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
              >
                WhatsApp +234 813 532 4467
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
              <Link to="/privacy-policy" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-secondary-foreground/80 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <NewsletterModal 
        isOpen={isNewsletterModalOpen} 
        onClose={() => setIsNewsletterModalOpen(false)} 
      />
    </footer>
  );
};

export default Footer;