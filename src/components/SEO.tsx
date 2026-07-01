import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1200';
const SITE_NAME = 'Movimento per la Vita Asiago';
const SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || '';

export default function SEO({ title, description, image = DEFAULT_IMAGE, path, noIndex = false }: SEOProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = path && SITE_URL ? `${SITE_URL}${path}` : '';

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
      const el = document.querySelector(`link[rel="${rel}"]`);
      if (el) el.remove();
    };

    setMeta('description', description);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    if (noIndex) {
      setMeta('robots', 'noindex, nofollow');
      removeLink('canonical');
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
      if (canonicalUrl) {
        setLink('canonical', canonicalUrl);
        setMeta('og:url', canonicalUrl, true);
      }
    }
  }, [fullTitle, description, image, canonicalUrl, noIndex]);

  return null;
}
