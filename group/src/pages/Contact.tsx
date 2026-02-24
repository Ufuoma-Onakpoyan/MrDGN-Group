
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Map from '@/components/Map';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
const API_BASE = import.meta.env.VITE_API_URL || '';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (API_BASE) {
        const res = await fetch(`${API_BASE}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'group',
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            metadata: formData.company ? { company: formData.company } : undefined,
          }),
        });
        if (!res.ok) throw new Error('Failed to send');
      }
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });
      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'Contact@mrdgngroup.com',
      description: 'Send us an email anytime',
      href: 'mailto:Contact@mrdgngroup.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+234 813 532 4467',
      description: 'Direct line · Mon–Fri, 9AM–6PM',
      href: 'tel:+2348135324467',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Head Office, Asaba, Delta State, Nigeria',
      description: 'Get directions',
      href: 'https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu',
    },
  ];
  const whatsappUrl = 'https://wa.me/2348135324467';

  return (
    <div className="min-h-screen page-transition">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Contact Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Ready to explore opportunities together? Get in touch with our team and let's discuss how we can collaborate.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const content = (
                <>
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {info.title}
                  </h3>
                  <p className="text-lg font-medium text-primary mb-2">
                    {info.details}
                  </p>
                  <p className="text-muted-foreground">
                    {info.description}
                  </p>
                </>
              );
              return (
                <Card 
                  key={info.title} 
                  className="tile-glassy text-center animate-bounce-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    {info.href ? (
                      <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block hover:opacity-90 transition-opacity">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </CardContent>
                </Card>
              );
            })}
            <Card 
              className="tile-glassy text-center animate-bounce-in"
              style={{ animationDelay: '0.3s' }}
            >
              <CardContent className="p-8">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">WhatsApp</h3>
                  <p className="text-lg font-medium text-primary mb-2">+234 813 532 4467</p>
                  <p className="text-muted-foreground">Message us directly</p>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Send us a Message
            </h2>
            <p className="text-xl text-muted-foreground">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="shadow-2xl animate-slide-up tile-glassy">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="h-12"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="h-12"
                      placeholder="Your Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="h-12"
                      placeholder="How can we help?"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    placeholder="Tell us more about your inquiry or how we can help you..."
                  />
                </div>

                <div className="text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="px-8 py-3 button-hover hover-scale"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions. For more, see our full <Link to="/faq" className="text-primary hover:underline">FAQ page</Link>.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="contact-1" className="border-border bg-card px-6 rounded-lg mb-4 tile-glassy">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary">
                How can I reach MrDGN Group?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                You can email us at Contact@mrdgngroup.com, call +234 813 532 4467, use WhatsApp, or fill out the contact form on this page. We aim to respond within 24 hours on business days.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contact-2" className="border-border bg-card px-6 rounded-lg mb-4 tile-glassy">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary">
                Where is your head office?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our head office is in Asaba, Delta State, Nigeria. The map below shows the location; you can also open it in Google Maps for directions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="contact-3" className="border-border bg-card px-6 rounded-lg mb-4 tile-glassy">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary">
                I have a media or press inquiry. Who do I contact?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                For press and media inquiries, please visit our <Link to="/media" className="text-primary hover:underline">Media</Link> page for contact details and press information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Find Our Office
              </h2>
              <p className="text-xl text-muted-foreground">
                Head Office, Asaba, Delta State. Use the map below or <a href="https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">open in Google Maps</a> for directions.
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <Map />
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default Contact;
