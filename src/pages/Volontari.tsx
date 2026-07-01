import { useState } from 'react';
import { Users, Heart, Clock, BookOpen, CheckCircle, Send, AlertCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import SupabaseError from '../components/SupabaseError';
import { supabase, getSupabaseError } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  availability: string;
  motivation: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  motivation?: string;
  privacy?: string;
}

export default function Volontari() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    availability: '',
    motivation: '',
    privacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const configError = getSupabaseError();

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Inserisci il tuo nome e cognome';
    if (!form.email.trim()) {
      newErrors.email = 'Inserisci la tua email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Inserisci un indirizzo email valido';
    }
    if (!form.motivation.trim()) newErrors.motivation = 'Raccontaci perché vuoi diventare volontario';
    if (!form.privacy) newErrors.privacy = 'Devi accettare la privacy policy per proseguire';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;
    if (!supabase) {
      setSubmitError('Servizio non disponibile. Contattaci telefonicamente o via email.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase!.from('volunteer_requests').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        availability: form.availability.trim() || null,
        motivation: form.motivation.trim(),
      });

      if (error) {
        console.error('Supabase insert error:', error);
        setSubmitError(
          'Non siamo riusciti a inviare la richiesta. Ti preghiamo di contattarci telefonicamente o via email.'
        );
        return;
      }

      setSent(true);
      setForm({ name: '', email: '', phone: '', availability: '', motivation: '', privacy: false });
      setErrors({});
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmitError(
        'Si è verificato un errore imprevisto. Ti preghiamo di contattarci telefonicamente o via email.'
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

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
                    <CheckCircle className="w-5 h-5 text-mv-teal shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-6 bg-mv-cream rounded-xl border border-mv-warm">
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

            <div className="bg-white rounded-2xl border border-mv-warm p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-mv-blue mb-2">Compila il modulo</h2>
              <p className="text-gray-600 mb-6">Ti ricontatteremo al più presto per un colloquio conoscitivo.</p>

              {configError && <div className="mb-6"><SupabaseError /></div>}

              {sent ? (
                <div className="text-center py-10" role="status" aria-live="polite">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-mv-blue mb-2">Grazie!</h3>
                  <p className="text-gray-600">La tua richiesta è stata inviata. Ti contatteremo presto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="vol-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome e cognome <span aria-label="obbligatorio">*</span>
                    </label>
                    <input
                      id="vol-name"
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-mv-teal focus:border-mv-teal ${
                        errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                      }`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'vol-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="vol-name-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="vol-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span aria-label="obbligatorio">*</span>
                      </label>
                      <input
                        id="vol-email"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-mv-teal focus:border-mv-teal ${
                          errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                        }`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'vol-email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="vol-email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="vol-phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefono
                      </label>
                      <input
                        id="vol-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="vol-availability" className="block text-sm font-medium text-gray-700 mb-1">
                      Disponibilità
                    </label>
                    <input
                      id="vol-availability"
                      type="text"
                      placeholder="Es. weekend, pomeriggi, flessibile..."
                      value={form.availability}
                      onChange={(e) => updateField('availability', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="vol-motivation" className="block text-sm font-medium text-gray-700 mb-1">
                      Perché vuoi diventare volontario? <span aria-label="obbligatorio">*</span>
                    </label>
                    <textarea
                      id="vol-motivation"
                      required
                      rows={4}
                      value={form.motivation}
                      onChange={(e) => updateField('motivation', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-mv-teal focus:border-mv-teal resize-none ${
                        errors.motivation ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                      }`}
                      aria-invalid={errors.motivation ? 'true' : 'false'}
                      aria-describedby={errors.motivation ? 'vol-motivation-error' : undefined}
                    />
                    {errors.motivation && (
                      <p id="vol-motivation-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.motivation}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className={`flex items-start gap-3 cursor-pointer p-3 rounded-lg border transition-colors ${
                        errors.privacy ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.privacy}
                        onChange={(e) => updateField('privacy', e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-mv-teal border-gray-300 rounded focus:ring-mv-teal"
                        aria-invalid={errors.privacy ? 'true' : 'false'}
                        aria-describedby={errors.privacy ? 'vol-privacy-error' : undefined}
                      />
                      <span className="text-sm text-gray-600">
                        Ho letto e accetto la{' '}
                        <a href="/privacy-policy" className="text-mv-teal underline hover:text-mv-teal-light focus:outline-none focus:ring-2 focus:ring-mv-teal rounded px-0.5">
                          Privacy Policy
                        </a>{' '}
                        e autorizzo il trattamento dei miei dati personali.
                      </span>
                    </label>
                    {errors.privacy && (
                      <p id="vol-privacy-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.privacy}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <p className="text-sm text-red-700 font-medium">{submitError}</p>
                          <p className="text-sm text-red-600 mt-1">
                            Contattaci telefonicamente al{' '}
                            <a href="tel:+39000000000" className="underline font-medium">+39 000 000 000</a>{' '}
                            o via email a{' '}
                            <a href="mailto:info@movimentovitaasiago.it" className="underline font-medium">info@movimentovitaasiago.it</a>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-mv-blue text-white font-semibold rounded-lg hover:bg-mv-blue-light transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-mv-blue focus:ring-offset-2"
                    aria-label={loading ? 'Invio in corso' : 'Invia richiesta'}
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
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
