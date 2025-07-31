"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Phone,
  Clock,
  CreditCard,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/ui/container";
import PageTitle from "@/components/ui/pageTitle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import PaymentCards from "@/components/payments/header-cards";
import MonthlyCost from "@/components/payments/monthly-cost-chart";
import UpcomingPayments from "@/components/payments/upcoming-payment";
import UsageChart from "@/components/payments/usage-charts";
import { useRouter } from "next/navigation";

// Sample JSON data
const usageData = {
  // Daily data for July 1–8
  day: [
    { day: "Jul 1", calls: 50, cost: 20, minutes: 150 },
    { day: "Jul 2", calls: 58, cost: 23, minutes: 174 },
    { day: "Jul 3", calls: 63, cost: 25, minutes: 189 },
    { day: "Jul 4", calls: 47, cost: 19, minutes: 141 },
    { day: "Jul 5", calls: 52, cost: 21, minutes: 156 },
    { day: "Jul 6", calls: 55, cost: 22, minutes: 165 },
    { day: "Jul 7", calls: 61, cost: 24, minutes: 183 },
    { day: "Jul 8", calls: 49, cost: 20, minutes: 147 }
  ],

  // Weekly data for July 1–7 and July 8
  week: [
    { week: "Week 1", calls: 386, cost: 154, minutes: 1158 }, // Sum of Jul 1–7
    { week: "Week 2", calls: 450, cost: 200, minutes: 1407 }      // Jul 8 only
  ],

  // Monthly data from Jan to Jul 2025
  month: [
    { month: "Jan 2025", calls: 2070, cost: 828, minutes: 6210 },
    { month: "Feb 2025", calls: 2150, cost: 860, minutes: 6450 },
    { month: "Mar 2025", calls: 2230, cost: 892, minutes: 6690 },
    { month: "Apr 2025", calls: 2310, cost: 924, minutes: 6930 },
    { month: "May 2025", calls: 2400, cost: 960, minutes: 7200 },
    { month: "Jun 2025", calls: 2490, cost: 996, minutes: 7470 },
    { month: "Jul 2025", calls: 2580, cost: 1032, minutes: 7740 }
  ]
};


const currentUsage = {
  totalCalls: 2847,
  totalMinutes: 8541,
  currentBill: 1138.4,
  avgCallDuration: 3.2,
  peakHours: "2:00 PM - 4:00 PM",
  lastBillDate: "2024-06-01",
  nextBillDate: "2024-07-01",
};

const upcomingPayment = {
  estimatedAmount: 1245.6,
  dueDate: "2024-07-15",
  callsToDate: 1456,
  minutesToDate: 4368,
  daysRemaining: 8,
};


const PaymentDashboard = () => {
  const[type,setType] = React.useState<string>('month');
  return (
    <Container>
      <div className="max-w-7xl mx-auto space-y-6 h-auto">
        <PageTitle
          title="Payment Usage"
          description="Overview of your call-based agent usage and billing details."
        >
          {/* <Button
            className="bg-black text-white hover:bg-gray-800"
            onClick={() => router.push("/payments/detailed-view")}
          >
            {desktop && <CreditCard className="mr-2 h-4 w-4" />}
            {desktop ? "Detailed Report" : "Report"}
          </Button> */}
          <Button variant={type==='day'?'outline':"ghost"} onClick={()=>{setType('day')}}>Day</Button>
          <Button variant={type==='week'?'outline':"ghost"} onClick={()=>{setType('week')}}>Week</Button>
          <Button variant={type==='month'?'outline':"ghost"} onClick={()=>{setType('month')}}>Month</Button>
        </PageTitle>

        {/* Key Metrics Cards */}
        <PaymentCards
          currentUsage={currentUsage}
          upcomingPayment={upcomingPayment}
        />

        {/* Charts Row */}
        <UsageChart data={usageData[type]} type={type} />
        {/* Upcoming Payment Details */}
        <UpcomingPayments upcomingPayment={upcomingPayment} />
      </div>
    </Container>
  );
};

export default PaymentDashboard;
