import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'What types of construction projects does MR DGN Constructions handle?',
    a: 'We handle high-rise construction, infrastructure development, residential projects, commercial buildings, renovation and modernization, and project management. Our team of engineers, managers, and bricklayers delivers end-to-end solutions across Nigeria.',
  },
  {
    q: 'Where is MR DGN Constructions located?',
    a: 'Our head office is at Jossie Excel School, After okpanam City Gate by the express, Asaba, delta state. We serve clients across Nigeria and can be reached at +234 813 532 4467 or construction@mrdgngroup.com.',
  },
  {
    q: 'How long has MR DGN Constructions been in business?',
    a: 'MR DGN Constructions was founded in 2020. We have over 5 years of experience and have completed 10+ projects with a focus on quality and safety.',
  },
  {
    q: 'How can I request a quote for a construction project?',
    a: 'You can request a quote by visiting our Contact Us page, filling out the form, or reaching us via phone, email, or WhatsApp. We will review your requirements and provide a detailed proposal.',
  },
  {
    q: 'Do you offer free consultations?',
    a: 'Yes. We offer initial consultations to understand your project scope, timeline, and budget. Contact us to schedule a meeting at our office or on-site.',
  },
  {
    q: 'What safety standards do you follow?',
    a: 'We follow local and international safety standards, including safety training for our team, compliance audits, and risk management. Safety is a core part of our operations on every project.',
  },
  {
    q: 'Can you work on projects outside Delta State?',
    a: 'Yes. We undertake projects across Nigeria. Distance and logistics are factored into our planning and project management.',
  },
  {
    q: 'Do you provide project management services?',
    a: 'Yes. We offer end-to-end project management including timeline management, budget control, and quality assurance from planning to handover.',
  },
  {
    q: 'What materials do you use for construction?',
    a: 'We use quality-assured materials from trusted suppliers. We can incorporate sustainable and energy-efficient materials based on your requirements and budget.',
  },
  {
    q: 'How do you ensure quality on projects?',
    a: 'We have strict quality control processes, experienced site supervisors, and regular inspections. We also work with certified engineers and adhere to agreed specifications.',
  },
  {
    q: 'Do you handle renovation and modernization?',
    a: 'Yes. Our renovation and modernization services include modern technology integration, energy upgrades, and accessibility improvements for existing structures.',
  },
  {
    q: 'How can I view your past projects?',
    a: 'You can browse our Projects page on this website for a gallery of completed and ongoing work. For specific case studies or site visits, contact us.',
  },
  {
    q: 'Do you sell construction materials or products?',
    a: 'Yes. We offer a range of construction products. Visit our Products page for details, or contact us for bespoke requirements.',
  },
  {
    q: 'Are you hiring? How do I apply for a job?',
    a: 'We regularly look for skilled engineers, managers, and tradespeople. Visit our Career page for current openings and application instructions.',
  },
  {
    q: 'What is your typical project timeline?',
    a: 'Timelines depend on project size and scope. We provide a detailed schedule in our proposal and keep you updated on progress. We aim for on-time delivery on all projects.',
  },
  {
    q: 'Do you work with architects and designers?',
    a: 'Yes. We collaborate with architects and designers. We can work from your plans or help coordinate design and build for a seamless outcome.',
  },
  {
    q: 'How do you handle project payments?',
    a: 'Payment terms are agreed in the contract, often in stages (e.g., mobilization, milestones, completion). We provide clear invoices and accept various payment methods as agreed.',
  },
  {
    q: 'Do you offer warranties on your work?',
    a: 'Yes. We stand behind our work and provide warranties as per our contract. Specific terms are discussed before project start.',
  },
  {
    q: 'How can I stay updated on MR DGN news and projects?',
    a: 'Subscribe to our newsletter via the footer or the newsletter modal on the website. We also share updates on our blog and social media (Facebook and Instagram).',
  },
  {
    q: 'Who do I contact for emergencies or urgent inquiries?',
    a: 'For urgent matters, call +234 813 532 4467 or message us on WhatsApp. We will respond as quickly as possible.',
  },
  {
    q: 'Do you undertake government or large-scale infrastructure projects?',
    a: 'Yes. We have experience in infrastructure development including roads, bridges, and public facilities. Contact us with your project details for a discussion.',
  },
];

const FAQ = () => {
  useEffect(() => {
    document.title = 'FAQ - MR DGN Constructions';
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Find answers to common questions about our construction services, processes, and company.
            </p>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
