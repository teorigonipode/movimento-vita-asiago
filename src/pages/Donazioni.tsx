import { Heart, Banknote, ArrowRight, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

export default function Donazioni() {
  return (
    <div>
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Donazioni</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Il tuo contributo ci permette di aiutare chi è in difficoltà. Ogni donazione, grande o piccola, fa la differenza.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Sostieni il nostro impegno"
            subtitle="Le donazioni ci consentono di acquistare beni materiali, organizzare eventi e garantire la continuità dei servizi."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Heart, title: 'Donazione libera', desc: 'Versa l\'importo che desideri. Ogni euro viene usato con trasparenza per aiutare chi ne ha bisogno.' },
              { icon: Banknote, title: '5x1000', desc: 'Destina il tuo 5x1000 al Movimento per la Vita. Codice fiscale da inserire in fase di dichiarazione.' },
              { icon: CheckCircle, title: 'Beni materiali', desc: 'Puoi donare alimentari, vestiti, prodotti per l\'infanzia e altri beni di prima necessità.' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-mv-teal" />
                </div>
                <h3 className="text-xl font-semibold text-mv-blue mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-mv-cream rounded-2xl p-8 border border-mv-warm">
              <h2 className="text-2xl font-bold text-mv-blue mb-6">Come donare</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-mv-teal rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-mv-blue">Bonifico bancario</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      IBAN: IT00 X 0000 0000 0000 0000 000<br />
                      Intestato a: Movimento per la Vita Asiago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-mv-teal rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-mv-blue">5x1000</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Inserisci il nostro Codice Fiscale nella tua dichiarazione dei redditi.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-mv-teal rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-mv-blue">Beni materiali</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Porta i tuoi doni presso la nostra sede in Via Roma 1, Asiago. Ti aspettiamo su appuntamento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-mv-blue rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Trasparenza totale</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Rendicontiamo periodicamente le nostre attività e l'uso delle risorse. 
                Crediamo che la fiducia si costruisca con la trasparenza e la concretezza.
              </p>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-mv-teal" />
                  Bilancio annuale pubblicato
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-mv-teal" />
                  Detrazioni fiscali per le donazioni
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-mv-teal" />
                  Uso etico e responsabile dei fondi
                </li>
              </ul>
              <div className="mt-8">
                <a
                  href="mailto:info@movimentovitaasiago.it"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-mv-teal text-white font-semibold rounded-lg hover:bg-mv-teal-light transition-colors"
                >
                  Contattaci per maggiori info
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
