// File: src/pages/NotFound.tsx
import Lottie from 'lottie-react';
import notFoundAnimation from '../animations/not-found.json';

const NotFound = () => {
  return (
    <div style={{
      height: '100vh',
      backgroundColor: '#f8f9fa',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <Lottie animationData={notFoundAnimation} loop={true} style={{ width: 300, height: 300 }} />
      <h2 style={{ marginTop: '1rem', fontSize: '1.5rem', color: '#0a1f60' }}>Oops! Page not found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" style={{ marginTop: '1rem', color: '#007bff', textDecoration: 'underline' }}>Go back home</a>
    </div>
  );
};

export default NotFound;
