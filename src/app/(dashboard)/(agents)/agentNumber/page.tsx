// "use client";

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Phone, Activity, TrendingUp, XCircle } from 'lucide-react';

// const AgentOverviewPage = () => {
//   const agentName = "realestateagent"; // ✅ manually change agent key here
//     const router = useRouter();

//   const agentsData = [
//   {
//     uId: 1,
//     company: "Renambl",
//     agent: "real estate agent",
//     agentKey: "realestateagent",
//     agentNos: [
//       {
//         number: "1001",
//         agentId: "realestateagent-1001",
//         callsMade: 120,
//         isActive: true,
//         callHistory: [
//           { callId: "realestateagent-1001-0", userNo: 7247248712, timestamp: "2025-07-03T10:15:00Z", type: "INCOMING", status: "ANSWERED", duration: 120 },
//           { callId: "realestateagent-1001-1", userNo: 7247248713, timestamp: "2025-07-03T09:30:00Z", type: "OUTGOING", status: "MISSED", duration: 0 },
//           { callId: "realestateagent-1001-2", userNo: 7247248714, timestamp: "2025-07-03T08:45:00Z", type: "INCOMING", status: "ANSWERED", duration: 300 },
//           { callId: "realestateagent-1001-3", userNo: 7247248715, timestamp: "2025-07-02T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 180 },
//           { callId: "realestateagent-1001-4", userNo: 7247248716, timestamp: "2025-07-02T15:10:00Z", type: "INCOMING", status: "MISSED", duration: 0 },
//           { callId: "realestateagent-1001-5", userNo: 7247248717, timestamp: "2025-07-02T14:25:00Z", type: "OUTGOING", status: "ANSWERED", duration: 240 },
//           { callId: "realestateagent-1001-6", userNo: 7247248718, timestamp: "2025-07-02T13:40:00Z", type: "INCOMING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1001-7", userNo: 7247248719, timestamp: "2025-07-01T17:55:00Z", type: "OUTGOING", status: "MISSED", duration: 0 },
//           { callId: "realestateagent-1001-8", userNo: 7247248720, timestamp: "2025-07-01T16:30:00Z", type: "INCOMING", status: "ANSWERED", duration: 360 },
//           { callId: "realestateagent-1001-9", userNo: 7247248721, timestamp: "2025-07-01T15:15:00Z", type: "OUTGOING", status: "ANSWERED", duration: 150 },
//           { callId: "realestateagent-1001-10", userNo: 7247248722, timestamp: "2025-07-01T14:00:00Z", type: "INCOMING", status: "MISSED", duration: 0 },
//           { callId: "realestateagent-1001-11", userNo: 7247248723, timestamp: "2025-07-01T12:45:00Z", type: "OUTGOING", status: "ANSWERED", duration: 200 }
//         ]
//       },
//       {
//         number: "1002",
//         agentId: "realestateagent-1002",
//         callsMade: 85,
//         isActive: true,
//         callHistory: [
//           { callId: "realestateagent-1002-0", userNo: 7247248724, timestamp: "2025-07-03T11:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 95 },
//           { callId: "realestateagent-1002-1", userNo: 7247248725, timestamp: "2025-07-03T10:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 },
//           { callId: "realestateagent-1002-2", userNo: 7247248726, timestamp: "2025-07-02T18:10:00Z", type: "OUTGOING", status: "ANSWERED", duration: 210 },
//           { callId: "realestateagent-1002-3", userNo: 7247248727, timestamp: "2025-07-02T17:25:00Z", type: "INCOMING", status: "ANSWERED", duration: 135 },
//           { callId: "realestateagent-1002-4", userNo: 7247248728, timestamp: "2025-07-02T16:40:00Z", type: "OUTGOING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1003",
//         agentId: "realestateagent-1003",
//         callsMade: 45,
//         isActive: false,
//         callHistory: [
//           { callId: "realestateagent-1003-0", userNo: 7247248729, timestamp: "2025-07-01T14:20:00Z", type: "INCOMING", status: "ANSWERED", duration: 160 },
//           { callId: "realestateagent-1003-1", userNo: 7247248730, timestamp: "2025-07-01T13:35:00Z", type: "OUTGOING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1004",
//         agentId: "realestateagent-1004",
//         callsMade: 22,
//         isActive: false,
//         callHistory: [
//           { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1005",
//         agentId: "realestateagent-1005",
//         callsMade: 20,
//         isActive: true,
//         callHistory: [
//           { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1006",
//         agentId: "realestateagent-1006",
//         callsMade: 18,
//         isActive: false,
//         callHistory: [
//           { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1007",
//         agentId: "realestateagent-1007",
//         callsMade: 15,
//         isActive: true,
//         callHistory: [
//           { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1008",
//         agentId: "realestateagent-1008",
//         callsMade: 12,
//         isActive: true,
//         callHistory: [
//           { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1009",
//         agentId: "realestateagent-1009",
//         callsMade: 10,
//         isActive: true,
//         callHistory: [
//           { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "1010",
//         agentId: "realestateagent-1010",
//         callsMade: 8,
//         isActive: true,
//         callHistory: [
//           { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
//           { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       }
//     ]
//   },
//   {
//     uId: 2,
//     company: "Renambl",
//     agent: "appointment booking",
//     agentKey: "appointmentbooking",
//     agentNos: [
//       {
//         number: "2001",
//         agentId: "appointmentbooking-2001",
//         callsMade: 95,
//         isActive: true,
//         callHistory: [
//           { callId: "appointmentbooking-2001-0", userNo: 7247328712, timestamp: "2025-07-03T12:05:00Z", type: "OUTGOING", status: "ANSWERED", duration: 75 },
//           { callId: "appointmentbooking-2001-1", userNo: 7247328713, timestamp: "2025-07-03T11:20:00Z", type: "INCOMING", status: "MISSED", duration: 0 },
//           { callId: "appointmentbooking-2001-2", userNo: 7247328714, timestamp: "2025-07-02T19:35:00Z", type: "OUTGOING", status: "ANSWERED", duration: 165 },
//           { callId: "appointmentbooking-2001-3", userNo: 7247328715, timestamp: "2025-07-02T18:50:00Z", type: "INCOMING", status: "ANSWERED", duration: 225 },
//           { callId: "appointmentbooking-2001-4", userNo: 7247328716, timestamp: "2025-07-02T17:15:00Z", type: "OUTGOING", status: "MISSED", duration: 0 },
//           { callId: "appointmentbooking-2001-5", userNo: 7247328717, timestamp: "2025-07-01T20:30:00Z", type: "INCOMING", status: "ANSWERED", duration: 120 },
//           { callId: "appointmentbooking-2001-6", userNo: 7247328718, timestamp: "2025-07-01T19:45:00Z", type: "OUTGOING", status: "ANSWERED", duration: 180 },
//           { callId: "appointmentbooking-2001-7", userNo: 7247328719, timestamp: "2025-07-01T18:20:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
//         ]
//       },
//       {
//         number: "2002",
//         agentId: "appointmentbooking-2002",
//         callsMade: 110,
//         isActive: true,
//         callHistory: [
//           { callId: "appointmentbooking-2002-0", userNo: 7247328720, timestamp: "2025-07-03T13:15:00Z", type: "INCOMING", status: "ANSWERED", duration: 280 },
//           { callId: "appointmentbooking-2002-1", userNo: 7247328721, timestamp: "2025-07-03T12:30:00Z", type: "OUTGOING", status: "MISSED", duration: 0 },
//           { callId: "appointmentbooking-2002-2", userNo: 7247328722, timestamp: "2025-07-02T20:45:00Z", type: "INCOMING", status: "ANSWERED", duration: 195 },
//           { callId: "appointmentbooking-2002-3", userNo: 7247328723, timestamp: "2025-07-02T19:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 145 }
//         ]
//       },
//       {
//         number: "2003",
//         agentId: "appointmentbooking-2003",
//         callsMade: 33,
//         isActive: false,
//         callHistory: [
//           { callId: "appointmentbooking-2003-0", userNo: 7247328724, timestamp: "2025-06-29T11:15:00Z", type: "INCOMING", status: "ANSWERED", duration: 120 }
//         ]
//       },
//       {
//         number: "2004",
//         agentId: "appointmentbooking-2004",
//         callsMade: 28,
//         isActive: false,
//         callHistory: [
//           { callId: "appointmentbooking-2004-0", userNo: 7247328725, timestamp: "2025-06-28T10:30:00Z", type: "OUTGOING", status: "MISSED", duration: 0 }
//         ]
//       }
//     ]
//   }
// ];


