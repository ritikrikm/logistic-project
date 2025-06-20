// src/App.tsx
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

import SidePopupFlag from './components/SidePopupFlag'; // Your side popup greeting flag

// Lazy loaded pages/components
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

        {/* Side popup greeting flag, fixed on side */}
        <SidePopupFlag />

        <main className="p-4">
          <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
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

          {/* Floating WhatsApp widget */}
          <WhatsAppWidget
            phoneNumber="+919999120718"
            companyName="Vage Logistics"
            message="Hi! 👋 How can we assist you with your shipment today?"
            replyTimeText="Typically replies in a few minutes"
            sendButton="Start Chat"
            // avatar="https://yourdomain.com/logo.png" // optional
          />
        </main>

        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
