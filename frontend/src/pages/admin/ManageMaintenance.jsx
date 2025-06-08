/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  Wrench,
  Trash2,
  CheckCircle2,
  RefreshCcw,
  User2,
  DoorOpen,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const ManageMaintenance = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchMaintenance = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`https://hostelhms.onrender.com/api/maintenance`, {
        params: {
          page,
          limit,
          status: statusFilter || undefined,
        },
        withCredentials: true,
      });
      setMaintenance(res.data.data);
      setTotalPages(res.data.pagination.pages);
    } catch (err) {
      console.error(err);
      toast.error('Error fetching maintenance records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenance();
  }, [page, statusFilter]);

  const handleComplete = async (id) => {
    try {
      await axios.put(
        `https://hostelhms.onrender.com/api/maintenance/${id}`,
        { status: 'completed' },
        { withCredentials: true }
      );
      toast.success('Marked as completed');
      fetchMaintenance();
    } catch (err) {
      console.error(err);
      toast.error('Error marking as completed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hostelhms.onrender.com/api/maintenance/${id}`, {
        withCredentials: true,
      });
      toast.success('Record deleted successfully');
      setDeleteConfirmId(null);
      fetchMaintenance();
    } catch (err) {
      console.error(err);
      toast.error('Error deleting record');
    }
  };

  // Helper to get icon color by status
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400';
      case 'in_progress':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Toast container */}
      <Toaster position="top-right" />

      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Wrench className="text-blue-400" />
            Manage Maintenance
          </h1>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-xl"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : maintenance.length === 0 ? (
          <p className="text-gray-400">No maintenance requests found.</p>
        ) : (
          <div className="space-y-4">
            {maintenance.map((item) => (
              <div
                key={item._id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-4"
              >
                <div className="flex justify-between items-start flex-wrap md:flex-nowrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-sm text-gray-300 mb-2">{item.description}</p>

                    <div className="text-xs text-gray-400 space-y-1">
                      <div className="flex items-center gap-2">
                        <User2 size={14} className="text-green-400" />
                        {item.resident?.user?.name || 'N/A'}
                      </div>
                      <div className="flex items-center gap-2">
                        <DoorOpen size={14} className="text-blue-400" />
                        Room {item.room?.number || 'Unassigned'}
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={14}
                          className={getStatusColor(item.status)}
                        />
                        <span className={getStatusColor(item.status)}>
                          Status: {item.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCcw size={14} className="text-yellow-400" />
                        Requested: {moment(item.requestedAt).format('LLL')}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    {item.status !== 'completed' && (
                      <button
                        onClick={() => handleComplete(item._id)}
                        className="text-green-400 hover:text-green-500 transition"
                        title="Mark as completed"
                      >
                        <CheckCircle2 size={20} />
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteConfirmId(item._id)}
                      className="text-red-500 hover:text-red-600 transition"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-xl ${
                page === i + 1 ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <h3 className="text-xl font-semibold text-white">
              Confirm Deletion
            </h3>
            <p className="text-gray-300">Are you sure you want to delete this record?</p>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMaintenance;
