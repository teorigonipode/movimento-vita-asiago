import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Users, LogOut, ChevronRight, Calendar, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, type VolunteerRequest } from '../../lib/supabase';
import SEO from '../../components/SEO';

type StatusFilter = 'Tutti' | 'Nuovo' | 'In lavorazione' | 'Contattata' | 'Chiuso';

const statusColors: Record<string, string> = {
  'Nuovo': 'bg-blue-100 text-blue-800',
  'In lavorazione': 'bg-amber-100 text-amber-800',
  'Contattata': 'bg-green-100 text-green-800',
  'Chiuso': 'bg-gray-100 text-gray-600',
};

export default function AdminVolunteers() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [volunteers, setVolunteers] = useState<VolunteerRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Tutti');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase!
      .from('volunteer_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setVolunteers(data);
    }
    setLoading(false);
  };

  const filtered = volunteers
    .filter((v) => {
      if (statusFilter !== 'Tutti' && v.status !== statusFilter) return false;
      const q = search.toLowerCase();
      return (
        v.name.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        (v.availability && v.availability.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      const d1 = new Date(a.created_at).getTime();
      const d2 = new Date(b.created_at).getTime();
      return sortBy === 'newest' ? d2 - d1 : d1 - d2;
    });

  const handleLogout = async () => {
    await signOut();
    navigate('/admin');
  };

  const counts = {
    total: volunteers.length,
    nuovo: volunteers.filter((v) => v.status === 'Nuovo').length,
    lavorazione: volunteers.filter((v) => v.status === 'In lavorazione').length,
    contattata: volunteers.filter((v) => v.status === 'Contattata').length,
    chiuso: volunteers.filter((v) => v.status === 'Chiuso').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO title="Candidature Volontari" description="" noIndex />
      {/* Header */}
      <header className="bg-mv-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Users className="w-7 h-7" aria-hidden="true" />
            <div>
              <h1 className="text-lg font-bold">Candidature Volontari</h1>
              <p className="text-xs text-gray-300">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/admin/dashboard"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Richieste
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Esci</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          {[
            { label: 'Totale', value: counts.total, color: 'bg-white' },
            { label: 'Nuovi', value: counts.nuovo, color: 'bg-blue-50 border-blue-200' },
            { label: 'In lavorazione', value: counts.lavorazione, color: 'bg-amber-50 border-amber-200' },
            { label: 'Contattate', value: counts.contattata, color: 'bg-green-50 border-green-200' },
            { label: 'Chiusi', value: counts.chiuso, color: 'bg-gray-50 border-gray-200' },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-xl border ${s.color}`}>
              <p className="text-2xl font-bold text-mv-blue">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="text"
                placeholder="Cerca per nome, email o disponibilita..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none text-base"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                  className="pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none text-base appearance-none bg-white"
                >
                  {['Tutti', 'Nuovo', 'In lavorazione', 'Contattata', 'Chiuso'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none text-base bg-white"
              >
                <option value="newest">Piu recenti</option>
                <option value="oldest">Piu vecchi</option>
              </select>
            </div>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Caricamento candidature...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" aria-hidden="true" />
            <p className="text-gray-500 text-lg">Nessuna candidatura trovata</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((v) => (
              <button
                key={v.id}
                onClick={() => navigate(`/admin/volunteers/${v.id}`)}
                className="w-full text-left bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-mv-teal"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColors[v.status] || 'bg-gray-100 text-gray-600'}`}>
                        {v.status}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(v.created_at).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                    <h3 className="font-semibold text-mv-blue truncate">{v.name}</h3>
                    <p className="text-sm text-gray-600 truncate flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {v.email}
                    </p>
                    {v.phone && (
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {v.phone}
                      </p>
                    )}
                    {v.availability && (
                      <p className="text-xs text-gray-500 mt-1">Disponibilita: {v.availability}</p>
                    )}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 shrink-0 mt-1" aria-hidden="true" />
                </div>
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
