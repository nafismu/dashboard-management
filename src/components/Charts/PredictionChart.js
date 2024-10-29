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
        const response = await axios.get('http://127.0.0.1:5000/predict?months=3');
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
    <div style={{width: '100%', height: '460px', padding: '30px', display: 'flex', flexDirection: 'column'}}>
    <h2 className="text-xl font-bold text-center">Data Distribution</h2>
    <Line data={data}/>
  </div>
  );
};

export default PredictionChart;
