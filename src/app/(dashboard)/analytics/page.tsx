"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { Phone, Clock, TrendingUp, CheckCircle, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import { CustomTooltip } from "@/components/ui/customToolTip";

// Mock data for analytics
const callsPerAgentData = [
  { name: "Appointment Bot", calls: 124 },
  { name: "Support Agent", calls: 85 },
  { name: "News Summarizer", calls: 42 },
  { name: "English Tutor", calls: 63 },
  { name: "GK Question Bot", calls: 37 },
];

const callTrendsData = [
  { date: "Mon", calls: 24 },
  { date: "Tue", calls: 32 },
  { date: "Wed", calls: 18 },
  { date: "Thu", calls: 29 },
  { date: "Fri", calls: 42 },
  { date: "Sat", calls: 16 },
  { date: "Sun", calls: 10 },
];

const interactionStatusData = [
  { name: "Successful", value: 78 },
  { name: "Failed", value: 22 },
];

const COLORS = ["#4ade80", "#f87171"];

const topicsData = [
  { name: "Appointments", value: 35 },
  { name: "Product Info", value: 25 },
  { name: "Support", value: 20 },
  { name: "Feedback", value: 15 },
  { name: "Other", value: 5 },
];

// Sample caller location data
type Location = {
  id: number;
  name: string;
  position: [number, number];
  calls: number;
};

const callerLocations: Location[] = [
  { id: 1, name: "New York", position: [40.7128, -74.0060], calls: 42 },
  { id: 2, name: "Los Angeles", position: [34.0522, -118.2437], calls: 35 },
  { id: 3, name: "Chicago", position: [41.8781, -87.6298], calls: 28 },
  { id: 4, name: "Houston", position: [29.7604, -95.3698], calls: 23 },
  { id: 5, name: "Phoenix", position: [33.4484, -112.0740], calls: 19 },
  { id: 6, name: "Philadelphia", position: [39.9526, -75.1652], calls: 17 },
  { id: 7, name: "San Antonio", position: [29.4241, -98.4936], calls: 15 },
  { id: 8, name: "San Diego", position: [32.7157, -117.1611], calls: 14 },
  { id: 9, name: "Dallas", position: [32.7767, -96.7970], calls: 13 },
  { id: 10, name: "San Francisco", position: [37.7749, -122.4194], calls: 12 },
  { id: 11, name: "London", position: [51.5074, -0.1278], calls: 38 },
  { id: 12, name: "Paris", position: [48.8566, 2.3522], calls: 29 },
  { id: 13, name: "Berlin", position: [52.5200, 13.4050], calls: 22 },
  { id: 14, name: "Tokyo", position: [35.6762, 139.6503], calls: 31 },
  { id: 15, name: "Sydney", position: [-33.8688, 151.2093], calls: 25 },
];

// Dynamically import the Map component to avoid SSR issues with Leaflet
const CallerLocationMap = dynamic(() => import("@/components/analytics/caller-location-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
      <div className="text-center">
        <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

export default function AnalyticsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Track and monitor your AI agents' performance and engagement
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <SummaryCard 
          title="Total Calls" 
          value="351" 
          description="Last 30 days" 
          icon={<Phone className="h-4 w-4" />}
          trend="+12% from last month"
          trendUp={true}
        />
        <SummaryCard 
          title="Avg. Call Duration" 
          value="3m 24s" 
          description="Last 30 days" 
          icon={<Clock className="h-4 w-4" />}
          trend="-8% from last month"
          trendUp={false}
        />
        <SummaryCard 
          title="Success Rate" 
          value="78%" 
          description="Last 30 days" 
          icon={<CheckCircle className="h-4 w-4" />}
          trend="+5% from last month"
          trendUp={true}
        />
        <SummaryCard 
          title="Active Agents" 
          value="5" 
          description="Currently active" 
          icon={<Phone className="h-4 w-4" />}
          trend="No change"
          trendUp={null}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Calls Per Agent</CardTitle>
            <CardDescription>Number of calls handled by each agent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={callsPerAgentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                 <Tooltip content={<CustomTooltip/>} />
                  <Bar dataKey="calls" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Trends</CardTitle>
            <CardDescription>Daily call volume for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={callTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip/>} />
                  <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Interaction Status</CardTitle>
            <CardDescription>Success vs. failure rate of interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={interactionStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {interactionStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                 <Tooltip content={<CustomTooltip/>} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Common Topics</CardTitle>
            <CardDescription>Most frequent conversation topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topicsData.map((topic) => (
                <div key={topic.name} className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{topic.name}</span>
                      <span className="text-sm text-muted-foreground">{topic.value}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${topic.value}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Caller Locations Map */}
      <Card>
        <CardHeader>
          <CardTitle>Caller Locations</CardTitle>
          <CardDescription>Geographic distribution of callers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <CallerLocationMap locations={callerLocations} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ title, value, description, icon, trend, trendUp }: { 
  title: string; 
  value: string; 
  description: string; 
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean | null;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`flex items-center text-xs mt-2 ${
            trendUp === true ? 'text-green-500' : 
            trendUp === false ? 'text-red-500' : 
            'text-muted-foreground'
          }`}>
            {trendUp === true && <TrendingUp className="h-3 w-3 mr-1" />}
            {trendUp === false && <TrendingUp className="h-3 w-3 mr-1 rotate-180" />}
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
