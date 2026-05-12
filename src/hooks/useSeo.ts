import { useEffect } from "react";

interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

export function useSeo(meta: SeoMeta) {
  useEffect(() => {
    const setMeta = (name: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setProperty = (property: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    document.title = meta.title;

    setMeta("description", meta.description);

    if (meta.ogImage) {
      setProperty("og:image", meta.ogImage);
      setProperty("twitter:image", meta.ogImage);
    }

    if (meta.ogType) {
      setProperty("og:type", meta.ogType);
    }

    setProperty("og:title", meta.title);

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.href = meta.canonical || window.location.origin + window.location.pathname;
    }

    if (meta.noIndex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      setMeta("robots", "index, follow");
    }

    return () => {
      const metas = document.querySelectorAll(
        'meta[name="description"], meta[property="og:title"], meta[property="og:image"], meta[property="twitter:image"], meta[property="og:type"], meta[name="robots"]'
      );
      metas.forEach((m) => m.remove());
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.remove();
    };
  }, [meta]);
}