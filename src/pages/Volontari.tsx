import { Users, Heart, Clock, BookOpen, CheckCircle, Phone, Mail } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import { siteConfig, volunteerMailtoHref } from '../config/site';

export default function Volontari() {
  return (
    <div>
      <SEO
        title="Diventa volontario"
        description="Unisciti al Movimento per la Vita Asiago. Il tuo tempo e la tua empatia possono fare la differenza nella vita di qualcuno."
        path="/volontari"
      />

      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Diventa volontario</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Il tuo tempo e la tua empatia possono fare la differenza nella vita di qualcuno. Unisciti a noi.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Perché unirsi a noi"
            subtitle="Essere volontario significa mettersi al servizio degli altri con umiltà e generosità."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Heart, title: 'Fare del bene', desc: 'Ogni ora dedicata si traduce in aiuto concreto per chi soffre o è in difficoltà.' },
              { icon: Users, title: 'Fare parte di una comunità', desc: 'Entra a far parte di un gruppo solido, unito da valori condivisi e amicizia vera.' },
              { icon: BookOpen, title: 'Crescere personalmente', desc: 'Formazione continua e opportunità di crescita umana e spirituale.' },
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <item.icon className="w-6 h-6 text-mv-teal" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-mv-blue mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-mv-blue mb-6">Cosa facciamo come volontari</h2>
            <ul className="space-y-4 mb-10">
              {[
                'Ricevere telefonate e offrire ascolto',
                'Incontrare le persone che chiedono aiuto',
                'Preparare e distribuire pacchi di beni materiali',
                'Accompagnare le persone ai servizi sociali',
                'Organizzare eventi di sensibilizzazione e raccolta fondi',
                'Partecipare a incontri di formazione e spiritualità',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-6 bg-mv-cream rounded-xl border border-mv-warm">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-mv-teal" aria-hidden="true" />
                <h3 className="font-semibold text-mv-blue">Flessibilità</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Non è richiesto un impegno a tempo pieno. Anche poche ore alla settimana sono preziose.
                Organizziamo i turni in base alla disponibilità di ciascuno.
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mt-12 text-center">
            <h2 className="text-2xl font-bold text-mv-blue mb-4">Vuoi unirti a noi?</h2>
            <p className="text-gray-600 mb-8">
              Contattaci per diventare volontario. Ti ricontatteremo per un colloquio conoscitivo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={volunteerMailtoHref()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-mv-teal text-white font-semibold rounded-lg hover:bg-mv-teal-light transition-colors focus:outline-none focus:ring-2 focus:ring-mv-teal focus:ring-offset-2"
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                Scrivici per diventare volontario
              </a>
              <a
                href={siteConfig.phone.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-mv-blue font-semibold rounded-lg border border-mv-blue hover:bg-mv-warm transition-colors focus:outline-none focus:ring-2 focus:ring-mv-blue focus:ring-offset-2"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Chiamaci
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
