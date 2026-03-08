import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navItems = [{
    label: 'About Us',
    href: '/about-us'
  }, {
    label: 'Our Services',
    href: '/our-services'
  }, {
    label: 'Products',
    href: '/products'
  }, {
    label: 'Career',
    href: '/career'
  }, {
    label: 'Blog',
    href: '/blog'
  }, {
    label: 'Projects',
    href: '/projects'
  }, {
    label: 'Process',
    href: '/process'
  }, {
    label: 'Testimonials',
    href: '/testimonials'
  }];
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50/95 backdrop-blur-sm shadow-sm border-b border-border/50">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gray-50/95 pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 gap-4">
          {/* Logo - left-aligned */}
          <Link to="/" className="flex items-center h-full py-1 justify-self-start" aria-label="MR DGN Constructions - Home">
            <img 
              src="/assets/logo-construction.png" 
              alt="MR DGN Construction and Developers Limited" 
              width="160"
              height="48"
              loading="eager"
              fetchPriority="high"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
              style={{ minHeight: '40px', maxHeight: '48px' }}
            />
          </Link>

          {/* Desktop Navigation - centered */}
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8">
            {navItems.map(item => (
              <Link 
                key={item.label} 
                to={item.href} 
                className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 ${location.pathname === item.href ? 'text-primary' : 'text-foreground/90 hover:text-primary'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA on desktop, menu button on mobile */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden md:block">
              <Button asChild size="sm" className="btn-construction rounded-md">
                <Link to="/contact-us">Contact Us</Link>
              </Button>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground hover:text-primary min-w-[44px] min-h-[44px]" aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && <div className="md:hidden bg-gray-50 border-t border-border relative z-10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(item => <Link key={item.label} to={item.href} className={`block px-3 py-2 text-black hover:text-primary transition-colors duration-300 whitespace-nowrap ${location.pathname === item.href ? 'text-primary' : ''}`} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>)}
              <div className="px-3 py-2">
                <Button asChild className="btn-construction w-full">
                  <Link to="/contact-us">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;