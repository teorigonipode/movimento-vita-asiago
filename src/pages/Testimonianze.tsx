import { Quote } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';

const stories = [
  {
    name: 'Maria',
    role: 'Mamma di due bambini',
    text: 'Quando ho scoperto di essere incinta del secondo figlio, ero terrorizzata. Non sapevo come fare. I volontari del Movimento per la Vita mi hanno ascoltata senza giudicarmi, mi hanno aiutata con i beni per il bambino e soprattutto mi hanno fatto sentire meno sola.',
    initial: 'M',
  },
  {
    name: 'Luca',
    role: 'Volontario da un anno',
    text: 'Diventare volontario è stata una delle scelte più belle della mia vita. Aiutare gli altri mi ha arricchito e mi ha fatto scoprire una comunità generosa e concreta. Non serve essere eroi: basta avere un po\' di tempo e tanta empatia.',
    initial: 'L',
  },
  {
    name: 'Anna',
    role: 'Beneficiaria del servizio',
    text: 'Dopo la separazione mi sono trovata senza lavoro e con due figli a carico. Il Movimento per la Vita mi ha sostenuta con pacchi alimentari e mi ha aiutata a contattare i servizi sociali giusti. Non mi hanno mai fatto sentire in colpa.',
    initial: 'A',
  },
  {
    name: 'Paolo',
    role: 'Donatore regolare',
    text: 'Sostengo il Movimento per la Vita da anni perché so che i miei contributi vengono usati con trasparenza e concretezza. Qui non ci sono sprechi: c\'è solo gente che aiuta gente.',
    initial: 'P',
  },
  {
    name: 'Sofia',
    role: 'Giovane madre',
    text: 'Ero giovanissima e spaventata. Pensavo che nessuno mi avrebbe capita. Invece ho trovato persone che mi hanno ascoltata, mi hanno dato informazioni utili e mi hanno sostenuta senza imporre nulla.',
    initial: 'S',
  },
  {
    name: 'Roberto',
    role: 'Volontario anziano',
    text: 'Dopo la pensione volevo dedicarmi a qualcosa di utile. Qui ho trovato uno scopo: ascoltare, aiutare, essere presente. La gratitudine di chi aiuti non ha prezzo.',
    initial: 'R',
  },
];

export default function Testimonianze() {
  return (
    <div>
      <SEO
        title="Testimonianze"
        description="Storie vere di persone che hanno trovato ascolto, aiuto e speranza grazie al nostro impegno."
      />
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Testimonianze</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Storie vere di persone che hanno trovato ascolto, aiuto e speranza grazie al nostro impegno.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Voci dal nostro territorio"
            subtitle="I nomi sono di fantasia per proteggere la privacy, ma le storie sono reali."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <div key={i} className="p-8 rounded-2xl bg-mv-cream border border-mv-warm hover:shadow-lg transition-shadow flex flex-col">
                <Quote className="w-8 h-8 text-mv-teal mb-4" />
                <p className="text-gray-700 leading-relaxed flex-1 mb-6">
                  "{s.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-mv-warm">
                  <div className="w-10 h-10 bg-mv-blue rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {s.initial}
                  </div>
                  <div>
                    <p className="font-semibold text-mv-blue text-sm">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
