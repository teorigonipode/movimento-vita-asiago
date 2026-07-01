import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Phone } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/come-possiamo-aiutarti', label: 'Come possiamo aiutarti' },
  { to: '/donazioni', label: 'Donazioni' },
  { to: '/volontari', label: 'Volontari' },
  { to: '/contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-mv-warm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0 focus:outline-none focus:ring-2 focus:ring-mv-teal rounded-lg px-1" aria-label="Movimento per la Vita Asiago - Home">
            <Heart className="w-7 h-7 text-mv-teal fill-mv-teal" aria-hidden="true" />
            <div className="leading-tight">
              <span className="block text-sm font-semibold text-mv-blue tracking-wide">
                Movimento per la Vita
              </span>
              <span className="block text-xs text-mv-teal font-medium">
                Asiago
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigazione principale">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal ${
                    active
                      ? 'text-mv-blue bg-mv-warm'
                      : 'text-gray-600 hover:text-mv-blue hover:bg-mv-warm'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+39000000000"
              className="flex items-center gap-1.5 text-sm font-medium text-mv-teal hover:text-mv-teal-light transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal rounded-lg px-2 py-1"
              aria-label="Chiama per chiedere aiuto"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Chiedi aiuto</span>
            </a>
            <Link
              to="/volontari"
              className="px-4 py-2 bg-mv-blue text-white text-sm font-medium rounded-lg hover:bg-mv-blue-light transition-colors focus:outline-none focus:ring-2 focus:ring-mv-blue focus:ring-offset-2"
            >
              Diventa volontario
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-mv-warm focus:outline-none focus:ring-2 focus:ring-mv-teal"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-mv-warm bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`block px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mv-teal ${
                    active
                      ? 'text-mv-blue bg-mv-warm'
                      : 'text-gray-600 hover:text-mv-blue hover:bg-mv-warm'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-3 border-t border-mv-warm space-y-2">
              <a
                href="tel:+39000000000"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-mv-teal focus:outline-none focus:ring-2 focus:ring-mv-teal rounded-md"
                aria-label="Chiama per chiedere aiuto"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Chiedi aiuto
              </a>
              <Link
                to="/volontari"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 bg-mv-blue text-white text-sm font-medium rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-mv-blue focus:ring-offset-2"
              >
                Diventa volontario
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
