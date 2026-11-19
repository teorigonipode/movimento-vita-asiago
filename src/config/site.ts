export const siteConfig = {
  name: 'Centro Aiuto alla Vita – Altopiano dei Sette Comuni',
  shortName: 'Centro Aiuto alla Vita',
  locality: 'Altopiano dei Sette Comuni',
  description:
    'Centro Aiuto alla Vita dell’Altopiano dei Sette Comuni: ascolto, accoglienza e sostegno concreto per donne, mamme e famiglie in difficoltà.',
  phone: {
    display: '0424 1954228',
    href: 'tel:+3904241954228',
  },
  email: 'cavmpvaltopiano7comuni@gmail.com',
  locationName: 'Presso il Centro Giovanile di Asiago',
  openingHours: [
    { day: 'Mercoledì', hours: '14:00 – 15:30' },
    { day: 'Venerdì', hours: '09:30 – 11:00' },
  ],
  publicSiteUrl: import.meta.env.VITE_PUBLIC_SITE_URL || 'https://movimento-vita-asiago.vercel.app',
  volunteerMailtoSubject: 'Disponibilità come volontario',
  brandLogo: '/brand/logo-cav-mpv-altopiano.png',
};

export function volunteerMailtoHref(): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.volunteerMailtoSubject)}`;
}
