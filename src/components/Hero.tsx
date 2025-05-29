import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="text-center py-16 px-6 bg-gray-100 rounded-lg shadow">
      <h2 className="text-4xl font-bold mb-4 text-blue-700">Reliable Logistics, Delivered Simply.</h2>
      <p className="text-gray-700 mb-6">
        From first mile to last, we help you manage, track, and deliver with confidence.
      </p>
      <Link to="/track" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
        Track Your Shipment
      </Link>
    </section>
  );
};

export default Hero;
