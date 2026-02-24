import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const FILLER_BLOG_POSTS = [
  {
    slug: 'future-nigerian-cinema',
    title: 'The Future of Nigerian Cinema: Bridging Tradition and Innovation',
    excerpt: 'Exploring how modern Nigerian filmmakers are revolutionizing storytelling while honoring cultural heritage, creating content that resonates globally.',
    content: `<h2>The Renaissance of Nigerian Cinema</h2><p><em>Nigerian cinema, affectionately known as Nollywood, stands at a pivotal crossroads where tradition meets innovation.</em> As the industry continues to evolve, filmmakers are discovering new ways to honor their cultural heritage while embracing cutting-edge storytelling techniques that captivate global audiences.</p><p>The transformation has been nothing short of remarkable. <strong>From humble beginnings in the 1990s to becoming the world's second-largest film industry by volume</strong>, Nollywood has proven that authentic storytelling resonates universally.</p><h3>Cultural Heritage in Modern Storytelling</h3><p>At the heart of Nigerian cinema's evolution lies a deep respect for cultural authenticity. Contemporary filmmakers are weaving traditional folklore, customs, and languages into their narratives, creating a rich tapestry that celebrates Nigeria's diverse heritage.</p><p><em>This approach not only preserves cultural identity but also introduces international audiences to the beauty and complexity of Nigerian society.</em></p>`,
    author: 'Adaora Okafor',
    tags: ['Nigerian Cinema', 'Innovation', 'Culture', 'Nollywood'],
  },
  {
    slug: 'youtube-long-form-success',
    title: 'YouTube Success: Creating Engaging Long-Form Content',
    excerpt: 'Master the art of YouTube long-form content creation with proven strategies for audience engagement, storytelling, and building a loyal subscriber base.',
    content: `<h2>The Power of Long-Form Content on YouTube</h2><p>In an era dominated by short-form content, long-form YouTube videos offer unique opportunities for deeper storytelling, comprehensive education, and meaningful audience connection. Understanding how to create engaging long-form content is crucial for content creators looking to build lasting relationships with their viewers.</p><h3>Why Long-Form Content Matters</h3><p>Long-form content allows creators to establish thought leadership, create deeper emotional connections, provide comprehensive value through detailed tutorials, and increase watch time—which positively impacts YouTube's algorithm.</p><p>Success with long-form content requires consistency, patience, and a genuine commitment to providing value to your audience.</p>`,
    author: 'Emeka Okonkwo',
    tags: ['YouTube', 'Content Creation', 'Digital Marketing', 'Long-Form'],
  },
  {
    slug: 'short-form-content-revolution',
    title: 'Short-Form Content Revolution: TikTok and Beyond',
    excerpt: 'Understanding the power of short-form content and how it\'s reshaping entertainment consumption patterns across Africa and globally.',
    content: `<h2>The Short-Form Content Revolution</h2><p>The rise of short-form content has fundamentally transformed how we consume and create entertainment. From TikTok's explosive growth to Instagram Reels and YouTube Shorts, this content format has captured the attention of billions worldwide, particularly resonating with African audiences seeking quick, engaging entertainment.</p><h3>Understanding the Short-Form Phenomenon</h3><p>Short-form content offers instant gratification, lower barriers to creation, algorithm-driven discovery, mobile-first experiences, and democratized creation tools. In Africa, it has found particular success due to mobile-first internet usage and platforms becoming showcases for African creativity.</p>`,
    author: 'Kemi Afolabi',
    tags: ['Short-Form', 'TikTok', 'Social Media', 'Africa'],
  },
  {
    slug: 'mrdgn-group-expansion-2024',
    title: 'MrDGN Group Expands Portfolio with Strategic Investments',
    excerpt: 'MrDGN Group announces new strategic investments across entertainment, real estate, and construction sectors as part of our growth initiatives.',
    content: `<h2>Strategic Growth Across Our Portfolio</h2><p>MrDGN Group is pleased to announce several strategic investments and partnerships that strengthen our position across key markets. Our diversified approach—spanning entertainment, real estate through MansaLuxe Realty, and construction services—enables us to drive value while contributing to local economic development.</p><h3>Entertainment and Media</h3><p>Our entertainment division continues to invest in talent development, production infrastructure, and digital distribution. We are committed to elevating African storytelling on the global stage.</p><h3>Real Estate and Construction</h3><p>MansaLuxe Realty and our construction arm are expanding their service offerings, with new projects delivering quality residential and commercial developments.</p>`,
    author: 'MrDGN',
    tags: ['Corporate', 'Expansion', 'Investments', 'Growth'],
  },
  {
    slug: 'luxury-real-estate-trends-africa',
    title: 'Luxury Real Estate Trends Shaping African Markets',
    excerpt: 'A look at emerging trends in African luxury real estate, from smart homes to sustainable design and premium amenities.',
    content: `<h2>The Evolving Luxury Real Estate Landscape</h2><p>African luxury real estate is experiencing a transformative period. Buyers are seeking properties that combine world-class amenities with sustainability, smart technology, and unique architectural design that reflects local identity.</p><h3>Key Trends</h3><p>Smart homes, sustainable construction, integrated wellness spaces, and premium security features are among the top priorities. MansaLuxe Realty is at the forefront of delivering these experiences to discerning clients across our markets.</p>`,
    author: 'MrDGN',
    tags: ['Real Estate', 'Luxury', 'Africa', 'Trends'],
  },
  {
    slug: 'building-sustainable-future',
    title: 'Building a Sustainable Future: Construction Best Practices',
    excerpt: 'How modern construction techniques and materials are reducing environmental impact while delivering durable, efficient structures.',
    content: `<h2>Sustainability in Construction</h2><p>The construction industry is embracing sustainable practices at an accelerating pace. From recycled materials to energy-efficient design, modern projects are reducing their environmental footprint while improving long-term operational costs.</p><h3>Best Practices We Emphasize</h3><p>At MrDGN Construction, we prioritize eco-friendly materials, efficient waste management, and designs that maximize natural light and ventilation. Our commitment to sustainability goes hand-in-hand with delivering projects that stand the test of time.</p>`,
    author: 'MrDGN',
    tags: ['Construction', 'Sustainability', 'Best Practices'],
  },
];

