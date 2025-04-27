import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet'
import Sidebar from '../components/Sidebar';

const SaPerformance = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterFunnel, setFilterFunnel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortConfig, setSortConfig] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchSalesPerformance = async () => {
      try {
        const response = await fetch('/api/sales-performance', { signal });
        const records = await response.json();
        setData(records);
        setFilteredData(records);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error('Error fetching user:', error);
        }
      }
    }
    fetchSalesPerformance();
    
    return () => {
      controller.abort();
    };
  }
  , []);

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Silakan pilih file untuk diunggah");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File berhasil diunggah: ' + response.data.message);
      setIsModalOpen(false); // Tutup modal setelah unggah
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Gagal mengunggah file");
    }
  };

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setFilterFunnel(filter);
    filterData(filter, startDate, endDate);
  };

  const handleStartDateChange = (event) => {
    const date = event.target.value;
    setStartDate(date);
    filterData(filterFunnel, date, endDate);
  };

  const handleEndDateChange = (event) => {
    const date = event.target.value;
    setEndDate(date);
    filterData(filterFunnel, startDate, date);
  };

  const filterData = (funnel, start, end) => {
    let filtered = data;

    if (funnel) {
      filtered = filtered.filter(item => item[funnel] > 0);
    }

    if (start) {
      filtered = filtered.filter(item => new Date(item.tanggal) >= new Date(start));
    }
    if (end) {
      filtered = filtered.filter(item => new Date(item.tanggal) <= new Date(end));
    }

    setFilteredData(filtered);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setFilteredData(sortedData);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Helmet><title>Sales Performance Page</title></Helmet>
      <Sidebar role="admin" isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="container mx-auto px-4 py-8 justify-between">
        {/* <div className='flex gap-4 mb-8'>
        <button className="
        bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => window.history.back()}
        >
          Back
        </button>

        </div> */}
        <div className="ml-auto text-right sticky">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white hover:bg-red-500 text-center text-3xl bg-gray-500 p-6 rounded-full"
          style={{
            position: 'fixed',
            right: '20px',
            bottom: '20px',
            zIndex: 1000,
          }}
          >
            +
          </button>
        </div>
        {/* Icon Plus */}

        {/* Modal untuk Unggah File */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Unggah File</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="border border-blue-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={!file}
                  >
                    Unggah
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    type="button"
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-700 mb-4">SA Performance</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Filters Section - Horizontal Layout */}
        <div className="mb-8">
          <div className="flex gap-4 flex-wrap">
            {/* Funnel Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex-1 min-w-[250px]">
              <label className="text-blue-700 font-medium mb-2 block">Filter by Funnel</label>
              <select 
                onChange={handleFilterChange} 
                className="w-full border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 transition-colors"
              >
                <option value="">All Funnels</option>
                <option value="f0">F0 (Lead)</option>
                <option value="f1">F1 (Opportunity)</option>
                <option value="f2">F2 (Proposal)</option>
                <option value="f3">F3 (Bidding)</option>
                <option value="f4">F4 (Negotiation)</option>
                <option value="f5">F5 (Contract)</option>
              </select>
            </div>

            {/* Start Date Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex-1 min-w-[250px]">
              <label className="text-blue-700 font-medium mb-2 block">Start Date</label>
              <input
                type="date"
                onChange={handleStartDateChange}
                value={startDate}
                className="w-full border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 transition-colors"
              />
            </div>

            {/* End Date Filter */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow flex-1 min-w-[250px]">
              <label className="text-blue-700 font-medium mb-2 block">End Date</label>
              <input
                type="date"
                onChange={handleEndDateChange}
                value={endDate}
                className="w-full border border-blue-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:border-blue-300 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-16">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-4 px-6 text-left font-semibold">No</th>
                  <th className="py-4 px-6 text-left font-semibold cursor-pointer hover:bg-blue-700 transition-colors" 
                      onClick={() => handleSort('kode')}>
                    Kode {sortConfig?.key === 'kode' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  <th className="py-4 px-6 text-left font-semibold">Mitra</th>
                  <th className="py-4 px-6 text-left font-semibold">Nama SA</th>
                  <th className="py-4 px-6 text-left font-semibold cursor-pointer hover:bg-blue-700 transition-colors" 
                      onClick={() => handleSort('spm')}>
                    SPH {sortConfig?.key === 'spm' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </th>
                  {['F0', 'F1', 'F2', 'F3', 'F4', 'F5'].map((stage, index) => (
                    <th key={stage}
                        className="py-4 px-6 text-left font-semibold cursor-pointer hover:bg-blue-700 transition-colors"
                        onClick={() => handleSort(`f${index}`)}>
                      {stage} {sortConfig?.key === `f${index}` && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                    </th>
                  ))}
                  <th className="py-4 px-6 text-left font-semibold">Tanggal</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} 
                      className="border-b border-blue-100 hover:bg-blue-50 transition-colors">
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6 font-medium text-blue-600">{item.kode}</td>
                    <td className="py-3 px-6">{item.mitra}</td>
                    <td className="py-3 px-6">{item.namaSA}</td>
                    <td className="py-3 px-6">{item.sph}</td>
                    <td className="py-3 px-6">{item.f0}</td>
                    <td className="py-3 px-6">{item.f1}</td>
                    <td className="py-3 px-6">{item.f2}</td>
                    <td className="py-3 px-6">{item.f3}</td>
                    <td className="py-3 px-6">{item.f4}</td>
                    <td className="py-3 px-6">{item.f5}</td>
                    <td className="py-3 px-6">
  {new Date(item.tanggal).toLocaleDateString('Ind', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaPerformance;