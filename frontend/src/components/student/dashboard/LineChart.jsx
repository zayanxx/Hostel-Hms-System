// src/components/dashboard/LineChart.jsx
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Attendance Trend',
        data: data.values,
        borderColor: '#3B82F6',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default LineChart;
