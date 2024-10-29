// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale } from 'chart.js';

ChartJS.register(CategoryScale);

const PieChart = () => {
  const pieChartData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        data: [25, 15, 30, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded shadow p-7" style={{ width: '300px', height: '380px' }}>
    <h2 className="text-xl font-bold mb-2">Data Distribution</h2>
    <Pie data={pieChartData} options={options} style={{ width: '250px', height: '280px',padding: '10px'}}/>
  </div>
)
};

export default PieChart;
