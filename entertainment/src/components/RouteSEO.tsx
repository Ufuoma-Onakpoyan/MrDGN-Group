import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "MR DGN Entertainment",
    description: "Leading entertainment company in Asaba, Lagos, Abuja and Nigeria. Movies, YouTube content, event sponsorship, Nollywood. MR DGN Entertainment.",
  },
  "/about": {
    title: "About Us",
    description: "MR DGN Entertainment - Movies, event sponsorship and content across Asaba, Lagos, Abuja and Nigeria. A subsidiary of MR DGN Group.",
  },
  "/blog": {
    title: "Blog",
    description: "Latest news, updates, and behind-the-scenes content from MR DGN Entertainment.",
  },
  "/events": {
    title: "Events & Sponsorships",
    description: "MR DGN Entertainment events, film festivals, and sponsorship opportunities.",
  },
  "/contact": {
    title: "Contact",
    description: "Contact MR DGN Entertainment - Asaba, Lagos, Abuja, Nigeria. Event sponsorship, partnerships, inquiries. Call +234 813 532 4467.",
  },
  "/careers": {
    title: "Careers",
    description: "Join MR DGN Entertainment. Careers in film, content creation, and entertainment.",
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
        description="Read our latest entertainment news and updates."
        canonical={pathname}
        ogType="article"
      />
    );
  }

  if (!meta) return null;
  return <SEO title={meta.title} description={meta.description} canonical={pathname} />;
}
