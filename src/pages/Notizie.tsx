import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import SupabaseError from '../components/SupabaseError';
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

export default function Notizie() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const configError = getSupabaseError();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('news_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (fetchError) {
      console.error('Error fetching posts:', fetchError);
      setError('Non siamo riusciti a caricare le notizie.');
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  if (configError) {
    return (
      <div className="min-h-screen bg-mv-cream">
        <SEO
          title="Notizie ed eventi"
          description="Notizie ed eventi del Movimento per la Vita Asiago."
          path="/notizie"
        />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <SupabaseError />
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title="Notizie ed eventi"
        description="Rimani aggiornato sulle iniziative, gli eventi e le comunicazioni del Movimento per la Vita Asiago."
        path="/notizie"
      />

      <section className="bg-mv-blue py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Notizie ed eventi</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Rimani aggiornato sulle iniziative, gli eventi e le comunicazioni del Movimento per la Vita Asiago.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-mv-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Caricamento...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-mv-warm">
              <p className="text-gray-600 text-lg max-w-md mx-auto px-4">
                Al momento non ci sono notizie pubblicate. Torna a visitarci per rimanere aggiornato sulle prossime iniziative.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border border-mv-warm overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  {post.cover_image_url && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
                        {categoryLabels[post.category] || post.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.event_date || post.published_at)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-mv-blue mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                    )}
                    <Link
                      to={`/notizie/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-mv-teal font-medium text-sm hover:text-mv-teal-light transition-colors"
                    >
                      Leggi di piu
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
