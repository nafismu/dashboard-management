import React from "react";

const HealthStatus = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Bagaimana kondisi kesehatan kamu saat ini?</h2>
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-gray-100 p-4 rounded-lg hover:bg-blue-100">
          <img src="icon-sehat.png" alt="Sehat" className="h-12 mx-auto" />
          <p className="text-center mt-2">Sehat</p>
        </button>
        <button className="bg-gray-100 p-4 rounded-lg hover:bg-blue-100">
          <img src="icon-kurang-fit.png" alt="Kurang Fit" className="h-12 mx-auto" />
          <p className="text-center mt-2">Kurang Fit</p>
        </button>
        <button className="bg-gray-100 p-4 rounded-lg hover:bg-blue-100">
          <img src="icon-sakit.png" alt="Sakit" className="h-12 mx-auto" />
          <p className="text-center mt-2">Sakit</p>
        </button>
      </div>
    </div>
  );
};

export default HealthStatus;
