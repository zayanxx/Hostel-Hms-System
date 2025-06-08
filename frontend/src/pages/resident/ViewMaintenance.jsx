import React, { useState, useEffect } from "react";
import { FaDoorOpen, FaTools, FaCheckCircle, FaTimesCircle, FaSpinner, FaArrowRight } from "react-icons/fa";

// Toast Component
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const baseClasses =
    "fixed top-6 right-6 max-w-xs z-50 rounded-lg shadow-lg px-5 py-3 flex items-center gap-3 text-white font-semibold animate-slideIn";

  const typeClasses = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {type === "success" ? <FaCheckCircle className="h-5 w-5" /> : <FaTimesCircle className="h-5 w-5" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto hover:text-gray-300">
        &times;
      </button>
    </div>
  );
};

// Input With Icon
const InputWithIcon = ({ id, label, icon, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span>
      <input
        id={id}
        className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 placeholder-gray-400 disabled:bg-gray-700"
        {...props}
      />
    </div>
  </div>
);

// Textarea With Icon
const TextareaWithIcon = ({ id, label, icon, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute top-3 left-3 text-gray-400">{icon}</span>
      <textarea
        id={id}
        className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 placeholder-gray-400 resize-none disabled:bg-gray-700"
        {...props}
      />
    </div>
  </div>
);

// Main Component
const ViewMaintenance = () => {
  const [room, setRoom] = useState("");
  const [issue, setIssue] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!room.trim() || !issue.trim()) return;

    setLoading(true);
    setToast(null);

    try {
      await new Promise((res) => setTimeout(res, 1600)); // Simulate API
      setToast({ message: "Maintenance request submitted!", type: "success" });
      setRoom("");
      setIssue("");
    } catch {
      setToast({ message: "Error submitting request. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Request Maintenance</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <InputWithIcon
            id="room"
            label="Room Number"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="e.g., A203"
            disabled={loading}
            required
            icon={<FaDoorOpen />}
          />

          <TextareaWithIcon
            id="issue"
            label="Describe the Issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Please describe the problem clearly"
            disabled={loading}
            required
            icon={<FaTools />}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5" />
                Submitting...
              </>
            ) : (
              <>
                Submit
                <FaArrowRight />
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default ViewMaintenance;
