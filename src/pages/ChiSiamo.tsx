import { Heart, Target, Users, Calendar, Award } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';

const milestones = [
  { year: '2024', title: 'Fondazione', desc: 'Nasce la sede locale di Asiago, collegata al Movimento per la Vita Italiano.' },
  { year: '2024', title: 'Primi volontari', desc: 'Un gruppo di cittadini si unisce per offrire ascolto e aiuto concreto sul territorio.' },
  { year: '2025', title: 'Espansione servizi', desc: 'Allargamento delle attività di supporto materiale e orientamento sociale.' },
];

export default function ChiSiamo() {
  return (
    <div>
      <SEO
        title="Chi siamo"
        description="La sede di Asiago del Movimento per la Vita Italiano: un gruppo di volontari uniti dalla volontà di aiutare chi e in difficolta."
        path="/chi-siamo"
      />
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Chi siamo</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            La sede di Asiago del Movimento per la Vita Italiano: un gruppo di volontari uniti dalla volontà di aiutare chi è in difficoltà.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-mv-blue/5">
              <img
                src="https://images.pexels.com/photos/6647118/pexels-photo-6647118.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Volontari al lavoro"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-mv-blue mb-6">La nostra storia</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Il Movimento per la Vita Asiago è la sede locale del Movimento per la Vita Italiano, 
                un'associazione che da decenni opera in tutta Italia per offrire ascolto, accoglienza 
                e aiuto concreto a chi si trova in situazioni di difficoltà.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Siamo un gruppo di volontari che credono nel valore della persona e nella forza della 
                comunità. Non giudichiamo, non imponiamo: ascoltiamo, accogliamo e aiutiamo secondo 
                le reali necessità di chi bussa alla nostra porta.
              </p>
              <p className="text-gray-600 leading-relaxed">
                La nostra sede di Asiago rappresenta un punto di riferimento per l'Altopiano e i 
                comuni limitrofi, offrendo un servizio vicino, concreto e rispettoso della privacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-mv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="I nostri principi"
            subtitle="Valori che guidano ogni nostra azione e decisione."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Rispetto della vita', desc: 'Ogni persona ha dignità intrinseca, indipendentemente dalle circostanze.' },
              { icon: Target, title: 'Concretezza', desc: 'Offriamo aiuto reale: ascolto, beni materiali, orientamento ai servizi.' },
              { icon: Users, title: 'Volontariato', desc: 'Il nostro impegno è gratuito, mosso dalla solidarietà e dalla compassione.' },
              { icon: Award, title: 'Trasparenza', desc: 'Gestiamo le risorse con onestà e rendicontiamo le nostre attività.' },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-mv-warm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-mv-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-mv-teal" />
                </div>
                <h3 className="font-semibold text-mv-blue mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Cronologia"
            subtitle="I passi fondamentali della nostra associazione."
          />
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-mv-teal/30 ml-4 md:ml-6 space-y-10">
              {milestones.map((m, i) => (
                <div key={i} className="relative pl-8 md:pl-10">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 bg-mv-teal rounded-full border-4 border-white shadow-sm" />
                  <div className="flex items-center gap-3 mb-1">
                    <Calendar className="w-4 h-4 text-mv-teal" />
                    <span className="text-sm font-semibold text-mv-teal">{m.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-mv-blue">{m.title}</h3>
                  <p className="text-gray-600 mt-1">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
