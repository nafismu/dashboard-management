import React, { useRef, useState } from "react";

const CheckInOut = () => {
  const videoRef = useRef(null); // Referensi untuk elemen video
  const [isCameraActive, setIsCameraActive] = useState(false); // Status kamera
  const [cameraError, setCameraError] = useState(null); // Error kamera
  const [deactivated, setDeactivated] = useState(false);

  // Fungsi untuk mengaktifkan kamera
    const deactivateCamera = () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
      setDeactivated(true);
    }
  const activateCamera = async () => {
    try {
      // Mencoba mengakses kamera
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsCameraActive(true);
      setCameraError(null); // Reset error
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      setCameraError("Gagal mengakses kamera. Pastikan kamera terhubung dan memiliki izin.");
    }
  };

  // Fungsi untuk menangani input check-in/check-out
  const handleInput = (type) => {
    const currentTime = new Date().toLocaleTimeString("id-ID");
    alert(`${type} berhasil pada pukul ${currentTime}`);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-sm mx-auto">
      {/* Informasi Check In dan Check Out */}
      <div className="text-center mb-6">
        <p className="mb-2">
          Check In: <span className="text-green-600">--:-- WIB</span>
        </p>
        <p className="mb-4">
          Check Out: <span className="text-green-600">--:-- WIB</span>
        </p>
      </div>

      {/* Kotak Standby Kamera */}
      <div className="border border-dashed border-gray-400 rounded-lg w-80 h-60 flex items-center justify-center mb-4 bg-gray-50 relative">
        {!isCameraActive ? (
          <p className="text-gray-500">Standby untuk input kamera...</p>
        ) : (
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            muted
          ></video>
        )}
      </div>

      {/* Pesan Error jika kamera gagal */}
      {cameraError && (
        <p className="text-red-500 text-sm mb-4 text-center">{cameraError}</p>
      )}

      {/* Tombol Aktivasi Kamera */}
      <button
        className="mt-10 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full mb-2"
        onClick={activateCamera}
      >
        Aktivasi Kamera
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full mb-2"
        onClick={deactivateCamera}
      >
        {deactivated ? "Kamera Deaktivasi" : "Deaktivasi Kamera"}
      </button>

      {/* Tombol Check In dan Check Out */}
      <div className="flex justify-between w-full">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex-1 mr-2"
          onClick={() => handleInput("Check In")}
        >
          Check In
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex-1 ml-2"
          onClick={() => handleInput("Check Out")}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CheckInOut;
