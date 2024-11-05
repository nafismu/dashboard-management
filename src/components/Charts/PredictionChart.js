import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PredictionChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [months, setMonths] = useState(['June', 'July', 'August']); // Contoh bulan prediksi

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('/api/predict?months=3');
        setSalesData(response.data.sales);
        setCustomerData(response.data.customers);
      } catch (error) {
        console.error('Error fetching prediction data:', error);
      }
    };

    fetchPredictions();
  }, []);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Predicted Sales',
        data: salesData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Predicted Customers',
        data: customerData,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full h-[460px] p-4 flex flex-col">
  <h2 className="text-xl font-bold text-center">Distribusi Data</h2>
  <div className="flex-1 w-full">
    <Line data={data} options={{ maintainAspectRatio: false }} />
  </div>
</div>

  );
};

export default PredictionChart;
