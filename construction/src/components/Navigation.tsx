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
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50 shadow-md">
      {/* Background only covers the header bar (h-16), never the main content */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gray-50 pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-between h-16">
          {/* Logo - light nav so dark logo text is bold and clear */}
          <Link to="/" className="flex items-center h-full py-1">
            <img 
              src="/assets/logo-construction.png" 
              alt="MrDGN Construction" 
              className="h-11 md:h-12 w-auto object-contain transition-all duration-300 hover:scale-105 drop-shadow-md"
              style={{ minHeight: '44px', maxHeight: '48px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link key={item.label} to={item.href} className={`text-black hover:text-primary transition-colors duration-300 font-medium whitespace-nowrap ${location.pathname === item.href ? 'text-primary' : ''}`}>
                {item.label}
              </Link>
            ))}
            <Button asChild className="btn-construction">
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-black hover:text-primary">
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