//   const getAgentDisplayName = (agentKey) => {
//     const names = {
//       'realestateagent': 'Real Estate Agent',
//       'appointmentbooking': 'Appointment Booking'
//     };
//     return names[agentKey] || agentKey;
//   };

//   // Filter only selected agent type
//   const selectedAgents = agentsData.filter(agent => agent.agentKey === agentName);

//   // Recalculate statistics for selected agent
//   const totalNumbers = selectedAgents.reduce((sum, agent) => sum + agent.agentNos.length, 0);
//   const totalActiveNumbers = selectedAgents.reduce(
//     (sum, agent) => sum + agent.agentNos.filter(num => num.isActive).length, 0
//   );
//   const totalInactiveNumbers = selectedAgents.reduce(
//     (sum, agent) => sum + agent.agentNos.filter(num => !num.isActive).length, 0
//   );
//   const totalCalls = selectedAgents.reduce(
//     (sum, agent) => sum + agent.agentNos.reduce((callSum, num) => callSum + num.callsMade, 0), 0
//   );

// //   const handleViewCallHistory = (agentKey, agentNumber = null) => {
// //     const message = agentNumber 
// //       ? `Navigate to call history for ${getAgentDisplayName(agentKey)} - ${agentNumber}`
// //       : `Navigate to call history for ${getAgentDisplayName(agentKey)} - All Numbers`;
// //     alert(message);
// //   };

