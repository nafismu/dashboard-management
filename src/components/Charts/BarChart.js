// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js';

ChartJS.register(CategoryScale);

const BarChart = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sales',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil data dari backend Flask
        const response = await axios.get('/api/sales-data');
        
        const { labels, sales } = response.data;
        
        // Mengatur data ke dalam state
        setBarChartData({
          labels: labels,
          datasets: [
            {
              label: 'Sales',
              data: sales,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="w-full h-[460px] p-4 flex flex-col">
      <h2 className="text-xl font-bold text-center">Distribusi Data</h2>
      <Bar data={barChartData} options={{ maintainAspectRatio: false }} />
    </div>
  );
};

export default BarChart;
