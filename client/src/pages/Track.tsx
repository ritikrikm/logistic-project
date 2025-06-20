import React, { useState } from 'react';
import Lottie from 'lottie-react';
import trackAnimation from '../animations/track-animation.json';

const Track: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const trackShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = trackingNumber.trim();

    if (!trimmed) {
      setStatusMessage('Please enter a tracking number.');
      return;
    }

    setLoading(true);
    setStatusMessage(null);


    setTimeout(() => {
      setLoading(false);
      setStatusMessage('Feature coming soon... Stay tuned!');
      console.log("Tracking Number:", trimmed);
    }, 1500);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 text-center px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Track Your Shipment</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Enter your tracking number to get the latest status update on your delivery.
        </p>
      </div>

      {/* Form Section */}
      <section className="max-w-xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={trackShipment}
          className="bg-white shadow-md rounded-xl p-6 sm:p-8 space-y-5"
        >
          <div className="flex justify-center">
            <Lottie animationData={trackAnimation} loop className="w-40 h-40" />
          </div>

          <label className="block">
            <span className="text-gray-700 font-medium">Enter Tracking Number</span>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="e.g. 123456789"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-dark transition disabled:opacity-60"
          >
            {loading ? 'Checking...' : 'Track'}
          </button>
        </form>

        {statusMessage && (
          <div className="mt-6 text-center text-sm sm:text-base bg-yellow-100 text-yellow-800 p-3 rounded font-medium">
            {statusMessage}
          </div>
        )}
      </section>
    </>
  );
};

export default Track;