const FILLER_PROPERTIES = [
  {
    title: 'Lagos Island Penthouse with Ocean Views',
    description: 'Stunning 4,200 sq ft penthouse atop one of Lagos\' most prestigious towers. Floor-to-ceiling windows, private rooftop terrace, and breathtaking views of the Atlantic. Fully furnished with Italian marble and designer finishes throughout.',
    price: 285000000,
    location: 'Victoria Island, Lagos',
    bedrooms: 4,
    bathrooms: 5,
    squareFeet: 4200,
    lotSize: 'N/A',
    yearBuilt: 2022,
    propertyType: 'Penthouse',
    status: 'available',
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    ]),
    amenities: JSON.stringify(['24/7 Concierge', 'Infinity Pool', 'Gym', 'Smart Home', 'Private Elevator', 'Wine Cellar']),
    features: JSON.stringify(['Ocean View', 'Marble Floors', 'Chef\'s Kitchen', 'Walk-in Closets']),
    agent: JSON.stringify({ name: 'Amina Okonkwo', phone: '+234 801 234 5678', email: 'amina@mansaluxe.com' }),
  },
  {
    title: 'Lekki Phase 1 Luxury Villa',
    description: 'Elegant 6-bedroom villa on a gated 0.5-acre plot. Mediterranean-inspired architecture with manicured gardens, pool house, and staff quarters. Perfect for families seeking privacy and exclusivity.',
    price: 185000000,
    location: 'Lekki Phase 1, Lagos',
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 6800,
    lotSize: '0.5 acres',
    yearBuilt: 2019,
    propertyType: 'Villa',
    status: 'available',
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    ]),
    amenities: JSON.stringify(['Pool', 'Garden', 'Staff Quarters', 'Security', 'Generator', 'Borehole']),
    features: JSON.stringify(['Terrace', 'Home Theater', 'Study', 'Guest Wing']),
    agent: JSON.stringify({ name: 'Chidi Nnamdi', phone: '+234 802 345 6789', email: 'chidi@mansaluxe.com' }),
  },
  {
    title: 'Maitama Executive Duplex',
    description: 'Sophisticated duplex in Abuja\'s prime Maitama district. Premium finishes, smart home technology, and exclusive access to estate amenities. Ideal for executives and diplomats.',
    price: 420000000,
    location: 'Maitama, Abuja',
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 5500,
    lotSize: '0.3 acres',
    yearBuilt: 2021,
    propertyType: 'Duplex',
    status: 'available',
    featured: true,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800',
    ]),
    amenities: JSON.stringify(['Clubhouse', 'Tennis Court', 'Gym', 'Children\'s Playground', '24/7 Security']),
    features: JSON.stringify(['Smart Home', 'Study', 'Library', 'Bar']),
    agent: JSON.stringify({ name: 'Funke Adeyemi', phone: '+234 803 456 7890', email: 'funke@mansaluxe.com' }),
  },
  {
    title: 'Ikoyi Colonial-Era Mansion',
    description: 'Heritage 5-bedroom mansion blending colonial architecture with modern luxury. High ceilings, original wooden floors, and a tranquil garden. A rare find in one of Lagos\' most sought-after neighborhoods.',
    price: 650000000,
    location: 'Ikoyi, Lagos',
    bedrooms: 5,
    bathrooms: 5,
    squareFeet: 7200,
    lotSize: '0.8 acres',
    yearBuilt: 1952,
    propertyType: 'Mansion',
    status: 'available',
    featured: false,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800',
    ]),
    amenities: JSON.stringify(['Heritage Listed', 'Garden', 'Security', 'Staff Quarters']),
    features: JSON.stringify(['Original Features', 'Study', 'Ballroom', 'Wine Cellar']),
    agent: null,
  },
  {
    title: 'Port Harcourt Waterfront Apartment',
    description: 'Modern 3-bedroom apartment with balcony views over the waterfront. Premium fixtures, open-plan living, and access to marina and yacht club facilities.',
    price: 95000000,
    location: 'Trans Amadi, Port Harcourt',
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 2400,
    lotSize: 'N/A',
    yearBuilt: 2020,
    propertyType: 'Apartment',
    status: 'available',
    featured: false,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    ]),
    amenities: JSON.stringify(['Marina Access', 'Gym', 'Pool', 'Concierge']),
    features: JSON.stringify(['Water View', 'Balcony', 'Open Plan']),
    agent: JSON.stringify({ name: 'Emeka Briggs', phone: '+234 804 567 8901', email: 'emeka@mansaluxe.com' }),
  },
  {
    title: 'Calabar Hilltop Estate',
    description: 'Exclusive 4-bedroom home on a hill overlooking the city. Cool breezes, lush landscaping, and panoramic views. Recently renovated with contemporary interiors.',
    price: 125000000,
    location: 'State Housing, Calabar',
    bedrooms: 4,
    bathrooms: 4,
    squareFeet: 3800,
    lotSize: '0.4 acres',
    yearBuilt: 2018,
    propertyType: 'House',
    status: 'pending',
    featured: false,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
    ]),
    amenities: JSON.stringify(['Gated Estate', 'Security', 'Generator', 'Borehole']),
    features: JSON.stringify(['Hill View', 'Terrace', 'Study']),
    agent: null,
  },
];

