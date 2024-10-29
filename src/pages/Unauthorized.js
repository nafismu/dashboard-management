// Unauthorized.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate('/login')  // Kembali ke halaman sebelumnya
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>403 - Unauthorized</h1>
        <p style={styles.message}>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <button onClick={handleBackToLogin} style={styles.button}>
          Kembali ke halaman sebelumnya
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#f5f5f5',
  },
  content: {
    textAlign: 'center',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#ff4d4d',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '1.5rem',
    color: '#e0e0e0',
  },
  button: {
    padding: '0.7rem 1.5rem',
    fontSize: '1rem',
    color: '#ffffff',
    backgroundColor: '#ff4d4d',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

styles.button[':hover'] = {
  backgroundColor: '#ff3333',
};

export default Unauthorized;
