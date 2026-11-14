import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { getNewsBySlug } from '../services/news';

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

function formatDate(dateStr: string | undefined): string {
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
  const post = slug ? getNewsBySlug(slug) : null;

  if (!post) {
    return (
      <div>
        <SEO title="Notizia non trovata" description="La notizia cercata non è disponibile." path="/notizie" noIndex />
        <div className="min-h-screen bg-mv-cream flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-mv-blue mb-4">Notizia non trovata</h1>
            <p className="text-gray-600 mb-6">
              La notizia che stai cercando non esiste o non è più disponibile.
            </p>
            <Link
              to="/notizie"
              className="inline-flex items-center gap-2 text-mv-teal font-medium hover:text-mv-teal-light transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Torna alle notizie
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SEO
        title={post.title}
        description={post.excerpt || post.content.substring(0, 160)}
        image={post.coverImage || undefined}
        path={`/notizie/${post.slug}`}
      />

      {post.coverImage && (
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={post.coverImage}
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
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Torna alle notizie
        </Link>

        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-800'}`}>
              {categoryLabels[post.category] || post.category}
            </span>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" aria-hidden="true" />
              {formatDate(post.eventDate || post.publishedAt)}
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
