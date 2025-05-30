// GetQuoteForm.tsx
import React, { useState } from 'react';
// import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';


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

  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<string | null>(null);
  // const [pickupAuto, setPickupAuto] = useState<google.maps.places.Autocomplete | null>(null);
  // const [deliveryAuto, setDeliveryAuto] = useState<google.maps.places.Autocomplete | null>(null);

  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  //   libraries: ['places'],
  // });

  // const handlePlaceChanged = (type: 'pickup' | 'delivery') => {
  //   const autocomplete = type === 'pickup' ? pickupAuto : deliveryAuto;
  //   const place = autocomplete?.getPlace();
  //   const postalCode = place?.address_components?.find((c) => c.types.includes('postal_code'))?.long_name;
  //   if (postalCode) {
  //     setForm({ ...form, [type === 'pickup' ? 'pickupPostalCode' : 'deliveryPostalCode']: postalCode });
  //   }
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setStatus(null);
  };

  // const validateForm = () => {
  //   const phoneRegex = /^\d{10}$/;
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!phoneRegex.test(form.phone)) {
  //     setStatus('Phone number must be 10 digits.');
  //     return false;
  //   }

  //   if (!emailRegex.test(form.email)) {
  //     setStatus('Please enter a valid email address.');
  //     return false;
  //   }

  //   return true;
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!validateForm()) return;

    // setLoading(true);
    setStatus('Coming soon...');
    // try {
    //   const response = await fetch('http://localhost:4002/api/quote', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     setStatus('Quote request submitted successfully!');
    //     setForm(initialState);
    //   } else {
    //     setStatus(data.message || 'Submission failed.');
    //   }
    // } catch (err) {
    //   console.error(err);
    //   setStatus('An error occurred. Please try again later.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 text-center px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Request a Quote</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Get a quick estimate by providing your shipment details.
        </p>
      </div>

      {/* Form Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Get a Quote</h2>

          {status && (
            <div className="mb-4 p-3 rounded text-sm bg-yellow-100 text-yellow-800 text-center font-medium">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" className="border p-2 rounded" />
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone (10 digits)" className="border p-2 rounded" />
            <input name="pickupPostalCode" value={form.pickupPostalCode} onChange={handleChange} placeholder="Pickup Postal Code" className="border p-2 rounded" />
            <input name="deliveryPostalCode" value={form.deliveryPostalCode} onChange={handleChange} placeholder="Delivery Postal Code" className="border p-2 rounded" />
            <input name="length" value={form.length} onChange={handleChange} placeholder="Length (in cm)" className="border p-2 rounded" />
            <input name="width" value={form.width} onChange={handleChange} placeholder="Width (in cm)" className="border p-2 rounded" />
            <input name="height" value={form.height} onChange={handleChange} placeholder="Height (in cm)" className="border p-2 rounded" />
            <input name="weight" value={form.weight} onChange={handleChange} placeholder="Weight (in kg)" className="border p-2 rounded" />
            <select name="shipmentType" value={form.shipmentType} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Shipment Type</option>
              <option value="document">Document</option>
              <option value="parcel">Parcel</option>
              <option value="freight">Freight</option>
            </select>
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
