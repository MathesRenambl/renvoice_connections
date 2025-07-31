"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Users, Clock, TrendingUp, User, PhoneCall,  } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import BarchartAnalysis from '@/components/dashboard/Barchartanalysis';
import RadialChartAnalysis from '@/components/dashboard/RadialChartAnalysis';
import CallAnlysisChart from '@/components/dashboard/CallAnlysisChart';
import Container from '@/components/ui/container';
import PerformanceTable from '@/components/dashboard/PerformanceTable';
import UpcomingPayments from '@/components/payments/upcoming-payment';
import UsageChart from '@/components/payments/usage-charts';
import CampaignCharts from '@/components/campaign/CampaignCharts';
import { useSession } from 'next-auth/react';


interface CallStats {
  totalCalls: number;
  activeCalls: number;
  pendingCalls: number;
  avgCallDuration: string;
}

interface Department {
  id: string;
  name: string;
  icon: string;
  badge: string;
  metrics: {
    todayCalls: number;
    metric1: string;
    metric1Value: string | number;
    metric2: string;
    metric2Value: string | number;
    metric3: string;
    metric3Value: string | number;
    metric4: string;
    metric4Value: string | number;
  };
  lastUpdated: string;
}

interface RecentCall {
  id: string;
  phoneNumber: string;
  timestamp: string;
  duration: string;
  status: 'completed' | 'missed' | 'ongoing';
}


const sampleData = {
  agents: ['Agent 001', 'Agent 002', 'Agent 003', 'Agent 004', ],
  
  // Monthly call time data
  monthlyCallTime: [
  { month: 'Jan', 'Agent 001': 120, 'Agent 002': 95, 'Agent 003': 88, 'Agent 004': 76 },
  { month: 'Feb', 'Agent 001': 135, 'Agent 002': 102, 'Agent 003': 91, 'Agent 004': 83 },
  { month: 'Mar', 'Agent 001': 142, 'Agent 002': 115, 'Agent 003': 96, 'Agent 004': 89 },
  { month: 'Apr', 'Agent 001': 128, 'Agent 002': 108, 'Agent 003': 92, 'Agent 004': 85 },
  { month: 'May', 'Agent 001': 155, 'Agent 002': 125, 'Agent 003': 110, 'Agent 004': 98 },
  { month: 'Jun', 'Agent 001': 148, 'Agent 002': 132, 'Agent 003': 105, 'Agent 004': 94 }
],
  
  // Weekly call time data
  weeklyCallTime: [
  { week: 'Week 1', 'Agent 001': 35, 'Agent 002': 18, 'Agent 003': 22, 'Agent 004': 15 },
  { week: 'Week 2', 'Agent 001': 42, 'Agent 002': 35, 'Agent 003': 30, 'Agent 004': 25 },
  { week: 'Week 3', 'Agent 001': 28, 'Agent 002': 41, 'Agent 003': 33, 'Agent 004': 29 },
  { week: 'Week 4', 'Agent 001': 33, 'Agent 002': 10, 'Agent 003': 26, 'Agent 004': 20 }
],
  
  // Daily call time data
 dailyCallTime: [
  { day: 'Mon', 'Agent 001': 8.5, 'Agent 002': 7.2, 'Agent 003': 6.8, 'Agent 004': 5.4 },
  { day: 'Tue', 'Agent 001': 9.2, 'Agent 002': 8.1, 'Agent 003': 7.5, 'Agent 004': 6.3 },
  { day: 'Thu', 'Agent 001': 8.9, 'Agent 002': 7.9, 'Agent 003': 7.2, 'Agent 004': 6.1 },
  { day: 'Fri', 'Agent 001': 9.1, 'Agent 002': 8.5, 'Agent 003': 8.0, 'Agent 004': 7.0 },
  { day: 'Sat', 'Agent 001': 6.5, 'Agent 002': 5.8, 'Agent 003': 5.0, 'Agent 004': 4.3 },
  { day: 'Sun', 'Agent 001': 5.2, 'Agent 002': 4.9, 'Agent 003': 4.2, 'Agent 004': 3.7 }
],
  
  // Agent received rate data for pie chart
  agentReceivedRate: [
  { agent: 'Agent 001', calls: 245, rate: 89.2 },
  { agent: 'Agent 002', calls: 198, rate: 68.5 },
  { agent: 'Agent 003', calls: 174, rate: 72.1 },
  { agent: 'Agent 004', calls: 153, rate: 63.4 }
],
  
  // Agent acceptance/rejection data for bar chart
  agentCallStatus: [
  { agent: 'Agent 001', accepted: 218, rejected: 27, total: 245 },
  { agent: 'Agent 002', accepted: 106, rejected: 48, total: 154 },
  { agent: 'Agent 003', accepted: 130, rejected: 21, total: 151 },
  { agent: 'Agent 004', accepted: 97, rejected: 26, total: 123 }
]
};


