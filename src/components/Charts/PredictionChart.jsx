import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const PredictionChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [months, setMonths] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get('https://api.nafismu.xyz/api/predict', { // Prediksi untuk 3 bulan
        });
        setSalesData(response.data.sales_predictions);
        // setCustomerData(response.data.customers);
        setMonths(['June', 'July', 'August']); // 
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
      <h2 className="text-xl font-bold text-center">hasil prediksi untuk  3 bulan dari F4_Negotiation </h2>
      <div className="flex-1 w-full">
        <p>{salesData.slice(0, 1)}</p>
        {/* <Line data={data} options={{ maintainAspectRatio: false }} /> */}
      </div>
    </div>
  );
};

export default PredictionChart;
