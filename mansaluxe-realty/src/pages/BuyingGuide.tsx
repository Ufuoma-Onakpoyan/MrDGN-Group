import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Home, Search, FileCheck, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  { icon: Search, title: "Consultation", description: "Tell us your budget, preferred locations, and must-haves. We'll shortlist properties that match." },
  { icon: Home, title: "Viewings", description: "We arrange viewings at your convenience and provide detailed information on each property." },
  { icon: FileCheck, title: "Offer & Negotiation", description: "We guide you through making an offer and negotiating terms with the seller." },
  { icon: KeyRound, title: "Due Diligence & Closing", description: "We assist with legal checks, documentation, and a smooth handover." },
];

const faqs = [
  { q: "Do I need to pay to register my interest?", a: "No. Registering your interest or enquiring about properties is free. Our fees apply when you instruct us to act on your behalf in a purchase." },
  { q: "Can you help with financing?", a: "We can connect you with trusted mortgage and finance partners. We do not provide financial advice but can point you to experts who do." },
  { q: "How long does buying usually take?", a: "From offer to closing typically takes a few weeks to a few months, depending on the property, seller, and legal process. We keep you informed at every stage." },
  { q: "What areas do you cover?", a: "We focus on premium properties in Nigeria, including Lagos, Abuja, Asaba, and Port Harcourt. Enquire for specific locations." },
];

const BuyingGuide = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Buying <span className="text-gold-gradient">with Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A clear, stress-free path to your next luxury property. Here’s how we work with buyers.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Card key={i} className="luxury-card p-6 h-full">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-primary">Step {i + 1}</span>
                    <h3 className="text-xl font-serif font-semibold mt-2 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`buy-${i}`} className="border-border bg-card px-6 rounded-lg mb-4">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-6">Ready to find your next home?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-luxury">
              <Link to="/properties">Browse Properties <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="btn-outline-luxury">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuyingGuide;
