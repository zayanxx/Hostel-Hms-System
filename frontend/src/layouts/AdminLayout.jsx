import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaDoorOpen,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaRegLightbulb,
  FaFileInvoiceDollar,
  FaTools,
  FaMoneyBill,
} from "react-icons/fa";

const sidebarItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
  { name: "Users", icon: <FaUsers />, path: "/admin/users" },
  { name: "Rooms", icon: <FaDoorOpen />, path: "/admin/rooms" },
  { name: "Suggestions", icon: <FaRegLightbulb />, path: "/admin/suggestions" },
  { name: "Invoices", icon: <FaFileInvoiceDollar />, path: "/admin/invoices" },
  { name: "Maintenance", icon: <FaTools />, path: "/admin/maintenance" },
  { name: "Billing", icon: <FaCog />, path: "/admin/billing" },
  { name: "Payments", icon: <FaMoneyBill />, path: "/admin/payments" },
];

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token etc.
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-800 shadow-lg flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:flex`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-700">
          <h2 className="text-2xl font-extrabold tracking-wide uppercase">
            Admin Panel
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto mt-4">
          {sidebarItems.map(({ name, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                to={path}
                key={name}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-4 px-6 py-3 mx-4 my-2 rounded-lg text-lg font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                <span className="text-xl">{icon}</span>
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-6 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-red-600 py-3 text-white font-semibold hover:bg-red-700 transition duration-300 shadow"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md text-gray-400 hover:text-white md:hidden"
        aria-label="Open sidebar"
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Main content */}
      <main className="flex-1 min-h-screen p-6 md:p-8 overflow-y-auto bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
