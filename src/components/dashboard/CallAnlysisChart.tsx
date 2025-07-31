import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from 'lucide-react';
import { Tabs, TabsList } from '@radix-ui/react-tabs';
import { TabsTrigger } from '../ui/tabs';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function CallAnlysisChart({sampleData}:{sampleData:any}) {
    const [timeRange, setTimeRange] = useState('daily');
   const COLORS = ['#000000',  '#cccccc', ];
  const callTimeData = useMemo(() => {
    switch (timeRange) {
      case 'weekly':
        return sampleData.weeklyCallTime;
      case 'daily':
        return sampleData.dailyCallTime;
      default:
        return sampleData.monthlyCallTime;
    }
  }, [timeRange]);
  return (
    <div>
      <Card className="border-gray-200 border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Agent Call Time Analysis</CardTitle>
                  <CardDescription>Total call time per agent across different periods</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-600" />
                  <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                      <TabsTrigger value="monthly" className="text-xs">Monthly</TabsTrigger>
                      <TabsTrigger value="weekly" className="text-xs">Weekly</TabsTrigger>
                      <TabsTrigger value="daily" className="text-xs">Daily</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={callTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey={timeRange === 'monthly' ? 'month' : timeRange === 'weekly' ? 'week' : 'day'} />
                  <YAxis />
                  <Tooltip content={({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-black">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} {timeRange === 'daily' ? 'hrs' : 'hrs'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  }} />
                  <Legend />
                  {sampleData.agents.map((agent, index) => (
                    <Line
                      key={agent}
                      type="monotone"
                      dataKey={agent}
                      stroke={COLORS[index % COLORS.length]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
    </div>
  )
}

export default CallAnlysisChart
