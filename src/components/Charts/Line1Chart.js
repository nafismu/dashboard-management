// src/components/DashboardChart.js
import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Line1Chart = () => {
  const [line1ChartData, setLine1ChartData] = useState([]);
  const [data,setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     // Mengambil data dari backend Flask
    //     const response = await axios.get('http://127.0.0.1:5000/customer-growth-data');
        
    //     const { labels, growth } = response.data;
        
    //     // Menggabungkan labels dan growth menjadi format data yang digunakan oleh recharts
    //     const formattedData = labels.map((label, index) => ({
    //       name: label,
    //       customers: growth[index],
    //     }));
    //     setLine1ChartData(formattedData);
    //   } catch (error) {
    //     console.error('Error fetching customer growth data:', error);
    //   }
    // };
    axios.get('/api/sales-performance')
    .then(response =>{
      setData(response.data)
      // console.log(data);
    })
    .catch(error =>{
      console.log("error fetching data",error);
    })
    // fetchData();
}, []);

  return (
    <div className="w-full h-[460px] -ml-8 flex flex-col">
  <h2 className="text-xl font-bold text-center mb-4">Perkembangan Performa Sales</h2>
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data} className="p-5">
      <Line type="natural" dataKey="f0" stroke="#4f46e5" />
      <Line type="natural" dataKey="f1" stroke="#4f46e5" />
      <Line type="natural" dataKey="f3" stroke="#4f46e5" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="namaSA" tick={{ fontSize: 12 }} interval={0} angle={-50} />
      <YAxis />
      <Tooltip />
    </LineChart>
  </ResponsiveContainer>
</div>

  );
};

export default Line1Chart;
