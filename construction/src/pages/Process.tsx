import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MessageSquare, FileSearch, Calendar, Hammer, ClipboardCheck, Shield, Phone, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: '1. Consultation',
    description: 'We meet with you to understand your vision, budget, and timeline. Share your ideas, and we’ll advise on feasibility and scope.',
  },
  {
    icon: FileSearch,
    title: '2. Scope & Design',
    description: 'We define the full scope of work, prepare designs and specifications, and provide a clear proposal. No surprises—everything documented.',
  },
  {
    icon: Calendar,
    title: '3. Schedule & Mobilisation',
    description: 'We agree on a timeline, secure permits if needed, and mobilise our team and equipment. You’ll receive a project schedule and key milestones.',
  },
  {
    icon: Hammer,
    title: '4. Construction',
    description: 'Our team executes the work with quality materials and strict safety standards. We keep you updated on progress and manage changes professionally.',
  },
  {
    icon: ClipboardCheck,
    title: '5. Walkthrough & Handover',
    description: 'We conduct a final walkthrough with you, address any punch-list items, and hand over documentation, warranties, and care guidance.',
  },
  {
    icon: Shield,
    title: '6. Warranty & Support',
    description: 'We stand behind our work with warranty coverage as agreed. Post-handover support is available for any questions or service requests.',
  },
];

const policies = [
  {
    icon: Phone,
    title: 'Communication',
    description: 'A single point of contact for updates. Weekly progress reports and timely responses to your questions.',
  },
  {
    icon: Sparkles,
    title: 'Cleanliness',
    description: 'Site protection and daily cleanup. We leave your property tidy and minimise disruption to your surroundings.',
  },
];

const Process = () => {
  useEffect(() => {
    document.title = 'Our Process - MR DGN Constructions';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="text-primary">Process</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From consultation to handover—how we deliver your project on time, on budget, and to the highest standards.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">How We Work</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Card key={index} className="card-elevated">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <CardContent className="p-0 pt-2">
                          <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">What We Expect From Ourselves</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {policies.map((policy, index) => {
              const IconComponent = policy.icon;
              return (
                <Card key={index} className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="h-8 w-8 text-primary" />
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                    </div>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground">{policy.description}</p>
                    </CardContent>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 max-w-2xl mx-auto text-center text-muted-foreground text-sm">
            <p>
              <strong>Change orders:</strong> Any scope changes are documented, priced, and approved before work proceeds. We keep you informed and avoid surprises.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg text-muted-foreground mb-6">Ready to start your project?</p>
          <Button asChild size="lg" className="btn-construction">
            <Link to="/contact-us">Request a Quote</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Process;
