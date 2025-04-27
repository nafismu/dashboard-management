import React from "react";
import { useState } from "react";

const HealthStatus = ({onKondisiChange}) => {
  const [selectedKondisi, setSelectedKondisi] = useState("");

  const handleButtonClick = (kondisi) => {
    setSelectedKondisi(kondisi); // Menyimpan kondisi yang dipilih
    onKondisiChange(kondisi);
    console.log(kondisi); // Menampilkan di konsol
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Bagaimana kondisi kesehatan kamu saat ini?</h2>
      <div className="grid grid-cols-3 gap-4">
        <button
          className={`p-4 rounded-lg ${
            selectedKondisi === "Sehat" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"
          }`}
          onClick={() => handleButtonClick("Sehat")}
        >
          <img src="icon-sehat.png" alt="Sehat" className="h-12 mx-auto" />
          <p className="text-center mt-2">Sehat</p>
        </button>
        <button
          className={`p-4 rounded-lg ${
            selectedKondisi === "Kurang Fit" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"
          }`}
          onClick={() => handleButtonClick("Kurang Fit")}
        >
          <img src="icon-kurang-fit.png" alt="Kurang Fit" className="h-12 mx-auto" />
          <p className="text-center mt-2">Kurang Fit</p>
        </button>
        <button
          className={`p-4 rounded-lg ${
            selectedKondisi === "Sakit" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"
          }`}
          onClick={() => handleButtonClick("Sakit")}
        >
          <img src="icon-sakit.png" alt="Sakit" className="h-12 mx-auto" />
          <p className="text-center mt-2">Sakit</p>
        </button>
      </div>
      {selectedKondisi && (
        <p className="mt-4 text-center text-green-600">
          Kondisi yang dipilih: <strong>{selectedKondisi}</strong>
        </p>
      )}
    </div>
  );
};

export default HealthStatus;
