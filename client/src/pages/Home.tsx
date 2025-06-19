import React from 'react';
import Hero from '../components/Hero';
import OurServices from '../components/OurServices';
// import StatsSection from '../components/StatsSection';
import Partners from '../components/Partners';


const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <OurServices />

      {/* <StatsSection /> */}
      <Partners />

    </div>
  );
};

export default Home;
