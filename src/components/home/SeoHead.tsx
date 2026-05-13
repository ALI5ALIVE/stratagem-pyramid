import { useEffect } from "react";

const TITLE = "Comply365 — The Operational Performance Platform";
const DESCRIPTION =
  "Comply365 turns operational signals into prescriptive action across Content, Safety and Training — powered by an intelligence layer built on your operational data. Trusted by Qantas, RAF, MoD and 550+ operators.";
const OG_IMAGE = "/og-comply365.png";

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
    if (key && val) el.setAttribute(key, val);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

export default function SeoHead() {
  useEffect(() => {
    document.title = TITLE;
    setMeta('meta[name="description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:title"]', "content", TITLE);
    setMeta('meta[property="og:description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:image"]', "content", OG_IMAGE);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.origin + window.location.pathname);

    const ldId = "ld-comply365-home";
    let ld = document.getElementById(ldId) as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.id = ldId;
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Comply365",
          url: window.location.origin,
          logo: window.location.origin + "/comply365-icon.png",
        },
        {
          "@type": "SoftwareApplication",
          name: "Comply365 Operational Performance Platform",
          applicationCategory: "BusinessApplication",
          description: DESCRIPTION,
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        },
      ],
    });
  }, []);
  return null;
}