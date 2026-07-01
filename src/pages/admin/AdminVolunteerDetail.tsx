import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Phone, Mail, Calendar, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase, type VolunteerRequest } from '../../lib/supabase';
import SEO from '../../components/SEO';

const statuses = ['Nuovo', 'In lavorazione', 'Contattata', 'Chiuso'];

const statusColors: Record<string, string> = {
  'Nuovo': 'bg-blue-100 text-blue-800 border-blue-200',
  'In lavorazione': 'bg-amber-100 text-amber-800 border-amber-200',
  'Contattata': 'bg-green-100 text-green-800 border-green-200',
  'Chiuso': 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function AdminVolunteerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [volunteer, setVolunteer] = useState<VolunteerRequest | null>(null);
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVolunteer();
  }, [id]);

  const fetchVolunteer = async () => {
    if (!supabase || !id) return;
    setLoading(true);
    const { data, error } = await supabase!
      .from('volunteer_requests')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      setError('Candidatura non trovata.');
      setLoading(false);
      return;
    }

    setVolunteer(data);
    setStatus(data.status);
    setNotes(data.notes || '');
    setLoading(false);
  };

  const handleSave = async () => {
    if (!supabase || !id) return;
    setSaving(true);
    setSaved(false);
    setError('');

    const { error: updateError } = await supabase!
      .from('volunteer_requests')
      .update({ status, notes: notes.trim() || null })
      .eq('id', id);

    if (updateError) {
      setError('Errore durante il salvataggio. Riprova.');
      setSaving(false);
      return;
    }

    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Caricamento...</p>
      </div>
    );
  }

  if (error || !volunteer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" aria-hidden="true" />
          <p className="text-gray-600 text-lg">{error || 'Errore'}</p>
          <button
            onClick={() => navigate('/admin/volunteers')}
            className="mt-4 px-4 py-2 bg-mv-blue text-white rounded-lg hover:bg-mv-blue-light transition-colors"
          >
            Torna alle candidature
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Dettaglio Candidatura" description="" noIndex />
      {/* Header */}
      <header className="bg-mv-blue text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/volunteers')}
            className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Indietro
          </button>
          <h1 className="text-lg font-bold">Dettaglio candidatura</h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Info card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${statusColors[volunteer.status]}`}>
              {volunteer.status}
            </span>
            <span className="text-sm text-gray-400 flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(volunteer.created_at).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>

          <h2 className="text-xl font-bold text-mv-blue mb-4">{volunteer.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-mv-teal/10 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-mv-teal" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Nome</p>
                <p className="font-medium text-gray-800">{volunteer.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-mv-teal/10 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-mv-teal" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <a href={`mailto:${volunteer.email}`} className="font-medium text-mv-teal hover:underline">
                  {volunteer.email}
                </a>
              </div>
            </div>
            {volunteer.phone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-mv-teal/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-mv-teal" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Telefono</p>
                  <a href={`tel:${volunteer.phone}`} className="font-medium text-mv-teal hover:underline">
                    {volunteer.phone}
                  </a>
                </div>
              </div>
            )}
            {volunteer.availability && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-mv-teal/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-mv-teal" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Disponibilita</p>
                  <p className="font-medium text-gray-800">{volunteer.availability}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-mv-cream rounded-lg border border-mv-warm mb-4">
            <p className="text-xs text-gray-500 mb-1">Motivazione</p>
            <p className="text-gray-700 whitespace-pre-wrap">{volunteer.motivation || 'Non specificata'}</p>
          </div>
        </div>

        {/* Edit section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-mv-blue mb-4">Aggiorna candidatura</h3>

          <div className="space-y-5">
            <div>
              <label htmlFor="vol-status" className="block text-sm font-medium text-gray-700 mb-2">
                Stato
              </label>
              <select
                id="vol-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none text-base bg-white"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="vol-notes" className="block text-sm font-medium text-gray-700 mb-2">
                Note interne
              </label>
              <textarea
                id="vol-notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Aggiungi note visibili solo agli operatori..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none text-base resize-none"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" aria-hidden="true" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-mv-blue text-white font-semibold rounded-lg hover:bg-mv-blue-light transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-mv-blue focus:ring-offset-2 text-base"
            >
              {saved ? (
                <>
                  <CheckCircle className="w-5 h-5" aria-hidden="true" />
                  Salvato!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" aria-hidden="true" />
                  {saving ? 'Salvataggio...' : 'Salva modifiche'}
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
