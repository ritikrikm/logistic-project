import React from 'react';
import ServiceCard from './ServiceCard';
import {
  FaPlaneDeparture,
  FaTruckMoving,
  FaGlobe,
  FaShippingFast,
  FaBoxes,
  FaWarehouse,
  FaTruckLoading,
  FaPeopleCarry,
} from 'react-icons/fa';

const services = [
  {
    id: 1,
    title: 'Domestic Air Cargo',
    description: 'Fast domestic delivery of goods over 10kg via air partners.',
    icon: <FaPlaneDeparture />,
  },
  {
    id: 2,
    title: 'Domestic Ground Shipping',
    description: 'Reliable ground transport through leading national networks.',
    icon: <FaTruckMoving />,
  },
  {
    id: 3,
    title: 'International Air Express',
    description: 'Global express shipping via DHL, FedEx, and other partners.',
    icon: <FaGlobe />,
  },
  {
    id: 4,
    title: 'International Freight',
    description: 'Port-to-port and door-to-door international cargo handling.',
    icon: <FaShippingFast />,
  },
  {
    id: 5,
    title: 'Commercial Shipments',
    description: 'Branded commercial logistics through global networks.',
    icon: <FaBoxes />,
  },
  {
    id: 6,
    title: 'Warehousing',
    description: 'Secure and scalable warehousing across multiple regions.',
    icon: <FaWarehouse />,
  },
  {
    id: 7,
    title: 'Fair & Exhibition Services',
    description: 'Specialized logistics for exhibitions and trade shows.',
    icon: <FaPeopleCarry />,
  },
  {
    id: 8,
    title: 'Import Services',
    description: 'Efficient import solutions with branded international partners.',
    icon: <FaTruckLoading />,
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
