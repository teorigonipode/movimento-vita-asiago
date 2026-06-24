import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import ComePossiamoAiutarti from './pages/ComePossiamoAiutarti';
import Testimonianze from './pages/Testimonianze';
import Volontari from './pages/Volontari';
import Donazioni from './pages/Donazioni';
import Contatti from './pages/Contatti';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRequestDetail from './pages/admin/AdminRequestDetail';
import AdminVolunteers from './pages/admin/AdminVolunteers';
import AdminVolunteerDetail from './pages/admin/AdminVolunteerDetail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chi-siamo" element={<ChiSiamo />} />
            <Route path="/come-possiamo-aiutarti" element={<ComePossiamoAiutarti />} />
            <Route path="/testimonianze" element={<Testimonianze />} />
            <Route path="/volontari" element={<Volontari />} />
            <Route path="/donazioni" element={<Donazioni />} />
            <Route path="/contatti" element={<Contatti />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Route>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/requests/:id" element={<AdminRequestDetail />} />
          <Route path="/admin/volunteers" element={<AdminVolunteers />} />
          <Route path="/admin/volunteers/:id" element={<AdminVolunteerDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
