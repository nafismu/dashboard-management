import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const FaceRecognition = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Tidak dapat mengakses kamera',
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      setImage(imageData);
      stopCamera();
    }
  };

  const submitAttendance = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', username);
      formData.append('role', role);
      const response = await axios.post('/api/attendance-process/register', formData);
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: response.data.message,
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.error || 'Failed to register user',
      });
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Rekam Wajah</h1>
      <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
        {!image ? (
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
        ) : (
          <img src={image} alt="Captured" className="w-full h-full object-cover" />
        )}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        {!image ? (
          <>
            <button
              onClick={startCamera}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              📷 Buka Kamera
            </button>
            <button
              onClick={captureImage}
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              Ambil Foto
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setImage(null);
                startCamera();
              }}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition"
            >
              Ambil Ulang
            </button>
            <button
              onClick={submitAttendance}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit Absensi'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
