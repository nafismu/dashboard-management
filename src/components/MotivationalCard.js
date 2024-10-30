import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MotivationalCard = () => {
  const [motivationText, setMotivationText] = useState("Loading...");

  useEffect(() => {
    const fetchMotivation = async () => {
      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci/completions',
          {
            prompt: "Berikan kata-kata motivasi singkat untuk memulai hari dengan semangat:",
            max_tokens: 50,
            temperature: 0.7
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`
            }
          }
        );
        setMotivationText(response.data.choices[0].text.trim());
      } catch (error) {
        console.error("Error fetching motivational text:", error);
        setMotivationText("Tetap semangat, Anda hebat!");
      }
    };

    fetchMotivation();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
      <h2 className="text-xl font-semibold mb-2">Selamat Datang di Dashboard Indibiz!</h2>
      <p className="text-lg">
        {motivationText}
      </p>
      <div className="mt-4">
        <p className="font-medium">Target Bulanan: 100 Pelanggan Baru</p>
        <p className="font-medium">Progres Mingguan: 50%</p>
      </div>
      <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
        Lihat Target Anda
      </button>
    </div>
  );
};

export default MotivationalCard;
