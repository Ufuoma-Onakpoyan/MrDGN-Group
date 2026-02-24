import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = [
      { id: 'hero', selector: '.hero-section' },
      { id: 'snippets', selector: '.snippets-section' },
      { id: 'businesses', selector: '.businesses-section' },
      { id: 'contact', selector: '.contact-section' },
      { id: 'cta', selector: '.cta-section' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section') || 'hero';
          setCurrentSection(sectionId);
        }
      });
    }, observerOptions);

    sections.forEach(({ id, selector }) => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute('data-section', id);
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const navLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Our Businesses', path: '/businesses' },
    { name: 'Investors', path: '/investors' },
    { name: 'Media', path: '/media' },
    { name: 'Careers', path: '/careers' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const handleNavClick = () => {
    window.scrollTo(0, 0);
  };

  const getNavbarStyle = () => {
    if (location.pathname !== '/') {
      return 'text-black';
    }

    switch (currentSection) {
      case 'hero':
        return 'text-black';
      case 'snippets':
        return 'text-white';
      case 'businesses':
        return 'text-black'; // Fixed: businesses section has white background
      case 'contact':
        return 'text-white'; // Fixed: contact section has dark background
      case 'cta':
        return 'text-white';
      default:
        return 'text-black';
    }
  };

  const navStyle = getNavbarStyle();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navStyle} backdrop-blur-md shadow-lg border-b border-white/20 ${location.pathname !== '/' ? 'bg-white' : 'bg-white/90'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo - light bg ensures dark logo text is readable */}
          <Link to="/" onClick={handleNavClick} className="flex items-center space-x-3 group rounded-md px-1 -mx-1">
            <img 
              src="/assets/logo-group.png" 
              alt="MrDGN Group Logo" 
              className="h-12 md:h-14 w-auto object-contain object-left transition-all duration-300 group-hover:scale-105 drop-shadow-md"
              style={{ minHeight: '48px', maxHeight: '56px' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.filter((link) => link.path !== '/contact').map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleNavClick}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 drop-shadow-lg ${
                  location.pathname === link.path ? 'text-primary' : ''
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'hover:w-full'
                }`} />
              </Link>
            ))}
            <Link to="/contact" onClick={handleNavClick}>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-full px-5"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="drop-shadow-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background shadow-lg border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.filter((link) => link.path !== '/contact').map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick();
                }}
                className={`block px-3 py-2 text-base font-medium transition-all duration-300 hover:text-primary hover:bg-muted ${
                  location.pathname === link.path ? 'text-primary bg-muted' : 'text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => {
                setIsOpen(false);
                handleNavClick();
              }}
              className="block px-3 py-3 mt-3"
            >
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;