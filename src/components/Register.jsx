import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import Helmet from 'react-helmet';
import Sidebar from './Sidebar';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/auth/register', {
        username,
        password,
        role
      });
      console.log(response.data);
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Registration successful',
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = '/register';
      }, 1500);

    } catch (error) {
      setError('Registration failed. Try again.');
      setLoading(false);
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
      <Helmet><title>Register Page</title></Helmet>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">User:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="mb-4">
  <label className="block text-gray-700 font-bold mb-2">Role:</label>
  <div className="flex items-center gap-4">
    {/* Checkbox untuk Admin */}
    <label className="flex items-center">
      <input
        type="checkbox"
        value="admin"
        onChange={(e) => setRole(e.target.checked ? "admin" : "")}
        className="mr-2"
      />
      Admin
    </label>
    {/* Checkbox untuk Employee */}
    <label className="flex items-center">
      <input
        type="checkbox"
        value="employee"
        onChange={(e) => setRole(e.target.checked ? "employee" : "")}
        className="mr-2"
      />
      Employee
    </label>
  </div>
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
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          {error && <div className="mb-4 text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 font-bold text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            {loading ? <ClipLoader color="#fff" loading={loading} size={20} /> : 'Register'}
          </button>
          <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded-md mr-4 w-full mt-4"
                onClick={() => window.history.back()}
            >
                Kembali
            </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
