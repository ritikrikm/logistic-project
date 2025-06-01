import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Truck, MapPin } from 'lucide-react';
import Lottie from 'lottie-react';
import heroTruck from '../animations/heroTruck.json';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#f5f8ff] overflow-hidden py-16 sm:py-24 px-4 sm:px-6">

      {/* Full-Width Background Animation with Soft White Overlay */}
      <div className="absolute inset-0 z-0">
        <Lottie
          animationData={heroTruck}
          loop
          autoplay
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white opacity-80"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-2 sm:px-8">

        {/* Left Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Reliable Logistics,<br className="hidden sm:block" /> Delivered Simply.
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            From first mile to last, we help you manage, track, and deliver with confidence.
          </p>
          <div>
            <Link
              to="/track"
              className="inline-block bg-[#0a1f60] text-white px-6 py-3 rounded-md hover:bg-[#07184b] transition text-sm sm:text-base font-medium"
            >
              Track Your Shipment
            </Link>
          </div>
        </div>

        {/* Right Feature Icons - hidden on small screens */}
        <div className="flex flex-col items-center justify-start md:justify-center gap-6 mt-10 md:mt-0">
          <div className="hidden md:flex flex-col gap-3 text-center md:text-left">
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-5 h-5 text-[#0a1f60]" />
              <span>Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="w-5 h-5 text-[#0a1f60]" />
              <span>Business & Residential Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5 text-[#0a1f60]" />
              <span>Real-Time Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
