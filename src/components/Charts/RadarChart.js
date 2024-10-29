// src/components/RadarChart.js
import React from 'react';
import { Radar } from 'react-chartjs-2';

const RadarChart = () => {
  const radarChartData = {
    labels: ['Quality', 'Service', 'Price', 'Customer Satisfaction'],
    datasets: [
      {
        label: '2024',
        data: [90, 80, 85, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Radar data={radarChartData} options={options} />;
};

export default RadarChart;
