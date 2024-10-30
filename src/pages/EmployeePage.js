import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
// import PieChart from '../components/PieChart';
// import CustomersList from './CustomersList';
import { BellIcon, UserIcon,ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/outline';
import Line1Chart from '../components/Charts/Line1Chart';

function EmployeePage() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {

  }, []);

  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Simulasi pengambilan data untuk diagram pie
    const fetchData = async () => {
      const data = {
        labels: ['Category A', 'Category B', 'Category C', 'Category D'],
        values: [10, 20, 30, 40],
      };
      setChartData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Sidebar role="employee" isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header Section with Toggle Sidebar */}
        <div className='flex justify-between items-center mb-4 gap-4 bg-blue-700 text-white p-4 rounded shadow' style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)' }}>
          {/* Brand Section */}
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Dashboard Laporan Indibiz</h2>
          </div>

          {/* Right Section: Notification, User Info */}
          <div className='flex justify-end items-center gap-4'>
            {/* Toggle Sidebar Button */}
            <button onClick={toggleSidebar} className="bg-indigo-500 p-2 rounded-full text-white hover:bg-indigo-600 transition">
              {isOpen ? <ChevronDoubleLeftIcon className="w-6 h-6" /> : <ChevronDoubleRightIcon className="w-6 h-6" />}
            </button>

            {/* Notification Icon */}
            <div className='relative'>
              <BellIcon className='w-8 h-8 text-white cursor-pointer hover:text-gray-200 transition' />
              {/* Notification Badge */}
              <span className='absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500'></span>
            </div>

            {/* User Icon */}
            <div className='flex items-center gap-2'>
              <UserIcon className='w-10 h-10 text-white' />
              {'employee' && (
                <h2 className="text-xl font-medium uppercase">Welcome, {username} as ({role})</h2>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mb-4 p-6 bg-white rounded shadow-lg">
          {/* Stats Section */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
            {/* Card 1 */}
            <div className='bg-gray-200 p-6 rounded-lg shadow-md'>
              <h2 className="text-xl font-bold mb-2">Total Customers</h2>
              <p className="text-3xl font-bold text-indigo-600">500</p>
            </div>
            {/* Card 2 */}
            <div className='bg-gray-200 p-6 rounded-lg shadow-md'>
              <h2 className="text-xl font-bold mb-2">New Customers</h2>
              <p className="text-3xl font-bold text-indigo-600">150</p>
            </div>
            {/* Card 3 */}
            <div className='bg-gray-200 p-6 rounded-lg shadow-md'>
              <h2 className="text-xl font-bold mb-2">Returning Customers</h2>
              <p className="text-3xl font-bold text-indigo-600">350</p>
            </div>
          </div>

          {/* Pie Chart Section */}
          <div className='bg-white p-6 rounded-lg drop-shadow-lg mb-6'>
            <Line1Chart />
          </div>

          {/* Customers List */}
          {/* <div className='bg-white p-6 rounded-lg drop-shadow-lg'>
            <h2 className="text-xl font-bold mb-4">Customer List</h2>
            <CustomersList />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
