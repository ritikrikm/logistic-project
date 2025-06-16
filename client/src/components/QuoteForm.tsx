import React, { useState, useRef, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { useAuth } from '../context/AuthContext'; 

const GetQuoteForm: React.FC = () => {
  const initialState = {
    fullName: '',
    email: '',
    phone: '',
    pickupPostalCode: '',
    deliveryPostalCode: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    shipmentType: '',
    notes: '',
  };
  const { isAdmin } = useAuth(); // ✅ check if admin

  const [quotes, setQuotes] = useState<any[]>([]); // ✅ admin quote list
  const [selected, setSelected] = useState<any | null>(null); // ✅ admin selected quote

  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // ✅ field-level errors

  const pickupRef = useRef<HTMLInputElement>(null);
  const deliveryRef = useRef<HTMLInputElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,

    libraries: ['places'],
  });
  useEffect(() => {
    if (isAdmin) {
      fetch('https://logistics-backend-0jfy.onrender.com/api/quote')
        .then((res) => res.json())
        .then((data) => setQuotes(data))
        .catch((err) => console.error('Failed to load quotes', err));
    }
  }, [isAdmin]);
  useEffect(() => {
    if (!isLoaded || !pickupRef.current || !deliveryRef.current) return;

    const options = {
      types: ['geocode'],
      componentRestrictions: { country: 'in' },
    };

    const extractPostalCode = (place: google.maps.places.PlaceResult) =>
      place.address_components?.find((c) => c.types.includes('postal_code'))?.long_name;

    const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current!, options);
    pickupAutocomplete.setFields(['address_component']);
    pickupAutocomplete.addListener('place_changed', () => {
      const place = pickupAutocomplete.getPlace();
      const postalCode = extractPostalCode(place);
      if (postalCode) {
        setForm((prev) => ({ ...prev, pickupPostalCode: postalCode }));
      } else {
        setStatus('Please select a valid pickup postal code from suggestions.');
      }
    });

    const deliveryAutocomplete = new window.google.maps.places.Autocomplete(deliveryRef.current!, options);
    deliveryAutocomplete.setFields(['address_component']);
    deliveryAutocomplete.addListener('place_changed', () => {
      const place = deliveryAutocomplete.getPlace();
      const postalCode = extractPostalCode(place);
      if (postalCode) {
        setForm((prev) => ({ ...prev, deliveryPostalCode: postalCode }));
      } else {
        setStatus('Please select a valid delivery postal code from suggestions.');
      }
    });
  }, [isLoaded]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trimStart() }); // ✅ avoid leading whitespace
    setStatus(null);
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'notes') return; // optional
      if (!value.trim()) {
        newErrors[key] = 'Required';
      }
    });

    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = 'Phone must be exactly 10 digits';
    }

    if (!emailRegex.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('Submitting...');
    try {
      const response = await fetch('https://logistics-backend-0jfy.onrender.com/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Quote submitted successfully!');
        setForm(initialState);
        setErrors({});
      } else {
        setStatus(data.message || '❌ Submission failed.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Network error. Please try again.');
    }
  };
  if (isAdmin) {
    return (
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-primary mb-4">All Quote Requests</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quotes.map((q) => (
            <div
              key={q._id}
              className="bg-white p-4 shadow rounded cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(q)}
            >
              <h3 className="text-lg font-semibold text-primary">{q.fullName}</h3>
              <p className="text-sm text-gray-600">{q.email}</p>
              <p className="text-xs text-gray-400">{new Date(q.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
  
        {selected && (
          <div className="mt-6 p-4 border-t bg-white rounded shadow">
            <h4 className="text-xl font-bold text-primary mb-2">Quote from {selected.fullName}</h4>
            <p><strong>Email:</strong> {selected.email}</p>
            <p><strong>Phone:</strong> {selected.phone}</p>
            <p><strong>From:</strong> {selected.pickupPostalCode} → {selected.deliveryPostalCode}</p>
            <p><strong>Size:</strong> {selected.length}cm x {selected.width}cm x {selected.height}cm</p>
            <p><strong>Weight:</strong> {selected.weight}kg</p>
            <p><strong>Type:</strong> {selected.shipmentType}</p>
            <p className="mt-2"><strong>Notes:</strong> {selected.notes}</p>
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
  return (
    <>
      <div className="bg-primary text-white py-16 text-center px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Request a Quote</h1>
        <p className="max-w-2xl mx-auto text-lg">Get a quick estimate by providing your shipment details.</p>
      </div>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Get a Quote</h2>

          {status && (
            <div className="mb-4 p-3 rounded text-sm bg-yellow-100 text-yellow-800 text-center font-medium">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ['fullName', 'Full Name'],
              ['email', 'Email', 'email'],
              ['phone', 'Phone (10 digits)'],
              ['length', 'Length (in cm)'],
              ['width', 'Width (in cm)'],
              ['height', 'Height (in cm)'],
              ['weight', 'Weight (in kg)'],
            ].map(([name, placeholder, type]) => (
              <div key={name}>
                <input
                  name={name}
                  type={type || 'text'}
                  value={form[name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`border p-2 rounded w-full ${errors[name] ? 'border-red-500' : ''}`}
                />
                {errors[name] && <span className="text-red-500 text-xs">{errors[name]}</span>}
              </div>
            ))}

            <div>
              <input
                ref={pickupRef}
                name="pickupPostalCode"
                value={form.pickupPostalCode}
                onChange={handleChange}
                placeholder="Pickup Postal Code"
                className={`border p-2 rounded w-full ${errors.pickupPostalCode ? 'border-red-500' : ''}`}
              />
              {errors.pickupPostalCode && <span className="text-red-500 text-xs">{errors.pickupPostalCode}</span>}
            </div>

            <div>
              <input
                ref={deliveryRef}
                name="deliveryPostalCode"
                value={form.deliveryPostalCode}
                onChange={handleChange}
                placeholder="Delivery Postal Code"
                className={`border p-2 rounded w-full ${errors.deliveryPostalCode ? 'border-red-500' : ''}`}
              />
              {errors.deliveryPostalCode && <span className="text-red-500 text-xs">{errors.deliveryPostalCode}</span>}
            </div>

            <div className="col-span-2">
              <select
                name="shipmentType"
                value={form.shipmentType}
                onChange={handleChange}
                className={`border p-2 rounded w-full ${errors.shipmentType ? 'border-red-500' : ''}`}
              >
                <option value="">Select Shipment Type</option>
                <option value="document">Document</option>
                <option value="parcel">Parcel</option>
                <option value="freight">Freight</option>
              </select>
              {errors.shipmentType && <span className="text-red-500 text-xs">{errors.shipmentType}</span>}
            </div>

            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Additional Notes"
              className="border p-2 rounded col-span-1 sm:col-span-2"
              rows={3}
            />

            <button
              type="submit"
              className="col-span-1 sm:col-span-2 w-full py-2 rounded text-white font-semibold bg-primary hover:bg-primary-dark transition"
            >
              Submit Quote Request
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default GetQuoteForm;
