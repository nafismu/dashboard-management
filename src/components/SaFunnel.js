import React, { useState, useEffect } from 'react';

const SaFunnel = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterFunnel, setFilterFunnel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    fetch('/api/sales-performance')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <button className="
        bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => window.history.back()}
        >
          Back</button>
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-blue-700 mb-4">SA Funnel Telda Kudus</h1>
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
                  <th className="py-4 px-6 text-left font-semibold">Nama Program </th>
                  <th className="py-4 px-6 text-left font-semibold">SPH</th>
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
                    <td className="py-3 px-6">{item.mitra}</td>
                    <td className="py-3 px-6">{item.namaSA}</td>
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

export default SaFunnel;