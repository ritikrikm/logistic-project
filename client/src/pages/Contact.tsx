import React from 'react';
import ContactForm from '../components/Contact';


const Contact: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 text-center px-6">
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Reach out to us with your questions, concerns, or service inquiries. We're here to help!
        </p>
      </div>

      {/* Contact Form Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <ContactForm />
      </div>
    </>
  );
};

export default Contact;
