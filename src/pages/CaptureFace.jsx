import React, { useState, useRef } from 'react';
import Swal from 'sweetalert2';

const FaceRecognition = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username');
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
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg');
    setImage(imageData);
    stopCamera();
  };

  const submitAttendance = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const response = await fetch('/api/attendance-process/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: image, username: username }),
      });

      const data = await response.json();
      setResult(data);

      console.log(result)

      if (data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          text: `Absensi berhasil: ${data.name} pada ${data.date}`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal melakukan registrasi wajah',
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal mengirim data',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Sistem Absensi Face Recognition</h1>

        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
          {image && (
            <img
              src={image}
              alt="Captured"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        <div className="mt-4 space-x-2">
          {!image ? (
            <>
              <button
                onClick={startCamera}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                📷 Buka Kamera
              </button>
              <button
                onClick={captureImage}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                // disabled={!videoRef.current?.srcObject}
              >
                Ambil Foto
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setImage(null);
                  setResult(null);
                  startCamera();
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Ambil Ulang
              </button>
              <button
                onClick={submitAttendance}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                disabled={loading}
              >
                {loading ? 'Memproses...' : 'Submit Absensi'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
