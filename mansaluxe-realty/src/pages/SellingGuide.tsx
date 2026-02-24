import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Megaphone, Handshake, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  { icon: BarChart3, title: "Valuation", description: "We provide a market-led valuation and recommend a selling strategy and price range." },
  { icon: Megaphone, title: "Marketing", description: "Your property is listed on our channels and presented to qualified buyers and investors." },
  { icon: Handshake, title: "Viewings & Offers", description: "We manage viewings and negotiate with serious buyers on your behalf." },
  { icon: KeyRound, title: "Exchange & Completion", description: "We work with your legal team to ensure a secure exchange and smooth completion." },
];

const faqs = [
  { q: "What does it cost to sell through you?", a: "Our fees are agreed with you before we begin. We typically work on a commission basis linked to the sale price. Contact us for a tailored quote." },
  { q: "How do you value my property?", a: "We use recent comparable sales, current demand, and condition to recommend a price. We can also arrange a formal valuation if required." },
  { q: "How long will it take to sell?", a: "It depends on the market and your price expectations. We give you an honest timeline and keep you updated on interest and viewings." },
  { q: "Do you handle legal work?", a: "We coordinate with your lawyer and the buyer’s team. We do not provide legal advice but ensure all parties are aligned for a smooth closing." },
];

const SellingGuide = () => {
  return (
    <div className="min-h-screen">
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Selling <span className="text-gold-gradient">with Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From valuation to completion, we make selling your luxury property straightforward and professional.
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
              <AccordionItem key={i} value={`sell-${i}`} className="border-border bg-card px-6 rounded-lg mb-4">
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
          <p className="text-muted-foreground mb-6">Ready to sell your property?</p>
          <Button asChild size="lg" className="btn-luxury">
            <Link to="/contact">Get a Valuation <ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellingGuide;
