import { Phone, Package, MapPin, Baby, HeartHandshake, Clock, ShieldCheck } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const services = [
  {
    icon: Phone,
    title: 'Ascolto telefonico e in presenza',
    desc: 'Una linea attiva per chi ha bisogno di parlare. L\'ascolto è anonimo, gratuito e senza giudizio. Possiamo anche incontrarci di persona, su appuntamento, nel pieno rispetto della riservatezza.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Package,
    title: 'Supporto materiale',
    desc: 'Distribuiamo pacchi alimentari, vestiti, prodotti per l\'infanzia e beni di prima necessità a chi si trova in difficoltà economica. Tutto in modo discreto e dignitoso.',
    color: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: MapPin,
    title: 'Orientamento ai servizi',
    desc: 'Ti aiutiamo a navigare il sistema dei servizi sociali, sanitari e legali del territorio. Ti indirizziamo verso le strutture più adeguate alle tue esigenze.',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Baby,
    title: 'Accompagnamento in gravidanza',
    desc: 'Sostegno emotivo e pratico per le donne che affrontano una gravidanza difficile o inaspettata. Non sei sola: siamo al tuo fianco in ogni fase.',
    color: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: HeartHandshake,
    title: 'Rete di solidarietà',
    desc: 'Collaboriamo con parrocchie, enti locali e altre associazioni per costruire una rete di aiuto efficace e capillare sull\'Altopiano di Asiago.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    icon: Clock,
    title: 'Disponibilità continuativa',
    desc: 'I nostri volontari si impegnano a garantire una presenza costante, con turni organizzati per rispondere alle richieste nel minor tempo possibile.',
    color: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
];

export default function ComePossiamoAiutarti() {
  return (
    <div>
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Come possiamo aiutarti</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            I nostri servizi sono gratuiti, riservati e accessibili a tutti. Nessuna distinzione, nessun giudizio.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="I nostri servizi"
            subtitle="Scopri tutto ciò che possiamo fare per te o per chi conosci che ha bisogno di aiuto."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <div key={i} className="p-8 rounded-2xl border border-mv-warm hover:shadow-lg transition-all bg-white">
                <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-5`}>
                  <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                </div>
                <h3 className="text-xl font-semibold text-mv-blue mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-mv-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-mv-blue rounded-2xl p-8 md:p-12 text-center">
            <ShieldCheck className="w-12 h-12 text-mv-teal mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">La tua privacy è garantita</h2>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Tutti i dati personali e le informazioni condivise con i nostri volontari sono trattate 
              con la massima riservatezza. Non raccogliamo dati senza consenso e non condividiamo 
              mai informazioni con terzi. La tua dignità e il tuo diritto alla privacy sono per noi 
              assolutamente prioritari.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
