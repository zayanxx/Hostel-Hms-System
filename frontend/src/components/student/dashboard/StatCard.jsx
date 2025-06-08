// src/components/dashboard/StatCard.jsx
import React from "react";

const StatCard = ({ title, stat, icon, color = "text-blue-500" }) => {
  return (
    <div className="bg-neutral-900 rounded-lg shadow-lg p-4 w-64 text-white">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">{title}</div>
        <div className={`text-3xl ${color}`}>{icon}</div>
      </div>
      <div className="mt-2 text-4xl font-bold">{stat}</div>
    </div>
  );
};

export default StatCard;
