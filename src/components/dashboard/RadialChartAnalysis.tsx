import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';


function RadialChartAnalysis({sampleData,className}:{sampleData:any,className:any}) {
    const COLORS = ['#000000',  '#999999', ];

    
  return (
   <div className={className}>
    <Card className="border-gray-200 border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Agent Call Distribution</CardTitle>
              <CardDescription>Interactive donut chart showing call distribution by agent</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sampleData.agentReceivedRate}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="calls"
                    stroke="#fff"
                    strokeWidth={2}
                  >
                    {sampleData.agentReceivedRate.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-black">{data.agent}</p>
          <p className="text-sm">Calls: {data.calls}</p>
          <p className="text-sm">Rate: {data.rate}%</p>
        </div>
      );
    }
    return null;
  }} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => {
                      console.log('Legend entry:', entry);
                      const payload = entry.payload as { agent?: string; calls?: number };
                      return `${payload.agent ?? ''}  (${payload.calls ?? 0} calls)`;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
      </div> 
  )
  
}

export default RadialChartAnalysis
