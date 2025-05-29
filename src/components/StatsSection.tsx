import React from 'react';
import CountUp from 'react-countup';

interface StatItem {
  id: number;
  icon: string; // image path or icon component
  value: number;
  label: string;
}

const stats: StatItem[] = [
  { id: 1, icon: '/assets/final_logo.png', value: 20, label: '+Branches' },
  { id: 2, icon: '/assets/logo192.png', value: 220, label: '+Work Force Team' },
  { id: 3, icon: '/assets/logo192.png', value: 150, label: '+Satisfied Clients' },
  { id: 4, icon: '/assets/logo192.png', value: 30, label: '+Pre Own Vehicle' },
];

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {stats.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <img src={item.icon} alt={item.label} className="h-16 mb-4" />
            <h3 className="text-4xl font-bold text-blue-600">
              <CountUp end={item.value} duration={2.5} />
            </h3>
            <p className="text-gray-600 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
