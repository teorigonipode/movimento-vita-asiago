import { useEffect } from 'react';
import { siteConfig } from '../config/site';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

const DEFAULT_IMAGE = `${siteConfig.publicSiteUrl}${siteConfig.brandLogo}`;

export default function SEO({ title, description, image = DEFAULT_IMAGE, path, noIndex = false }: SEOProps) {
  const fullTitle = title === siteConfig.name ? title : `${title} | ${siteConfig.shortName}`;
  const canonicalUrl = path ? `${siteConfig.publicSiteUrl}${path}` : '';

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    const removeLink = (rel: string) => {
      document.querySelector(`link[rel="${rel}"]`)?.remove();
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', siteConfig.name, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
      removeLink('canonical');
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
      if (canonicalUrl) {
        setLink('canonical', canonicalUrl);
        setMeta('og:url', canonicalUrl, true);
      }
    }
  }, [fullTitle, description, image, canonicalUrl, noIndex]);

  return null;
}
