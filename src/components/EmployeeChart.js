// src/components/EmployeeChart.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const EmployeeChart = () => {
    const [employeeData, setEmployeeData] = useState([]);

    useEffect(() => {
        axios.get('/api/sales-performance')
            .then(response => {
                setEmployeeData(response.data);
            })
            .catch(error => {
                console.error("Error fetching employee data:", error);
            });
    }, []);

    const data = {
        labels: employeeData.map(data => (data.mitra)),
        datasets: [
            {
                label: 'Subscription',
                data: employeeData.map(data => (data.sph)),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        scales: {
            x: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className='ml-10 w-1/2' >
            <h2>Employee Subscription Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default EmployeeChart;
