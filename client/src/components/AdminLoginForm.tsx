import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLoginForm: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [statusMsg, setStatusMsg] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setStatusMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://logistics-backend-0jfy.onrender.com/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg(data.message || 'Logged in successfully');
        login();
        navigate('/admin/contacts');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'email', type: 'email', placeholder: 'Admin Email' },
    { name: 'password', type: 'password', placeholder: 'Password' },
  ];

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name as keyof typeof form]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          ))}

          <button
            type="submit"
            className={`w-full py-2 rounded text-white transition ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Messages */}
        <div className="mt-4 text-center text-sm">
          {statusMsg && <p className="text-green-600">{statusMsg}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default memo(AdminLoginForm);
