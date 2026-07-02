import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import SEO from '../../components/SEO';

type FormData = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  event_date: string;
  cover_image_url: string;
  status: string;
};

type FormErrors = {
  title?: string;
  slug?: string;
  content?: string;
};

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[àá]/g, 'a')
    .replace(/[èé]/g, 'e')
    .replace(/[ìí]/g, 'i')
    .replace(/[òó]/g, 'o')
    .replace(/[ùú]/g, 'u')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminNewsForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<FormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'notizia',
    event_date: '',
    cover_image_url: '',
    status: 'draft',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    if (!supabase || !id) return;
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('news_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !data) {
      setError('Notizia non trovata.');
    } else {
      setForm({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: data.content,
        category: data.category,
        event_date: data.event_date || '',
        cover_image_url: data.cover_image_url || '',
        status: data.status,
      });
    }
    setLoading(false);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.title.trim()) newErrors.title = 'Inserisci il titolo';
    if (!form.slug.trim()) newErrors.slug = 'Inserisci lo slug';
    if (!form.content.trim()) newErrors.content = 'Inserisci il contenuto';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (!validate()) return;
    if (!supabase) {
      setError('Servizio non disponibile.');
      return;
    }

    setSaving(true);

    const updates: Record<string, unknown> = {
      title: form.title.trim(),
      slug: form.slug.trim(),
      excerpt: form.excerpt.trim() || null,
      content: form.content.trim(),
      category: form.category,
      event_date: form.event_date || null,
      cover_image_url: form.cover_image_url.trim() || null,
      status: form.status,
    };

    if (form.status === 'published' && isEdit) {
      const { data: existing } = await supabase
        .from('news_posts')
        .select('published_at')
        .eq('id', id)
        .single();

      if (!existing?.published_at) {
        updates.published_at = new Date().toISOString();
      }
    }

    if (!isEdit && form.status === 'published') {
      updates.published_at = new Date().toISOString();
    }

    let result;
    if (isEdit && id) {
      result = await supabase
        .from('news_posts')
        .update(updates)
        .eq('id', id);
    } else {
      result = await supabase
        .from('news_posts')
        .insert(updates);
    }

    const { error: saveError } = result;

    if (saveError) {
      if (saveError.code === '23505') {
        setErrors({ slug: 'Questo slug e gia in uso' });
      } else {
        setError('Errore durante il salvataggio.');
      }
    } else {
      setSaved(true);
      if (!isEdit) {
        navigate('/admin/news');
      }
    }

    setSaving(false);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Caricamento...</p>
      </div>
    );
  }

  if (error && isEdit) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/admin/news')}
            className="text-mv-teal font-medium hover:text-mv-teal-light"
          >
            Torna alla lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title={isEdit ? 'Modifica Notizia' : 'Nuova Notizia'} description="" noIndex />

      <header className="bg-mv-blue text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/news')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Indietro"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold">
              {isEdit ? 'Modifica notizia' : 'Nuova notizia'}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {saved && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800">Notizia salvata con successo.</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1.5">
              Titolo *
            </label>
            <input
              type="text"
              id="title"
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                updateField('title', title);
                if (!isEdit || form.slug === generateSlug(form.title)) {
                  updateField('slug', generateSlug(title));
                }
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Titolo della notizia"
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1.5">
              Slug (URL) *
            </label>
            <input
              type="text"
              id="slug"
              value={form.slug}
              onChange={(e) => updateField('slug', e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal font-mono text-sm ${
                errors.slug ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="titolo-della-notizia"
            />
            {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
            <p className="text-xs text-gray-500 mt-1">
              URL: /notizie/{form.slug || '...'}
            </p>
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1.5">
              Riassunto
            </label>
            <textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(e) => updateField('excerpt', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal"
              placeholder="Breve riassunto (visibile nella lista notizie)"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1.5">
              Contenuto *
            </label>
            <textarea
              id="content"
              value={form.content}
              onChange={(e) => updateField('content', e.target.value)}
              rows={10}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal ${
                errors.content ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Contenuto completo della notizia..."
            />
            {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
                Categoria
              </label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal"
              >
                <option value="notizia">Notizia</option>
                <option value="evento">Evento</option>
                <option value="comunicazione">Comunicazione</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1.5">
                Stato
              </label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => updateField('status', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal"
              >
                <option value="draft">Bozza</option>
                <option value="published">Pubblicato</option>
                <option value="archived">Archiviato</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700 mb-1.5">
              Data evento (opzionale)
            </label>
            <input
              type="date"
              id="event_date"
              value={form.event_date}
              onChange={(e) => updateField('event_date', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal"
            />
            <p className="text-xs text-gray-500 mt-1">
              Se la notizia riguarda un evento, inserisci la data dell'evento.
            </p>
          </div>

          <div>
            <label htmlFor="cover_image_url" className="block text-sm font-medium text-gray-700 mb-1.5">
              URL immagine di copertina (opzionale)
            </label>
            <input
              type="url"
              id="cover_image_url"
              value={form.cover_image_url}
              onChange={(e) => updateField('cover_image_url', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal"
              placeholder="https://example.com/image.jpg"
            />
            {form.cover_image_url && (
              <div className="mt-3 aspect-video max-w-xs rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={form.cover_image_url}
                  alt="Anteprima"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/news')}
              className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-mv-teal text-white font-medium rounded-lg hover:bg-mv-teal-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Salvataggio...' : 'Salva'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
