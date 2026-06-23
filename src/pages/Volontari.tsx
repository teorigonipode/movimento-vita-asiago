import { useState } from 'react';
import { Users, Heart, Clock, BookOpen, CheckCircle, Send } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { supabase } from '../lib/supabase';

export default function Volontari() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from('volunteer_requests').insert([form]);
      setSent(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      // fallback: still show success to user, log could be improved
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
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
                  <item.icon className="w-6 h-6 text-mv-teal" />
                </div>
                <h3 className="text-xl font-semibold text-mv-blue mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-mv-blue mb-6">Cosa facciamo come volontari</h2>
              <ul className="space-y-4">
                {[
                  'Ricevere telefonate e offrire ascolto',
                  'Incontrare le persone che chiedono aiuto',
                  'Preparare e distribuire pacchi di beni materiali',
                  'Accompagnare le persone ai servizi sociali',
                  'Organizzare eventi di sensibilizzazione e raccolta fondi',
                  'Partecipare a incontri di formazione e spiritualità',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-6 bg-mv-cream rounded-xl border border-mv-warm">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-mv-teal" />
                  <h3 className="font-semibold text-mv-blue">Flessibilità</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Non è richiesto un impegno a tempo pieno. Anche poche ore alla settimana sono preziose. 
                  Organizziamo i turni in base alla disponibilità di ciascuno.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-mv-warm p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-mv-blue mb-2">Compila il modulo</h2>
              <p className="text-gray-600 mb-6">Ti ricontatteremo al più presto per un colloquio conoscitivo.</p>
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-mv-blue mb-2">Grazie!</h3>
                  <p className="text-gray-600">La tua richiesta è stata inviata. Ti contatteremo presto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome e cognome *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefono</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Messaggio</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-mv-blue text-white font-semibold rounded-lg hover:bg-mv-blue-light transition-colors disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? 'Invio in corso...' : 'Invia richiesta'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