//   const handleViewCallHistory = (agentKey, agentNumber = null) => {
//     const query = agentNumber 
//       ? `?agentKey=${agentKey}&agentNumber=${agentNumber}`
//       : `?agentKey=${agentKey}`;
    
//     router.push(`/agentCallHistory${query}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">{getAgentDisplayName(agentName)}</h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 Casagrand Call Management System
//               </p>
//             </div>
//             <Button variant="outline" size="sm">
//               <Activity className="w-4 h-4 mr-2" />
//               Refresh Data
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <Card className="shadow-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Numbers</p>
//                   <p className="text-2xl font-bold text-gray-900">{totalNumbers}</p>
//                 </div>
//                 <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
//                   <Phone className="h-6 w-6 text-green-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Active Numbers</p>
//                   <p className="text-2xl font-bold text-gray-900">{totalActiveNumbers}</p>
//                 </div>
//                 <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
//                   <Activity className="h-6 w-6 text-emerald-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Inactive Numbers</p>
//                   <p className="text-2xl font-bold text-gray-900">{totalInactiveNumbers}</p>
//                 </div>
//                 <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
//                   <XCircle className="h-6 w-6 text-gray-500" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="shadow-sm">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Calls</p>
//                   <p className="text-2xl font-bold text-gray-900">{totalCalls}</p>
//                 </div>
//                 <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                   <TrendingUp className="h-6 w-6 text-purple-600" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Agent Sections */}
//         <div className="space-y-6">
//           {selectedAgents.map(agent => {
//             const activeCount = agent.agentNos.filter(num => num.isActive).length;
//             const inactiveCount = agent.agentNos.filter(num => !num.isActive).length;
//             const totalCallsForAgent = agent.agentNos.reduce((sum, num) => sum + num.callsMade, 0);

