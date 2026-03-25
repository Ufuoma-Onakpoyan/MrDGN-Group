import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogType?: string;
  noindex?: boolean;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || "https://entertainment.mrdgngroup.com";
const DEFAULT_TITLE = "MR DGN Entertainment | Movies, YouTube Content & Event Sponsorship";
const DEFAULT_DESC = "MR DGN Entertainment - Nigerian entertainment company specializing in movies, YouTube content, event sponsorship, and shorts. A subsidiary of MR DGN Group.";

export function SEO({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogImage = "/assets/4b1198b0-1fdd-4278-ac0c-203ae87eef5d.png",
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogType = "website",
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | MR DGN Entertainment` : DEFAULT_TITLE;
  const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:image", fullOgImage, true);
    setMeta("og:image:width", String(ogImageWidth), true);
    setMeta("og:image:height", String(ogImageHeight), true);
    setMeta("og:type", ogType, true);
    setMeta("og:url", fullCanonical, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", fullOgImage);

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", fullCanonical);

    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    }
  }, [fullTitle, description, fullCanonical, fullOgImage, ogType, noindex, ogImageWidth, ogImageHeight]);

  return null;
}
