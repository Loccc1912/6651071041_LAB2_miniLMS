import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { ListPage } from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';

// Component tự động cuộn lên đầu trang khi chuyển đổi route
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <FavoritesProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
          {/* Header Navigation */}
          <Header />

          {/* Main Routing Area */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/item/:id" element={<DetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* Catch-all route */}
              <Route path="*" element={<ListPage />} />
            </Routes>
          </div>

          {/* Toast Notification Container */}
          <ToastContainer />

          {/* Footer Bar */}
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
