import React from "react";
import { useState } from "react";
const WorkLocation = () => {
  const [selectedKondisi,setSelectedKondisi] = useState("");
  const handleButtonClick = (kondisi) => {
    setSelectedKondisi(kondisi);
    console.log(kondisi); // Untuk melihat nilai yang dipilih di console
  };
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Lokasi tempat kamu bekerja sekarang?</h2>
      <div className="grid grid-cols-3 gap-4 ">
        <button className={`p-4 rounded-lg ${selectedKondisi === "WFO" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"}`} onClick={() => handleButtonClick("WFO")}>
          <img src="icon-wfo.png" alt="WFO" className="h-12 mx-auto" />
          <p className="text-center mt-2">WFO</p>
        </button>
        <button className={`p-4 rounded-lg ${selectedKondisi === "WFH" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"}`} onClick={() => handleButtonClick("WFH")}>
          <img src="icon-wfh.png" alt="WFH" className="h-12 mx-auto" />
          <p className="text-center mt-2">WFH</p>
        </button>
        <button className={`p-4 rounded-lg ${selectedKondisi === "WFA" ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-blue-100"}`} onClick={() => handleButtonClick("WFA")}>
          <img src="icon-wfa.png" alt="WFA" className="h-12 mx-auto" />
          <p className="text-center mt-2">WFA</p>
        </button>
      </div>
    </div>
  );
};

export default WorkLocation;
