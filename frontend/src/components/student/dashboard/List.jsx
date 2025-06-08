// src/components/dashboard/List.jsx
import React from "react";

const List = ({ list = [], title = "", icon }) => {
  return (
    <div className="bg-neutral-900 text-white rounded-xl shadow-lg p-4 w-80 h-80 overflow-y-auto">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-xl font-semibold capitalize">{title} List</h3>
      </div>
      <ul className="space-y-3">
        {list.length === 0 && <li className="text-gray-400">No {title} available.</li>}
        {list.map((item, i) => (
          <li key={item.id || i} className="border border-neutral-700 p-2 rounded-lg">
            <p className="font-semibold">{item.title}</p>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;