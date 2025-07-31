// 'use client';

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { useState, useMemo } from 'react';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';

// // ✅ Mock grouped data (replace with real)
// const mockData = {
//   daily: {
//     "Water Supply": [
//       { date: "2023-05-01", positive: 12, negative: 8, total: 20 },
//       { date: "2023-05-02", positive: 18, negative: 12, total: 30 },
//     ],
//     "Electricity": [
//       { date: "2023-05-01", positive: 22, negative: 10, total: 32 },
//       { date: "2023-05-02", positive: 25, negative: 5, total: 30 },
//     ],
//   },
//   weekly: {
//     "Water Supply": [
//       { date: "2023-05-01/2023-05-07", positive: 70, negative: 40, total: 110 },
//     ],
//     "Electricity": [
//       { date: "2023-05-01/2023-05-07", positive: 80, negative: 20, total: 100 },
//     ],
//   },
//   monthly: {
//     "Water Supply": [
//       { date: "2023-05", positive: 300, negative: 150, total: 450 },
//     ],
//     "Electricity": [
//       { date: "2023-05", positive: 350, negative: 100, total: 450 },
//     ],
//   },
// };

// export default function AreaChartWithTabs() {
//   const [selectedCategory, setSelectedCategory] = useState('Water Supply');
//   const [selectedPeriod, setSelectedPeriod] = useState('daily');

//   const categories = Object.keys(mockData.daily);

//   const chartData = useMemo(() => {
//     return mockData[selectedPeriod]?.[selectedCategory] ?? [];
//   }, [selectedCategory, selectedPeriod]);

//   return (
//     <div className="p-4 bg-white rounded shadow-md">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
//         <h2 className="text-lg font-semibold">Call Distribution by Category</h2>
//         <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//           <SelectTrigger className="w-[250px]">
//             <SelectValue placeholder="Select Category" />
//           </SelectTrigger>
//           <SelectContent>
//             {categories.map((cat) => (
//               <SelectItem key={cat} value={cat}>
//                 {cat}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
//         <TabsList className="grid w-full grid-cols-3 mb-4">
//           <TabsTrigger value="daily">Daily</TabsTrigger>
//           <TabsTrigger value="weekly">Weekly</TabsTrigger>
//           <TabsTrigger value="monthly">Monthly</TabsTrigger>
//         </TabsList>

//         <TabsContent value={selectedPeriod}>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
//               <defs>
//                 <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
//                 </linearGradient>
//                 <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis allowDecimals={false} />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="positive"
//                 stroke="blue"
//                 fillOpacity={1}
//                 fill="url(#colorPositive)"
//                 name="Positive"
//               />
//               <Area
//                 type="monotone"
//                 dataKey="negative"
//                 stroke="lightblue"
//                 fillOpacity={1}
//                 fill="url(#colorNegative)"
//                 name="Negative"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader } from "../ui/card";
import { CustomTooltip } from "../ui/customToolTip";

// Raw Input
const rawData =  [
  { date: "2025-07-01", day: "Monday", total: 1200 },
  { date: "2025-07-02", day: "Tuesday", total: 1400 },
  { date: "2025-07-03", day: "Wednesday", total: 1000 },
  { date: "2025-07-04", day: "Thursday", total: 900 },
  { date: "2025-07-05", day: "Friday", total: 1100 },

  { date: "2025-07-08", day: "Monday", total: 1500 },
  { date: "2025-07-09", day: "Tuesday", total: 1300 },
  { date: "2025-07-10", day: "Wednesday", total: 1200 },
  { date: "2025-07-11", day: "Thursday", total: 1000 },
  { date: "2025-07-12", day: "Friday", total: 1200 },

  { date: "2025-07-15", day: "Monday", total: 1000 },
  { date: "2025-07-16", day: "Tuesday", total: 1100 },
  { date: "2025-07-17", day: "Wednesday", total: 900 },
  { date: "2025-07-18", day: "Thursday", total: 800 },
  { date: "2025-07-19", day: "Friday", total: 1000 },

  { date: "2025-07-22", day: "Monday", total: 700 },
  { date: "2025-07-23", day: "Tuesday", total: 800 },
  { date: "2025-07-24", day: "Wednesday", total: 900 },
  { date: "2025-07-25", day: "Thursday", total: 1000 },
  { date: "2025-07-26", day: "Friday", total: 1100 }
];


// Format date to `Jul 1`
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.toLocaleString("default", { month: "short" })} ${d.getDate()}`;
};

// Get ISO week number
const getWeekNumber = (date: Date) => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((+d - +yearStart) / 86400000 + 1) / 7);
  return `Week ${weekNo}`;
};

// Day-wise chart data
const dayData = rawData.map((d) => ({
  date: formatDate(d.date),
  total: d.total,
}));

// Week-wise aggregation
const weekDataMap: Record<string, number> = {};
rawData.forEach((entry) => {
  const date = new Date(entry.date);
  const week = getWeekNumber(date);
  weekDataMap[week] = (weekDataMap[week] || 0) + entry.total;
});
const weekData = Object.entries(weekDataMap).map(([week, total]) => ({ week, total }));

// Month-wise aggregation
const monthDataMap: Record<string, number> = {};
rawData.forEach((entry) => {
  const d = new Date(entry.date);
  const label = `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;
  monthDataMap[label] = (monthDataMap[label] || 0) + entry.total;
});
const monthData = Object.entries(monthDataMap).map(([month, total]) => ({ month, total }));

// Chart Renderer
const renderChart = (data: any[], xKey: string) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} angle={-45} textAnchor="end" height={60} />
      <YAxis />
      <Tooltip content={<CustomTooltip/>} />
      <Area type="monotone" dataKey="total" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTotal)" />
    </AreaChart>
  </ResponsiveContainer>
);

// Main Component
export default function CallAreaChartTabs() {
  const [tab, setTab] = useState("day");

  return (
   
        <Card>
  <Tabs defaultValue="day" onValueChange={(v) => setTab(v)}>
    <CardHeader className="p-4">
      <div className="flex justify-end w-full">
        <TabsList>
          <TabsTrigger value="day">Day</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
      </div>
    </CardHeader>

    <CardContent>
      <TabsContent value="day">{renderChart(dayData, "date")}</TabsContent>
      <TabsContent value="week">{renderChart(weekData, "week")}</TabsContent>
      <TabsContent value="month">{renderChart(weekData, "month")}</TabsContent>
    </CardContent>
  </Tabs>
</Card>
 
  );
}
