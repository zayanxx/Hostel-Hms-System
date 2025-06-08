import React, { useState, useEffect } from "react";

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
      {type === "success" ? (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto hover:text-gray-300">
        &times;
      </button>
    </div>
  );
};

// Input With Icon
const InputWithIcon = ({
  id,
  label,
  type = "text",
  icon,
  value,
  onChange,
  placeholder,
  disabled,
  required,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 disabled:bg-gray-700"
      />
    </div>
  </div>
);

// Textarea With Icon
const TextareaWithIcon = ({
  id,
  label,
  icon,
  value,
  onChange,
  placeholder,
  disabled,
  required,
  rows = 5,
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <span className="absolute top-3 left-3 text-gray-400">{icon}</span>
      <textarea
        id={id}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 resize-none disabled:bg-gray-700"
      />
    </div>
  </div>
);

// Main Component
const SubmitSuggestion = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !details.trim()) return;

    setLoading(true);
    setToast(null);

    try {
      await new Promise((res) => setTimeout(res, 1800));
      setToast({ message: "Suggestion submitted successfully!", type: "success" });
      setTitle("");
      setDetails("");
    } catch {
      setToast({ message: "Oops! Something went wrong. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Submit a Suggestion</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <InputWithIcon
            id="title"
            label="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a clear, concise title"
            disabled={loading}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            }
          />

          <TextareaWithIcon
            id="details"
            label="Details"
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Please provide detailed information"
            disabled={loading}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16h8M8 12h8M8 8h8M4 20h16" />
              </svg>
            }
          />

          <button
            type="submit"
            disabled={loading || !title.trim() || !details.trim()}
            className="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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

export default SubmitSuggestion;