const FILLER_TESTIMONIALS = [
  { name: 'Chief Oluwaseun Adebayo', role: 'CEO', company: 'Adebayo Holdings', quote: 'MansaLuxe Realty made our family\'s dream home a reality. Their professionalism and attention to detail are unmatched. We found our perfect villa in Lekki within weeks.', rating: 5, displayOrder: 0, source: 'mansaluxe-realty' },
  { name: 'Dr. Ngozi Eze', role: 'Medical Director', company: 'Lagos General Hospital', quote: 'Relocating from the UK was seamless thanks to MansaLuxe. They understood exactly what we needed and delivered beyond expectations.', rating: 5, displayOrder: 1, source: 'mansaluxe-realty' },
  { name: 'Alhaji Ibrahim Musa', role: 'Businessman', company: 'Musa Enterprises', quote: 'I have invested in multiple properties through MansaLuxe Realty. Their market knowledge and discreet service keep me coming back.', rating: 5, displayOrder: 2, source: 'mansaluxe-realty' },
  { name: 'Adaeze Okoli', role: 'Tech Entrepreneur', company: 'Fintech Solutions', quote: 'The penthouse they found for us is breathtaking. MansaLuxe understands luxury and delivers properties that match your lifestyle.', rating: 5, displayOrder: 3, source: 'mansaluxe-realty' },
];

const FILLER_CONSTRUCTION_TESTIMONIALS = [
  { name: 'Chief O. Adebayo', role: 'Property Developer, Lagos', company: 'Residential Complex', quote: 'MR DGN Constructions delivered our residential project on schedule and within budget. Their team was professional, responsive, and the quality of work exceeded our expectations. We will definitely use them again.', rating: 5, displayOrder: 0, source: 'construction' },
  { name: 'Mrs. Nkechi Okonkwo', role: 'Business Owner, Asaba', company: 'Commercial Building', quote: 'From the first consultation to handover, the process was smooth. They explained everything clearly and kept us updated weekly. The building was completed to a high standard. Highly recommended.', rating: 5, displayOrder: 1, source: 'construction' },
  { name: 'Engr. Ibrahim Musa', role: 'Infrastructure Consultant, Abuja', company: 'Road & Drainage Works', quote: 'We engaged MR DGN for infrastructure works and were impressed by their project management and adherence to safety standards. Their engineers are knowledgeable and the workmanship is solid.', rating: 5, displayOrder: 2, source: 'construction' },
  { name: 'Dr. Amaka Eze', role: 'Healthcare Facility Owner, Delta State', company: 'Clinic Renovation', quote: 'We needed our clinic renovated and upgraded. MR DGN handled everything—design coordination, permits, and construction. The result is a modern, functional space. Very satisfied with the outcome.', rating: 5, displayOrder: 3, source: 'construction' },
  { name: 'Mr. Chidi Nwosu', role: 'Retail Developer, Port Harcourt', company: 'Shopping Complex', quote: 'Professional team, quality materials, and on-time delivery. MR DGN Constructions understands commercial projects and delivered exactly what we needed. A reliable partner for construction.', rating: 5, displayOrder: 4, source: 'construction' },
  { name: 'Mrs. Funke Adesanya', role: 'Homeowner, Warri', company: 'Custom Residential', quote: 'Building our home with MR DGN was a great experience. They listened to our needs, offered practical suggestions, and the finished house is exactly what we envisioned. Thank you to the team.', rating: 5, displayOrder: 5, source: 'construction' },
];