//             return (
//               <Card key={agent.uId} className="shadow-sm">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <CardTitle className="text-xl">{getAgentDisplayName(agent.agentKey)}</CardTitle>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {agent.company} • {agent.agentNos.length} numbers • {totalCallsForAgent} total calls
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Badge variant="secondary" className="text-sm bg-green-500 text-white">{activeCount} Active</Badge>
//                       <Badge variant="outline" className="text-sm bg-gray-400 text-white">{inactiveCount} Inactive</Badge>
//                       <Button variant="outline" size="sm" onClick={() => handleViewCallHistory(agent.agentKey)}>
//                         View All Calls
//                       </Button>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {agent.agentNos.map(agentNum => (
//                       <div
//                         key={agentNum.number}
//                         className="p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md hover:border-gray-300 bg-white"
//                         onClick={() => handleViewCallHistory(agent.agentKey, agentNum.number)}
//                       >
//                         <div className="flex items-center justify-between mb-3">
//                           <div className="flex items-center gap-2">
//                             <div className={`w-3 h-3 rounded-full ${agentNum.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
//                             <span className="font-semibold text-sm text-gray-900">{agentNum.number}</span>
//                           </div>
//                           <Badge variant={agentNum.callsMade > 100 ? "destructive" : "secondary"} className="text-xs">
//                             {agentNum.callsMade} calls
//                           </Badge>
//                         </div>
//                         <div className="flex items-center justify-between">
//                           <Badge variant={agentNum.isActive ? "secondary" : "outline"} className="text-xs">
//                             {agentNum.isActive ? "Active" : "Inactive"}
//                           </Badge>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             className="text-xs h-6 px-2"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleViewCallHistory(agent.agentKey, agentNum.number);
//                             }}
//                           >
//                             View Calls
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AgentOverviewPage;
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Activity, TrendingUp, XCircle, Users, PhoneCall, Clock, CheckCircle2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import Container from '@/components/ui/container';

