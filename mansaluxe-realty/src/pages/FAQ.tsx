import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I resell my property after purchase?",
    answer: "Yes. You can resell your property at any time. We also help clients facilitate the resale process to make it as seamless as possible, including marketing and connecting you with qualified buyers.",
  },
  {
    question: "Are there payment plans available?",
    answer: "Yes. Many of our properties offer flexible payment plans spanning 3 to 24 months. You can make an initial deposit and spread the remaining balance across monthly installments. Contact us for details on specific properties.",
  },
  {
    question: "Do you offer mortgage options?",
    answer: "We can help you explore mortgage facilities through our partnerships with financial institutions, including the Nigerian Mortgage Refinance Corporation (NMRC). Contact our team for personalised guidance on your eligibility and options.",
  },
  {
    question: "How do I make payments?",
    answer: "All payments are made directly to designated developer or escrow accounts. We do not accept cash transactions or collect payments from clients. Contact us for secure payment instructions and bank details for your chosen property.",
  },
  {
    question: "What documents do I receive after an initial deposit?",
    answer: "After your initial deposit, you will receive an acknowledgment letter, payment receipt, and contract of sale. Full documentation (including title documents where applicable) is provided upon completion of payment.",
  },
  {
    question: "Do you accept cash payments?",
    answer: "No. For security and transparency, we do not accept cash. All transactions are processed through bank transfers or other traceable methods directly to developer or company accounts.",
  },
  {
    question: "What areas do you cover in Nigeria?",
    answer: "We specialise in luxury properties across Nigeria's prime locations, including Lagos (Victoria Island, Ikoyi, Lekki, Ajah), Abuja, Port Harcourt, Asaba, and other major cities. New developments are added regularly.",
  },
  {
    question: "What is the difference between off-plan and ready-to-move-in properties?",
    answer: "Off-plan properties are purchased during construction, often at a lower price with flexible payment plans. Ready-to-move-in properties are completed and available for immediate occupancy. Both have distinct benefits depending on your timeline and investment goals.",
  },
  {
    question: "How do I schedule a property viewing?",
    answer: "You can schedule a viewing by contacting us via phone (+234 813 532 4467), WhatsApp, or the contact form on our website. We'll arrange a convenient time and provide you with our agent's details for the visit.",
  },
  {
    question: "What fees are involved when buying a property?",
    answer: "Fees typically include legal fees, survey fees, stamp duty, and registration costs. The exact amount depends on the property value and location. We provide a detailed breakdown before you proceed and can guide you through each step.",
  },
  {
    question: "How long does the property purchase process take?",
    answer: "The timeline varies. For cash purchases with clear title, it can take 4–8 weeks. Payment plan purchases follow the agreed schedule. Factors such as documentation, searches, and government processing can affect the duration. We keep you informed at each stage.",
  },
  {
    question: "Do you assist with property valuation?",
    answer: "Yes. We offer professional property valuation services for buyers, sellers, and investors. Our valuations consider location, market trends, comparable sales, and property condition to provide accurate estimates.",
  },
  {
    question: "Can foreign buyers purchase property in Nigeria?",
    answer: "Yes. Foreign nationals can purchase property in Nigeria. The process involves additional documentation and may require approval from relevant authorities. We guide international clients through the legal and procedural requirements.",
  },
  {
    question: "What is a Certificate of Occupancy (C of O)?",
    answer: "A Certificate of Occupancy is a legal document issued by state governments granting land ownership or leasehold rights. It is a key document for property ownership in Nigeria and is typically required for financing and resale.",
  },
  {
    question: "Do you handle property management?",
    answer: "Yes. We offer property management services for landlords and investors, including tenant placement, rent collection, maintenance coordination, and periodic inspections. Contact us for tailored management packages.",
  },
  {
    question: "What should I look for when buying luxury real estate?",
    answer: "Consider location, build quality, amenities, security, resale potential, and title documentation. Our agents help you evaluate these factors and provide market insights to support your decision.",
  },
  {
    question: "Can I purchase property as an investment?",
    answer: "Absolutely. Many of our clients invest in luxury real estate for rental income or capital appreciation. We offer investment advisory services and can recommend properties based on your goals, budget, and risk tolerance.",
  },
  {
    question: "Do you offer property inspection services?",
    answer: "Yes. We recommend professional inspections before purchase. We can arrange structural and technical inspections to identify any issues and ensure you make an informed decision.",
  },
  {
    question: "What happens if I change my mind after paying a deposit?",
    answer: "Our refund policy depends on the specific property and contract terms. It is important to review the agreement before signing. We encourage open communication—contact us to discuss your situation and explore available options.",
  },
  {
    question: "How do I list my property for sale with you?",
    answer: "Contact us via phone, email, or our contact form. Our team will arrange a valuation, discuss your expectations, and outline our marketing plan. We handle listing, viewings, negotiations, and documentation to ensure a smooth sale.",
  },
  {
    question: "What is your commission structure?",
    answer: "Our fees are competitive and transparent, varying by service (sales, lettings, management). We discuss our structure during our initial consultation. There are no hidden charges.",
  },
  {
    question: "Do you offer virtual tours?",
    answer: "Yes. Many of our properties include photo galleries and video tours on our website. For properties with video walkthroughs or drone footage, you can explore them remotely before scheduling an in-person viewing.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Button variant="ghost" asChild className="mb-8">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Frequently Asked <span className="text-gold-gradient">Questions</span>
        </h1>
        <p className="text-muted-foreground mb-12">
          Find answers to common questions about buying, selling, and investing in luxury real estate with Mansa Luxe Realty Limited.
        </p>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="luxury-card px-6 rounded-xl border-border/30 data-[state=open]:border-primary/20"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 luxury-card rounded-xl text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? Our team is here to help.
          </p>
          <Button asChild variant="outline" className="btn-outline-luxury">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
