import { Link } from 'react-router-dom';
import { Heart, Phone, Users, Shield, MessageCircle, HandHeart, ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div>
      <SEO
        title="Movimento per la Vita Asiago"
        description="Ascolto, accoglienza e aiuto concreto per chi e in difficolta. Sede locale del Movimento per la Vita Italiano."
        path="/"
      />
      {/* Hero */}
      <section className="relative bg-mv-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-mv-teal" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-mv-gold text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Movimento per la Vita Asiago
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Non sei sola.<br />
              <span className="text-mv-teal-light">Siamo qui per ascoltarti e aiutarti.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Un gruppo di volontari pronti ad accoglierti con empatia e discrezione. 
              Offriamo ascolto, supporto concreto e accompagnamento senza giudizio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contatti"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-mv-teal text-white font-semibold rounded-lg hover:bg-mv-teal-light transition-colors"
              >
                <Phone className="w-5 h-5" />
                Chiedi aiuto
              </Link>
              <Link
                to="/volontari"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <Users className="w-5 h-5" />
                Diventa volontario
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="I nostri valori"
            subtitle="Ci guidano ogni giorno nel nostro impegno a favore della vita e della persona."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6 text-mv-teal" />
              </div>
              <h3 className="text-xl font-semibold text-mv-blue mb-3">Ascolto</h3>
              <p className="text-gray-600 leading-relaxed">
                Ti diamo tempo e spazio per raccontare la tua storia. Senza fretta, senza giudizio, con attenzione vera.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mb-5">
                <HandHeart className="w-6 h-6 text-mv-teal" />
              </div>
              <h3 className="text-xl font-semibold text-mv-blue mb-3">Accoglienza</h3>
              <p className="text-gray-600 leading-relaxed">
                Ogni persona è unica e merita rispetto. Accogliamo chiunque bussi alla nostra porta con umiltà e apertura.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-mv-teal" />
              </div>
              <h3 className="text-xl font-semibold text-mv-blue mb-3">Riservatezza</h3>
              <p className="text-gray-600 leading-relaxed">
                La tua privacy è sacra. Tutto ciò che condividi rimane strettamente confidenziale, sempre.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services preview */}
      <section className="py-16 md:py-20 bg-mv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Come possiamo aiutarti"
                subtitle="Offriamo diversi servizi gratuiti per chi si trova in difficoltà."
                centered={false}
              />
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mv-teal rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <span className="text-gray-700">Ascolto telefonico e in presenza, anonimo e gratuito</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mv-teal rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <span className="text-gray-700">Supporto materiale: pacchi alimentari, vestiti, prodotti per l'infanzia</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mv-teal rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <span className="text-gray-700">Orientamento verso servizi sociali, sanitari e legali del territorio</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-mv-teal rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <span className="text-gray-700">Accompagnamento durante il percorso di gravidanza e non solo</span>
                </li>
              </ul>
              <Link
                to="/come-possiamo-aiutarti"
                className="inline-flex items-center gap-2 text-mv-teal font-semibold hover:text-mv-teal-light transition-colors"
              >
                Scopri tutti i servizi
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-mv-blue/5 flex items-center justify-center">
                <img
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Volontari che aiutano"
                  className="w-full h-full object-cover rounded-2xl"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20 bg-mv-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Hai bisogno di parlare con qualcuno?
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Non aspettare. Siamo qui per te, ogni giorno. La tua richiesta sarà trattata con la massima discrezione.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contatti"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-mv-teal text-white font-semibold rounded-lg hover:bg-mv-teal-light transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              Chiedi aiuto
            </Link>
            <a
              href="tel:+39000000000"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20 text-lg"
            >
              <Phone className="w-5 h-5" />
              Chiama ora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
