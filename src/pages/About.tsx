import React from 'react';

const About: React.FC = () => {
  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 text-center px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Vague Logistics</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Delivering Trust, Speed, and Simplicity – Your Supply Chain Partner
        </p>
      </div>

      {/* Company Story */}
      <div className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Journey</h2>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus nisl a nunc
          suscipit, sed viverra odio posuere. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis egestas. Integer nec lorem vitae nisi congue tristique non
          vitae purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
          cubilia curae; Donec non justo ac odio tempor lacinia.
        </p>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold text-secondary mb-2">Fast Delivery</h3>
            <p className="text-gray-600 text-sm">
              Speed and reliability define our commitment to your shipment needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold text-secondary mb-2">Customer-Centric</h3>
            <p className="text-gray-600 text-sm">
              We put your satisfaction at the heart of our service.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-bold text-secondary mb-2">End-to-End Tracking</h3>
            <p className="text-gray-600 text-sm">
              Transparent updates from pickup to final delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-12 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
        <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non nulla sit amet nisl
          tempus convallis quis ac lectus. Vivamus suscipit tortor eget felis porttitor volutpat.
        </p>
      </div>
    </section>
  );
};

export default About;
