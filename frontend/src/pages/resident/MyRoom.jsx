import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRoom = () => {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  const fetchMyRoom = async () => {
    try {
      const res = await axios.get('http://localhost:5003/api/rooms/me');
      setRoom(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load room info');
    } finally {
      setLoading(false);
    }
  };

  fetchMyRoom();
}, []);


  if (loading) return <div className="text-center text-white py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-400 py-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="bg-gray-800 shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">My Room Details</h2>
        <div className="space-y-4 text-gray-200">
          <p><span className="font-semibold">Room Number:</span> {room.number}</p>
          <p><span className="font-semibold">Building:</span> {room.building}</p>
          <p><span className="font-semibold">Floor:</span> {room.floor}</p>
          <p><span className="font-semibold">Type:</span> {room.type}</p>
          <p><span className="font-semibold">Price per Month:</span> ${room.pricePerMonth.toFixed(2)}</p>
          <p><span className="font-semibold">Capacity:</span> {room.capacity}</p>
          <p><span className="font-semibold">Occupants:</span></p>
          <ul className="list-disc list-inside pl-4 text-sm">
            {room.occupants.map((occ) => (
              <li key={occ._id}>{occ.name} ({occ.email})</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyRoom;
