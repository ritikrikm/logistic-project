import React from 'react';
import ServiceCard from './ServiceCard';
import { FaTruck, FaWarehouse, FaClock } from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: 'Fast Delivery',
    description: 'Deliver packages quickly with real-time tracking and updates.',
    icon: <FaTruck />,
  },
  {
    id: 2,
    title: 'Warehouse Storage',
    description: 'Secure storage for your goods across multiple regions.',
    icon: <FaWarehouse />,
  },
  {
    id: 3,
    title: '24/7 Support',
    description: 'We’re always here to help, any time, any day.',
    icon: <FaClock />,
  },
  {
    id: 4,
    title: 'Custom Packaging',
    description: 'Get branded and safe packaging for your products.',
    icon: <FaClock />,
  },
];

const OurServices: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8 text-center">
          Our Services
        </h2>

        <div className="overflow-x-auto">
          <div className="flex gap-4 sm:gap-6 w-max pb-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="min-w-[260px] sm:min-w-[280px] max-w-[300px] flex-shrink-0"
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
