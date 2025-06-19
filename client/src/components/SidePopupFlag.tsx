import React, { useEffect, useState } from 'react';

const SidePopupFlag: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    let greet = 'Hello';
    if (hour < 12) greet = 'Good morning';
    else if (hour < 18) greet = 'Good afternoon';
    else greet = 'Good evening';
    setGreeting(greet);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            );
            const data = await response.json();
            if (data.results.length > 0) {
              const cityObj = data.results[0].address_components.find((comp: any) =>
                comp.types.includes('locality')
              );
              setCity(cityObj ? cityObj.long_name : 'your area');
            }
          } catch {
            setError('Unable to fetch location');
          }
        },
        () => setError('Location permission denied')
      );
    } else {
      setError('Geolocation not supported');
    }
  }, []);

  return (
    <>
      {/* Minimized button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open greeting flag"
        title="Open greeting flag"
        style={{
          position: 'fixed',
          top: '45%',
          right: isOpen ? '-60px' : '0',
          backgroundColor: '#0a1f60',
          color: 'white',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          padding: '8px 12px',
          cursor: 'pointer',
          zIndex: 9999,
          fontWeight: 'bold',
          fontSize: '22px',
          userSelect: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
          transition: 'right 0.3s ease-in-out',
          display: isOpen ? 'none' : 'block',
        }}
      >
        👋
      </button>

      {/* Full flag */}
      <div
        role="region"
        aria-label="Personalized greeting"
        style={{
          position: 'fixed',
          top: '45%',
          right: isOpen ? '0' : '-240px', // slide out of view
          backgroundColor: '#0a1f60',
          color: 'white',
          padding: '16px 20px',
          maxWidth: '210px',
          borderTopLeftRadius: '12px',
          borderBottomLeftRadius: '12px',
          boxShadow: '0 6px 12px rgba(0,0,0,0.35)',
          userSelect: 'none',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px',
          lineHeight: 1.1,
          transition: 'right 0.3s ease-in-out',
          cursor: 'default',
        }}
      >
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close greeting flag"
          title="Close greeting flag"
          style={{
            alignSelf: 'flex-end',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            userSelect: 'none',
            padding: 0,
            marginBottom: '6px',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: '700',
            marginBottom: '2px',
          }}
        >
          {greeting}
          {city ? `, ${city}` : ''}!
        </h3>
        <p style={{ fontSize: '0.95rem', opacity: 0.9, margin: 0 }}>
          Ready to ship today?
        </p>

        {error && (
          <p
            style={{
              marginTop: '8px',
              fontSize: '0.75rem',
              color: '#ff6b6b',
            }}
          >
            {error}
          </p>
        )}
      </div>
    </>
  );
};

export default SidePopupFlag;
