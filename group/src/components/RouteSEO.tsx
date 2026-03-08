import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "MR DGN Group",
    description: "MR DGN Group is a diversified holding company building tomorrow's industries across entertainment, construction, and real estate. Operations in Asaba, Lagos, Abuja and Dubai.",
  },
  "/about": {
    title: "About Us",
    description: "Learn about MR DGN Group's mission, vision, and leadership. A diversified holding company operating in entertainment, construction, and real estate across Nigeria and Dubai.",
  },
  "/businesses": {
    title: "Our Businesses",
    description: "MR DGN Entertainment, MR DGN Constructions, Mansa Luxe Realty, and Duerents. Explore our portfolio of businesses driving innovation across industries.",
  },
  "/media": {
    title: "Media & News",
    description: "Stay updated with the latest news, announcements, and insights from MR DGN Group and our portfolio companies.",
  },
  "/careers": {
    title: "Careers",
    description: "Join MR DGN Group. Explore career opportunities across entertainment, construction, real estate, and technology.",
  },
  "/contact": {
    title: "Contact Us",
    description: "Contact MR DGN Group. Head office in Asaba, Delta State. Reach us for business inquiries, partnerships, and general enquiries.",
  },
  "/investors": {
    title: "Investor Relations",
    description: "Investor relations and corporate information for MR DGN Group. Strategic investments across entertainment, construction, and real estate.",
  },
  "/faq": {
    title: "FAQ",
    description: "Frequently asked questions about MR DGN Group, our businesses, and services.",
  },
};

export function RouteSEO() {
  const { pathname } = useLocation();

  const basePath = pathname === "/" ? "/" : "/" + pathname.split("/").filter(Boolean)[0];
  const meta = routeMeta[pathname] ?? routeMeta[basePath];

  if (pathname.startsWith("/blog/")) {
    return (
      <SEO
        title="Blog Post"
        description="Read our latest news and insights from MR DGN Group."
        canonical={pathname}
        ogType="article"
      />
    );
  }

  if (!meta) return null;
  return <SEO title={meta.title} description={meta.description} canonical={pathname} />;
}
