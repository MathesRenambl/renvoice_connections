"use client"

import React, { useState } from "react"
import {
  
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const callAnalyticsData = [
  { date: "2024-06-01", totalCalls: 150, interestedPeople: 80, successfulCalls: 100, failedCalls: 50 },
  { date: "2024-06-02", totalCalls: 165, interestedPeople: 90, successfulCalls: 110, failedCalls: 55 },
  { date: "2024-06-03", totalCalls: 175, interestedPeople: 95, successfulCalls: 120, failedCalls: 55 },
  { date: "2024-06-04", totalCalls: 190, interestedPeople: 105, successfulCalls: 135, failedCalls: 55 },
  { date: "2024-06-05", totalCalls: 205, interestedPeople: 115, successfulCalls: 145, failedCalls: 60 },
  { date: "2024-06-06", totalCalls: 220, interestedPeople: 125, successfulCalls: 160, failedCalls: 60 },
  { date: "2024-06-07", totalCalls: 240, interestedPeople: 135, successfulCalls: 175, failedCalls: 65 },
  { date: "2024-06-08", totalCalls: 260, interestedPeople: 145, successfulCalls: 190, failedCalls: 70 },
  { date: "2024-06-09", totalCalls: 280, interestedPeople: 160, successfulCalls: 205, failedCalls: 75 },
  { date: "2024-06-10", totalCalls: 300, interestedPeople: 170, successfulCalls: 220, failedCalls: 80 },
  { date: "2024-06-11", totalCalls: 320, interestedPeople: 185, successfulCalls: 235, failedCalls: 85 },
  { date: "2024-06-12", totalCalls: 340, interestedPeople: 195, successfulCalls: 250, failedCalls: 90 },
  { date: "2024-06-13", totalCalls: 360, interestedPeople: 205, successfulCalls: 265, failedCalls: 95 },
  { date: "2024-06-14", totalCalls: 380, interestedPeople: 220, successfulCalls: 280, failedCalls: 100 },
  { date: "2024-06-15", totalCalls: 400, interestedPeople: 230, successfulCalls: 295, failedCalls: 105 },
  { date: "2024-06-16", totalCalls: 415, interestedPeople: 240, successfulCalls: 310, failedCalls: 105 },
  { date: "2024-06-17", totalCalls: 390, interestedPeople: 225, successfulCalls: 285, failedCalls: 105 },
  { date: "2024-06-18", totalCalls: 370, interestedPeople: 215, successfulCalls: 270, failedCalls: 100 },
  { date: "2024-06-19", totalCalls: 350, interestedPeople: 200, successfulCalls: 255, failedCalls: 95 },
  { date: "2024-06-20", totalCalls: 330, interestedPeople: 190, successfulCalls: 240, failedCalls: 90 },
  { date: "2024-06-21", totalCalls: 310, interestedPeople: 175, successfulCalls: 225, failedCalls: 85 },
  { date: "2024-06-22", totalCalls: 295, interestedPeople: 165, successfulCalls: 210, failedCalls: 85 },
  { date: "2024-06-23", totalCalls: 280, interestedPeople: 155, successfulCalls: 195, failedCalls: 85 },
  { date: "2024-06-24", totalCalls: 265, interestedPeople: 145, successfulCalls: 180, failedCalls: 80 },
  { date: "2024-06-25", totalCalls: 235, interestedPeople: 125, successfulCalls: 150, failedCalls: 70 },
  { date: "2024-06-26", totalCalls: 250, interestedPeople: 135, successfulCalls: 165, failedCalls: 75 },
  { date: "2024-06-27", totalCalls: 220, interestedPeople: 115, successfulCalls: 135, failedCalls: 65 },
  { date: "2024-06-28", totalCalls: 190, interestedPeople: 95, successfulCalls: 105, failedCalls: 55 },
  { date: "2024-06-29", totalCalls: 205, interestedPeople: 105, successfulCalls: 120, failedCalls: 60 },
  { date: "2024-06-30", totalCalls: 175, interestedPeople: 85, successfulCalls: 90, failedCalls: 50 },
];


const chartKeys = [
  { key: "totalCalls", label: "Total Calls", color: "#000000" },
  { key: "interestedPeople", label: "Interested", color: "#404040" },
  { key: "successfulCalls", label: "Success", color: "#808080" },
  { key: "failedCalls", label: "Failed", color: "#1F2937" },
]

export default function ChartWaveDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

  // Remove duplicate entries
  const uniqueData = callAnalyticsData.reduce((acc, current) => {
    const exists = acc.find(item => item.date === current.date)
    return exists ? acc : [...acc, current]
  }, [])

  // Sort data by date to ensure chronological order
  const sortedData = [...uniqueData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  )

  // Get the most recent date from the dataset
  const lastDate = new Date(sortedData[sortedData.length - 1].date)

  // Filter data based on selected time range
  const filteredData = sortedData.filter((item) => {
    const date = new Date(item.date)
    const daysToSubtract = timeRange === "30d" ? 30 : timeRange === "90d" ? 90 : 7
    const startDate = new Date(lastDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate && date <= lastDate
  })

  // Calculate totals
  const totalCalls = filteredData.reduce((sum, d) => sum + d.totalCalls, 0)
  const totalInterested = filteredData.reduce((sum, d) => sum + d.interestedPeople, 0)
  const totalSuccess = filteredData.reduce((sum, d) => sum + d.successfulCalls, 0)
  const totalFailed = filteredData.reduce((sum, d) => sum + d.failedCalls, 0)

  const percent = (val: number) => (totalCalls > 0 ? ((val / totalCalls) * 100).toFixed(1) : "0")

  return (
    <div className="p-6 space-y-6">
     
      {/* Time Range Filter */}
      <div className="flex justify-end">
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border p-2 rounded-md"
        >
          
          <option value="30d">Last 30 days</option>
          <option value="7d">Last 7 days</option>
        </select>
      </div>

      {/* Chart */}
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Call Analytics Chart</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
  <CartesianGrid strokeDasharray="3 3" vertical={false} />
  <XAxis
    dataKey="date"
    tickFormatter={(val) =>
      new Date(val).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  />
  <YAxis />
  <Tooltip
    labelFormatter={(label) =>
      new Date(label).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    }
  />
  <Legend />

  {chartKeys.map((d) => (
    <Line
      key={d.key}
      type="monotone"
      dataKey={d.key}
      stroke={d.color}
      strokeWidth={2}
      dot={{ r: 3 }}
      activeDot={{ r: 6 }}
    />
  ))}
</LineChart>

        </ResponsiveContainer>
      </div>
    </div>
  )
}