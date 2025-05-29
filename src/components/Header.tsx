import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome, FaUser, FaPhoneAlt, FaEnvelope,
  FaMapMarkerAlt, FaTruck, FaSearch, FaInfoCircle
} from 'react-icons/fa';
import logo from '../assets/final_logo.png';

const Header: React.FC = () => {
  return (
    <div className="shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-100 text-sm flex flex-col sm:flex-row justify-between items-center gap-2 px-4 py-2">
        <div className="flex items-center gap-3 text-gray-700">
          <FaPhoneAlt />
          <span>+1 437-123-4567</span>
          <FaEnvelope />
          <span>support@vaguelogistic.com</span>
        </div>
        <div className="flex items-center text-gray-700 gap-2">
          <FaMapMarkerAlt />
          <span>Reach Us!</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-blue-600 text-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div className="flex items-center justify-center sm:justify-start">
          <Link to="/">
            <img src={logo} alt="Vague Logistic Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm font-medium">
          <Link to="/" className="flex items-center gap-1 hover:underline">
            <FaHome /> Home
          </Link>
          <Link to="/track" className="flex items-center gap-1 hover:underline">
            <FaTruck /> Track
          </Link>
          <Link to="/about" className="flex items-center gap-1 hover:underline">
            <FaInfoCircle /> About
          </Link>
          <Link to="/login" className="flex items-center gap-1 hover:underline">
            <FaUser /> Login
          </Link>
          <Link to="/search" className="flex items-center gap-1 hover:underline">
            <FaSearch /> Find
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
