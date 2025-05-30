import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatusMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Future actual POST request logic
    // try {
    //   const response = await fetch('http://localhost:4002/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   });

    //   if (response.ok) {
    //     setForm({ name: '', email: '', message: '' });
    //     setStatusMessage('Message submitted successfully!');
    //   } else {
    //     setStatusMessage('Failed to submit message. Please try again.');
    //   }
    // } catch (error) {
    //   console.error('Error submitting contact form:', error);
    //   setStatusMessage('An error occurred. Please try again later.');
    // }

    // Simulated feedback for now
    setForm({ name: '', email: '', message: '' });
    setStatusMessage('Coming soon...');
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-8">We'd love to hear from you! Fill out the form below.</p>

        {statusMessage && (
          <div className="mb-4 bg-yellow-100 text-yellow-800 p-3 rounded text-sm font-medium">
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded shadow-md p-6 space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your message here..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary-dark text-white py-2 px-4 rounded transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