const FILLER_PRODUCTS = [
  {
    title: 'High-Quality Solid Blocks',
    slug: 'solid-blocks',
    description: 'Premium concrete blocks engineered for maximum strength and durability. Perfect for both structural and architectural applications.',
    price: 450,
    priceUnit: 'per piece',
    category: 'blocks',
    images: JSON.stringify(['https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800']),
    specifications: JSON.stringify({ 'Compressive Strength': '20-40 MPa', 'Sizes Available': '100mm, 150mm, 200mm', 'Water Absorption': '< 10%' }),
    features: JSON.stringify(['Various sizes available', 'Weather resistant', 'High compressive strength', 'Easy installation']),
    featured: true,
    orderIndex: 0,
  },
  {
    title: 'Durable Interlocking Pavers',
    slug: 'interlocking-pavers',
    description: 'High-quality interlocking concrete pavers designed for driveways, walkways, patios, and outdoor spaces.',
    price: 3200,
    priceUnit: 'per m²',
    category: 'pavers',
    images: JSON.stringify(['https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800']),
    specifications: JSON.stringify({ 'Thickness': '60mm, 80mm', 'Compressive Strength': '50 MPa', 'Colors': 'Gray, Red, Yellow, Brown' }),
    features: JSON.stringify(['Interlocking design', 'Multiple colors', 'Slip-resistant surface', 'Easy maintenance']),
    featured: true,
    orderIndex: 1,
  },
  {
    title: 'Premium Cement Products',
    slug: 'cement-products',
    description: 'Superior quality cement and concrete mixes formulated for optimal performance in all construction applications.',
    price: 4200,
    priceUnit: 'per 50kg bag',
    category: 'cement',
    images: JSON.stringify(['https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800']),
    specifications: JSON.stringify({ 'Compressive Strength': '42.5 MPa at 28 days', 'Setting Time': '30 min initial', 'Grade': 'OPC 43, OPC 53' }),
    features: JSON.stringify(['Fast setting', 'High early strength', 'Workability enhanced', 'Consistent quality']),
    featured: true,
    orderIndex: 2,
  },
  {
    title: 'Reliable Precast Kerbs',
    slug: 'precast-kerbs',
    description: 'Precast concrete kerbs engineered for road construction, landscaping, and boundary applications.',
    price: 2800,
    priceUnit: 'per piece',
    category: 'kerbs',
    images: JSON.stringify(['https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800']),
    specifications: JSON.stringify({ 'Length': '1000mm standard', 'Height': '150mm, 225mm, 300mm', 'Load Bearing': 'Class A, Class B' }),
    features: JSON.stringify(['Machine finished', 'Precise dimensions', 'Heavy-duty design', 'Long-lasting']),
    featured: false,
    orderIndex: 3,
  },
];

const FILLER_JOBS = [
  { title: 'Senior Project Manager', slug: 'senior-project-manager-construction', description: 'Lead construction projects from conception to completion, managing teams and ensuring quality delivery.', department: 'MrDGN Construction', location: 'Downtown Office', employmentType: 'Full-time', salary: '₦80,000 - ₦120,000', requirements: JSON.stringify([]), source: 'group', orderIndex: 0 },
  { title: 'Content Producer', slug: 'content-producer-entertainment', description: 'Create engaging digital content across multiple platforms, working with creative teams on innovative projects.', department: 'MrDGN Entertainment', location: 'Creative Studio', employmentType: 'Full-time', salary: '₦60,000 - ₦85,000', requirements: JSON.stringify([]), source: 'group', orderIndex: 1 },
  { title: 'Real Estate Advisor', slug: 'real-estate-advisor-mansaluxe', description: 'Guide clients through property transactions, providing expert advice and exceptional service.', department: 'MansaLuxe Realty', location: 'Sales Office', employmentType: 'Full-time', salary: '₦50,000 + Commission', requirements: JSON.stringify([]), source: 'group', orderIndex: 2 },
  { title: 'Software Engineer', slug: 'software-engineer-duerents', description: 'Develop innovative rental platform solutions and property management technologies using modern tech stacks.', department: 'Duerents', location: 'Tech Hub', employmentType: 'Full-time', salary: '₦85,000 - ₦115,000', requirements: JSON.stringify([]), source: 'group', orderIndex: 3 },
  { title: 'Senior Construction Manager', slug: 'senior-construction-manager', description: 'Lead large-scale construction projects from planning to completion.', department: 'Project Management', location: 'Lagos, Nigeria', employmentType: 'Full-time', salary: '₦95k - ₦120k', requirements: JSON.stringify(['10+ years experience', 'PMP Certification', 'Team Leadership']), source: 'construction', orderIndex: 0 },
  { title: 'Site Safety Engineer', slug: 'site-safety-engineer', description: 'Ensure all safety protocols and compliance standards are met on construction sites.', department: 'Safety & Compliance', location: 'Lagos, Nigeria', employmentType: 'Full-time', salary: '₦75k - ₦95k', requirements: JSON.stringify(['Safety Certification', '5+ years experience', 'Risk Assessment']), source: 'construction', orderIndex: 1 },
];

