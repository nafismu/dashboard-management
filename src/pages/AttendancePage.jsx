import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import Swal from "sweetalert2";
import WorkLocation from "../components/Attendance/WorkLocation";
import ShiftInfo from "../components/Attendance/ShiftInfo";
import CheckInOut from "../components/Attendance/CheckinOut";
import ActivityInput from "../components/Attendance/ActivityInput";
import HealthStatus from "../components/Attendance/HealthStatus";

const FaceVerification = ({ onVerificationComplete }) => {
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const videoConstraints = {
    width: 720,
    height: 480,
    facingMode: "user",
  };

  const captureAndVerify = async () => {
    try {
      setVerifying(true);

      const imageSrc = webcamRef.current.getScreenshot();
      const blob = await fetch(imageSrc).then((res) => res.blob());

      const formData = new FormData();
      formData.append("image", blob, "face.jpg");

      const response = await axios.post("/api/attendance-process/verify-face", formData);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Verifikasi Berhasil",
          text: "Wajah berhasil diverifikasi!",
        });
        onVerificationComplete(true, response.data);
        setShowCamera(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Verifikasi Gagal",
          text: response.data.message || "Wajah tidak dikenali. Coba lagi.",
        });
        onVerificationComplete(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan",
        text: error.response?.data?.message || "Terjadi kesalahan saat verifikasi.",
      });
      onVerificationComplete(false);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="relative">
      {showCamera ? (
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="relative">
            <button
              onClick={() => setShowCamera(false)}
              className="absolute top-2 right-2 z-10 bg-red-500 text-white p-1 rounded-full"
            >
              &#10006;
            </button>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              className="rounded-lg w-full"
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={captureAndVerify}
              disabled={verifying}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {verifying ? "Memverifikasi..." : "Ambil Foto"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowCamera(true)}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
        >
          Verifikasi Wajah
        </button>
      )}
    </div>
  );
};

const AttendancePage = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    verified: false,
    data: null,
  });

  const handleVerificationComplete = (success, data) => {
    setVerificationStatus({
      verified: success,
      data: data,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Absensi Harian Section */}
        <div className="flex flex-col bg-white shadow-md rounded-lg p-4 sm:p-6 lg:w-2/3">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Absensi Harian</h1>
          <HealthStatus />
          <WorkLocation />
          <ActivityInput />
          <div className="flex justify-between items-start mt-4">
            <ShiftInfo />
          </div>
        </div>

        {/* Check In/Out Section */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:w-1/3">
          <div className="mb-4">
            <FaceVerification onVerificationComplete={handleVerificationComplete} />
            {verificationStatus.verified &&
              Swal.fire({
                icon: "success",
                title: "Verifikasi Berhasil",
                text: "Silakan lakukan check in/out",
              })}
          </div>
          <CheckInOut
            disabled={!verificationStatus.verified}
            verificationData={verificationStatus.data}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
