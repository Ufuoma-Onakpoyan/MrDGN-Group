import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqItems = [
  {
    question: 'What is MrDGN Group?',
    answer: 'MrDGN Group is a diversified holding company based in Nigeria with businesses across entertainment, construction, and real estate. We build and support companies that create lasting value for our stakeholders and communities.',
  },
  {
    question: 'What businesses does MrDGN Group own?',
    answer: 'Our portfolio includes MrDGN Entertainment (content and media), MrDGN Construction (construction and development), Mansa Luxe Realty Limited (real estate sales and advisory), and Duerents (property management and rental technology). Each operates with its own brand and team while benefiting from group resources and strategy.',
  },
  {
    question: 'Where is MrDGN Group headquartered?',
    answer: 'Our head office is in Asaba, Delta State, Nigeria. You can find our address, map, and contact details on our Contact Us page.',
  },
  {
    question: 'How can I contact MrDGN Group?',
    answer: 'You can reach us by email at Contact@mrdgngroup.com, by phone at +234 813 532 4467, or via WhatsApp. We also have a contact form on our Contact Us page. For media inquiries, use the details on our Media page.',
  },
  {
    question: 'Does MrDGN Group have job openings?',
    answer: 'Yes. We list current openings on our Careers page. You can browse roles across the group and apply from there. We also encourage you to follow us for future opportunities.',
  },
  {
    question: 'How can I work with or partner with MrDGN Group?',
    answer: 'We welcome serious inquiries from potential partners, clients, and investors. Please use our Contact form or email us with a brief description of your interest, and our team will respond.',
  },
  {
    question: 'Where can I find news and updates about MrDGN Group?',
    answer: 'Our Media page features the latest news, blog posts, and a company overview video. For press-specific requests, see the Press Inquiries section on the same page.',
  },
  {
    question: 'Is MrDGN Group involved in investor relations?',
    answer: 'Yes. We have a dedicated Investor Relations section that outlines our strategy, vision, and approach. Key reports and resources will be published there as they become available. For direct investor inquiries, please contact us through the Contact page.',
  },
  {
    question: 'What does MrDGN Entertainment do?',
    answer: (
      <>
        MrDGN Entertainment focuses on content creation, digital media, and entertainment experiences. This includes production, events, and brand partnerships. You can learn more and get in touch via their website at{' '}
        <a href="https://entertainment.mrdgngroup.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">entertainment.mrdgngroup.com</a>.
      </>
    ),
  },
  {
    question: 'What does MrDGN Construction offer?',
    answer: (
      <>
        MrDGN Construction delivers commercial and residential construction, infrastructure projects, and green building solutions. They combine quality execution with sustainable practices. Visit{' '}
        <a href="https://construction.mrdgngroup.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">construction.mrdgngroup.com</a> for more.
      </>
    ),
  },
  {
    question: 'What services does Mansa Luxe Realty Limited provide?',
    answer: (
      <>
        Mansa Luxe Realty Limited offers property sales, investment advisory, property management, and market analysis. They focus on connecting clients with the right properties and opportunities. See{' '}
        <a href="https://mansaluxerealty.mrdgngroup.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mansaluxerealty.mrdgngroup.com</a> for details.
      </>
    ),
  },
  {
    question: 'What is Duerents?',
    answer: (
      <>
        Duerents is our technology subsidiary focused on property management and rentals. They provide rental platforms, automated solutions, and tenant management tools. More information is available at{' '}
        <a href="https://duerents.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">duerents.com</a>.
      </>
    ),
  },
  {
    question: 'What are your business hours?',
    answer: 'Our head office is generally open Monday to Friday, 9AM–6PM (local time). Response times for email and contact form inquiries are typically within 24 hours on business days. For urgent matters, phone or WhatsApp may get a faster response.',
  },
  {
    question: 'Can I visit your office in person?',
    answer: 'Yes. We welcome scheduled visits to our head office in Asaba, Delta State. We recommend contacting us in advance so we can arrange a suitable time and ensure the right team is available to meet you.',
  },
  {
    question: 'Does MrDGN Group offer internships or graduate programs?',
    answer: 'Opportunities for interns and graduates are sometimes listed on our Careers page. We encourage you to check there regularly and to get in touch via the contact form if you would like to express your interest for future openings.',
  },
  {
    question: 'How do I submit a complaint or feedback?',
    answer: 'We take feedback seriously. Please send your complaint or feedback via our Contact form, or email Contact@mrdgngroup.com with the subject line clearly indicating whether it is a complaint or general feedback. We will acknowledge and respond as appropriate.',
  },
  {
    question: 'Where can I get logos or media assets for press?',
    answer: 'For official logos, imagery, or press kits, please contact our media team through the Press Inquiries section on our Media page. We can provide approved assets for editorial or partnership use.',
  },
  {
    question: 'Does MrDGN Group operate outside Nigeria?',
    answer: 'Yes. We operate in Nigeria and internationally. In Nigeria we focus on Asaba, Lagos, and Abuja. Outside Nigeria we have a presence in Dubai. We work anywhere our strategy and opportunities take us; for specific regions or partnerships, please contact us.',
  },
  {
    question: 'What are MrDGN Group’s core values?',
    answer: 'Our core values are Innovation, Vision, Collaboration, and Excellence. We push boundaries, see opportunity in challenges, build strong partnerships, and maintain high standards in everything we do. You can read more on our About Us page.',
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen page-transition">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 gradient-hero">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-6">
            <HelpCircle className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Quick answers to common questions about MrDGN Group, our businesses, and how to get in touch.
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border bg-card px-6 rounded-lg mb-4 tile-glassy">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="tile-glassy">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re happy to help. Reach out via our contact form, email, or phone.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                <LinkIcon className="w-4 h-4" />
                Go to Contact Us
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
