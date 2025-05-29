import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-sm text-center py-4 mt-10">
      <p>&copy; {new Date().getFullYear()} Vage Logistic. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
