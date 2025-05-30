import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // optional icon prop
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all h-full flex flex-col justify-between">
      {icon && <div className="text-secondary text-3xl mb-4">{icon}</div>}
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-primary-dark">{description}</p>
    </div>
  );
};

export default ServiceCard;
