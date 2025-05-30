import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Truck, MapPin } from 'lucide-react';
import Lottie from 'lottie-react';
import heroTruck from '../animations/heroTruck.json';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#f5f8ff] overflow-hidden py-20 sm:py-24 px-0 sm:px-0">

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
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 px-6 sm:px-12">
        
        {/* Left Text Content */}
        <div className="ml-6 sm:ml-16 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
            Reliable Logistics, <br />Delivered Simply.
          </h1>
          <p className="text-lg text-gray-700">
            From first mile to last, we help you manage,<br />
            track, and deliver with confidence.
          </p>
          <Link
            to="/track"
            className="inline-block bg-[#0a1f60] text-white px-6 py-3 rounded-md hover:bg-[#07184b] transition text-base font-medium"
          >
            Track Your Shipment
          </Link>
        </div>

        {/* Right Animation + Icons */}
       
        <div className="flex flex-col items-center justify-center gap-6 mt-8 md:mt-0">
          {/* Truck Animation */}
        

          {/* Feature Highlights */}
          <div className="flex flex-col gap-3 text-center">
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
