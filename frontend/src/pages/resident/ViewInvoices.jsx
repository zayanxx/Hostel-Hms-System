import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await axios.get('https://hostelhms.onrender.com/api/invoices/me'); // Adjust based on your base URL
        setInvoices(res.data.data);
      } catch (error) {
        console.error('Failed to fetch invoices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          My Invoices
        </h2>
        {invoices.length === 0 ? (
          <p className="text-gray-400 text-center">No invoices found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
                <tr>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Amount ($)</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {invoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-700/40 transition">
                    <td className="py-3 px-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                    <td className="py-3 px-4">${invoice.amount.toFixed(2)}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        invoice.status === 'paid'
                          ? 'text-green-400'
                          : invoice.status === 'overdue'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {invoice.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInvoices;
