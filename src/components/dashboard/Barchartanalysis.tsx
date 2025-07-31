import React from 'react'
import { Bar, CartesianGrid, Legend,BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Tooltip } from 'react-leaflet';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

function BarchartAnalysis({sampleData,className}:{sampleData:any,className:any}) {
  return (
    <div className={className}>
      <Card className="border-gray-200 border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg">Agent Call Status Analysis</CardTitle>
            <CardDescription>Comparison of accepted vs rejected calls for each agent</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart

                data={sampleData?.agentCallStatus}
                barSize={40}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip content={
  (({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-black">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value} calls
            </p>
          ))}
        </div>
      );
    }
    return null;
  }) as any
} />

                <Legend />
                <Bar dataKey="accepted" fill="#000000" name="Accepted" />
                <Bar dataKey="rejected" fill="#666666" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
    </div>
  )
}

export default BarchartAnalysis
