import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
import Sidebar from '../components/Sidebar';

const CustomersInput = () => {
  const [isOpen,setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  // Mengelompokkan semua input dalam satu state object
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    subscription: '',
    date: ''
  });
  const [customers, setCustomers] = useState([]);

  // Handler untuk mengelola perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Data customer yang akan dikirim ke server (manual input)
    const customerData = {
      fields: {
        name: customer.name,
        email: customer.email,
        subscription: customer.subscription,
        signup_date: customer.date,
      },
    };

    axios.post('https://api.nafismu.xyz/api/customers', customerData)
      .then(response => {
        Swal.fire({
          title: 'Success!',
          text: 'Customer added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Reset input fields
        setCustomer({
          name: '',
          email: '',
          subscription: '',
          date: ''
        });
      })
      .catch(error => {
        console.error('Error adding customer:', error);
        Swal.fire({
          title: 'Error!',
          text: `There was an error adding the customer! ${error.message}`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };

  // Fungsi untuk menangani upload file Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Konversi data Excel ke JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setCustomers(jsonData);

      // Kirim setiap data customer yang di-upload ke server
      jsonData.forEach((customer) => {
        const customerData = {
          fields: {
            name: customer.name,
            email: customer.email,
            subscription: customer.subscription,
            signup_date: customer.signup_date,
          },
        };

        axios.post('https://api.nafismu.xyz/api/customers', customerData)
          .then(response => {
            Swal.fire({
              title: 'Success!',
              text: 'Customer added successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
            });
          })
          .catch(error => {
            console.error('Error adding customer:', error);
            Swal.fire({
              title: 'Error!',
              text: `There was an error adding the customer! ${error.message}`,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-300">
      <div className="bg-white p-8 rounded shadow-md w-full" style={{ width: '100rem' }}>
        <h1 className="text-2xl font-bold mb-6">Input Customer Data</h1>
        <Sidebar role="admin" isOpen={isOpen} toggleSidebar={toggleSidebar} />
        {/* Form Input Manual */}
        <form onSubmit={handleSubmit} method='POST'>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Subscription</label>
            <input
              type="text"
              name="subscription"
              value={customer.subscription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date Input</label>
            <input
              type="date"
              name="date"
              value={customer.date}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600">
              Save Data
            </button>
            <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600" onClick={() => window.history.back()}>
              Kembali
            </button>
          </div>
        </form>

        {/* Upload Excel */}
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Upload Excel File</h2>
          <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>

        {/* Tampilkan Data Excel */}
        {customers.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Uploaded Customer Data</h2>
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Subscription</th>
                  <th className="px-4 py-2">Signup Date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{customer.name}</td>
                    <td className="border px-4 py-2">{customer.email}</td>
                    <td className="border px-4 py-2">{customer.subscription}</td>
                    <td className="border px-4 py-2">{customer.signup_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomersInput;
