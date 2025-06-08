// src/pages/ManageUsers.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Search,
  User,
  Mail,
  Phone,
  BedDouble,
  ShieldCheck,
} from 'lucide-react';

const ManageUsers = () => {
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/residents', { withCredentials: true });
        setResidents(response.data.data);
        setFilteredResidents(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load residents");
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = residents.filter((r) =>
      r.user.name.toLowerCase().includes(term) ||
      r.user.email.toLowerCase().includes(term) ||
      r.contactNumber.includes(term) ||
      r.room?.number?.toString().includes(term) ||
      r.status.toLowerCase().includes(term)
    );
    setFilteredResidents(filtered);
  }, [searchTerm, residents]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-3xl font-bold">Manage Residents</h2>
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
          <div className="text-gray-300">Loading residents...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="min-w-full text-sm text-gray-100">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={16} color="#3B82F6" /> Name
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail size={16} color="#10B981" /> Email
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone size={16} color="#F59E0B" /> Contact
                    </div>
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-600">
                    <div className="flex items-center gap-2">
                      <BedDouble size={16} color="#8B5CF6" /> Room
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
                {filteredResidents.length > 0 ? (
                  filteredResidents.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-700 transition">
                      <td className="py-2 px-4 border-b border-gray-700">{r.user.name}</td>
                      <td className="py-2 px-4 border-b border-gray-700">{r.user.email}</td>
                      <td className="py-2 px-4 border-b border-gray-700">{r.contactNumber}</td>
                      <td className="py-2 px-4 border-b border-gray-700">{r.room?.number || 'N/A'}</td>
                      <td className="py-2 px-4 border-b border-gray-700 capitalize">{r.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-400">
                      No residents found.
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

export default ManageUsers;
