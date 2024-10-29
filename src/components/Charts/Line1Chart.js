// src/components/DashboardChart.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Line1Chart = () => {
  const [line1ChartData, setLine1ChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil data dari backend Flask
        const response = await axios.get('http://127.0.0.1:5000/customer-growth-data');
        
        const { labels, growth } = response.data;
        
        // Menggabungkan labels dan growth menjadi format data yang digunakan oleh recharts
        const formattedData = labels.map((label, index) => ({
          name: label,
          customers: growth[index],
        }));
        
        setLine1ChartData(formattedData);
      } catch (error) {
        console.error('Error fetching customer growth data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: '460px', padding: '30px', display: 'flex', flexDirection: 'column' }}>
  <h2 className="text-xl font-bold text-center mb-4">Customer Growth</h2>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={line1ChartData}>
        <Line type="monotone" dataKey="customers" stroke="#4f46e5" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  </div>
  );
};

export default Line1Chart;
