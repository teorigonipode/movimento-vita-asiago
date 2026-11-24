import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { siteConfig } from '../config/site';

export default function Footer() {
  return (
    <footer className="bg-mv-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.25fr_0.75fr_1.4fr_0.9fr] gap-10">
          <div>
            <Link to="/" className="inline-block bg-white rounded-xl p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-mv-teal focus:ring-offset-2 focus:ring-offset-mv-blue">
              <img src={siteConfig.brandLogo} alt={siteConfig.name} className="w-56 h-auto" />
            </Link>
            <p className="text-white/80 text-sm leading-relaxed">Ascolto, accoglienza e sostegno concreto per donne, mamme e famiglie dell’Altopiano dei Sette Comuni.</p>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-mv-teal-light">Link utili</h2>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link to="/chi-siamo" className="hover:text-white transition-colors">Chi siamo</Link></li>
              <li><Link to="/come-possiamo-aiutarti" className="hover:text-white transition-colors">Come possiamo aiutarti</Link></li>
              <li><Link to="/non-sei-sola" className="hover:text-white transition-colors">Non sei sola</Link></li>
              <li><Link to="/notizie" className="hover:text-white transition-colors">Notizie</Link></li>
              <li><Link to="/volontari" className="hover:text-white transition-colors">Volontari</Link></li>
              <li><Link to="/donazioni" className="hover:text-white transition-colors">Sostienici</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-mv-teal-light">Contatti</h2>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-mv-teal-light shrink-0" aria-hidden="true" /><span>{siteConfig.locationName}</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-mv-teal-light shrink-0" aria-hidden="true" /><a href={siteConfig.phone.href} className="hover:text-white transition-colors">{siteConfig.phone.display}</a></li>
              <li className="flex items-start gap-2 min-w-0"><Mail className="w-4 h-4 mt-0.5 text-mv-teal-light shrink-0" aria-hidden="true" /><a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors break-words min-w-0">{siteConfig.email}</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mb-4 text-mv-teal-light">Orari di apertura</h2>
            <ul className="space-y-3 text-sm text-white/80">
              {siteConfig.openingHours.map((item) => <li key={item.day} className="flex items-start gap-2"><Clock className="w-4 h-4 mt-0.5 text-mv-teal-light shrink-0" aria-hidden="true" /><span><strong className="text-white">{item.day}</strong><br />{item.hours}</span></li>)}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4"><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link><Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></div>
        </div>
      </div>
    </footer>
  );
}
