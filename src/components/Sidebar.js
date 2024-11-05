import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, DocumentAddIcon, LogoutIcon } from '@heroicons/react/outline';
import chart from '../img/chart.png';
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/outline';

function Sidebar({ role, isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); // Arahkan kembali ke halaman login setelah logout
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-indigo-700 to-blue-400 text-white flex flex-col p-4 h-full transition-transform duration-300 ease-in-out shadow-lg z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-6 flex items-center gap-3">
        <img src={chart} alt="Logo" className="w-8 h-8 " />
        <h2 className="text-2xl font-bold">Smart Dashboard</h2>
      </div>
      
      {/* ROLE ADMIN */}
      <ul className="space-y-4 flex-1">
        {role === "admin" && (
          <>
            <li className="flex items-center space-x-2">
              <HomeIcon className="w-5 h-5" />
              <Link to="/admin" className="block p-2 rounded hover:bg-indigo-600">
                Admin Dashboard
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <DocumentAddIcon className="w-5 h-5" />
              <Link to="/register" className="block p-2 rounded hover:bg-indigo-600">
                Tambahkan User
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <Link to="/employee-list" className="block p-2 rounded hover:bg-indigo-600">
                Manage Employee
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <Link to="/customers-list-admin" className="block p-2 rounded hover:bg-indigo-600">
                Manage Customers
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <Link to="/sales-performance" className="block p-2 rounded hover:bg-indigo-600">
                SA Performance
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <Link to="/sales-funnel" className="block p-2 rounded hover:bg-indigo-600">
                SA Funnel
              </Link>
            </li>
          </>
        )}

        {/* ROLE EMPLOYEE */}
        {role === "employee" && (
          <>
            <li className='text-sm text-gray-400'>
              <span>Dashboard</span>
            </li>
            <li className="flex items-center space-x-2">
              <HomeIcon className="w-5 h-5" />
              <Link to="/employee" className="block p-2 rounded hover:bg-indigo-600">
                Employee Dashboard
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <UserGroupIcon className="w-5 h-5" />
              <Link to="/customers-list-employee" className="block p-2 rounded hover:bg-indigo-600">
                Manage Customers
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <DocumentAddIcon className="w-5 h-5" />
              <Link to="/input-data-sales" className="block p-2 rounded hover:bg-indigo-600">
                Input data sales
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Tombol Toggle Sidebar */}
      <button
        onClick={toggleSidebar}
        className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 p-2 bg-indigo-700 rounded-full shadow-lg hover:bg-indigo-600 transition"
        style={{ width: '60px', height: '60px' }}
      >
        {isOpen ? <ChevronDoubleLeftIcon className="w-6 h-6 mx-auto text-white" /> : <ChevronDoubleRightIcon className="w-6 h-6 mx-auto text-white" />}
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-2 bg-red-500 p-2 rounded hover:bg-red-600 transition duration-300 mt-4"
      >
        <LogoutIcon className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;
