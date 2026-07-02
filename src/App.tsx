import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import ComePossiamoAiutarti from './pages/ComePossiamoAiutarti';
import Volontari from './pages/Volontari';
import Donazioni from './pages/Donazioni';
import Contatti from './pages/Contatti';
import Notizie from './pages/Notizie';
import NotiziaDetail from './pages/NotiziaDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRequestDetail from './pages/admin/AdminRequestDetail';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminVolunteerDetail from './pages/admin/AdminVolunteerDetail';
import AdminNewsList from './pages/admin/AdminNewsList';
import AdminNewsForm from './pages/admin/AdminNewsForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/come-possiamo-aiutarti" element={<ComePossiamoAiutarti />} />
            <Route path="/donazioni" element={<Donazioni />} />
            <Route path="/volontari" element={<Volontari />} />
            <Route path="/notizie" element={<Notizie />} />
            <Route path="/notizie/:slug" element={<NotiziaDetail />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/requests/:id"
            element={
              <ProtectedRoute>
                <AdminRequestDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/volunteers"
            element={
              <ProtectedRoute>
                <AdminVolunteers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/volunteers/:id"
            element={
              <ProtectedRoute>
                <AdminVolunteerDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news"
            element={
              <ProtectedRoute>
                <AdminNewsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news/new"
            element={
              <ProtectedRoute>
                <AdminNewsForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/news/:id/edit"
            element={
              <ProtectedRoute>
                <AdminNewsForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
