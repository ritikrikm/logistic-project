import { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaHome, FaPhoneAlt, FaEnvelope,
  FaMapMarkerAlt, FaTruck, FaInfoCircle, FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import logo from '../../src/assets/logo-whiteo.png';

// Constants for cleaner render
const CONTACT_INFO = [
  { icon: <FaPhoneAlt />, label: '+91 9999120718', href: 'tel:+919999120718' },
  { icon: <FaEnvelope />, label: 'sales@vagelogistics.com', href: 'mailto:sales@vagelogistics.com' },
];

const NAV_LINKS = [
  { to: '/', icon: <FaHome />, label: 'Home' },
  { to: '/track', icon: <FaTruck />, label: 'Track' },
  { to: '/about', icon: <FaInfoCircle />, label: 'About' },
  { to: '/contact', icon: <FaEnvelope />, label: 'Contact' },
  { to: '/quote', icon: <FaEnvelope />, label: 'Get a Quote' },
];

const Header: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
  }, [logout, navigate]);

  return (
    <div className="shadow-md">
      {/* Top Bar */}
      <div className="bg-secondary-light text-sm flex flex-col sm:flex-row justify-between items-center gap-2 px-4 py-2 text-primary-dark">
        <div className="flex items-center gap-3">
          {CONTACT_INFO.map((item, index) => (
            <span key={index} className="flex items-center gap-1">
              {item.icon}
              <a href={item.href} className="hover:underline">{item.label}</a>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <a
            href="https://maps.app.goo.gl/SkHCDZ1btMB6FYhFA"
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
          {NAV_LINKS.map(({ to, icon, label }) => (
            <Link key={to} to={to} className="flex items-center gap-1 hover:text-secondary-light transition">
              {icon} {label}
            </Link>
          ))}

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

export default memo(Header);
