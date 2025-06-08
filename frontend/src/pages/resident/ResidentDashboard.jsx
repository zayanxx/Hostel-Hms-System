import React from "react";
import {
  FaCalendarAlt,
  FaDoorOpen,
  FaBell,
  FaComments,
} from "react-icons/fa";

const stats = [
  {
    title: "Upcoming Bookings",
    value: 3,
    icon: <FaCalendarAlt className="text-indigo-500" />,
    bgColor: "bg-indigo-100",
  },
  {
    title: "Checked-in Rooms",
    value: 1,
    icon: <FaDoorOpen className="text-green-500" />,
    bgColor: "bg-green-100",
  },
  {
    title: "Notifications",
    value: 5,
    icon: <FaBell className="text-yellow-500" />,
    bgColor: "bg-yellow-100",
  },
  {
    title: "Messages",
    value: 2,
    icon: <FaComments className="text-blue-500" />,
    bgColor: "bg-blue-100",
  },
];

const ResidentDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-200 mb-6 select-none">
        Welcome, Resident
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ title, value, icon, bgColor }) => (
          <div
            key={title}
            className={`flex items-center gap-4 p-6 rounded-lg shadow-lg ${bgColor} transform hover:scale-105 transition-transform duration-300 cursor-pointer`}
          >
            <div className="text-4xl">{icon}</div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg text-gray-200">
        <h2 className="text-xl font-semibold mb-4 select-none">Recent Activity</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Checked in to Room</li>
          <li>Booking request approved</li>
          <li>Message from admin received</li>
          <li>Maintenance scheduled for Room</li>
        </ul>
      </section>
    </div>
  );
};

export default ResidentDashboard;