// Construction site – featured projects (migrated from hardcoded list)
const FILLER_CONSTRUCTION_PROJECTS = [
  {
    title: 'Skyline Tower Complex',
    slug: 'skyline-tower-complex',
    description: 'A 45-story mixed-use development featuring luxury residences and commercial spaces with state-of-the-art amenities and sustainable design principles.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    category: 'High-Rise',
    location: 'Downtown Metropolitan',
    duration: '36 months',
    value: '₦150M',
    client: 'Metropolitan Development Corp',
    architect: 'Studio Alpha Architecture',
    planningDetails: 'This ambitious project required extensive planning coordination with city authorities, involving complex zoning approvals and environmental impact assessments. The design integrates mixed-use functionality with residential units on upper floors and commercial spaces at ground level.',
    structuralDesign: 'The tower features a reinforced concrete core with steel frame construction, designed to withstand seismic activity and high wind loads. Advanced engineering techniques ensure optimal structural integrity while maximizing usable space.',
    machines: JSON.stringify(['Tower Cranes (3x)', 'Concrete Pumps', 'Excavators', 'Foundation Drilling Equipment', 'High-reach Demolition Equipment']),
    materials: JSON.stringify(['High-strength Concrete', 'Structural Steel', 'Curtain Wall Systems', 'Fire-resistant Materials', 'Sound Insulation']),
    published: true,
    orderIndex: 0,
  },
  {
    title: 'Heritage Residential Community',
    slug: 'heritage-residential-community',
    description: 'Modern residential complex with sustainable design and green building practices, featuring 200 family units with community amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
    category: 'Residential',
    location: 'Suburban District',
    duration: '24 months',
    value: '₦85M',
    client: 'Green Living Developments',
    architect: 'EcoDesign Partners',
    planningDetails: 'Comprehensive master planning focused on sustainable living with integrated green spaces, community centers, and pedestrian-friendly pathways. The project emphasizes energy efficiency and environmental conservation.',
    structuralDesign: 'Low-rise construction utilizing sustainable materials and energy-efficient building techniques. Each unit features optimized natural lighting and ventilation systems.',
    machines: JSON.stringify(['Mobile Cranes', 'Concrete Mixers', 'Excavators', 'Compactors', 'Landscaping Equipment']),
    materials: JSON.stringify(['Eco-friendly Concrete', 'Recycled Steel', 'Solar Panels', 'Insulation Materials', 'Low-VOC Finishes']),
    published: true,
    orderIndex: 1,
  },
  {
    title: 'Corporate Business Center',
    slug: 'corporate-business-center',
    description: 'State-of-the-art office complex with cutting-edge technology infrastructure and modern workplace amenities for 2,000+ employees.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    category: 'Commercial',
    location: 'Business Park',
    duration: '30 months',
    value: '₦120M',
    client: 'TechCorp Industries',
    architect: 'Modern Workspace Design',
    planningDetails: 'Strategic planning focused on creating flexible workspace environments with advanced IT infrastructure, meeting facilities, and employee wellness areas. The design incorporates future expansion capabilities.',
    structuralDesign: 'Steel frame construction with large open floor plates allowing for flexible office configurations. Advanced HVAC and electrical systems support high-tech operations.',
    machines: JSON.stringify(['Tower Cranes', 'Steel Erection Equipment', 'Concrete Pumps', 'Welding Equipment', 'Glass Installation Systems']),
    materials: JSON.stringify(['Structural Steel', 'High-performance Glass', 'Advanced Concrete', 'Cable Management Systems', 'Acoustic Materials']),
    published: true,
    orderIndex: 2,
  },
  {
    title: 'Metro Bridge Infrastructure',
    slug: 'metro-bridge-infrastructure',
    description: 'Critical infrastructure project connecting major transportation hubs with advanced engineering for heavy traffic loads.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200',
    category: 'Infrastructure',
    location: 'City Center',
    duration: '18 months',
    value: '₦95M',
    client: 'City Transportation Authority',
    architect: 'Infrastructure Engineering Ltd',
    planningDetails: 'Complex coordination with traffic management, environmental protection, and utility relocation. The project required phased construction to maintain traffic flow during construction.',
    structuralDesign: 'Prestressed concrete beam construction with reinforced foundations designed for 100-year service life. Advanced drainage and expansion joint systems ensure long-term durability.',
    machines: JSON.stringify(['Bridge Girder Launchers', 'Pile Driving Equipment', 'Concrete Pumps', 'Heavy Lifting Cranes', 'Road Construction Equipment']),
    materials: JSON.stringify(['Prestressed Concrete', 'High-grade Steel', 'Waterproofing Membranes', 'Expansion Joints', 'Protective Coatings']),
    published: true,
    orderIndex: 3,
  },
  {
    title: 'Industrial Warehouse Complex',
    slug: 'industrial-warehouse-complex',
    description: 'Modern logistics and distribution center with advanced automated systems and temperature-controlled storage facilities.',
    imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200',
    category: 'Industrial',
    location: 'Manufacturing District',
    duration: '20 months',
    value: '₦75M',
    client: 'LogiFlow Distribution',
    architect: 'Industrial Design Solutions',
    planningDetails: 'Optimized for efficient logistics operations with automated storage and retrieval systems. Planning included integration with existing transportation networks and utility infrastructure.',
    structuralDesign: 'Pre-engineered steel structure with clear span design for maximum operational flexibility. High-bay construction supports automated racking systems.',
    machines: JSON.stringify(['Mobile Cranes', 'Steel Erection Equipment', 'Concrete Equipment', 'Roofing Equipment', 'Material Handling Systems']),
    materials: JSON.stringify(['Pre-engineered Steel', 'Industrial Concrete', 'Insulation Systems', 'Roofing Materials', 'Electrical Infrastructure']),
    published: true,
    orderIndex: 4,
  },
  {
    title: 'University Campus Expansion',
    slug: 'university-campus-expansion',
    description: 'Educational facility expansion with state-of-the-art learning environments, research labs, and student amenities.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200',
    category: 'Educational',
    location: 'Academic Quarter',
    duration: '28 months',
    value: '₦110M',
    client: 'State University System',
    architect: 'Educational Architecture Group',
    planningDetails: 'Academic programming focused on flexible learning spaces, research facilities, and collaborative areas. The design emphasizes natural lighting and sustainable construction practices.',
    structuralDesign: 'Mixed construction with concrete frame for laboratories and steel frame for large assembly spaces. Acoustic design ensures optimal learning environments.',
    machines: JSON.stringify(['Tower Cranes', 'Concrete Pumps', 'Excavators', 'Steel Erection Equipment', 'Specialized Lab Equipment']),
    materials: JSON.stringify(['High-performance Concrete', 'Structural Steel', 'Acoustic Materials', 'Laboratory Fixtures', 'Energy-efficient Systems']),
    published: true,
    orderIndex: 5,
  },
  {
    title: 'Medical Center Complex',
    slug: 'medical-center-complex',
    description: 'Advanced healthcare facility with specialized medical equipment and patient care areas, serving 500+ bed capacity.',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200',
    category: 'Healthcare',
    location: 'Medical District',
    duration: '32 months',
    value: '₦180M',
    client: 'Regional Health System',
    architect: 'Healthcare Design Specialists',
    planningDetails: 'Specialized planning for medical facilities including infection control, emergency services, and complex utility systems. The design incorporates future expansion for medical technology advancement.',
    structuralDesign: 'Reinforced concrete construction with vibration isolation for sensitive medical equipment. Advanced HVAC systems maintain precise environmental controls.',
    machines: JSON.stringify(['Medical Equipment Hoists', 'Clean Room Equipment', 'Specialized Cranes', 'HVAC Installation Equipment', 'Emergency Power Systems']),
    materials: JSON.stringify(['Medical-grade Materials', 'Lead Shielding', 'Specialized Flooring', 'Air Filtration Systems', 'Emergency Backup Systems']),
    published: true,
    orderIndex: 6,
  },
];

