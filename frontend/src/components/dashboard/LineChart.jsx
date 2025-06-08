// src/components/admin/dashboard/LineChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SampleLineChart = ({ data }) => {
  return (
    <div className="bg-white shadow rounded-xl p-4">
      <h3 className="text-lg font-semibold mb-4">Monthly Complaints</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="complaints" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SampleLineChart;
