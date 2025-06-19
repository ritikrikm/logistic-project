//  Optimized version of your App.tsx with lazy loading and Suspense
import  { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop'; 
//  Lazy load all pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Track = lazy(() => import('./pages/Track'));
const QuoteForm = lazy(() => import('./components/QuoteForm'));
const AdminLoginForm = lazy(() => import('./components/AdminLoginForm'));
const AdminContacts = lazy(() => import('./pages/AdminContacts'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className="p-4">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
          <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/track" element={<Track />} />
              <Route path="/quote" element={<QuoteForm />} />
              <Route path="/login" element={<AdminLoginForm />} />
              <Route 
                path="/admin/contacts" 
                element={
                  <ProtectedRoute>
                    <AdminContacts />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;