import React, { useState } from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Reset error dan set loading true
    setErrorMsg('');
    setLoading(true);
  
    try {
      // Mengirim permintaan login ke server
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
  
      const { access_token, role } = response.data;
  
      // Simpan token di localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);
  
      // SweetAlert2 untuk menampilkan notifikasi login sukses
      Swal.fire({
        icon: 'success',
        title: 'Login berhasil!',
        text: `Selamat datang, ${username}!`,
        showConfirmButton: false,
        timer: 1500,
      });
  
      // Redirect berdasarkan role
      if (role === 'admin') {
        console.log(role);
        navigate('/admin');  // Redirect ke halaman admin
      } else if (role === 'employee') {
        navigate('/employee');  // Redirect ke halaman employee
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login gagal',
        text: 'Username atau password salah. Silakan coba lagi.',
        confirmButtonText: 'OK',
      });
      console.error(error);
      setErrorMsg('Invalid credentials');
    } finally {
      // Set loading kembali ke false
      setLoading(false);

    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
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
            <label className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            {loading ? <ClipLoader color="#fff" loading={loading} size={20} /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
