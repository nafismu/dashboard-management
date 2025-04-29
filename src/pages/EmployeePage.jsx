import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { BellIcon } from '@heroicons/react/outline';
import Line1Chart from '../components/Charts/Line1Chart';
import Helmet from 'react-helmet';
import MotivationalCard from '../components/MotivationalCard';
import Header from '../components/Header';

function EmployeePage() {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [newCustomers, setNewCustomers] = useState(0);
  const [returningCustomers, setReturningCustomers] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [username,setUsername] = useState('');
  // const [chartData, setChartData] = useState({ labels: [], values: [] });


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchCustomerCount = async () => {
      try {
        const response = await fetch('/api/customers/customer-count', { signal });
        const records = await response.json();
        setTotalCustomers(records);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching user:', error);
        }
      }
    }
    const fetchNewCustomers = async () => {
      try {
        const response = await fetch('/api/customers/new-customers', { signal });
        const records = await response.json();
        setNewCustomers(records);
        console.log(newCustomers);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    const fetchReturningCustomers = async () => {
      try {
        const response = await fetch('/api/customers/customers-return', { signal });
        const records = await response.json();
        setReturningCustomers(records);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    const fetchusername = async () => {
      try {
        const response = await fetch('https://127.0.0.1:5000/api/user-id',{ signal });
        const records = await response.json();
        setUsername(records.data);
        console.log(username)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    
    fetchNewCustomers();
    fetchReturningCustomers();
    fetchusername();
    fetchCustomerCount();

    return () => {
      controller.abort();
    }
  },[]);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Helmet><title>Employee Dashboard Page</title></Helmet>
      <Sidebar role="employee" isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header Section */}
        <Header Namepage="Dashboard Laporan Indibiz"/>

        {/* Dashboard Content */}
        <div className="bg-white p-4 sm:p-6 mb-4">
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
