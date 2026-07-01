import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mv-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-mv-teal fill-mv-teal" />
              <span className="font-semibold text-lg">Movimento per la Vita Asiago</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Sede locale del Movimento per la Vita Italiano. Ascolto, accoglienza e aiuto concreto per chi ne ha bisogno, nel pieno rispetto della riservatezza.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-mv-gold">Link utili</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/chi-siamo" className="hover:text-white transition-colors">Chi siamo</Link></li>
              <li><Link to="/come-possiamo-aiutarti" className="hover:text-white transition-colors">Come possiamo aiutarti</Link></li>
              <li><Link to="/volontari" className="hover:text-white transition-colors">Diventa volontario</Link></li>
              <li><Link to="/donazioni" className="hover:text-white transition-colors">Donazioni</Link></li>
              <li><Link to="/contatti" className="hover:text-white transition-colors">Contatti</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-mv-gold">Contatti</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-mv-teal shrink-0" />
                <span>Via Roma 1, 36012 Asiago (VI)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-mv-teal shrink-0" />
                <a href="tel:+39000000000" className="hover:text-white transition-colors">+39 000 000 000</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-mv-teal shrink-0" />
                <a href="mailto:info@movimentovitaasiago.it" className="hover:text-white transition-colors">info@movimentovitaasiago.it</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-mv-gold">Riferimenti</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Movimento per la Vita Italiano</li>
              <li>Associazione senza scopo di lucro</li>
              <li>C.F. / P.IVA da inserire</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Movimento per la Vita Asiago. Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
