import { memo } from 'react';

const VAGE_VALUES = [
  {
    title: 'V – Visibility',
    description: `Implement real-time tracking systems for shipments and inventory to enhance transparency across the supply chain.`,
    example: `Use of TMS (Transportation Management System) to allow customers and partners to track shipments in real time.`,
  },
  {
    title: 'A – Automation',
    description: `Leverage automated systems in order processing, inventory management, and warehousing for operational excellence.`,
    example: `Automated picking systems in warehouses accelerate order fulfillment and reduce human error.`,
  },
  {
    title: 'G – Growth',
    description: `Explore new markets and services to meet evolving customer needs and expand logistics capabilities.`,
    example: `Market research targeting clients in e-commerce and renewable energy sectors.`,
  },
  {
    title: 'E – Efficiency',
    description: `Streamline processes by analyzing bottlenecks and optimizing delivery routes or warehouse layouts.`,
    example: `Continuous KPI reviews to reduce lead times and increase order accuracy.`,
  },
];

const About: React.FC = () => {
  return (
    <section className="bg-white">
      {/* Hero */}
      <div className="bg-primary text-white py-16 text-center px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">About Vage Logistics</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Delivering Trust, Speed, and Simplicity – Your Supply Chain Partner
        </p>
      </div>

      {/* Journey */}
      <div className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Journey</h2>
        <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
          V.A.G.E. defines our approach to modern logistics – Visibility, Automation, Growth, and Efficiency.
          With a vision rooted in transparency and innovation, Vage Logistics aims to simplify complex supply chains,
          drive smarter operations, and enable faster delivery across regions. From our earliest deliveries to today's
          intelligent systems, we are committed to pushing logistics forward.
        </p>
      </div>

      {/* VAGE Values */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {VAGE_VALUES.map(({ title, description, example }) => (
            <div key={title} className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">
                {description}
                <br /><br />
                <strong>Example:</strong> {example}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="py-12 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
        <p className="text-gray-700 text-base sm:text-lg max-w-3xl mx-auto">
          At Vage Logistics, our mission is to drive innovation in the supply chain by making logistics more transparent,
          more efficient, and more responsive to change. We believe that by embracing technology and maintaining customer-first
          values, we can empower businesses to move smarter.
        </p>
      </div>
    </section>
  );
};

export default memo(About);
