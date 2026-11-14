import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import { siteConfig } from '../config/site';

export default function Contatti() {
  return (
    <div>
      <SEO
        title="Contatti"
        description="Contatta il Movimento per la Vita Asiago. Puoi contattarci direttamente per telefono o via email. Ti risponderemo con discrezione e riservatezza."
        path="/contatti"
      />

      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contatti</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Puoi contattarci direttamente per telefono o via email. Ti risponderemo con discrezione e riservatezza.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Resta in contatto"
            subtitle="Scegli il modo più comodo per raggiungerci."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Phone className="w-6 h-6 text-mv-teal" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Chiama ora</h3>
              <p className="text-gray-600 text-sm mb-3">Linea attiva per chi ha bisogno di parlare</p>
              <a
                href={siteConfig.phone.href}
                className="text-mv-teal font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-mv-teal rounded px-1"
              >
                {siteConfig.phone.display}
              </a>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Mail className="w-6 h-6 text-mv-teal" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Scrivici</h3>
              <p className="text-gray-600 text-sm mb-3">Rispondiamo entro 24-48 ore</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-mv-teal font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-mv-teal rounded px-1 break-all"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-6 h-6 text-mv-teal" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Sede</h3>
              <p className="text-gray-600 text-sm mb-3">Su appuntamento</p>
              <span className="text-mv-teal font-semibold">{siteConfig.address}</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-mv-blue">Telefono</h3>
                <p className="text-gray-600 text-sm">Lun-Ven: 9:00 - 18:00. Fuori orario lascia un messaggio: ti richiamiamo.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-mv-blue">Incontri di persona</h3>
                <p className="text-gray-600 text-sm">Su appuntamento, in orari flessibili per garantire la massima riservatezza.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h3 className="font-semibold text-mv-blue">Email</h3>
                <p className="text-gray-600 text-sm">Scrivici in qualsiasi momento. Rispondiamo il prima possibile.</p>
              </div>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-10 p-6 bg-mv-blue rounded-xl text-white">
            <h3 className="font-semibold mb-2">Riservatezza garantita</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Tutte le comunicazioni sono trattate in modo confidenziale. I tuoi dati non verranno mai condivisi con terzi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
