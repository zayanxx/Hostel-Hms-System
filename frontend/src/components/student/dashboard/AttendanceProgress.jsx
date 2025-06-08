// src/components/dashboard/AttendanceProgress.jsx
import React from "react";

const AttendanceProgress = ({ percentage }) => {
  return (
    <div className="bg-neutral-900 text-white rounded-xl shadow-lg p-6 w-80 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">Attendance</h3>
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-neutral-700"
            strokeWidth="3.8"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-blue-500"
            strokeWidth="3.8"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default AttendanceProgress;
