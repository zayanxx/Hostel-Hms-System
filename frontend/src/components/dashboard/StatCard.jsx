// src/components/dashboard/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon, color = "text-blue-500" }) => {
  return (
    <div className="bg-neutral-950 rounded-xl p-6 shadow-md w-full max-w-xs text-white">
      <div className="flex items-center gap-4">
        <div className={`text-3xl ${color}`}>{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
