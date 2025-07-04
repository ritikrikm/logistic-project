import { useEffect, useState, memo } from 'react';

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
        const res = await fetch('https://logistics-backend-0jfy.onrender.com/api/contact');
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

  const ContactCard = ({ contact }: { contact: Contact }) => (
    <div
      className="bg-white p-4 shadow-md rounded cursor-pointer hover:bg-gray-100 transition"
      onClick={() => setSelectedContact(contact)}
    >
      <h3 className="font-semibold text-lg text-primary">{contact.name}</h3>
      <p className="text-sm text-gray-600">{contact.email}</p>
      <p className="text-xs text-gray-400 mt-1">
        {new Date(contact.createdAt).toLocaleString()}
      </p>
    </div>
  );

  const ContactDetails = ({ contact }: { contact: Contact }) => (
    <div className="mt-6 bg-white border-t pt-4 px-4 shadow-md rounded">
      <h3 className="text-xl font-bold text-primary mb-2">Message from {contact.name}</h3>
      <p><strong>Email:</strong> {contact.email}</p>
      <p className="mt-2 whitespace-pre-wrap"><strong>Message:</strong> {contact.message}</p>
      <p className="text-sm text-gray-400 mt-2">
        Submitted on: {new Date(contact.createdAt).toLocaleString()}
      </p>

      <button
        onClick={() => setSelectedContact(null)}
        className="mt-4 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-dark transition"
      >
        Close
      </button>
    </div>
  );

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">Contact Submissions</h2>

      {loading ? (
        <div className="text-gray-600">Loading contacts...</div>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact._id} contact={contact} />
          ))}
        </div>
      )}

      {selectedContact && <ContactDetails contact={selectedContact} />}
    </section>
  );
};

export default memo(AdminContacts);
