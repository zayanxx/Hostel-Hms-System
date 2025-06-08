// src/components/dashboard/InfoCard.jsx
import React from "react";

const InfoCard = ({ title, value, icon }) => {
  return (
    <div className="bg-neutral-900 text-white shadow-md rounded-lg p-5 flex items-center gap-4 w-60">
      <div className="text-blue-500 text-3xl">{icon}</div>
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
