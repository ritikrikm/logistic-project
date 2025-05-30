import React, { useState } from 'react';

const Track: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Future backend call logic
    // try {
    //   const response = await fetch(`http://localhost:4002/api/track/${trackingNumber}`);
    //   const data = await response.json();
    //   // handle success
    // } catch (error) {
    //   console.error('Error fetching tracking details:', error);
    // }

    setSubmitted(true);
    setStatusMessage('Coming soon...');
    console.log("Tracking Number:", trackingNumber); // Placeholder
  };

  return (
    <section className="max-w-xl w-full mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6 text-center">
        Track Your Shipment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 sm:p-8 space-y-5"
      >
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
          className="w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-primary-dark transition"
        >
          Track
        </button>
      </form>

      {submitted && statusMessage && (
        <div className="mt-6 text-center text-sm sm:text-base bg-yellow-100 text-yellow-800 p-3 rounded font-medium">
          {statusMessage}
        </div>
      )}
    </section>
  );
};

export default Track;
