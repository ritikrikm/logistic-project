import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 rounded-lg shadow text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-blue-700">
          Reliable Logistics, Delivered Simply.
        </h2>
        <p className="text-gray-700 mb-6 text-base sm:text-lg">
          From first mile to last, we help you manage, track, and deliver with confidence.
        </p>
        <Link
          to="/track"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 text-sm sm:text-base"
        >
          Track Your Shipment
        </Link>
      </div>
    </section>
  );
};

export default Hero;
