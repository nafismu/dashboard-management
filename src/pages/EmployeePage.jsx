import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { BellIcon } from '@heroicons/react/outline';
import Line1Chart from '../components/Charts/Line1Chart';
import Helmet from 'react-helmet';
import MotivationalCard from '../components/MotivationalCard';

function EmployeePage() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [newCustomers, setNewCustomers] = useState(0);
  const [returningCustomers, setReturningCustomers] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  // const [chartData, setChartData] = useState({ labels: [], values: [] });

  useEffect(() => {
    // fetchData();
    fetchCustomerCount();
    fetchNewCustomers();
    fetchReturningCustomers();
  },[]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const fetchCustomerCount = async () => {
    try {
      const response = await fetch('/api/customers/customer-count');
      const records = await response.json();
      setTotalCustomers(records);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const fetchNewCustomers = async () => {
    try {
      const response = await fetch('/api/customers/new-customers');
      const records = await response.json();
      setNewCustomers(records);
      console.log(newCustomers);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const fetchReturningCustomers = async () => {
    try {
      const response = await fetch('/api/customers/customers-return');
      const records = await response.json();
      setReturningCustomers(records);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Helmet><title>Employee Dashboard Page</title></Helmet>
      <Sidebar role="employee" isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header Section with Toggle Sidebar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4 bg-blue-500 text-white p-4 rounded shadow-md">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">Dashboard Laporan Indibiz</h2>
          </div>
          <div className="flex justify-end items-center gap-4">
            {/* <button onClick={toggleSidebar} className="p-2 rounded-full text-white hover:bg-indigo-600 transition">
              {isOpen ? <ChevronDoubleLeftIcon className="w-6 h-6" /> : <ChevronDoubleRightIcon className="w-6 h-6" />}
            </button> */}
            <div className="relative">
              <BellIcon className="w-8 h-8 text-white cursor-pointer hover:text-gray-200 transition" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            </div>
            {/* <div className="flex items-center gap-2">
              <UserIcon className="w-10 h-10 text-white" />
              <h2 className="text-lg sm:text-xl font-medium uppercase">Welcome, {username} as ({role})</h2>
            </div> */}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="bg-white rounded shadow-lg p-4 sm:p-6 mb-4">
          <MotivationalCard />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-6">
            {/* Stat Cards */}
            <div className="bg-blue-400 p-6 rounded-lg drop-shadow-lg transition-transform duration-300 transform hover:scale-105">
              <h2 className="text-xl text-white font-bold mb-2">Total Customers</h2>
              <p className="text-3xl font-bold text-white">{totalCustomers && totalCustomers.total_customers}</p>
            </div>
            <div className="bg-blue-400 p-6 rounded-lg drop-shadow-lg transition-transform duration-300 transform hover:scale-105">
              <h2 className="text-xl text-white font-bold mb-2">New Customers</h2>
              <p className="text-3xl font-bold text-white">{newCustomers && newCustomers.new_customers}</p>
            </div>
            <div className="bg-blue-400 p-6 rounded-lg drop-shadow-lg transition-transform duration-300 transform hover:scale-105">
              <h2 className="text-xl text-white font-bold mb-2">Returning Customers</h2>
              <p className="text-3xl font-bold text-white">{returningCustomers && returningCustomers.returning_customers}</p>
            </div>
          </div>

          {/* Line Chart Section */}
          <div className="bg-white p-4 sm:p-6 rounded-lg drop-shadow-lg">
            <Line1Chart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