const dashboardData = {
  callStats: {
    totalCalls: 1247,
    activeCalls: 23,
    pendingCalls: 8,
    avgCallDuration: "4:23"
  },
  departments: [
    {
      id: "lead-gen",
      name: "Lead Generation",
      icon: "TrendingUp",
      badge: "Active",
      metrics: {
        todayCalls: 142,
        metric1: "Conversion Rate",
        metric1Value: "23.5%",
        metric2: "Hot Leads",
        metric2Value: 18,
        metric3: "Follow-ups",
        metric3Value: 67,
        metric4: "New Leads",
        metric4Value: 42
      },
      lastUpdated: "2 mins ago"
    },
    {
      id: "customer-support",
      name: "Customer Support",
      icon: "Users",
      badge: "Active",
      metrics: {
        todayCalls: 89,
        metric1: "Queue Length",
        metric1Value: 5,
        metric2: "Escalations",
        metric2Value: 3,
        metric3: "Callbacks",
        metric3Value: 12,
        metric4: "Satisfaction",
        metric4Value: "92%"
      },
      lastUpdated: "1 min ago"
    }
  ],
  recentCalls: [
    {
      id: "call-1",
      phoneNumber: "+91 98765 43210",
      timestamp: "10:23:45 AM",
      duration: "2:45",
      status: "completed" as "completed"
    },
    {
      id: "call-2",
      phoneNumber: "+91 87654 32109",
      timestamp: "10:15:22 AM",
      duration: "1:30",
      status: "missed" as "missed"
    },
    {
      id: "call-3",
      phoneNumber: "+91 76543 21098",
      timestamp: "9:58:11 AM",
      duration: "5:12",
      status: "completed" as "completed"
    },
    {
      id: "call-4",
      phoneNumber: "+91 65432 10987",
      timestamp: "9:42:33 AM",
      duration: "3:18",
      status: "ongoing" as "ongoing"
    },
    {
      id: "call-5",
      phoneNumber: "+91 54321 09876",
      timestamp: "9:25:07 AM",
      duration: "4:56",
      status: "completed" as "completed"
    }
  ]
};
const month= [
    { month: "Jan 2025", calls: 2070, cost: 828, minutes: 6210 },
    { month: "Feb 2025", calls: 2150, cost: 860, minutes: 6450 },
    { month: "Mar 2025", calls: 2230, cost: 892, minutes: 6690 },
    { month: "Apr 2025", calls: 2310, cost: 924, minutes: 6930 },
    { month: "May 2025", calls: 2400, cost: 960, minutes: 7200 },
    { month: "Jun 2025", calls: 2490, cost: 996, minutes: 7470 },
    { month: "Jul 2025", calls: 2580, cost: 1032, minutes: 7740 }
  ]

