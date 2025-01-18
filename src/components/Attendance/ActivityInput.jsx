import React from "react";

const ActivityInput = () => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Aktivitas Anda hari ini</h2>
      <textarea
        className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Aktivitas Anda hari ini"
        maxLength={255}
      ></textarea>
      <p className="text-sm text-gray-500 mt-2">Maksimal 255 karakter (0/255). Apabila lebih dari 255 karakter, maka akan otomatis dipotong.</p>
    </div>
  );
};

export default ActivityInput;
