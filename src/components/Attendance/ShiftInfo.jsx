// import React from "react";
import { useState } from "react";
import axios from "axios";
const ShiftInfo = () => {
  const [date,setDate] = useState("");
  const [time, setTime] = useState("");
  try {
    axios
      .get("api/date")
      .then((response) => {
        setDate(response.data.date);
        setTime(response.data.time);
      })
  }catch(error) {
    console.log(error);
  }finally {
  }
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-sm text-gray-600">Hari Ini {date} Jam {time}</p>
      <p className="text-sm text-gray-600">SHIFT (08:00 - 17:00 WIB)</p>
    </div>
  );
};

export default ShiftInfo;
