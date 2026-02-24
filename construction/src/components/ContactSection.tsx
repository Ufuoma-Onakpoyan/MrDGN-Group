import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ChevronDown, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import MapComponent from './MapComponent';

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+234 813 532 4467',
      description: 'Call us for immediate assistance',
      href: 'tel:+2348135324467',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'construction@MrDGNGroup.com',
      description: 'Send us your project details',
      href: 'mailto:construction@MrDGNGroup.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: 'Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state',
      description: 'MR DGN Construction & Developers Ltd',
      href: 'https://www.google.com/maps/place/MR+DGN+Construction+%26+Developers+Ltd/@6.2339308,6.6315024,17z/data=!3m1!4b1!4m6!3m5!1s0x1043f131bd08a91f:0xc8d3b62056822334!8m2!3d6.2339308!4d6.6340773!16s%2Fg%2F11nm_wxdx4?entry=ttu',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon - Fri: 8:00 AM - 6:00 PM WAT',
      description: 'We\'re here when you need us'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const api = import.meta.env.VITE_API_URL;
      if (api) {
        await fetch(`${api}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'construction',
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            metadata: { projectType: formData.projectType },
          }),
        });
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your construction project? Contact us today for a consultation and free estimate.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div 
                    key={info.title}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{info.title}</h4>
                      {info.href ? (
                        <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-foreground mb-1 block hover:text-primary hover:underline">
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-foreground mb-1">{info.content}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Map */}
            <div className="mt-8">
              <MapComponent 
                latitude={6.2339308} 
                longitude={6.6340773}
                companyName="MR DGN Construction & Developers Ltd"
                address="Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state"
              />
            </div>
            <div className="mt-4">
              <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Message us on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us A Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="+234">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+234">🇳🇬 +234</SelectItem>
                            <SelectItem value="+1">🇺🇸 +1</SelectItem>
                            <SelectItem value="+44">🇬🇧 +44</SelectItem>
                            <SelectItem value="+233">🇬🇭 +233</SelectItem>
                            <SelectItem value="+27">🇿🇦 +27</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="8XX XXXX XXX" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select onValueChange={(value) => setFormData(prev => ({ ...prev, projectType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">🏠 Residential Construction</SelectItem>
                        <SelectItem value="commercial">🏢 Commercial Building</SelectItem>
                        <SelectItem value="infrastructure">🛣️ Infrastructure & Roads</SelectItem>
                        <SelectItem value="renovation">🔨 Renovation & Remodeling</SelectItem>
                        <SelectItem value="consultation">💼 Design Consultation</SelectItem>
                        <SelectItem value="other">📋 Other (Please specify in message)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project..."
                      className="min-h-32"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-construction w-full group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Emergency Construction Services</h3>
          <p className="text-primary-foreground/90 mb-4">
            Available 24/7 for urgent construction and safety issues across Nigeria
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href="tel:+2348135324467">Call: +234 813 532 4467</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
              <a href="https://wa.me/2348135324467" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;