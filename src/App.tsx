import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Track from './pages/Track';
import AdminLoginForm from './components/AdminLoginForm';
import QuoteForm from './components/QuoteForm';
const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/track" element={<Track />} />
          <Route path="/quote" element={<QuoteForm />} />
          <Route path="/login" element={<AdminLoginForm />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
