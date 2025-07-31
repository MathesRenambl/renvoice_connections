'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from '@/components/ui/table';
// Using custom table components instead of @/components/ui/table
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Download, 
  Eye, 
  Phone, 
  Clock, 
  DollarSign, 
  TrendingUp,
  ArrowLeft,
  Filter,
  BarChart3,
  PieChart
} from 'lucide-react';
import Container from '@/components/ui/container';
import PageTitle from '@/components/ui/pageTitle';
import PaymentTable from '@/components/payments/payment-table';

// Sample detailed transaction data
const transactionHistory = [
  {
    id: 'TXN-001',
    date: '2024-06-15',
    cost: 18.00,
    status: 'completed',
    peakHours: 23,
    offPeakHours: 22
  },
  {
    id: 'TXN-002',
    date: '2024-06-14',
    cost: 26.80,
    status: 'completed',
    peakHours: 34,
    offPeakHours: 33
  },
  {
    id: 'TXN-003',
    date: '2024-06-13',
    cost: 12.20,
    status: 'completed',
    peakHours: 15,
    offPeakHours: 8
  },
  {
    id: 'TXN-004',
    date: '2024-06-12',
    cost: 31.20,
    status: 'completed',
    peakHours: 45,
    offPeakHours: 33
  },
  {
    id: 'TXN-005',
    date: '2024-06-11',
    cost: 4.80,
    status: 'completed',
    peakHours: 8,
    offPeakHours: 4
  }
];

const upcomingCharges = [
  {
    id: 'UC-001',
    agentType: 'Sales Agent',
    estimatedCalls: 890,
    estimatedMinutes: 2670,
    estimatedCost: 356.00,
    cycleProgress: 75,
    lastUpdated: '2024-06-20'
  },
  {
    id: 'UC-002',
    agentType: 'Support Agent',
    estimatedCalls: 567,
    estimatedMinutes: 1701,
    estimatedCost: 227.00,
    cycleProgress: 65,
    lastUpdated: '2024-06-20'
  },
  {
    id: 'UC-003',
    agentType: 'Technical Agent',
    estimatedCalls: 234,
    estimatedMinutes: 702,
    estimatedCost: 93.60,
    cycleProgress: 80,
    lastUpdated: '2024-06-20'
  },
  {
    id: 'UC-004',
    agentType: 'Billing Agent',
    estimatedCalls: 156,
    estimatedMinutes: 468,
    estimatedCost: 62.40,
    cycleProgress: 55,
    lastUpdated: '2024-06-20'
  }
];

const billingSummary = {
  currentCycle: {
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    totalCalls: 2847,
    totalMinutes: 8541,
    totalCost: 1138.40,
    avgCostPerCall: 0.40,
    avgCostPerMinute: 0.133
  },
  previousCycle: {
    startDate: '2024-05-01',
    endDate: '2024-05-31',
    totalCalls: 2654,
    totalMinutes: 7962,
    totalCost: 1061.60,
    avgCostPerCall: 0.40,
    avgCostPerMinute: 0.133
  }
};

const rateCard = [
  { agentType: 'Sales Agent', peakRate: 0.15, offPeakRate: 0.12, setupFee: 0.02, peakHours: '9 AM - 5 PM' },
  { agentType: 'Support Agent', peakRate: 0.14, offPeakRate: 0.11, setupFee: 0.02, peakHours: '9 AM - 5 PM' },
  { agentType: 'Technical Agent', peakRate: 0.16, offPeakRate: 0.13, setupFee: 0.02, peakHours: '9 AM - 5 PM' },
  { agentType: 'Billing Agent', peakRate: 0.13, offPeakRate: 0.10, setupFee: 0.02, peakHours: '9 AM - 5 PM' }
];

const analyticsData = {
  totalUsage: {
    calls: 2847,
    minutes: 8541,
    cost: 1138.40
  },
  topAgents: [
    { type: 'Sales Agent', usage: 45.2, cost: 514.29 },
    { type: 'Support Agent', usage: 32.1, cost: 365.69 },
    { type: 'Technical Agent', usage: 15.8, cost: 179.85 },
    { type: 'Billing Agent', usage: 6.9, cost: 78.57 }
  ],
  timeDistribution: {
    peak: 67.3,
    offPeak: 32.7
  },
  trends: {
    weeklyGrowth: 7.2,
    monthlyGrowth: 15.8,
    costEfficiency: 12.3
  }
};

