import React from 'react';
import Hero from '../components/Hero';
import OurServices from '../components/OurServices';
import StatsSection from '../components/StatsSection';
import Partners from '../components/Partners';
import  partnerList  from "../data/partnerList";
const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <OurServices />
      
      <StatsSection />
      <Partners partners={partnerList} />
    </div>
  );
};

export default Home;
