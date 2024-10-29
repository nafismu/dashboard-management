// src/components/CustomerTable.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CustomerTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ganti dengan Base ID dan API Key Anda
        const AIRTABLE_BASE_ID = 'appEUV8x0eeQj8AqD';
        const AIRTABLE_API_KEY = 'patU979eR3tK48xl6.6c8ca1ab097e7a6df4d97ad355b53ee8d0c276847846b463977e6fa3358904fc';
        const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Employees`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        });

        const records = response.data.records.map(record => ({
          id: record.id,
          ...record.fields,
        }));

        setEmployees(records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="bg-gradient-to-b from-blue-50 to-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-indigo-500 text-white font-bold rounded-t-lg">
          Employee List
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="w-full bg-gray-200 text-left">
                <th className="py-3 px-6 border-b-2">No</th>
                <th className="py-3 px-6 border-b-2">Name</th>
                <th className="py-3 px-6 border-b-2">Email</th>
                <th className="py-3 px-6 border-b-2">Position</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{employee.name}</td>
                  <td className="py-3 px-6 text-left">{employee.email}</td>
                  <td className="py-3 px-6 text-left">{employee.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}

export default CustomerTable;