const PaymentDetailedView = () => {
  const [selectedTab, setSelectedTab] = useState('transactions');

 

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-black';
    if (progress >= 60) return 'bg-gray-600';
    return 'bg-gray-400';
  };

  return (
    <Container>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <PageTitle title="Billing Summary" description="Overview of your current and previous billing cycles." >
           <Button variant="outline" className="border-black text-black/75 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-black text-white hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
        </PageTitle>

        {/* Billing Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Current Cycle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-black/75">₹{billingSummary.currentCycle.totalCost.toFixed(2)}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>{billingSummary.currentCycle.totalCalls} calls · {billingSummary.currentCycle.totalMinutes} minutes</p>
                  <p>Avg: ₹{billingSummary.currentCycle.avgCostPerCall}/call</p>
                  <p className="text-xs">{billingSummary.currentCycle.startDate} to {billingSummary.currentCycle.endDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Previous Cycle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-black/75">₹{billingSummary.previousCycle.totalCost.toFixed(2)}</p>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>{billingSummary.previousCycle.totalCalls} calls · {billingSummary.previousCycle.totalMinutes} minutes</p>
                  <p>Avg: ₹{billingSummary.previousCycle.avgCostPerCall}/call</p>
                  <p className="text-xs">{billingSummary.previousCycle.startDate} to {billingSummary.previousCycle.endDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-600 mr-2" />
                  <p className="text-2xl font-bold text-black/75">+7.2%</p>
                </div>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>+{billingSummary.currentCycle.totalCalls - billingSummary.previousCycle.totalCalls} calls</p>
                  <p>+{billingSummary.currentCycle.totalMinutes - billingSummary.previousCycle.totalMinutes} minutes</p>
                  <p>+₹{(billingSummary.currentCycle.totalCost - billingSummary.previousCycle.totalCost).toFixed(2)} cost</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Different Views */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="w-fit bg-gray-100 px-2 py-1 rounded-lg shadow-sm">
            <TabsTrigger value="transactions" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Transaction History
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Upcoming Charges
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-black/75">Transaction History</CardTitle>
                <CardDescription>Detailed breakdown of daily usage and costs</CardDescription>
              </CardHeader>
              <CardContent>
                {/* <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <TableHead>
                      <tr className="border-b border-gray-200 text-center">
                        <th className="text-center py-3 px-4 font-medium text-black/75">Date</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Agent Type</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Calls</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Minutes</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Cost</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Peak Hours</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Off-Peak Hours</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Status</th>
                        <th className="text-center py-3 px-4 font-medium text-black/75">Actions</th>
                      </tr>
                    </TableHead>
                    <tbody>
                      {transactionHistory.map((txn) => (
                        <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50 text-center">
                          <td className="py-2 px-4">{txn.date}</td>
                          <td className="py-2 px-4">{txn.agentType}</td>
                          <td className="py-2 px-4">{txn.calls}</td>
                          <td className="py-2 px-4">{txn.minutes}</td>
                          <td className="py-2 px-4 font-semibold">₹{txn.cost.toFixed(2)}</td>
                          <td className="py-2 px-4">{txn.peakHours}</td>
                          <td className="py-2 px-4">{txn.offPeakHours}</td>
                          <td className="py-2 px-4">{getStatusBadge(txn.status)}</td>
                          <td className="py-2 px-4">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div> */}
                <PaymentTable transactionHistory={transactionHistory} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <Card className="border-black/20 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-black/75">Upcoming Charges</CardTitle>
                <CardDescription>Projected costs for current billing cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {upcomingCharges.map((charge) => (
                    <div key={charge.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-black/75">{charge.agentType}</h4>
                          <p className="text-sm text-gray-500">Last updated: {charge.lastUpdated}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-black/75">₹{charge.estimatedCost.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">Estimated</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Est. Calls</p>
                          <p className="font-medium text-black/75">{charge.estimatedCalls}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Est. Minutes</p>
                          <p className="font-medium text-black/75">{charge.estimatedMinutes}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Cycle Progress</p>
                          <p className="font-medium text-black/75">{charge.cycleProgress}%</p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(charge.cycleProgress)}`}
                          style={{ width: `${charge.cycleProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default PaymentDetailedView;