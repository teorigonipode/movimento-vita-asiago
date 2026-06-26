import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SEO from '../components/SEO';
import SupabaseError from '../components/SupabaseError';
import { supabase, getSupabaseError } from '../lib/supabase';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  privacy?: string;
}

export default function Contatti() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
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
    if (!form.subject.trim()) newErrors.subject = 'Inserisci l\'oggetto';
    if (!form.message.trim()) newErrors.message = 'Inserisci il messaggio';
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
      const { error } = await supabase!.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        subject: form.subject.trim(),
        message: form.message.trim(),
      });

      if (error) {
        console.error('Supabase insert error:', error);
        setSubmitError(
          'Non siamo riusciti a inviare il messaggio. Ti preghiamo di contattarci telefonicamente o via email.'
        );
        return;
      }

      setSent(true);
      setForm({ name: '', email: '', phone: '', subject: '', message: '', privacy: false });
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
        title="Contatti"
        description="Contatta il Movimento per la Vita Asiago. Siamo qui per ascoltarti e aiutarti con discrezione e riservatezza."
      />

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
                <Phone className="w-6 h-6 text-mv-teal" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Telefono</h3>
              <p className="text-gray-600 text-sm mb-3">Linea attiva per chi ha bisogno di parlare</p>
              <a href="tel:+39000000000" className="text-mv-teal font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-mv-teal rounded px-1">
                +39 000 000 000
              </a>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <Mail className="w-6 h-6 text-mv-teal" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-mv-blue mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">Rispondiamo entro 24-48 ore</p>
              <a href="mailto:info@movimentovitaasiago.it" className="text-mv-teal font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-mv-teal rounded px-1">
                info@movimentovitaasiago.it
              </a>
            </div>
            <div className="p-8 rounded-2xl bg-mv-cream border border-mv-warm text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-mv-teal/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                <MapPin className="w-6 h-6 text-mv-teal" aria-hidden="true" />
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

              {configError && <div className="mb-6"><SupabaseError /></div>}

              {sent ? (
                <div className="text-center py-10" role="status" aria-live="polite">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-mv-blue mb-2">Messaggio inviato!</h3>
                  <p className="text-gray-600">Grazie per averci contattato. Ti risponderemo al più presto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome e cognome <span aria-label="obbligatorio">*</span>
                    </label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-mv-teal focus:border-mv-teal ${
                        errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                      }`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    />
                    {errors.name && (
                      <p id="contact-name-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span aria-label="obbligatorio">*</span>
                      </label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-mv-teal focus:border-mv-teal ${
                          errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                        }`}
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Telefono
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Oggetto <span aria-label="obbligatorio">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      required
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-mv-teal focus:border-mv-teal ${
                        errors.subject ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                      }`}
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                      Messaggio <span aria-label="obbligatorio">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className={`w-full px-4 py-2.5 rounded-lg border outline-none transition-all focus:ring-2 focus:ring-mv-teal focus:border-mv-teal resize-none ${
                        errors.message ? 'border-red-400 focus:ring-red-200' : 'border-gray-300'
                      }`}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" aria-hidden="true" />
                        {errors.message}
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
                        aria-describedby={errors.privacy ? 'contact-privacy-error' : undefined}
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
                      <p id="contact-privacy-error" className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                    aria-label={loading ? 'Invio in corso' : 'Invia messaggio'}
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
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
