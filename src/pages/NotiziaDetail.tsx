import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { supabase, getSupabaseError, type NewsPost } from '../lib/supabase';

const categoryColors: Record<string, string> = {
  notizia: 'bg-blue-100 text-blue-800',
  evento: 'bg-green-100 text-green-800',
  comunicazione: 'bg-amber-100 text-amber-800',
};

const categoryLabels: Record<string, string> = {
  notizia: 'Notizia',
  evento: 'Evento',
  comunicazione: 'Comunicazione',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function NotiziaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const configError = getSupabaseError();

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    if (!supabase || !slug) return;
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('news_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (fetchError || !data) {
      setError('Notizia non trovata.');
    } else {
      setPost(data);
    }
    setLoading(false);
  };

  if (configError) {
    return (
      <div className="min-h-screen bg-mv-cream">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-red-600">Errore di configurazione.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-mv-cream flex items-center justify-center">
        <p className="text-gray-500 text-lg">Caricamento...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-mv-cream flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-mv-blue mb-4">Notizia non trovata</h1>
          <p className="text-gray-600 mb-6">La notizia che stai cercando non esiste o non e piu disponibile.</p>
          <Link
            to="/notizie"
            className="inline-flex items-center gap-2 text-mv-teal font-medium hover:text-mv-teal-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna alle notizie
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={post.title}
        description={post.excerpt || post.content.substring(0, 160)}
        image={post.cover_image_url || undefined}
        path={`/notizie/${post.slug}`}
      />

      {post.cover_image_url && (
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/notizie"
          className="inline-flex items-center gap-2 text-mv-teal font-medium mb-6 hover:text-mv-teal-light transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alle notizie
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
              {categoryLabels[post.category] || post.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.event_date || post.published_at)}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-mv-blue leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
