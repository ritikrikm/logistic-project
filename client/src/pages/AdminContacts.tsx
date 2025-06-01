// src/pages/AdminContacts.tsx
import React, { useEffect, useState } from 'react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const AdminContacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch('http://localhost:4002/api/contact');
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error('Failed to fetch contacts', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Contact Submissions</h2>

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-white p-4 shadow-md rounded cursor-pointer hover:bg-gray-100 transition"
              onClick={() => setSelectedContact(contact)}
            >
              <h3 className="font-semibold text-lg text-primary">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="text-xs text-gray-400 mt-1">{new Date(contact.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      {selectedContact && (
        <div className="mt-6 bg-white border-t pt-4 px-4 shadow-md rounded">
          <h3 className="text-xl font-bold text-primary mb-2">Message from {selectedContact.name}</h3>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p className="mt-2 whitespace-pre-wrap"><strong>Message:</strong> {selectedContact.message}</p>
          <p className="text-sm text-gray-400 mt-2">Submitted on: {new Date(selectedContact.createdAt).toLocaleString()}</p>

          <button
            onClick={() => setSelectedContact(null)}
            className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition"
          >
            Close
          </button>
        </div>
      )}
    </section>
  );
};

export default AdminContacts;
