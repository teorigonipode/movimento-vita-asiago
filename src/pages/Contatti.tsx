import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { supabase } from '../lib/supabase';

export default function Contatti() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await supabase.from('contact_messages').insert([form]);
      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contatti</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Siamo qui per te. Scrivici, chiamaci o vieni a trovarci. La tua richiesta sarà trattata con la massima discrezione.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Resta in contatto"
            subtitle="Scegli il modo più comodo per raggiungerci."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Phone className="w-6 h-6 text-mv-teal" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Telefono</h3>
              <p className="text-gray-600 text-sm mb-3">Linea attiva per chi ha bisogno di parlare</p>
              <a href="tel:+39000000000" className="text-mv-teal font-semibold hover:underline">+39 000 000 000</a>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Mail className="w-6 h-6 text-mv-teal" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">Rispondiamo entro 24-48 ore</p>
              <a href="mailto:info@movimentovitaasiago.it" className="text-mv-teal font-semibold hover:underline">info@movimentovitaasiago.it</a>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-6 h-6 text-mv-teal" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Sede</h3>
              <p className="text-gray-600 text-sm mb-3">Su appuntamento</p>
              <span className="text-mv-teal font-semibold">Via Roma 1, 36012 Asiago (VI)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-mv-blue mb-6">Orari e modalità</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-mv-blue">Telefono</h3>
                    <p className="text-gray-600 text-sm">Lun-Ven: 9:00 - 18:00. Fuori orario lascia un messaggio: ti richiamiamo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-mv-blue">Incontri di persona</h3>
                    <p className="text-gray-600 text-sm">Su appuntamento, in orari flessibili per garantire la massima riservatezza.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-mv-blue">Email</h3>
                    <p className="text-gray-600 text-sm">Scrivici in qualsiasi momento. Rispondiamo il prima possibile.</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-6 bg-mv-blue rounded-xl text-white">
                <h3 className="font-semibold mb-2">Riservatezza garantita</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Tutte le comunicazioni sono trattate in modo confidenziale. I tuoi dati non verranno mai condivisi con terzi.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-mv-warm p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-mv-blue mb-2">Scrivici</h2>
              <p className="text-gray-600 mb-6">Compila il modulo e ti risponderemo al più presto.</p>
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-mv-blue mb-2">Messaggio inviato!</h3>
                  <p className="text-gray-600">Grazie per averci contattato. Ti risponderemo al più presto.</p>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Oggetto *</label>
                    <input
                      required
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Messaggio *</label>
                    <textarea
                      required
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
                    {loading ? 'Invio in corso...' : 'Invia messaggio'}
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
