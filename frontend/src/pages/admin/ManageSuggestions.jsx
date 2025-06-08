import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MessageSquareText,
  Trash2,
  Search,
  User2,
  Clock,
  Mail,
  X,
  Check,
} from 'lucide-react';
import moment from 'moment';

const ManageSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://hostelhms.onrender.com/api/suggestions', {
        withCredentials: true,
      });
      setSuggestions(res.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://hostelhms.onrender.com/api/suggestions/${id}`, {
        withCredentials: true,
      });
      setSuggestions((prev) => prev.filter((s) => s._id !== id));
      setDeleteError('');
    } catch (err) {
      setDeleteError(err.response?.data?.message || 'Delete failed');
    } finally {
      setConfirmDeleteId(null);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const filteredSuggestions = suggestions.filter((s) =>
    s.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 relative">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-xl p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-3xl font-bold flex items-center gap-2 text-blue-400">
            <MessageSquareText className="text-blue-400" /> Manage Suggestions
          </h2>

          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search content..."
              className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-300">Loading suggestions...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            {deleteError && (
              <p className="text-red-400 font-medium">{deleteError}</p>
            )}
            {filteredSuggestions.length ? (
              <ul className="space-y-4">
                {filteredSuggestions.map((s) => (
                  <li
                    key={s._id}
                    className="bg-gray-900 border border-gray-700 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-300 mb-2">{s.content}</p>
                        <div className="text-xs text-gray-400 space-y-1">
                          <div className="flex items-center gap-2">
                            <User2 className="text-green-400" size={14} />
                            {s.user?.name || 'Unknown'}
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="text-blue-400" size={14} />
                            {s.user?.email || 'No email'}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="text-yellow-400" size={14} />
                            {moment(s.createdAt).format('LLL')}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setConfirmDeleteId(s._id)}
                        className="text-red-500 hover:text-red-600 transition"
                        title="Delete suggestion"
                      >
                        <Trash2 size={20} className="transition-transform hover:scale-110" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No suggestions found.</p>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-sm space-y-4 shadow-2xl">
            <h3 className="text-xl font-semibold text-white">Confirm Deletion</h3>
            <p className="text-gray-300">Are you sure you want to delete this suggestion?</p>
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="flex items-center gap-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                <Check size={16} /> Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSuggestions;
