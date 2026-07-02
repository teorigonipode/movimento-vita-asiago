import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, LogOut, ArrowLeft, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, type NewsPost } from '../../lib/supabase';
import SEO from '../../components/SEO';

type StatusFilter = 'Tutti' | 'draft' | 'published' | 'archived';
type CategoryFilter = 'Tutte' | 'notizia' | 'evento' | 'comunicazione';

const statusLabels: Record<string, string> = {
  draft: 'Bozza',
  published: 'Pubblicato',
  archived: 'Archiviato',
};

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  published: 'bg-green-100 text-green-800',
  archived: 'bg-amber-100 text-amber-800',
};

const categoryLabels: Record<string, string> = {
  notizia: 'Notizia',
  evento: 'Evento',
  comunicazione: 'Comunicazione',
};

const categoryColors: Record<string, string> = {
  notizia: 'bg-blue-100 text-blue-800',
  evento: 'bg-green-100 text-green-800',
  comunicazione: 'bg-amber-100 text-amber-800',
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-';
  const date = new Date(dateStr);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminNewsList() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Tutti');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('Tutte');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('news_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const toggleStatus = async (post: NewsPost) => {
    if (!supabase) return;
    const newStatus = post.status === 'published' ? 'archived' : 'published';
    const updates: Partial<NewsPost> = { status: newStatus };

    if (newStatus === 'published' && !post.published_at) {
      updates.published_at = new Date().toISOString();
    }

    const { error } = await supabase
      .from('news_posts')
      .update(updates)
      .eq('id', post.id);

    if (!error) {
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'Tutti' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'Tutte' || post.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Gestione Notizie" description="" noIndex />

      <header className="bg-mv-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Torna alla dashboard"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Gestione Notizie</h1>
              <p className="text-xs text-gray-300">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Esci</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cerca notizie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal w-full sm:w-64"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal"
            >
              <option value="Tutti">Tutti gli stati</option>
              <option value="draft">Bozza</option>
              <option value="published">Pubblicato</option>
              <option value="archived">Archiviato</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mv-teal focus:border-mv-teal"
            >
              <option value="Tutte">Tutte le categorie</option>
              <option value="notizia">Notizia</option>
              <option value="evento">Evento</option>
              <option value="comunicazione">Comunicazione</option>
            </select>
          </div>
          <button
            onClick={() => navigate('/admin/news/new')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-mv-teal text-white font-medium rounded-lg hover:bg-mv-teal-light transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nuova notizia
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Caricamento...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">Nessuna notizia trovata.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Titolo</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase hidden sm:table-cell">Categoria</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase hidden md:table-cell">Stato</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase hidden lg:table-cell">Data evento</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase hidden lg:table-cell">Pubblicato</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.slug}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryColors[post.category]}`}>
                        {categoryLabels[post.category]}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColors[post.status]}`}>
                        {statusLabels[post.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      {post.event_date ? formatDate(post.event_date) : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell">
                      {formatDate(post.published_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/news/${post.id}/edit`)}
                          className="p-2 text-gray-600 hover:text-mv-blue hover:bg-gray-100 rounded-lg transition-colors"
                          aria-label="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleStatus(post)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            post.status === 'published'
                              ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          {post.status === 'published' ? 'Archivia' : 'Pubblica'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
