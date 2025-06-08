// src/components/dashboard/InfoCard.jsx
import React from "react";

const InfoCard = ({ icon, title, value, bgColor = "bg-blue-600" }) => {
  return (
    <div className={`rounded-xl p-4 shadow-md text-white w-full max-w-xs ${bgColor}`}>
      <div className="flex items-center gap-4">
        <div className="text-white text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
