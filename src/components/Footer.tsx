import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 px-4 text-sm sm:text-base mt-10">
      <p>&copy; {new Date().getFullYear()} <span className="font-semibold">Vague Logistic</span>. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
