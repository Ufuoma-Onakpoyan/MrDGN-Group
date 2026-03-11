import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Building Materials in Asaba | MR DGN Constructions",
    description: "Building materials supplier in Asaba, Delta State. Quality cement, blocks, roofing & construction materials. We also deliver construction projects across Nigeria.",
  },
  "/about-us": {
    title: "About Us",
    description: "Building materials and construction company in Asaba. MR DGN Constructions – your supplier and construction partner in Delta State and Nigeria.",
  },
  "/our-services": {
    title: "Our Services",
    description: "Construction services in Asaba from your local building materials supplier. High-rise, infrastructure, residential, commercial, renovation – full-service construction.",
  },
  "/products": {
    title: "Building Materials Asaba | Cement, Blocks & Construction Materials",
    description: "Buy construction materials in Asaba. Quality cement, blocks, roofing, and building supplies. Delta State. Delivery and construction projects. MR DGN Constructions.",
  },
  "/projects": {
    title: "Projects",
    description: "Our construction projects in Asaba and Nigeria. MR DGN Constructions – building materials supplier and construction company.",
  },
  "/career": {
    title: "Careers",
    description: "Join MR DGN Constructions in Asaba. Careers in building materials supply and construction – project management, engineering, and more.",
  },
  "/blog": {
    title: "Blog",
    description: "Building materials and construction insights from MR DGN Constructions, Asaba. Industry news and project updates.",
  },
  "/contact-us/thank-you": {
    title: "Contact Received",
    description: "Thank you for your inquiry. MR DGN Constructions will get back to you within 24 hours.",
  },
  "/contact-us": {
    title: "Contact Us",
    description: "Contact us for building materials and construction in Asaba. Call or visit. MR DGN Constructions – Delta State. +234 813 532 4467.",
  },
  "/process": {
    title: "Our Process",
    description: "How we supply building materials and deliver construction projects. From order to completion – MR DGN Constructions, Asaba.",
  },
  "/testimonials": {
    title: "Testimonials",
    description: "Client testimonials for MR DGN Constructions – building materials and construction in Asaba and Nigeria.",
  },
  "/faq": {
    title: "FAQ",
    description: "Frequently asked questions about building materials and construction services from MR DGN Constructions, Asaba.",
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    description: "MR DGN Constructions Privacy Policy. How we collect, use, and protect your information.",
  },
  "/terms-of-service": {
    title: "Terms of Service",
    description: "MR DGN Constructions Terms of Service. Terms and conditions for using our website and services.",
  },
};

export function RouteSEO() {
  const { pathname } = useLocation();

  const basePath = pathname === "/" ? "/" : "/" + pathname.split("/").filter(Boolean)[0];
  const meta = routeMeta[pathname] ?? routeMeta[basePath];

  if (pathname.startsWith("/blog/") && pathname !== "/blog") {
    return (
      <SEO
        title="Blog Post"
        description="Building materials and construction insights from MR DGN Constructions, Asaba."
        canonical={pathname}
        ogType="article"
      />
    );
  }
  if (pathname.startsWith("/our-services/") && pathname !== "/our-services") {
    return (
      <SEO
        title="Service"
        description="Construction service details from MR DGN Constructions – building materials supplier and construction company in Asaba."
        canonical={pathname}
      />
    );
  }
  if (pathname.startsWith("/project/")) {
    return (
      <SEO
        title="Project"
        description="Construction project by MR DGN Constructions – building materials and construction in Asaba and Nigeria."
        canonical={pathname}
      />
    );
  }

  if (!meta) return null;
  return <SEO title={meta.title} description={meta.description} canonical={pathname} />;
}
