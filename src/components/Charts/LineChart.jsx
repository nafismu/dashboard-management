import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await axios.get('https://api.nafismu.xyz/api/sales-performance');
        setData(salesResponse.data);
        setPredictions(predictionResponse.data.predictions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const threshold = 100; // Performansi minimal
  const filteredData = data
            .filter((item) => item.mitra > threshold) // Tampilkan jika performa di atas ambang tertentu
            .sort((a, b) => b.mitra - a.mitra) // Urutkan performa dari besar ke kecil
            .slice(0, 5); // Ambil 5 data teratas
  // Prepare chart data
  const lineChartData = {
    labels: [
      ...data.map(item => item.mitra), // Data labels from API
      ...predictions.map((_, index) => `Prediction ${index + 1}`) // Labels for predictions
    ],
    datasets: [
      {
        label: 'SPH',
        data: data.map(item => item.sph),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Predicted SPH',
        data: [...Array(data.length).fill(null), ...predictions], // Align predictions with data
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderDash: [5, 5], // Dashed line for predictions
        borderWidth: 2,
        fill: false,
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Jumlah Subscription',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.3)', // Light gray gridlines
        },
        ticks: {
          color: '#333', // Axis tick color
        },
      },
      x: {
        title: {
          display: true,
          text: 'Mitra',
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          display: false, // Disable x-axis gridlines
        },
        ticks: {
          color: '#333', // Axis tick color
        },
      },
    },
    plugins: {
      legend: {
        position: 'top', // Position legend at the top
        labels: {
          color: '#333', // Legend text color
        },
      },
    },
  };

  return (
    <div
      className="justify-center items-center"
      style={{
        width: '100%',
        height: '460px',
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 className="text-xl font-bold text-center mb-4">Prediksi Sales dengan Regresi Linear</h2>
      {data.length > 0 || predictions.length > 0 ? (
        <Line data={lineChartData} options={options} />
      ) : (
        <p className="text-gray-500">Loading data...</p>
      )}
    </div>
  );
};

export default LineChart;
