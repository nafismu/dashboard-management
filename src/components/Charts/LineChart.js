import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
  const [data, setData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    axios.get('/api/sales-performance')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching sales performance data:", error);
      });

    axios.get('/api/sales-performance/prediction')
      .then(response => {
        setPredictions(response.data.predictions);
      })
      .catch(error => {
        console.error("Error fetching predictions:", error);
      });
  }, []);

  const lineChartData = {
    labels: data.map((item, index) => item.mitra).concat(predictions.map((_, index) => `Prediction ${index + 1}`)),
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
        data: [...Array(data.length).fill(null), ...predictions],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
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
          text: 'Jumlah Subscription',
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
          text: 'Mitra',
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
      <h2 className="text-xl font-bold text-center">Prediksi sales dengan Regresi Linear</h2>
      <Line data={lineChartData} options={options} />
    </div>
  );
};

export default LineChart;
