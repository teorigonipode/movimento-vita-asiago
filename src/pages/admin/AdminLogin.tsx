import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import SEO from '../../components/SEO';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError('Email o password non corretti. Riprova.');
      setLoading(false);
      return;
    }

    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-mv-cream flex items-center justify-center px-4">
      <SEO title="Area Admin" description="Accesso riservato per gli operatori del Movimento per la Vita Asiago." />

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-mv-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-mv-blue">Area Admin</h1>
          <p className="text-gray-500 mt-2">Accesso riservato per gli operatori</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3" role="alert">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all text-base"
                placeholder="la-tua-email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-mv-teal focus:border-mv-teal outline-none transition-all text-base"
                placeholder="La tua password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-mv-teal rounded"
                aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-mv-blue text-white font-semibold rounded-xl hover:bg-mv-blue-light transition-colors disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-mv-blue focus:ring-offset-2 text-base"
          >
            {loading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-mv-teal hover:underline text-sm">
            Torna al sito pubblico
          </a>
        </div>
      </div>
    </div>
  );
}
