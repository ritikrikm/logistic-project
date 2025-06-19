import { memo, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Lottie from 'lottie-react';
import loadingAnimation from '../animations/loading.json';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const ContactForm: React.FC = () => {
  const { isAdmin } = useAuth();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    const fetchContacts = async () => {
      try {
        const res = await fetch('https://logistics-backend-0jfy.onrender.com/api/contact');
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error('Failed to load contacts', err);
      }
    };
    fetchContacts();
  }, [isAdmin]);

  useEffect(() => {
    let slowTimer: any;
    if (isSubmitting) {
      slowTimer = setTimeout(() => {
        setStatusMessage('⏳ Still saving... Please wait or try again shortly.');
      }, 8000);
    }
    return () => clearTimeout(slowTimer);
  }, [isSubmitting]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatusMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('https://logistics-backend-0jfy.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.status === 201 || res.status === 202) {
        setStatusMessage(res.status === 202
          ? '✅ Message received! Backend was slow — admin has been alerted.'
          : '✅ Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatusMessage(data.message || '❌ Failed to send your message.');
      }
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setStatusMessage('❌ Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================
  // ADMIN VIEW
  // ========================
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
            <p className="text-sm text-gray-400 mt-2">
              Submitted on {new Date(selected.createdAt).toLocaleString()}
            </p>

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

  // ========================
  // USER VIEW
  // ========================
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        {statusMessage && (
          <div className="mb-4 bg-yellow-100 text-yellow-800 p-3 rounded text-sm font-medium">
            {statusMessage}
          </div>
        )}

        {isSubmitting && (
          <div className="mb-4 flex justify-center">
            <Lottie animationData={loadingAnimation} loop style={{ width: 100, height: 100 }} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded shadow-md p-6 space-y-4 text-left">
          {['name', 'email'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field[0].toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                required
                value={form[field as keyof typeof form]}
                onChange={handleChange}
                placeholder={field === 'email' ? 'you@example.com' : 'Your Name'}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              required
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder="Your message here..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
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

export default memo(ContactForm);
