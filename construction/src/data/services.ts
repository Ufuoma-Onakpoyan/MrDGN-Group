import { Building2, Construction, Hammer, Shield, Users, Zap, Building } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ServiceData {
  slug: string;
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  timeline: string;
  materials?: string;
  faqs: { q: string; a: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: 'high-rise-construction',
    title: 'High-Rise Construction',
    icon: Building2,
    description: 'Specialized in constructing tall buildings with advanced engineering and safety protocols. We handle multi-storey residential and commercial towers with structural integrity and compliance at the core.',
    features: ['Structural Engineering', 'Safety Management', 'Quality Control', 'Foundation & Core Work', 'MEP Coordination'],
    timeline: 'Typically 12–36 months depending on scope and scale.',
    materials: 'Reinforced concrete, steel frames, high-performance facades, and fire-resistant materials per local codes.',
    faqs: [
      { q: 'What height range do you handle?', a: 'We handle buildings from 5 storeys to high-rise towers. Each project is assessed for feasibility, permits, and structural requirements.' },
      { q: 'Do you manage permits and approvals?', a: 'Yes. We coordinate with relevant authorities for approvals and ensure compliance with building codes and regulations.' },
      { q: 'What safety standards do you follow?', a: 'We follow local and international safety standards including site safety plans, protective equipment, and regular audits.' },
    ],
  },
  {
    slug: 'infrastructure-development',
    title: 'Infrastructure Development',
    icon: Construction,
    description: 'Large-scale infrastructure projects including bridges, roads, drainage, and public facilities. We deliver projects that serve communities for decades.',
    features: ['Project Management', 'Heavy Equipment', 'Timeline Optimization', 'Drainage & Earthworks', 'Public Facility Construction'],
    timeline: '3–24 months depending on project type and scope.',
    materials: 'Reinforced concrete, asphalt, aggregates, and durable materials suited for infrastructure applications.',
    faqs: [
      { q: 'What types of infrastructure do you build?', a: 'Roads, bridges, drainage systems, water supply works, and public buildings such as schools and health centres.' },
      { q: 'Can you work with government agencies?', a: 'Yes. We have experience working with public sector clients and meeting their procurement and reporting requirements.' },
      { q: 'How do you handle environmental impact?', a: 'We assess environmental impact, follow regulations, and implement mitigation measures where required.' },
    ],
  },
  {
    slug: 'residential-projects',
    title: 'Residential Projects',
    icon: Hammer,
    description: 'Custom homes and residential complexes built with attention to detail and quality. We create living spaces that are durable, comfortable, and suited to your lifestyle.',
    features: ['Custom Design', 'Sustainable Materials', 'Energy Efficiency', 'Interior Finishes', 'Landscaping Coordination'],
    timeline: '6–18 months for single homes; 12–36 months for multi-unit residential.',
    materials: 'Quality blocks, cement, roofing, flooring, and finishes. We can incorporate sustainable and energy-efficient options.',
    faqs: [
      { q: 'Do you work with architects and designers?', a: 'Yes. We collaborate with architects and designers or can recommend partners for design and interior work.' },
      { q: 'Can you build on my land?', a: 'Yes. We assess the site, soil, and access before starting and advise on any special requirements.' },
      { q: 'What warranty do you offer?', a: 'We provide warranty coverage as per our contract. Terms are discussed and documented before construction begins.' },
    ],
  },
  {
    slug: 'commercial-buildings',
    title: 'Commercial Buildings',
    icon: Building,
    description: 'Office buildings, retail spaces, and commercial complexes built to industry standards. We deliver spaces that support your business needs and brand.',
    features: ['Office Fit-outs', 'Retail Construction', 'MEP Systems', 'Facade & Branding', 'Turnkey Delivery'],
    timeline: '8–24 months depending on size and complexity.',
    materials: 'Durable commercial-grade materials, efficient MEP systems, and finishes suitable for commercial use.',
    faqs: [
      { q: 'Do you handle fit-outs and interiors?', a: 'Yes. We can deliver shell-and-core or full turnkey including fit-outs, MEP, and finishing.' },
      { q: 'Can you work to tight deadlines?', a: 'We plan schedules upfront and aim for on-time delivery. Critical path items are prioritised to meet milestones.' },
      { q: 'Do you offer maintenance after handover?', a: 'We can discuss maintenance and facilities management options as part of our service offering.' },
    ],
  },
  {
    slug: 'safety-compliance',
    title: 'Safety & Compliance',
    icon: Shield,
    description: 'Comprehensive safety programs ensuring all projects meet regulatory standards. We train our team, conduct audits, and maintain a strong safety culture.',
    features: ['Safety Training', 'Compliance Audits', 'Risk Management', 'Site Safety Plans', 'Incident Reporting'],
    timeline: 'Ongoing support throughout project lifecycles.',
    faqs: [
      { q: 'What certifications do you hold?', a: 'Our team includes certified safety officers and we adhere to local construction safety regulations.' },
      { q: 'Do you provide safety documentation?', a: 'Yes. We maintain safety plans, risk assessments, and audit records for each project.' },
      { q: 'How do you handle subcontractors?', a: 'We ensure all subcontractors follow our safety standards and are briefed before work begins.' },
    ],
  },
  {
    slug: 'project-management',
    title: 'Project Management',
    icon: Users,
    description: 'End-to-end project management from planning to completion and handover. We coordinate timelines, budgets, and quality to deliver projects successfully.',
    features: ['Timeline Management', 'Budget Control', 'Quality Assurance', 'Stakeholder Communication', 'Handover Documentation'],
    timeline: 'Varies by project; we align with your milestones and contractual obligations.',
    faqs: [
      { q: 'What is your project management approach?', a: 'We use structured planning, regular progress reviews, and clear communication to keep projects on track.' },
      { q: 'How often will I receive updates?', a: 'Typically weekly progress reports. Frequency can be adjusted based on project phase and client preference.' },
      { q: 'Do you handle change orders?', a: 'Yes. Changes are documented, priced, and approved before work proceeds to avoid surprises.' },
    ],
  },
  {
    slug: 'renovation-modernization',
    title: 'Renovation & Modernization',
    icon: Zap,
    description: 'Updating and modernizing existing structures with contemporary standards. We transform older buildings into functional, efficient spaces.',
    features: ['Modern Technology', 'Energy Upgrades', 'Accessibility Improvements', 'Structural Repairs', 'Cosmetic Upgrades'],
    timeline: '2–12 months depending on scope.',
    materials: 'Modern finishes, energy-efficient systems, and materials compatible with existing structures.',
    faqs: [
      { q: 'Can you work on occupied buildings?', a: 'Yes. We plan phasing and logistics to minimise disruption to occupants where possible.' },
      { q: 'Do you assess existing structures?', a: 'Yes. We conduct assessments before renovation to identify structural and MEP conditions.' },
      { q: 'What energy upgrades can you do?', a: 'We can integrate energy-efficient lighting, HVAC, insulation, and renewable options where feasible.' },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return servicesData.find((s) => s.slug === slug);
}