const HomePage: React.FC = () => {
  const{data}=useSession();
  const [callStats, setCallStats] = useState<CallStats>(dashboardData.callStats);
  const [departments, setDepartments] = useState<Department[]>(dashboardData.departments);
  const [recentCalls, setRecentCalls] = useState<RecentCall[]>(dashboardData.recentCalls);
  const router = useRouter();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      case 'completed': return 'text-green-400';
      case 'missed': return 'text-red-400';
      case 'ongoing': return 'text-yellow-400';
      default: return 'bg-gray-500';
    }
  };

  // const getIconComponent = (iconName: string) => {
  //   switch (iconName) {
  //     case 'TrendingUp': return <TrendingUp className="h-6 w-6 text-black" />;
  //     case 'Users': return <Users className="h-6 w-6 text-black" />;
  //     case 'Phone': return <Phone className="h-6 w-6 text-blue-700" />;
  //     case 'Clock': return <Clock className="h-6 w-6 text-purple-600" />;
  //     case 'PhoneCall': return <PhoneCall className="h-6 w-6 text-green-600" />;
  //     default: return <User className="h-6 w-6 text-black" />;
  //   }
  // };
  const upcomingPayment = {
  estimatedAmount: 1245.6,
  dueDate: "2024-07-15",
  callsToDate: 1456,
  minutesToDate: 4368,
  daysRemaining: 8,
};


  return (
    <Container>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-2 border-0 shadow-none bg-transparent">
          <CardHeader>
            <CardTitle>Analytics Dashboard</CardTitle>
            <CardDescription>Real-time call performance metrics</CardDescription>
          </CardHeader>
        </Card>

        {/* Call Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
          <Card className="hover:shadow-lg transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Calls</p>
                  <p className="text-2xl font-bold text-black">{callStats.totalCalls.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-full">
                  <Phone className="h-6 w-6 " />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Call Duration</p>
                  <p className="text-2xl font-bold text-black">{callStats.avgCallDuration}</p>
                </div>
                <div className=" p-3 rounded-full">
                  <Clock className="h-6 w-6 " />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Active Calls</p>
                  <p className="text-2xl font-bold text-black">{callStats.activeCalls}</p>
                </div>
                <div className=" p-3 rounded-full">
                  <PhoneCall className="h-6 w-6 " />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending Calls</p>
                  <p className="text-2xl font-bold text-black">{callStats.pendingCalls}</p>
                </div>
                <div className=" p-3 rounded-full">
                  <Clock className="h-6 w-6 " />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='mb-5'>
          <UpcomingPayments upcomingPayment={upcomingPayment} />
          </div>
          <UsageChart data={month} type={'month'} showMonthlyCost={false} />
          
        
        <div className='mt-5'>
          <CallAnlysisChart sampleData={sampleData}/>
        </div>

        <div className='flex mt-5 md:flex-row flex-col gap-5'>
          <BarchartAnalysis className={'flex-1'}  sampleData={sampleData}/>
          <RadialChartAnalysis className={'flex md:flex-2'} sampleData={sampleData}/>
        </div>
        <div className='mt-5'>
        <CampaignCharts />
        </div>
        <div>
          <PerformanceTable sampleData={sampleData}/>
        </div>
        
        



        {/* Department Cards
        <div className="mb-8">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Users className="h-5 w-5 mr-2" />
                Active Departments
              </CardTitle>
            </CardHeader>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departments.map((dept) => (
              <Card key={dept.id} className="hover:shadow-lg transition-colors relative">
                <div className="absolute top-6 right-6">
                  <Badge variant="success" className="text-sm py-1 px-3">{dept.badge}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-3 rounded-full mr-3">
                      {getIconComponent(dept.icon)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">{dept.name}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-600">Today's Calls</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.todayCalls}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{dept.metrics.metric1}</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.metric1Value}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{dept.metrics.metric2}</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.metric2Value}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">{dept.metrics.metric3}</p>
                      <p className="text-black font-semibold text-lg">{dept.metrics.metric3Value}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last updated: {dept.lastUpdated}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}

        {/* Recent Calls */}
        {/* <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Recent Calls Activity
          </h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Phone Number</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Time</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Duration</th>
                    <th className="text-left py-3 px-4 text-gray-700 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentCalls.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-black font-mono">{call.phoneNumber}</td>
                      <td className="py-3 px-4 text-gray-700">{call.timestamp}</td>
                      <td className="py-3 px-4 text-gray-700">{call.duration}</td>
                      <td className="py-3 px-4">
                        <span className={`capitalize font-medium ${getStatusColor(call.status)}`}>
                          {call.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> 
          </div>
        </div>*/}
      </div>
    </Container>
  );
};

export default HomePage;

