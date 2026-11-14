export const siteConfig = {
  name: 'Movimento per la Vita Asiago',
  shortName: 'Movimento per la Vita',
  locality: 'Asiago',
  description:
    'Ascolto, accoglienza e aiuto concreto per chi è in difficoltà. Sede locale del Movimento per la Vita Italiano.',
  phone: {
    display: '+39 000 000 000',
    href: 'tel:+39000000000',
  },
  email: 'info@movimentovitaasiago.it',
  address: 'Via Roma 1, 36012 Asiago (VI)',
  publicSiteUrl: import.meta.env.VITE_PUBLIC_SITE_URL || 'https://movimento-vita-asiago.vercel.app',
  volunteerMailtoSubject: 'Disponibilità come volontario',
};

export function volunteerMailtoHref(): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(siteConfig.volunteerMailtoSubject)}`;
}
