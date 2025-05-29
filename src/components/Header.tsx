import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaPhoneAlt, FaEnvelope,FaMapMarkerAlt,FaTruck,FaSearch,FaInfoCircle } from 'react-icons/fa';
import logo from '../assets/final_logo.png';


const Header: React.FC = () => {
  return (
    <div className="shadow-md">
      {/* Top Bar */}
      <div className="bg-gray-100 text-sm flex justify-between items-center px-6 py-2">
        <div className="flex items-center space-x-4 text-gray-700">
          <FaPhoneAlt className="inline-block" />
          <span>+1 437-123-4567</span>
          <FaEnvelope className="inline-block" />
          <span>support@vaguelogistic.com</span>
        </div>
        <div className="flex items-center text-gray-700 space-x-2">
          <FaMapMarkerAlt className="inline-block" />
          <span>Reach Us!</span>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-2xl font-bold tracking-wide">
          <Link to="/">
            <img src={logo} alt="Vague Logistic Logo" className="h-12 w-auto" />
          </Link>
      </div>


        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="flex items-center gap-1 hover:underline">
            <FaHome className="inline-block" /> Home
          </Link>
          <Link to="/track" className="flex items-center gap-1 hover:underline">
            <FaTruck className="inline-block" /> Track
          </Link>
          <Link to="/about" className="flex items-center gap-1 hover:underline">
            <FaInfoCircle className="inline-block" /> About
          </Link>
          <Link to="/login" className="flex items-center gap-1 hover:underline">
            <FaUser className="inline-block" /> Login
          </Link>
          <Link to="/search" className="flex items-center gap-1 hover:underline">
            <FaSearch className="inline-block" /> Find
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Header;
