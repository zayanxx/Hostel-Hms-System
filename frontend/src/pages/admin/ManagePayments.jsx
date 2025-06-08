// src/pages/ManagePayments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  User,
  DollarSign,
  CalendarDays,
  Receipt,
  ShieldCheck,
} from 'lucide-react';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://hostelhms.onrender.com/api/payments', {
          withCredentials: true,
        });
        setPayments(response.data.data || []);
        setFilteredPayments(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = payments.filter((p) =>
      p.paymentReference?.toLowerCase().includes(term) ||
      p.user?.name?.toLowerCase().includes(term) ||
      p.user?.email?.toLowerCase().includes(term) ||
      p.amount?.toString().includes(term) ||
      p.paymentDate?.toLowerCase().includes(term) ||
      p.status?.toLowerCase().includes(term)
    );
    setFilteredPayments(filtered);
  }, [searchTerm, payments]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-3xl font-bold">Manage Payments</h2>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-gray-300">Loading payments...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="min-w-full text-sm text-gray-100">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <Receipt size={16} color="#3B82F6" /> Reference
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={16} color="#10B981" /> Payer
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <DollarSign size={16} color="#F59E0B" /> Amount
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} color="#8B5CF6" /> Date
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} color="#EF4444" /> Status
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-700 transition">
                      <td className="py-2 px-4 border-b border-gray-700">
                        {p.paymentReference || 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {p.user?.name || 'Unknown'} ({p.user?.email || 'No email'})
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        ${typeof p.amount === 'number' ? p.amount.toFixed(2) : '0.00'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 capitalize">
                        {p.status || 'Unknown'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      No payments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePayments;
