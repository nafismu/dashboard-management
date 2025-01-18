import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [barChartData, setBarChartData] = useState({
    labels: [], // Label untuk sumbu X
    datasets: [
      {
        label: 'Sales', // Label dataset
        data: [], // Data awal
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Warna bar
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mengambil data dari endpoint backend
        const response = await axios.get('/api/sales-data');

        const { labels, sales } = response.data; // Ekstraksi data

        // Update data chart
        setBarChartData({
          labels: labels || [], // Pastikan labels ada
          datasets: [
            {
              label: 'Sales',
              data: sales || [], // Pastikan data ada
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], // Warna bar
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  // Konfigurasi opsi chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top', // Posisi legenda
        labels: {
          color: '#333', // Warna teks legenda
        },
      },
      title: {
        display: true,
        text: 'Distribusi Sales Data', // Judul chart
        color: '#333',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Kategori',
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#333',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Jumlah Sales',
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          color: '#333',
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)', // Gridline y-axis
        },
      },
    },
  };

  return (
    <div className="w-full h-[460px] p-4 flex flex-col">
      {/* <h2 className="text-xl font-bold text-center mb-4">Distribusi Data</h2> */}
      {/* Bar Chart */}
      {barChartData.labels.length > 0 ? (
        <Bar data={barChartData} options={options} />
      ) : (
        <p className="text-center text-gray-500">Memuat data...</p>
      )}
    </div>
  );
};

export default BarChart;
