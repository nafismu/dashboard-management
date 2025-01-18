import React from "react";

const WorkLocation = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Lokasi tempat kamu bekerja sekarang?</h2>
      <div className="grid grid-cols-3 gap-4">
        <button className="bg-gray-100 p-4 rounded-lg hover:bg-blue-100">
          <img src="icon-wfo.png" alt="WFO" className="h-12 mx-auto" />
          <p className="text-center mt-2">WFO</p>
        </button>
        <button className="bg-gray-100 p-4 rounded-lg hover:bg-blue-100">
          <img src="icon-wfh.png" alt="WFH" className="h-12 mx-auto" />
          <p className="text-center mt-2">WFH</p>
        </button>
        <button className="bg-gray-100 p-4 rounded-lg hover:bg-blue-100">
          <img src="icon-wfa.png" alt="WFA" className="h-12 mx-auto" />
          <p className="text-center mt-2">WFA</p>
        </button>
      </div>
    </div>
  );
};

export default WorkLocation;
