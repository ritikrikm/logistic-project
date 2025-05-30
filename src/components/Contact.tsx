import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ContactForm: React.FC = () => {
  const { isAdmin } = useAuth(); 

  const [contacts, setContacts] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  useEffect(() => {
    if (isAdmin) {
      fetch('http://localhost:4002/api/contact')
        .then(res => res.json())
        .then(data => setContacts(data))
        .catch(err => console.error('Failed to load contacts', err));
    }
  }, [isAdmin]);

  if (isAdmin) {
    return (
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-primary mb-4">All Contact Submissions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-white p-4 shadow rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(c)}
            >
              <h3 className="text-lg font-semibold text-primary">{c.name}</h3>
              <p className="text-sm text-gray-600">{c.email}</p>
              <p className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>

        {selected && (
          <div className="mt-6 p-4 border-t bg-white rounded shadow">
            <h4 className="text-xl font-bold text-primary mb-2">Message from {selected.name}</h4>
            <p><strong>Email:</strong> {selected.email}</p>
            <p className="mt-2"><strong>Message:</strong> {selected.message}</p>
            <p className="text-sm text-gray-400 mt-2">Submitted on {new Date(selected.createdAt).toLocaleString()}</p>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark"
            >
              Close
            </button>
          </div>
        )}
      </section>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatusMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: '', email: '', message: '' });
    setStatusMessage('Coming soon...');
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
      
       
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
