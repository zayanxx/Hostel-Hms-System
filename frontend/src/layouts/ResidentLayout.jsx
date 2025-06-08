import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", path: "/resident" },
  { name: "View Maintenance", path: "maintenance" },
  { name: "My Payment", path: "payments" },
  { name: "My Room", path: "my-room" },
  { name: "View Invoices", path: "view-invoices" },
  { name: "Submit Suggestion", path: "submit-suggestion" },
];

const ResidentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // Clear auth/session here
    navigate("/login");
  };

  const isActivePath = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="flex h-screen text-white bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-800 shadow-lg flex flex-col transition-transform duration-200
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="px-6 py-5 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold uppercase">Resident Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto mt-4">
          {sidebarItems.map(({ name, path }) => {
            const active = isActivePath(path);
            return (
              <Link
                key={name}
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={`block px-6 py-3 mx-4 mb-2 rounded-md text-base font-medium transition 
                  ${active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 p-2 rounded-md text-gray-300 hover:text-white"
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-gray-900 text-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default ResidentLayout;