const FILLER_PORTFOLIO = [
  { title: 'Victoria Island Tower Development', slug: 'victoria-island-tower', description: 'Mixed-use luxury tower', content: 'Premium residential and commercial development in the heart of Victoria Island.', category: 'commercial', technologies: JSON.stringify(['Modern Architecture', 'Sustainable Design']), orderIndex: 0 },
  { title: 'Lekki Gated Community', slug: 'lekki-gated-community', description: '50-unit residential estate', content: 'Exclusive gated community with world-class amenities and 24/7 security.', category: 'residential', technologies: JSON.stringify(['Smart Home', 'Solar Power']), orderIndex: 1 },
  { title: 'Abuja Diplomatic Quarter', slug: 'abuja-diplomatic-quarter', description: 'High-end residential project', content: 'Luxury homes designed for diplomats and executives in Abuja\'s most prestigious neighborhood.', category: 'residential', technologies: JSON.stringify(['Contemporary Design', 'Premium Finishes']), orderIndex: 2 },
];

// Sponsored events (from uploaded posters – MrDGN Entertainment)
// Delta Music Comedy & Fashion Expo is ONE event (Akwocha Edition) with casting call + vendors as part of same expo
const FILLER_SPONSORED_EVENTS = [
  {
    title: 'Goya Menor Homecoming Concert: Da Big Boys Concert',
    slug: 'goya-menor-homecoming-concert-2022',
    description: 'MrDGN Group proudly sponsored the Goya Menor Homecoming Concert in Benin City—a major music event headlined by Goya Menor, featuring DJ Neptunes, Jaywillz, Erigga, Magnito, Berri Tiga (Machala), Lade, Maleke, and more. The concert brought together fans for an unforgettable night of Afrobeats and entertainment at the Victor Uwaifo Centre.',
    eventType: 'concert',
    eventDate: 'December 4, 2022',
    eventTime: '5 PM',
    venue: 'Victor Uwaifo Centre',
    venueAddress: '27, Airport Road, Benin City, Edo State',
    location: 'Benin City, Edo State',
    imageUrl: '/events/goya-menor-homecoming-2022.png',
    presenter: 'Engraced',
    featuredArtists: JSON.stringify(['Goya Menor', 'DJ Neptunes', 'Jaywillz', 'Erigga', 'Magnito', 'Berri Tiga (Machala)', 'Lade', 'Maleke', 'More Artists TBA']),
    ticketInfo: JSON.stringify({
      regular: '₦5,000 (5K)',
      vip: '₦10,000 (10K)',
      tables: [
        { name: 'Gold Table (for 8)', price: '₦500,000 (500K)' },
        { name: 'Platinum Table (for 10)', price: '₦1,000,000 (1M)' },
        { name: 'Premium Table (for 10)', price: '₦1,500,000 (1.5M)' },
      ],
    }),
    ticketOutlets: JSON.stringify(['S-Leader Arena', 'All Kilimanjaro Outlet', 'Mama Ebo Restaurant', 'Film House (Ugbowo)', 'Home and Away (Ikpokpan)', 'Kada Cinema (Sapele Road)']),
    contactPhones: JSON.stringify(['08139171428', '09161225910', '08188561636']),
    sponsors: JSON.stringify(['S-Leader', 'Bobega', 'DVD & Gas Ltd', 'Home Away Restaurant', 'Mr. DGN Group', 'Martini', 'V2 Playfield Properties', 'Azibit by Morzi']),
    highlights: JSON.stringify(['Goya Menor headliner', 'Da Big Boys Concert', 'Victor Uwaifo Centre', 'Table reservations available', 'Multiple ticket outlets']),
    extraNote: null,
    isPast: true,
    orderIndex: 0,
    published: true,
  },
  {
    title: 'Delta Music Comedy & Fashion Expo – Akwocha Edition',
    slug: 'delta-music-comedy-fashion-expo-akwocha-2022',
    description: 'MrDGN Group was a proud sponsor of the Delta Music Comedy & Fashion Expo (Akwocha Edition), presented by 2 Things Promotions. The expo combined music, comedy, and fashion in a series of activations: a casting call for models at Grand Hotel Asaba (26 Feb 2022, 9 AM—women 5\'6" without heels, men 5\'7", dress code black top and black trousers with heels); a call for vendors and exhibitors to exhibit, sell, and network; and the main event at Dome Event Centre, Asaba (15 April 2022—Red Carpet 6 PM, Main Show 7 PM). COVID-19 guidelines applied. Art direction by Jimmy Whyte.',
    eventType: 'expo',
    eventDate: 'February–April 2022',
    eventTime: 'Casting: 26 Feb 9 AM · Main event: 15 Apr, Red Carpet 6 PM, Main 7 PM',
    venue: 'Dome Event Centre / Grand Hotel Asaba',
    venueAddress: 'Asaba, Delta State',
    location: 'Asaba, Delta State',
    imageUrl: '/events/delta-music-comedy-fashion-expo-2022.png',
    presenter: '2 Things Promotions',
    featuredArtists: JSON.stringify([]),
    ticketInfo: JSON.stringify({}),
    ticketOutlets: JSON.stringify([]),
    contactPhones: JSON.stringify(['08064757518', '08135543501', '08163845485', '07053591704']),
    sponsors: JSON.stringify(['Delta State Government', 'Mr DGN Group', 'Opus Devices', 'Basement Africa', 'Martini', 'Lush', 'TEE-JAY FX', 'Jimmy Whyte', 'RC Fashion', 'Emodien Construction Ltd']),
    highlights: JSON.stringify(['Music, Comedy & Fashion', 'Casting call for models', 'Vendors & exhibitors', 'Dome Event Centre & Grand Hotel Asaba', 'Art direction: Jimmy Whyte']),
    extraNote: 'COVID-19 guidelines applied.',
    isPast: true,
    orderIndex: 1,
    published: true,
  },
  {
    title: 'M.O.P Next of Kin – Thank You Lagos',
    slug: 'mop-next-of-kin-thank-you-lagos',
    description: 'MrDGN Group sponsored M.O.P Next of Kin—an acclaimed comedy show by MOPCOMEDIAN in Lagos. This thank-you poster acknowledges the successful patronage and support from Lagos audiences. The show celebrated Nigerian comedy and entertainment with a memorable performance.',
    eventType: 'comedy',
    eventDate: null,
    eventTime: null,
    venue: null,
    venueAddress: null,
    location: 'Lagos',
    imageUrl: '/events/mop-next-of-kin-thank-you-lagos.png',
    presenter: null,
    featuredArtists: JSON.stringify(['MOPCOMEDIAN']),
    ticketInfo: JSON.stringify({}),
    ticketOutlets: JSON.stringify([]),
    contactPhones: JSON.stringify([]),
    sponsors: JSON.stringify(['Mr DGN Group']),
    highlights: JSON.stringify(['Thank You Lagos', 'M.O.P Next of Kin', 'Comedy show', 'MOPCOMEDIAN']),
    extraNote: 'Thank you for patronizing.',
    isPast: true,
    orderIndex: 2,
    published: true,
  },
];

