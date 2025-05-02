// src/components/DashboardChart.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Line1Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const controller = new AbortController();
    const signal = controller.signal;

    axios.get('https://api.nafismu.xyz/api/sales-performance'
    )
      .then((response) => {
        setData(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log any errors
      });
      return () => {
        controller.abort();
      };
  }, []);
  const threshold = 5; // Performansi minimal
  const filteredData = data
            .filter((item) => item.f0 > threshold) // Tampilkan jika performa di atas ambang tertentu
            .sort((a, b) => b.f0 - a.f0) // Urutkan performa dari besar ke kecil
            .slice(0, 5); // Ambil 5 data teratas
  return (
    <div className="w-full h-[460px] -ml-8 flex flex-col">
      <h2 className="text-xl font-bold text-center">Perkembangan Performa Sales</h2>
      <h2 className="text-xl font-bold text-center">Dari F0 - F3</h2>
      <ResponsiveContainer width="100%" height="100%">
        {filteredData.length > 0 ? ( // Conditional rendering if data is not empty
          <LineChart data={filteredData} className="p-5">
            <Line type="monotone" dataKey="f0" stroke="#4f46e5" name="Lead (F0)"/>
            <Line type="monotone" dataKey="f1" stroke="#4ed204" name="Opportunity (F1)" />
            <Line type="monotone" dataKey="f2" stroke="#ff2200" name="Proposal (F2)" />
            <Line type="monotone" dataKey="f3" stroke="#ffa800" name="Bidding (F3)" />
            <Line type="monotone" dataKey="tanggal" stroke="#8884d8" name="Tanggal"/>
            {/* <Line type="monotone" dataKey="f0" stroke="#4f46e5" /> */}
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="namaSA" tick={{ fontSize: 12 }} interval={0} angle={0} />
            <YAxis />
            <Tooltip />
          </LineChart>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading data or no data available...</p>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default Line1Chart;
