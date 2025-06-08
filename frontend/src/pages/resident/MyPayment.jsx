import React, { useState, useEffect } from "react";

// Reuse Toast and InputWithIcon components here...

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const styles = {
    success: "bg-green-600",
    error: "bg-red-600",
  };

  return (
    <div className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-lg shadow-lg text-white flex items-center gap-3 font-semibold animate-slideIn ${styles[type]}`}>
      {type === "success" ? (
        <svg className="h-6 w-6" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <svg className="h-6 w-6" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      )}
      <span>{message}</span>
      <button onClick={onClose} className="ml-auto hover:text-gray-300">&times;</button>
    </div>
  );
};

const InputWithIcon = ({ id, label, icon, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">{icon}</span>
      <input
        id={id}
        className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-400 placeholder-gray-400 disabled:bg-gray-700"
        {...props}
      />
    </div>
  </div>
);

const MyPayment = () => {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount.trim() || !method.trim()) return;

    setLoading(true);
    setToast(null);
    try {
      await new Promise((res) => setTimeout(res, 1500));
      setToast({ message: "Payment submitted successfully!", type: "success" });
      setAmount("");
      setMethod("");
    } catch {
      setToast({ message: "Failed to submit payment.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}

      <div className="max-w-2xl mx-auto bg-gray-800 border border-gray-700 p-10 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Make a Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <InputWithIcon
            id="amount"
            label="Amount"
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in USD"
            disabled={loading}
            icon={<span>$</span>}
          />
          <InputWithIcon
            id="method"
            label="Payment Method"
            value={method}
            required
            onChange={(e) => setMethod(e.target.value)}
            placeholder="e.g., Credit Card, Bank Transfer"
            disabled={loading}
            icon={
              <svg className="h-5 w-5" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" /></svg>
            }
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                Submit
                <svg className="h-5 w-5" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </>
            )}
          </button>
        </form>
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideIn { animation: slideIn 0.3s ease forwards; }
      `}</style>
    </div>
  );
};

export default MyPayment;
