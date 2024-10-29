// src/components/LineChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, scales } from 'chart.js';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
ChartJS.register(CategoryScale);

const LineChart = () => {
  const [data,setData] = useState([]);

  useEffect(() => {
    axios.get('/api/sales-performance')
    .then(response => {
      setData(response.data);
        }).catch(error => {
        console.log(error);
        })
    },[]);

    const lineChartData = {
        labels: data.map(item => item.mitra),
        title:'Mitra',
        datasets: [
          {
            label: 'SPH',
            data: data.map(item => item.sph),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            dashOffset: 5,
            borderWidth: 1
          }
        ]
      };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Jumlah Subscription', // Label sumbu Y
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          display: true,
          color: 'rgba(200, 200, 200, 0.3)',
        },
        ticks: {
          color: '#333',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Mitra', // Label sumbu X
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className="justify-center items-center" style={{ width: '100%', height: '460px', padding: '30px', display: 'flex', flexDirection: 'column' }}>
      <h2 className="text-xl font-bold text-center">Customer Growth</h2>
      <Line data={lineChartData} options={options} />
    </div>
  );
};

export default LineChart;
