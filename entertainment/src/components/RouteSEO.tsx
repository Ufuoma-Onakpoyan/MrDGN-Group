import { useLocation } from "react-router-dom";
import { SEO } from "./SEO";

const routeMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "MR DGN Entertainment",
    description: "MR DGN Entertainment - Nigerian entertainment company specializing in movies, YouTube content, event sponsorship, and shorts. A subsidiary of MR DGN Group.",
  },
  "/about": {
    title: "About Us",
    description: "Learn about MR DGN Entertainment. Movies, YouTube content, event sponsorship, and short-form content. A subsidiary of MR DGN Group.",
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
    description: "Contact MR DGN Entertainment. Get in touch for partnerships, events, and inquiries.",
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
