import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { siteConfig } from '../config/site';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi siamo' },
  { to: '/come-possiamo-aiutarti', label: 'Come possiamo aiutarti' },
  { to: '/non-sei-sola', label: 'Non sei sola' },
  { to: '/notizie', label: 'Notizie' },
  { to: '/volontari', label: 'Volontari' },
  { to: '/contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-mv-warm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 lg:min-h-20 gap-4">
          <Link to="/" className="shrink-0 focus:outline-none focus:ring-2 focus:ring-mv-teal rounded-lg" aria-label={`${siteConfig.name} - Home`}>
            <img src={siteConfig.brandLogo} alt={siteConfig.name} className="w-44 sm:w-56 lg:w-64 h-auto max-h-14 object-contain object-left" />
          </Link>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Navigazione principale">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`px-2.5 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal ${active ? 'text-mv-blue bg-mv-warm' : 'text-gray-600 hover:text-mv-blue hover:bg-mv-warm'}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <a href={siteConfig.phone.href} className="flex items-center gap-1.5 text-sm font-medium text-mv-blue hover:text-mv-teal transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal rounded-lg px-2 py-1" aria-label={`Chiama il ${siteConfig.phone.display}`}>
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Chiama</span>
            </a>
            <Link to="/donazioni" className="px-4 py-2 bg-mv-teal text-white text-sm font-semibold rounded-lg hover:bg-mv-teal-light transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal focus:ring-offset-2">
              Sostienici
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="xl:hidden p-2 rounded-md text-mv-blue hover:bg-mv-warm focus:outline-none focus:ring-2 focus:ring-mv-teal" aria-label={open ? 'Chiudi menu' : 'Apri menu'} aria-expanded={open} aria-controls="mobile-nav">
            {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="xl:hidden border-t border-mv-warm bg-white">
          <nav className="px-4 py-3 space-y-1" aria-label="Navigazione mobile">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return <Link key={link.to} to={link.to} onClick={() => setOpen(false)} aria-current={active ? 'page' : undefined} className={`block px-3 py-2.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-mv-teal ${active ? 'text-mv-blue bg-mv-warm' : 'text-gray-600 hover:text-mv-blue hover:bg-mv-warm'}`}>{link.label}</Link>;
            })}
            <div className="pt-3 border-t border-mv-warm space-y-2">
              <a href={siteConfig.phone.href} className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-mv-blue focus:outline-none focus:ring-2 focus:ring-mv-teal rounded-md" aria-label={`Chiama il ${siteConfig.phone.display}`}>
                <Phone className="w-4 h-4 text-mv-teal" aria-hidden="true" />
                Chiama {siteConfig.phone.display}
              </a>
              <Link to="/donazioni" onClick={() => setOpen(false)} className="block px-3 py-2.5 bg-mv-teal text-white text-sm font-semibold rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-mv-teal focus:ring-offset-2">Sostienici</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
