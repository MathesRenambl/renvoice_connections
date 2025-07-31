'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from '../ui/customToolTip';

type Call = {
  category: string;
  call_type: 'positive' | 'negative';
  description: string;
};

type ComplaintData = {
  constituency: string;
  calls: Call[];
};

type Props = {
  complaintData: ComplaintData;
};

const COLORS = ['#22c55e', '#ef4444']; // green and red

export default function PieChartComponent({ complaintData }) {
  const pieChartData = [
  {
    name: "Positive",
    value: complaintData.reduce((sum, item) => sum + item.positive, 0)
  },
  {
    name: "Negative",
    value: complaintData.reduce((sum, item) => sum + item.negative, 0)
  }
];

const COLORS = ["#22c55e", "#ef4444"];


  return (
    <div className="flex-2 p-4 bg-white rounded shadow-md  h-96">
    
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

  

