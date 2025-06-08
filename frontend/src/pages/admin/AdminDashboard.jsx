import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import {
  FiUsers,
  FiFileText,
  FiFile,
  FiCreditCard,
  FiTool,
  FiZap,    // <--- Replace FiLightbulb with FiZap
} from 'react-icons/fi';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const ENDPOINTS = {
  residents: '/api/residents',
  invoices: '/api/invoices',
  billing: '/api/billing',
  maintenance: '/api/maintenance',
  payments: '/api/payments',
  suggestions: '/api/suggestions',
  rooms: '/api/rooms',
  roomsAvailable: '/api/rooms/available',
};

const iconMap = {
  residents: <FiUsers size={40} className="text-blue-500" />,
  invoices: <FiFileText size={40} className="text-green-500" />,
  billing: <FiFile size={40} className="text-yellow-400" />,
  payments: <FiCreditCard size={40} className="text-purple-500" />,
  maintenance: <FiTool size={40} className="text-red-500" />,
  suggestions: <FiZap size={40} className="text-indigo-500" />, // updated here
};


const SkeletonCard = () => (
  <div className="bg-gray-700 animate-pulse rounded-xl p-4 h-28 flex flex-col items-center justify-center">
    <div className="bg-gray-600 rounded-full w-12 h-12 mb-3"></div>
    <div className="h-6 bg-gray-600 rounded w-14 mb-2"></div>
    <div className="h-4 bg-gray-600 rounded w-20"></div>
  </div>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [roomsStats, setRoomsStats] = useState({ total: 0, available: 0 });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const baseUrl = 'https://hostelhms.onrender.com';
        const keys = Object.keys(ENDPOINTS);
        const urls = keys.map(k => axios.get(baseUrl + ENDPOINTS[k], { withCredentials: true }));
        const results = await Promise.all(urls);

        const newCounts = {};
        results.forEach((res, i) => {
          const key = keys[i];
          if (Array.isArray(res.data.data)) {
            newCounts[key] = res.data.data.length;
          } else if (res.data.count != null) {
            newCounts[key] = res.data.count;
          }
        });

        const totalRooms = newCounts.rooms || 0;
        const availableRooms = newCounts.roomsAvailable || 0;
        setRoomsStats({ total: totalRooms, available: availableRooms });
        setCounts(newCounts);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (error)
    return (
      <div className="p-6 min-h-screen flex items-center justify-center bg-gray-900 text-red-500 text-lg font-semibold">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen space-y-10">
      <h2 className="text-4xl font-extrabold tracking-wide mb-6">Admin Dashboard</h2>

      {/* Summary Cards */}
      <section
        aria-label="Summary statistics"
        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
          : [
              { key: 'residents', label: 'Residents' },
              { key: 'invoices', label: 'Invoices' },
              { key: 'billing', label: 'Billing' },
              { key: 'payments', label: 'Payments' },
              { key: 'maintenance', label: 'Maintenance' },
              { key: 'suggestions', label: 'Suggestions' },
            ].map(c => (
              <div
                key={c.key}
                role="region"
                aria-labelledby={`${c.key}-count`}
                tabIndex={0}
                className="bg-gray-800 p-5 flex flex-col items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {iconMap[c.key]}
                <span
                  id={`${c.key}-count`}
                  className="mt-3 text-3xl font-bold"
                  aria-live="polite"
                >
                  {counts[c.key] ?? 0}
                </span>
                <span className="mt-1 text-gray-400 text-sm uppercase tracking-wide font-medium">
                  {c.label}
                </span>
              </div>
            ))}
      </section>

      {/* Charts Section */}
      <section aria-label="Detailed statistics charts" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
          role="region"
          aria-labelledby="room-occupancy-chart"
        >
          <h3 id="room-occupancy-chart" className="text-2xl font-semibold mb-4">
            Room Occupancy
          </h3>
          <Bar
            data={{
              labels: ['Available', 'Occupied'],
              datasets: [
                {
                  label: 'Rooms',
                  data: [roomsStats.available, roomsStats.total - roomsStats.available],
                  backgroundColor: ['#22c55e', '#ef4444'],
                  borderRadius: 4,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom', labels: { color: 'white' } },
                tooltip: { enabled: true },
                title: { display: false },
              },
              scales: {
                y: { beginAtZero: true, ticks: { color: 'white' } },
                x: { ticks: { color: 'white' } },
              },
            }}
          />
        </div>

        <div
          className="bg-gray-800 p-6 rounded-xl shadow-lg"
          role="region"
          aria-labelledby="monthly-payments-chart"
        >
          <h3 id="monthly-payments-chart" className="text-2xl font-semibold mb-4">
            Monthly Payments
          </h3>
          <Line
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Payments',
                  data: [5, 8, 7, 10, 6, counts.payments || 0],
                  fill: false,
                  borderColor: '#3b82f6',
                  tension: 0.3,
                  pointBackgroundColor: '#3b82f6',
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom', labels: { color: 'white' } },
                tooltip: { enabled: true },
                title: { display: false },
              },
              scales: {
                y: { beginAtZero: true, ticks: { color: 'white' } },
                x: { ticks: { color: 'white' } },
              },
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
