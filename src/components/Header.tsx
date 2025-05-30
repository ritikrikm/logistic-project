import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome, FaPhoneAlt, FaEnvelope,
  FaMapMarkerAlt, FaTruck, FaInfoCircle, FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; 
import logo from '../../src/assets/logo-whiteo.png';

const Header: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="shadow-md">
      {/* Top Bar */}
      <div className="bg-secondary-light text-sm flex flex-col sm:flex-row justify-between items-center gap-2 px-4 py-2 text-primary-dark">
        <div className="flex items-center gap-3">
          <FaPhoneAlt />
          <a href="tel:+919999120718" className="hover:underline">+91 9999120718</a>
          <FaEnvelope />
          <a href="mailto:support@vagelogistics.com" className="hover:underline">support@vagelogistics.com</a>
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <a
            href="https://www.google.com/maps/place/Vage+Logistics"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Reach Us!
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-primary text-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div className="flex items-center justify-center sm:justify-start">
          <Link to="/">
            <img src={logo} alt="Vage Logistics Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm font-medium">
          <Link to="/" className="flex items-center gap-1 hover:text-secondary-light transition">
            <FaHome /> Home
          </Link>
          <Link to="/track" className="flex items-center gap-1 hover:text-secondary-light transition">
            <FaTruck /> Track
          </Link>
          <Link to="/about" className="flex items-center gap-1 hover:text-secondary-light transition">
            <FaInfoCircle /> About
          </Link>
          <Link to="/contact" className="flex items-center gap-1 hover:text-secondary-light transition">
            <FaEnvelope /> Contact
          </Link>
          <Link to="/quote" className="flex items-center gap-1 hover:text-secondary-light transition">
            <FaEnvelope /> Get a Quote
          </Link>

          {isAdmin && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
