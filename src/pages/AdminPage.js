import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
// import CustomerTable from '../components/CustomerTable';
import Line1Chart from '../components/Charts/Line1Chart';
// import PieChart from '../components/Charts/PieChart';
import Line from '../components/Charts/LineChart';
import Bar from '../components/Charts/BarChart';
// import Radar from '../components/Charts/RadarChart'
import PredictionChart from '../components/Charts/PredictionChart';
import { BellIcon, UserIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/outline';
// import EmployeeList from '../components/EmployeeList';
import MotivationalCard from '../components/MotivationalCard';

function AdminPage() {
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  // const url = 'http://localhost:5000/api/customers/customercount';

  useEffect(() => {
    fetchcustomerCount();
  },[]);

  const role = localStorage.getItem('role');
  const username = localStorage.getItem('username');

  const fetchcustomerCount = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers/customercount');
      const records = await response.json();
      setUser(records);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white md:flex-row">
      <Sidebar role="admin" isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-4 md:p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header Section with Brand, User Info, and Notification */}
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
              {'user' && (
                <h2 className="text-xl font-medium uppercase">Welcome, {username} as {role}</h2>
              )}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 p-4 gap-4'>
            <div className='col-span-1 rounded p-4 shadow-md bg-gray-200 transition-all duration-300 transform hover:scale-105'>
              <h2 className="text-2xl font-bold mb-4">Total Customers</h2>
              <p className="text-3xl font-bold mb-4 text-indigo-500">{user && user.count}</p>
            </div>
              <MotivationalCard/>
          </div>
        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-white-200">
          {/* Chart 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Line1Chart />
          </div>

          {/* Chart 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Line />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Chart 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <Bar />
          </div>

          {/* Chart 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <PredictionChart />
          </div>
        </div>

        {/* Table Section */}
      </div>
    </div>
  );
}

export default AdminPage;
