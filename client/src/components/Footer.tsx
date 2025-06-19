
import { memo } from 'react';
import { FaFacebookF, FaInstagram, FaEnvelope,FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logo-whiteo.png';

const currentYear = new Date().getFullYear();

const SOCIAL_LINKS = [
  {
    href: 'https://facebook.com',
    icon: <FaFacebookF />,
    className: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    href: 'https://instagram.com',
    icon: <FaInstagram />,
    className: 'bg-pink-600 hover:bg-pink-700',
  },
  {
    href: 'mailto:info@overseaslogistic.com',
    icon: <FaEnvelope />,
    className: 'bg-red-600 hover:bg-red-700',
  },
  {
    href: 'https://wa.me/919213920001',
    icon: <FaWhatsapp />,
    className: 'bg-green-600 hover:bg-green-700', 
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Main Footer Content */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl text-center">

            {/* Column 1 - Brand */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-secondary mb-3">Vage Logistics</h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
                Delivering your packages reliably and swiftly, from the first mile to the last.
              </p>
            </div>

            {/* Column 2 - Contact */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-secondary mb-2">Contact</h3>
              <ul className="text-sm text-gray-300 space-y-1 leading-relaxed">
                <li>Plot no - 121, Village Bamnoli, Dwarka, Sector 28</li>
                <li>New Delhi – 110077</li>
                <li><strong>Sales:</strong> +91-9999120718</li>
                <li><strong>Phone:</strong> +91-9213920001</li>
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:sales@vagelogistics.com"
                    className="underline hover:text-yellow-400"
                  >
                    sales@vagelogistics.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Social */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-secondary mb-2">Follow Us</h3>
              <img src={logo} alt="Vage Logistics Logo" className="h-10 sm:h-12 w-auto mb-3" />
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition ${link.className}`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400 space-y-2">
          <p>
            &copy; {currentYear}{' '}
            <span className="font-semibold text-white">Vage Logistics</span>. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <span className="hover:underline cursor-pointer">Policy</span>
            <span className="hover:underline cursor-pointer">Condition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
