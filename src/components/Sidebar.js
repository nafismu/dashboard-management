import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, DocumentAddIcon, LogoutIcon } from '@heroicons/react/outline';
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import chart from '../img/chart.png';
const SidebarContext = React.createContext({});

export default function Sidebar({ role }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // State untuk layar kecil
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  useEffect(() => {
    // Update isMobile saat ukuran layar berubah
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = {
    admin: [
      { to: '/admin', icon: <HomeIcon className="w-7 h-7" />, label: 'Admin Dashboard' },
      { to: '/register', icon: <DocumentAddIcon className="w-7 h-7" />, label: 'Tambahkan User' },
      { to: '/employee-list', icon: <UserGroupIcon className="w-7 h-7" />, label: 'Manage Employee' },
      { to: '/customers-list-admin', icon: <UserGroupIcon className="w-7 h-7" />, label: 'Manage Customers' },
      { to: '/sales-performance', icon: <DocumentAddIcon className="w-7 h-7" />, label: 'Sales Performance' },
      { to: '/sales-funnel', icon: <DocumentAddIcon className="w-7 h-7" />, label: 'Sales Funnel' },
    ],
    employee: [
      { to: '/employee', icon: <HomeIcon className="w-7 h-7" />, label: 'Employee Dashboard' },
      { to: '/customers-list-employee', icon: <UserGroupIcon className="w-7 h-7" />, label: 'Manage Customers' },
      { to: '/input-data-sales', icon: <DocumentAddIcon className="w-7 h-7" />, label: 'Input Data Sales' },
    ],
  };

  // Tampilkan Sidebar atau Topbar berdasarkan ukuran layar
  if (isMobile) {
    return (
      <Topbar 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        handleLogout={handleLogout} 
        username={username} 
        role={role} 
        menuItems={menuItems[role]} 
      />
    );
  }

  return (
    <aside className={`h-screen sticky top-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="flex items-center justify-between p-5">
          {isOpen && <img src={chart} alt="Logo" className="w-10" />}
          <p className={`text-2xl font-bold ml-2 ${isOpen ? '' : 'hidden'}`}>Indibiz Dashboard</p>
          <button
            className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <ChevronDoubleLeftIcon className="w-7 h-7" />
            ) : (
              <ChevronDoubleRightIcon className="w-7 h-7" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ isOpen }}>
          <ul className="space-y-4 flex-1 px-4">
            {menuItems[role]?.map((item, index) => (
              <SidebarItem key={index} {...item} />
            ))}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 justify-center items-center">
          <img
            src={`https://ui-avatars.com/api/?name=${username}`}
            alt="Avatar"
            className="w-10 h-10 rounded-md"
          />
          {isOpen && (
            <div className="flex-1 ml-3">
              <h4 className="text-lg uppercase font-semibold">{username}</h4>
              <span className="text-md text-gray-600">{role}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className={`relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer text-red-600 ${isOpen ? 'mt-4 mx-3' : 'mt-2 items-center justify-center'}`}
        >
          <LogoutIcon className="w-7 h-7" />
          {isOpen && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}

// Komponen SidebarItem
function SidebarItem({ to, icon, label }) {
  const { isOpen } = useContext(SidebarContext);
  const active = window.location.pathname === to;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-2 font-medium rounded-md cursor-pointer transition-all duration-300 group ${
        active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <Link to={to} className="flex items-center space-x-2">
        {icon}
        {isOpen && <span>{label}</span>}
      </Link>
    </li>
  );
}

// Komponen Topbar untuk tampilan mobile
function Topbar({ isOpen, setIsOpen, handleLogout, username, role, menuItems }) {
  return (
    <div className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="flex items-center justify-between p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
        <h4 className="text-xl font-semibold">Indibiz Dashboard</h4>
        <img src={`https://ui-avatars.com/api/?name=${username}`} alt="Avatar" className="w-8 h-8 rounded-md" />
      </div>

      {isOpen && (
        <div className="bg-white border-t shadow-md p-4 absolute top-full left-0 w-full">
          <ul className="space-y-4">
            {menuItems?.map((item, index) => (
              <li key={index} className="flex items-center py-2 px-4 rounded-md hover:bg-indigo-50">
                <Link to={item.to} className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className="w-full text-left py-2 px-4 rounded-md mt-4 text-red-600 flex items-center space-x-2"
          >
            <LogoutIcon className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}