const AgentOverviewPage = () => {
  const router = useRouter();
  const agentName = "realestateagent";
  const [selectedTab, setSelectedTab] = useState<'numbers' | 'analytics'>('numbers');

  const agentsData = [
    {
      uId: 1,
      company: "Renambl",
      agent: "real estate agent",
      agentKey: "realestateagent",
      agentNos: [
        {
          number: "9876543201",
          agentId: "realestateagent-1001",
          callsMade: 120,
          isActive: true,
          callHistory: [
            { callId: "realestateagent-1001-0", userNo: 7247248712, timestamp: "2025-07-03T10:15:00Z", type: "INCOMING", status: "ANSWERED", duration: 120 },
            { callId: "realestateagent-1001-1", userNo: 7247248713, timestamp: "2025-07-03T09:30:00Z", type: "OUTGOING", status: "MISSED", duration: 0 },
            { callId: "realestateagent-1001-2", userNo: 7247248714, timestamp: "2025-07-03T08:45:00Z", type: "INCOMING", status: "ANSWERED", duration: 300 },
            { callId: "realestateagent-1001-3", userNo: 7247248715, timestamp: "2025-07-02T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 180 },
            { callId: "realestateagent-1001-4", userNo: 7247248716, timestamp: "2025-07-02T15:10:00Z", type: "INCOMING", status: "MISSED", duration: 0 },
            { callId: "realestateagent-1001-5", userNo: 7247248717, timestamp: "2025-07-02T14:25:00Z", type: "OUTGOING", status: "ANSWERED", duration: 240 },
            { callId: "realestateagent-1001-6", userNo: 7247248718, timestamp: "2025-07-02T13:40:00Z", type: "INCOMING", status: "ANSWERED", duration: 90 },
            { callId: "realestateagent-1001-7", userNo: 7247248719, timestamp: "2025-07-01T17:55:00Z", type: "OUTGOING", status: "MISSED", duration: 0 },
            { callId: "realestateagent-1001-8", userNo: 7247248720, timestamp: "2025-07-01T16:30:00Z", type: "INCOMING", status: "ANSWERED", duration: 360 },
            { callId: "realestateagent-1001-9", userNo: 7247248721, timestamp: "2025-07-01T15:15:00Z", type: "OUTGOING", status: "ANSWERED", duration: 150 }
          ]
        },
        {
          number: "9876543202",
          agentId: "realestateagent-1002",
          callsMade: 85,
          isActive: true,
          callHistory: [
            { callId: "realestateagent-1002-0", userNo: 7247248724, timestamp: "2025-07-03T11:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 95 },
            { callId: "realestateagent-1002-1", userNo: 7247248725, timestamp: "2025-07-03T10:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 },
            { callId: "realestateagent-1002-2", userNo: 7247248726, timestamp: "2025-07-02T18:10:00Z", type: "OUTGOING", status: "ANSWERED", duration: 210 },
            { callId: "realestateagent-1002-3", userNo: 7247248727, timestamp: "2025-07-02T17:25:00Z", type: "INCOMING", status: "ANSWERED", duration: 135 },
            { callId: "realestateagent-1002-4", userNo: 7247248728, timestamp: "2025-07-02T16:40:00Z", type: "OUTGOING", status: "MISSED", duration: 0 }
          ]
        },
        {
          number: "9876543203",
          agentId: "realestateagent-1003",
          callsMade: 45,
          isActive: false,
          callHistory: [
            { callId: "realestateagent-1003-0", userNo: 7247248729, timestamp: "2025-07-01T14:20:00Z", type: "INCOMING", status: "ANSWERED", duration: 160 },
            { callId: "realestateagent-1003-1", userNo: 7247248730, timestamp: "2025-07-01T13:35:00Z", type: "OUTGOING", status: "MISSED", duration: 0 }
          ]
        },
        {
          number: "9876543204",
          agentId: "realestateagent-1004",
          callsMade: 22,
          isActive: false,
          callHistory: [
            { callId: "realestateagent-1004-0", userNo: 7247248731, timestamp: "2025-06-30T16:20:00Z", type: "OUTGOING", status: "ANSWERED", duration: 90 },
            { callId: "realestateagent-1004-1", userNo: 7247248732, timestamp: "2025-06-30T15:35:00Z", type: "INCOMING", status: "MISSED", duration: 0 }
          ]
        },
        {
          number: "9876543205",
          agentId: "realestateagent-1005",
          callsMade: 20,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543206",
          agentId: "realestateagent-1006",
          callsMade: 18,
          isActive: false,
          callHistory: []
        },
        {
          number: "9876543207",
          agentId: "realestateagent-1007",
          callsMade: 15,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543208",
          agentId: "realestateagent-1008",
          callsMade: 12,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543209",
          agentId: "realestateagent-1009",
          callsMade: 10,
          isActive: true,
          callHistory: []
        },
        {
          number: "9876543210",
          agentId: "realestateagent-1010",
          callsMade: 8,
          isActive: true,
          callHistory: []
        }
      ]
    }
  ];

  const getAgentDisplayName = (agentKey) => {
    const names = {
      'realestateagent': 'Real Estate Agent',
      'appointmentbooking': 'Appointment Booking'
    };
    return names[agentKey] || agentKey;
  };

  const selectedAgents = agentsData.filter(agent => agent.agentKey === agentName);

  // Calculate statistics
  const totalNumbers = selectedAgents.reduce((sum, agent) => sum + agent.agentNos.length, 0);
  const totalActiveNumbers = selectedAgents.reduce(
    (sum, agent) => sum + agent.agentNos.filter(num => num.isActive).length, 0
  );
  const totalInactiveNumbers = selectedAgents.reduce(
    (sum, agent) => sum + agent.agentNos.filter(num => !num.isActive).length, 0
  );
  const totalCalls = selectedAgents.reduce(
    (sum, agent) => sum + agent.agentNos.reduce((callSum, num) => callSum + num.callsMade, 0), 0
  );

  // Prepare chart data
  const numbersData = selectedAgents.flatMap(agent => 
    agent.agentNos.map(agentNum => ({
      number: agentNum.number,
      calls: agentNum.callsMade,
      status: agentNum.isActive ? 'Active' : 'Inactive'
    }))
  );

  const pieChartData = [
    { name: 'Active', value: totalActiveNumbers, color: '#3B82F6' },
    { name: 'Inactive', value: totalInactiveNumbers, color: '#6B7280' }
  ];

  // Call performance data for line chart
  const callPerformanceData = [
    { day: 'Mon', calls: 45, answered: 38 },
    { day: 'Tue', calls: 52, answered: 44 },
    { day: 'Wed', calls: 48, answered: 40 },
    { day: 'Thu', calls: 61, answered: 52 },
    { day: 'Fri', calls: 55, answered: 47 },
    { day: 'Sat', calls: 38, answered: 32 },
    { day: 'Sun', calls: 33, answered: 28 }
  ];

  // Calculate call statistics from actual data
  const allCalls = selectedAgents.flatMap(agent => 
    agent.agentNos.flatMap(agentNum => agentNum.callHistory || [])
  );

  const answeredCalls = allCalls.filter(call => call.status === 'ANSWERED').length;
  const missedCalls = allCalls.filter(call => call.status === 'MISSED').length;
  const incomingCalls = allCalls.filter(call => call.type === 'INCOMING').length;
  const outgoingCalls = allCalls.filter(call => call.type === 'OUTGOING').length;

  const averageCallDuration = answeredCalls > 0 
    ? Math.round(allCalls.filter(call => call.status === 'ANSWERED').reduce((sum, call) => sum + call.duration, 0) / answeredCalls)
    : 0;

  const handleViewCallHistory = (agentKey: string, agentNumber?: string | null) => {
    const query = agentNumber 
      ? `?agentKey=${agentKey}&agentNumber=${agentNumber}`
      : `?agentKey=${agentKey}`;
    
    router.push(`agentCallHistory${query}`);
    console.log(`Navigate to: /agentCallHistory${query}`);
  };

  const refreshData = () => {
    // call your API or reload function
    console.log("Refreshing data...");
    // Optionally show a toast or loader
  };

  return (
    <Container>
      <div className=" bg-gray-50 min-h-screen">
        {/* Header */}
        <div className=" bg-white shadow-md md:shadow-lg border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Title & Subtitle */}
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{getAgentDisplayName(agentName)}</h1>
                <p className="text-base sm:text-lg text-gray-600 mt-2 flex justify-center sm:justify-start items-center gap-2">
                  <Users className="w-5 h-5" />
                  Casagrand Call Management System
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTab('numbers')}
                  className={`flex items-center gap-2 ${selectedTab === 'numbers' ? 'bg-gray-100' : ''}`}
                >
                  <Phone className="w-4 h-4" />
                  Numbers
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTab('analytics')}
                  className={`flex items-center gap-2 ${selectedTab === 'analytics' ? 'bg-gray-100' : ''}`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshData}
                  className="flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </div>


        <div className="max-w-7xl mx-auto py-8 space-y-8">
          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Numbers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalNumbers}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>


            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Numbers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalActiveNumbers}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Inactive Numbers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalInactiveNumbers}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <XCircle className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Calls</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCalls}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Stats Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-emerald-700 uppercase tracking-wide">Answered Calls</p>
                    <p className="text-2xl font-bold text-emerald-900 mt-1">{answeredCalls}</p>
                  </div>
                  <PhoneCall className="h-8 w-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">Missed Calls</p>
                    <p className="text-2xl font-bold text-red-900 mt-1">{missedCalls}</p>
                  </div>
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Avg Duration</p>
                    <p className="text-2xl font-bold text-orange-900 mt-1">{averageCallDuration}s</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-indigo-100">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-indigo-700 uppercase tracking-wide">Success Rate</p>
                    <p className="text-2xl font-bold text-indigo-900 mt-1">
                      {allCalls.length > 0 ? Math.round((answeredCalls / allCalls.length) * 100) : 0}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-indigo-600" />
                </div>
              </CardContent>
            </Card>
          </div> */}

          {/* Charts Section */}
        

          {selectedTab === 'analytics' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calls per Number Bar Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Calls per Number</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={numbersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="number" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f8f9fa', 
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                    <Bar dataKey="calls" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Active/Inactive Pie Chart */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800">Agent Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#f8f9fa', 
                        border: '1px solid #e9ecef',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Weekly Call Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={callPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f8f9fa', 
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="calls" 
                    stackId="1" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6" 
                    fillOpacity={0.3}
                    name="Total Calls"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="answered" 
                    stackId="2" 
                    stroke="#3B82F6" 
                    fill="#3B82F6" 
                    fillOpacity={0.7}
                    name="Answered Calls"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
            </>
          )}

          {/* Agent Numbers Grid */}        
          {selectedTab === 'numbers' && (
            <Card className="shadow-lg border-0">
            <CardHeader className="pb-6">
              <div className=" md:flex items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <CardTitle className="text-2xl font-bold text-gray-800">Agent Numbers</CardTitle>
                  <p className="text-gray-600 mt-2">
                    {totalNumbers} numbers • {totalCalls} total calls
                  </p>
                </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewCallHistory(agentName)}
                  >
                    View All Calls
                  </Button>
              </div>
            </CardHeader>
            {/* <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {selectedAgents.flatMap(agent => 
                  agent.agentNos.map(agentNum => (
                    <div
                      key={agentNum.number}
                      className="p-6 rounded-xl border-2 cursor-pointer transition-all hover:shadow-lg hover:border-blue-300 bg-white hover:bg-blue-50 transform hover:-translate-y-1"
                      onClick={() => handleViewCallHistory(agent.agentKey, agentNum.number)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${agentNum.isActive ? 'bg-green-500' : 'bg-gray-400'} shadow-md`}></div>
                          <span className="font-bold text-lg text-gray-900">{agentNum.number}</span>
                        </div>
                        <Badge 
                          variant={agentNum.callsMade > 100 ? "destructive" : "secondary"} 
                          className="text-sm px-3 py-1"
                        >
                          {agentNum.callsMade} calls
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge 
                          variant={agentNum.isActive ? "default" : "outline"} 
                          className={`text-sm px-3 py-1 ${agentNum.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {agentNum.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewCallHistory(agent.agentKey, agentNum.number);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent> */}
            <CardContent>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {selectedAgents.flatMap(agent =>
        [...agent.agentNos]
          .sort((a, b) => Number(b.isActive) - Number(a.isActive)) // Active first
          .map(agentNum => (
            <div
              key={agentNum.number}
              className="p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md hover:border-blue-300 bg-white hover:bg-blue-50 transform hover:-translate-y-1"
              onClick={() => handleViewCallHistory(agent.agentKey, agentNum.number)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${agentNum.isActive ? 'bg-green-500' : 'bg-gray-400'} shadow-sm`}></div>
                  <span className="font-semibold text-base text-gray-800">{agentNum.number}</span>
                </div>
                <Badge 
                  variant={"secondary"} 
                  className="text-xs px-2 py-0.5"
                >
                  {agentNum.callsMade} calls
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <Badge 
                  variant={agentNum.isActive ? "default" : "outline"} 
                  className={`text-xs px-2 py-0.5 ${agentNum.isActive ? 'border border-green-500 bg-white text-green-500' : 'bg-gray-200 text-gray-700'}`}
                >
                  {agentNum.isActive ? "Active" : "Inactive"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-gray-100 px-2 h-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewCallHistory(agent.agentKey, agentNum.number);
                  }}
                >
                  View
                </Button>
              </div>
            </div>
          ))
      )}
    </div>
  </CardContent>

          </Card>
          )}
        </div>
          </div>
    </Container>
  );
};

export default AgentOverviewPage;