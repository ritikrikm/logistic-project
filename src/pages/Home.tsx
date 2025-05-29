import React from 'react';
import Hero from '../components/Hero';
import OurServices from '../components/OurServices';
import StatsSection from '../components/StatsSection';
const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <OurServices />
      <StatsSection />
    </div>
  );
};

export default Home;
