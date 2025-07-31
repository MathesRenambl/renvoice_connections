'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { CustomTooltip } from '../ui/customToolTip';

export default function BarChartComponent({ complaintData }) {
  // Validate input
  if (!Array.isArray(complaintData)) {
    return <div className="text-red-600 p-4">Invalid complaint data</div>;
  }

  const chartData = complaintData.map((item) => ({
    category: item.category,
    positive: item.positive,
    negative: item.negative,
  }));

  // Find category with highest negative value
  const maxNegativeCategory = chartData.reduce((max, item) =>
    item.negative > max.negative ? item : max,
    chartData[0]
  )?.category;

  return (
    <div className="p-4 bg-white rounded shadow-md flex-1">
      <h2 className="text-lg font-semibold mb-4">Complaint Trends by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category"  />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip/>} />
          <Legend />
          <Bar barSize={50} dataKey="positive" stackId="a" name="Positive" fill="#22c55e" />
          <Bar barSize={50} dataKey="negative" stackId="a" name="Negative" fill="#ef4444">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                   '#ef4444' 
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
