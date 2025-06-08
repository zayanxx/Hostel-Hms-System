// src/components/dashboard/List.jsx
import React from "react";

export const List = ({ list = [], title = "", icon }) => {
  return (
    <div className="bg-neutral-950 rounded-xl shadow-lg p-4 w-full max-w-sm h-80 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-lg font-semibold capitalize">
          {title}
        </h2>
        <span className="text-blue-400">{icon}</span>
      </div>
      <ul className="text-sm text-gray-300">
        {list.length === 0 ? (
          <li className="text-gray-400 italic">No {title} available</li>
        ) : (
          list.map((item, idx) => (
            <li key={idx} className="mb-2 border-b border-gray-700 pb-1">
              <div className="font-bold">{item.title}</div>
              <div className="text-gray-400">{item.desc}</div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
