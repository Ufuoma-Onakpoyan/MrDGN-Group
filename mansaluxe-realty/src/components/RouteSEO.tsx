import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": { title: "Mansa Luxe Realty Limited", description: "Discover Nigeria's most prestigious properties. Luxury real estate in Lagos, Abuja, Victoria Island, Ikoyi, and Port Harcourt. A subsidiary of MrDGN Group." },
  "/properties": { title: "Properties", description: "Browse luxury properties for sale and rent in Nigeria. Penthouse, villa, mansion, duplex, and estate listings in Lagos, Abuja, and beyond." },
  "/about": { title: "About Us", description: "Learn about Mansa Luxe Realty Limited, Nigeria's premier luxury real estate company. Our story, mission, vision, and team since 2020." },
  "/contact": { title: "Contact Us", description: "Contact Mansa Luxe Realty for property enquiries. Head office in Asaba, Delta State. Call +234 813 532 4467 or send a message." },
  "/services": { title: "Our Services", description: "Property sales, management, investment advisory, luxury rentals, and valuation. Full-service luxury real estate in Nigeria." },
  "/testimonials": { title: "Client Testimonials", description: "Read reviews and testimonials from satisfied clients. See why clients trust Mansa Luxe Realty for luxury property." },
  "/careers": { title: "Careers", description: "Join Mansa Luxe Realty. Careers in luxury real estate sales, property management, and client services across Nigeria." },
  "/blog": { title: "Blog & Lifestyle", description: "Luxury real estate insights, market updates, and lifestyle articles from Mansa Luxe Realty." },
  "/buying": { title: "Buying Guide", description: "Guide to buying luxury property in Nigeria. Steps, tips, and what to expect when purchasing with Mansa Luxe Realty." },
  "/selling": { title: "Selling Guide", description: "Sell your luxury property with Mansa Luxe Realty. Expert valuation, marketing, and a streamlined selling process." },
  "/privacy": { title: "Privacy Policy", description: "Mansa Luxe Realty Privacy Policy. How we collect, use, and protect your information." },
  "/terms": { title: "Terms of Service", description: "Mansa Luxe Realty Terms of Service. Terms and conditions for using our website and services." },
  "/faq": { title: "FAQ", description: "Frequently asked questions about buying, selling, and investing in luxury real estate with Mansa Luxe Realty." },
};

export function RouteSEO() {
  const { pathname } = useLocation();

  const basePath = pathname === "/" ? "/" : "/" + pathname.split("/").filter(Boolean)[0];
  const meta = routeMeta[pathname] ?? routeMeta[basePath];

  if (pathname.startsWith("/properties/") && pathname !== "/properties") {
    return <SEO title="Property Details" description="View luxury property details. Schedule a viewing or contact our team." canonical={pathname} />;
  }
  if (pathname.startsWith("/blog/")) {
    return <SEO title="Blog Post" description="Read our latest blog post on luxury real estate and lifestyle." canonical={pathname} />;
  }

  if (!meta) return null;
  return <SEO title={meta.title} description={meta.description} canonical={pathname} />;
}
