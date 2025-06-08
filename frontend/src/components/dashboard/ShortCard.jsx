// src/components/dashboard/ShortCard.jsx
import React from "react";

export const ShortCard = ({ title, number }) => {
  return (
    <div className="bg-neutral-950 p-6 rounded-xl shadow-md w-full max-w-xs text-center">
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-4xl font-bold text-blue-500">{number}</p>
    </div>
  );
};
