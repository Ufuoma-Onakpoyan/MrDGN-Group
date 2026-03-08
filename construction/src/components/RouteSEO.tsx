import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "MR DGN Constructions",
    description: "Top construction company in Asaba, Lagos, Abuja and Nigeria. High-rise buildings, infrastructure, residential and commercial projects. 5+ years, 10+ projects.",
  },
  "/about-us": {
    title: "About Us",
    description: "MR DGN Constructions - Building excellence in Asaba, Lagos, Abuja and Nigeria since 2020. Professional construction services across Nigeria.",
  },
  "/our-services": {
    title: "Our Services",
    description: "Construction services in Asaba, Lagos, Abuja: high-rise, infrastructure, residential, commercial, renovation. Full-service construction Nigeria.",
  },
  "/products": {
    title: "Products",
    description: "Construction products and materials in Asaba, Lagos, Abuja, Nigeria. MR DGN Constructions - quality building materials.",
  },
  "/projects": {
    title: "Projects",
    description: "Construction projects in Asaba, Lagos, Abuja, Nigeria. High-rise, residential, commercial - MR DGN Constructions.",
  },
  "/career": {
    title: "Careers",
    description: "Join MR DGN Constructions. Career opportunities in construction, project management, and engineering.",
  },
  "/blog": {
    title: "Blog",
    description: "Construction insights, project updates, and industry news from MR DGN Constructions.",
  },
  "/contact-us": {
    title: "Contact Us",
    description: "Contact MR DGN Constructions - Asaba, Lagos, Abuja, Nigeria. Construction inquiries, projects, building materials. Call +234 813 532 4467.",
  },
  "/process": {
    title: "Our Process",
    description: "How we deliver construction projects. From planning to completion with MR DGN Constructions.",
  },
  "/testimonials": {
    title: "Testimonials",
    description: "Client testimonials and reviews for MR DGN Constructions. See what our clients say about us.",
  },
  "/faq": {
    title: "FAQ",
    description: "Frequently asked questions about MR DGN Constructions and our services.",
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
        description="Read our latest construction insights and project updates."
        canonical={pathname}
        ogType="article"
      />
    );
  }
  if (pathname.startsWith("/our-services/") && pathname !== "/our-services") {
    return (
      <SEO
        title="Service"
        description="Construction service details from MR DGN Constructions."
        canonical={pathname}
      />
    );
  }
  if (pathname.startsWith("/project/")) {
    return (
      <SEO
        title="Project"
        description="View construction project details from MR DGN Constructions."
        canonical={pathname}
      />
    );
  }

  if (!meta) return null;
  return <SEO title={meta.title} description={meta.description} canonical={pathname} />;
}
