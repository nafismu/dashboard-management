import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Line1Chart from '../components/Charts/Line1Chart';
import Line from '../components/Charts/LineChart';
import Bar from '../components/Charts/BarChart';
import PredictionChart from '../components/Charts/PredictionChart';
import { BellIcon, ChevronDoubleUpIcon, } from '@heroicons/react/outline';
import MotivationalCard from '../components/MotivationalCard';
import Helmet from 'react-helmet';

function AdminPage() {
  const [user, setUser] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchcustomerCount();
  }, []);


  const fetchcustomerCount = async () => {
    try {
      const response = await fetch('/api/customers/customer-count');
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
      <Helmet><title>Admin Dashboard Page</title></Helmet>
      <Sidebar role="admin" isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-4 md:p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header Section */}
        <div className='flex justify-between items-center mb-10 gap-4 bg-blue-500 text-white p-4 rounded shadow'>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Dashboard Laporan Indibiz</h2>
          </div>
          <div className='flex justify-end items-center gap-4'>
            <div className='relative'>
              <BellIcon className='w-8 h-8 text-white cursor-pointer hover:text-gray-200 transition' />
              <span className='absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500'></span>
            </div>
            {/* <div className='flex items-center gap-2'>
              <UserIcon className='w-10 h-10 text-white' />
              {'user' && (
                <h2 className="text-xl font-medium uppercase">Welcome, {username} as {role}</h2>
              )}
            </div> */}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="mb-4 p-6 bg-white rounded shadow-lg">
          {/* Cards Section */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='col-span-1 text-center rounded p-6 text-white shadow-md bg-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl' >
              <h2 className="text-4xl font-bold mb-4">Total Customers</h2>
              <p className="text-4xl font-bold mb-4">{user && user.total_customers}</p>
            </div>
            <MotivationalCard />
          </div>

          <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-3 bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 text-white"
          style={{ zIndex: 1000 }}
        >
          <ChevronDoubleUpIcon className="w-6 h-6" />
        </button>
          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-4">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Line1Chart />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Line />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Bar />
            </div>
            <div className="bg-white shadow-lg rounded-lg">
              <PredictionChart />
            </div>
          </div>

          {/* Table Section */}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