async function main() {
  // Seed admin user
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@mrdgngroup.com';
  const password = process.env.SEED_ADMIN_PASSWORD || 'Admin123!';

  const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });
  if (!existingAdmin) {
    const hash = await bcrypt.hash(password, 10);
    await prisma.adminUser.create({
      data: {
        email,
        password: hash,
        name: 'Super Admin',
        role: 'super_admin',
      },
    });
    console.log('Created admin user:', email);
    console.log('Default password:', password, '(change in production!)');
  } else {
    console.log('Admin user already exists:', email);
  }

  // Seed filler blog posts
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    const baseDate = new Date();
    for (let i = 0; i < FILLER_BLOG_POSTS.length; i++) {
      const post = FILLER_BLOG_POSTS[i];
      const publishedAt = new Date(baseDate);
      publishedAt.setDate(publishedAt.getDate() - (FILLER_BLOG_POSTS.length - i));
      await prisma.blogPost.create({
        data: {
          ...post,
          tags: JSON.stringify(post.tags),
          published: true,
          publishedAt,
        },
      });
    }
    console.log('Created', FILLER_BLOG_POSTS.length, 'filler blog posts');
  } else {
    console.log('Blog posts exist, skipping (' + blogCount + ')');
  }

  // Seed filler properties
  const propertyCount = await prisma.property.count();
  if (propertyCount === 0) {
    for (const prop of FILLER_PROPERTIES) {
      await prisma.property.create({ data: prop });
    }
    console.log('Created', FILLER_PROPERTIES.length, 'filler properties');
  } else {
    console.log('Properties exist, skipping (' + propertyCount + ')');
  }

  // Seed testimonials (MansaLuxe + Construction)
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    const properties = await prisma.property.findMany({ take: 2 });
    for (let i = 0; i < FILLER_TESTIMONIALS.length; i++) {
      const t = FILLER_TESTIMONIALS[i];
      await prisma.testimonial.create({
        data: {
          ...t,
          propertyId: properties[i % 2]?.id ?? null,
          published: true,
        },
      });
    }
    for (const t of FILLER_CONSTRUCTION_TESTIMONIALS) {
      await prisma.testimonial.create({
        data: { ...t, published: true },
      });
    }
    console.log('Created', FILLER_TESTIMONIALS.length + FILLER_CONSTRUCTION_TESTIMONIALS.length, 'filler testimonials');
  } else {
    console.log('Testimonials exist, skipping (' + testimonialCount + ')');
  }

  // Seed portfolio items
  const portfolioCount = await prisma.portfolioItem.count();
  if (portfolioCount === 0) {
    for (const item of FILLER_PORTFOLIO) {
      await prisma.portfolioItem.create({
        data: {
          ...item,
          images: '[]',
          published: true,
          publishedAt: new Date(),
        },
      });
    }
    console.log('Created', FILLER_PORTFOLIO.length, 'filler portfolio items');
  } else {
    console.log('Portfolio items exist, skipping (' + portfolioCount + ')');
  }

  // Seed construction products
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    for (const prod of FILLER_PRODUCTS) {
      await prisma.product.create({
        data: { ...prod, published: true },
      });
    }
    console.log('Created', FILLER_PRODUCTS.length, 'filler construction products');
  } else {
    console.log('Products exist, skipping (' + productCount + ')');
  }

  // Seed job postings
  const jobCount = await prisma.jobPosting.count();
  if (jobCount === 0) {
    for (const job of FILLER_JOBS) {
      await prisma.jobPosting.create({
        data: { ...job, published: true },
      });
    }
    console.log('Created', FILLER_JOBS.length, 'filler job postings');
  } else {
    console.log('Job postings exist, skipping (' + jobCount + ')');
  }

  // Seed construction projects (migrated from construction site hardcoded list)
  const projectCount = await prisma.constructionProject.count();
  if (projectCount === 0) {
    for (const proj of FILLER_CONSTRUCTION_PROJECTS) {
      await prisma.constructionProject.create({
        data: proj,
      });
    }
    console.log('Created', FILLER_CONSTRUCTION_PROJECTS.length, 'construction projects');
  } else {
    console.log('Construction projects exist, skipping (' + projectCount + ')');
  }

  // Seed sponsored events (entertainment – events MrDGN has sponsored)
  // Re-seed to keep data in sync: delete existing and create from FILLER_SPONSORED_EVENTS
  await prisma.sponsoredEvent.deleteMany({});
  for (const ev of FILLER_SPONSORED_EVENTS) {
    await prisma.sponsoredEvent.create({
      data: ev,
    });
  }
  console.log('Created', FILLER_SPONSORED_EVENTS.length, 'sponsored events');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
