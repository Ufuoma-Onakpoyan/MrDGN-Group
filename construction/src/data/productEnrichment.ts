/**
 * Optional enrichment for product detail pages (overview, uses, applications).
 * Key by slug or category; add entries as needed. No entry = show only API data.
 */
export interface ProductEnrichment {
  overview?: string;
  uses?: string[];
  applications?: string[];
}

export const productEnrichmentBySlug: Record<string, ProductEnrichment> = {
  cement: {
    overview: 'Cement is a key binding agent in concrete and mortar, used across residential, commercial, and infrastructure projects. Quality cement ensures durability and structural integrity.',
    uses: ['Concrete for foundations and slabs', 'Mortar for block and brick laying', 'Plastering and rendering', 'Road and pavement construction'],
    applications: ['Residential buildings', 'Commercial structures', 'Roads and bridges', 'Dams and water works'],
  },
  'cement-products': {
    overview: 'Premium cement products suitable for general construction and specialized applications. Manufactured to meet Nigerian standards for strength and consistency.',
    uses: ['General purpose concrete', 'Reinforced concrete structures', 'Block production', 'Plaster and screed'],
    applications: ['Houses and apartments', 'Offices and retail', 'Infrastructure projects'],
  },
  blocks: {
    overview: 'Construction blocks (sandcrete or concrete) are the primary walling material for buildings in Nigeria. Quality blocks provide good thermal insulation and load-bearing capacity.',
    uses: ['Load-bearing and partition walls', 'Boundary fencing', 'Retaining structures', 'Decorative features'],
    applications: ['Residential housing', 'Commercial buildings', 'Schools and hospitals', 'Industrial facilities'],
  },
  'roofing-sheets': {
    overview: 'Roofing sheets protect structures from weather and provide long-lasting cover. Available in aluminium, stone-coated steel, and corrugated options for different budgets and designs.',
    uses: ['Main roof covering', 'Canopies and verandas', 'Fencing and gates', 'Sheds and warehouses'],
    applications: ['Residential roofs', 'Commercial and industrial buildings', 'Agricultural structures'],
  },
  roofing: {
    overview: 'Quality roofing materials ensure weatherproofing and durability. We supply a range of options suited to Nigerian climate and building standards.',
    uses: ['Roof cladding', 'Waterproofing', 'Insulation support', 'Aesthetic finish'],
    applications: ['New builds', 'Roof replacement', 'Extensions and outbuildings'],
  },
  sand: {
    overview: 'Sand is essential for concrete, mortar, and plaster. Sharp sand and soft sand are used for different mix applications in construction.',
    uses: ['Concrete mix', 'Mortar for masonry', 'Plaster and screed', 'Block production'],
    applications: ['Foundations', 'Walling', 'Flooring', 'Landscaping'],
  },
  gravel: {
    overview: 'Gravel and crushed stone provide aggregate for concrete and drainage. Quality aggregate improves concrete strength and workability.',
    uses: ['Concrete aggregate', 'Drainage layers', 'Road base', 'Landscaping'],
    applications: ['Foundations and slabs', 'Roads and paving', 'Drainage systems'],
  },
  general: {
    overview: 'Quality construction materials for builders and projects in Asaba and across Delta State. We supply materials that meet industry standards for durability and performance.',
    uses: ['Building and civil works', 'Renovation and repair', 'Infrastructure projects'],
    applications: ['Residential', 'Commercial', 'Industrial', 'Public sector'],
  },
};

export function getProductEnrichment(slug: string, category: string): ProductEnrichment | undefined {
  const slugNorm = slug?.toLowerCase().trim() || '';
  const categoryNorm = category?.toLowerCase().trim() || '';
  return productEnrichmentBySlug[slugNorm] ?? (categoryNorm ? productEnrichmentBySlug[categoryNorm] : undefined);
}
