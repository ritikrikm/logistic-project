import { memo } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg focus-within:shadow-lg transition-all min-h-[240px] flex flex-col justify-between">
      {icon && (
        <div className="text-secondary text-3xl mb-4" aria-hidden="true">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-sm text-primary-dark leading-relaxed">{description}</p>
    </div>
  );
};

export default memo(ServiceCard);
