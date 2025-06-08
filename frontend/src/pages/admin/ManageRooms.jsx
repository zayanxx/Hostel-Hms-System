/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/ManageRooms.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Building2,
  Users,
  BedDouble,
  DollarSign,
  Search,
  CheckCircle2,
  XCircle,
  LayoutList,
} from 'lucide-react';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const endpoint = showAvailableOnly
        ? 'https://hostelhms.onrender.com/api/rooms/available'
        : 'https://hostelhms.onrender.com/api/rooms';
      const res = await axios.get(endpoint, { withCredentials: true });
      setRooms(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [showAvailableOnly]);

  const filteredRooms = rooms.filter((room) => {
    const value = search.toLowerCase();
    return (
      room.number.toLowerCase().includes(value) ||
      room.building.toLowerCase().includes(value) ||
      room.type.toLowerCase().includes(value)
    );
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <LayoutList /> Manage Rooms
          </h2>

          <div className="flex gap-4 flex-wrap">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search rooms..."
                className="pl-10 pr-4 py-2 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowAvailableOnly(!showAvailableOnly)}
              className={`px-4 py-2 rounded-xl border ${
                showAvailableOnly
                  ? 'bg-green-600 border-green-500 hover:bg-green-700'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
              } transition`}
            >
              {showAvailableOnly ? 'Showing Available Only' : 'Show Available Rooms'}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-300">Loading rooms...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRooms.length ? (
              filteredRooms.map((room) => (
                <div
                  key={room._id}
                  className="bg-gray-900 border border-gray-700 rounded-xl p-5 shadow-md space-y-2 hover:shadow-xl transition"
                >
                  <div className="text-xl font-semibold flex items-center gap-2">
                    <BedDouble size={20} /> Room {room.number}
                  </div>
                  <div className="text-sm flex items-center gap-2 text-gray-300">
                    <Building2 size={16} /> {room.building} - Floor {room.floor}
                  </div>
                  <div className="flex justify-between items-center text-sm mt-2 text-gray-300">
                    <span className="flex items-center gap-1">
                      <Users size={16} /> {room.occupants.length}/{room.capacity} Occupants
                    </span>
                    <span className="capitalize">{room.type}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="flex items-center gap-1 text-green-400">
                      <DollarSign size={16} /> {room.pricePerMonth} / month
                    </span>
                    <span className={`flex items-center gap-1 ${room.occupied ? 'text-red-500' : 'text-green-500'}`}>
                      {room.occupied ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
                      {room.occupied ? 'Occupied' : 'Available'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center col-span-full">No rooms found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRooms;
