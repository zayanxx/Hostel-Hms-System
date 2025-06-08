// src/pages/ManageBilling.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  User,
  DollarSign,
  FileText,
  CalendarDays,
  ShieldCheck,
} from 'lucide-react';

const ManageBilling = () => {
  const [billings, setBillings] = useState([]);
  const [filteredBillings, setFilteredBillings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/billing', {
          withCredentials: true,
        });
        setBillings(response.data.data || []);
        setFilteredBillings(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load billing data");
      } finally {
        setLoading(false);
      }
    };

    fetchBilling();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = billings.filter((b) =>
      b.billingNumber?.toLowerCase().includes(term) ||
      b.user?.name?.toLowerCase().includes(term) ||
      b.user?.email?.toLowerCase().includes(term) ||
      b.amount?.toString().includes(term) ||
      b.billingDate?.toLowerCase().includes(term) ||
      b.status?.toLowerCase().includes(term)
    );
    setFilteredBillings(filtered);
  }, [searchTerm, billings]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-3xl font-bold">Manage Billing</h2>
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
          <div className="text-gray-300">Loading billing records...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="min-w-full text-sm text-gray-100">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <FileText size={16} color="#3B82F6" /> Billing #
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={16} color="#10B981" /> Customer
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
                {filteredBillings.length > 0 ? (
                  filteredBillings.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-700 transition">
                      <td className="py-2 px-4 border-b border-gray-700">
                        {b.billingNumber || 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {b.user?.name || 'Unknown'} ({b.user?.email || 'No email'})
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        ${typeof b.amount === 'number' ? b.amount.toFixed(2) : '0.00'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700">
                        {b.billingDate ? new Date(b.billingDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-700 capitalize">
                        {b.status || 'Unknown'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      No billing records found.
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

export default ManageBilling;