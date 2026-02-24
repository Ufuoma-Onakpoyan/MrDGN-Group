import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
}

const SITE_URL = import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "https://mansaluxerealty.com");
const DEFAULT_TITLE = "Mansa Luxe Realty Limited - Nigeria's Premier Luxury Real Estate";
const DEFAULT_DESC = "Discover Nigeria's most prestigious properties with Mansa Luxe Realty Limited. Luxury real estate in Lagos, Abuja, Victoria Island, Ikoyi, and Port Harcourt.";

export function SEO({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogImage = "/assets/logo-mansaluxe.png",
  ogType = "website",
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} | Mansa Luxe Realty` : DEFAULT_TITLE;
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
    setMeta("og:type", ogType, true);
    setMeta("og:url", fullCanonical, true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);

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
  }, [fullTitle, description, fullCanonical, fullOgImage, ogType, noindex]);

  return null;
}
