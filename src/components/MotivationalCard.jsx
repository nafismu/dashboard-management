import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MotivationalCard = () => {
  const [motivationText, setMotivationText] = useState("Loading...");

  useEffect(() => {

    const fetchMotivation = async () => {
      try {
        const response = await axios.get('https://api.nafismu.xyz/api/motivation');
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setMotivationText(response.data[randomIndex]);
      } catch (error) {
        console.error("Error fetching motivational text:", error);
        setMotivationText("Tetap semangat, Anda hebat!");
      }
    };
    fetchMotivation();
  }, []); // Dependency array kosong

  return (
    <div className="bg-blue-400 text-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-2">Selamat Datang di Dashboard Indibiz!</h2>
      <p className="text-lg">
        {motivationText}
      </p>
      <div className="mt-4">
        <p className="font-medium">Target Bulanan: 100 Pelanggan Baru</p>
        <p className="font-medium">Progres Mingguan: 50%</p>
      </div>
    </div>
  );
};

export default MotivationalCard;
