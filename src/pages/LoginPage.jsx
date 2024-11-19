import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cek apakah pengguna sudah login, jika ya, arahkan ke halaman dashboard yang sesuai
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const userRole = JSON.parse(loggedInUser).role;
      navigate(`/${userRole}`);
    }
  }, [navigate]);

  // Fungsi login sederhana
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Login sebagai admin
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ role: 'admin' }));
      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        text: 'Selamat datang, Admin!',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate('/admin'); // Arahkan ke halaman admin
      }, 1500);
    
    // Login sebagai employee
    } else if (username === 'employee' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ role: 'employee' }));
      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        text: 'Selamat datang, Employee!',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate('/employee'); // Arahkan ke halaman employee
      }, 1500);
    
    // Jika login gagal
    } else {
      setError('Username atau password salah');
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: 'Username atau password salah. Silakan coba lagi.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
