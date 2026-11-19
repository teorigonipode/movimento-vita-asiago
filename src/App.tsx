import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NonSeiSola from './pages/NonSeiSola';
import ChiSiamo from './pages/ChiSiamo';
import ComePossiamoAiutarti from './pages/ComePossiamoAiutarti';
import Volontari from './pages/Volontari';
import Donazioni from './pages/Donazioni';
import Contatti from './pages/Contatti';
import Notizie from './pages/Notizie';
import NotiziaDetail from './pages/NotiziaDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/chi-siamo" element={<ChiSiamo />} />
          <Route path="/come-possiamo-aiutarti" element={<ComePossiamoAiutarti />} />
          <Route path="/non-sei-sola" element={<NonSeiSola />} />
          <Route path="/donazioni" element={<Donazioni />} />
          <Route path="/volontari" element={<Volontari />} />
          <Route path="/notizie" element={<Notizie />} />
          <Route path="/notizie/:slug" element={<NotiziaDetail />} />
          <Route path="/contatti" element={<Contatti />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
