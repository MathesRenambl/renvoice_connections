"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  Search,
  AlertCircle,
  TrendingUp,
  Phone,
  CheckCircle2,
  MapPin,
  AlertTriangle,
  Activity,
} from "lucide-react";
import constituencyData from "@/data/consti.json";
import PageTitle from '@/components/ui/pageTitle'
import Container from "@/components/ui/container";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number;
    payload: any;
    color: string;
    dataKey: string;
  }[];
  label?: string;
}

const ConstituencyDashboard: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [districtId, setDistrictId] = useState<string | null>(null);
  const [totalFeedback, setTotalFeedback] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [timePeriod, setTimePeriod] = useState<"day" | "week" | "month">("day");
  const [timeRange, setTimeRange] = useState('day'); 

  const filterDataByTimeRange = (data, range) => {
    return data.map(item => {
      let positiveRatio = 1;
      let negativeRatio = 1;
      
      switch (range) {
        case 'day':
          positiveRatio = 0.9;
          negativeRatio = 1.1;
          break;
        case 'week':
          positiveRatio = 0.95;
          negativeRatio = 1.05;
          break;
        case 'month':
          positiveRatio = 1; 
          negativeRatio = 1; 
          break;
        default:
          break;
      }

      const adjustedPositive = item.positiveFeedbackPercent * positiveRatio;
      const adjustedNegative = item.negativeFeedbackPercent * negativeRatio;
      const total = adjustedPositive + adjustedNegative;
      
      const normalizedPositive = Math.round((adjustedPositive / total) * 100);
      const normalizedNegative = 100 - normalizedPositive; 

      return {
        ...item,
        positiveFeedbackPercent: normalizedPositive,
        negativeFeedbackPercent: normalizedNegative,
      };
    });
  };

  useEffect(() => {
    const id = searchParams.get("districtId");
    const totalFeedback = searchParams.get("feedback");
    setDistrictId(id);
    setTotalFeedback(totalFeedback ? parseInt(totalFeedback,10) : null );
  }, [searchParams]);


  useEffect(() => {
    if (!districtId) {
      setSelectedDistrict(null);
      return;
    }
    const found = constituencyData.find((d) => d.district_id === districtId);
    setSelectedDistrict(found ?? null);
  }, [districtId]);

  const filteredConstituencies = useMemo(() => {
    const list = selectedDistrict?.constituencies ?? [];
    return list.filter(
      (c) =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.constituency_id.toString().includes(searchTerm)
    );
  }, [selectedDistrict, searchTerm]);

  const totals = useMemo(() => {
    if (!selectedDistrict) {
      return {
        totalCompliance: 0,
        totalIssues: 0,
        totalImprovement: 0,
        totalPhoneCalls: 0,
        avgPositiveFeedback: 0,
        avgNegativeFeedback: 0,
      };
    }
    const list = selectedDistrict.constituencies ?? [];
    const acc = list.reduce(
      (s, c) => ({
        totalCompliance: s.totalCompliance + c.complianceCount,
        totalIssues: s.totalIssues + c.issueCount,
        totalImprovement: s.totalImprovement + c.improvementCount,
        totalPhoneCalls: s.totalPhoneCalls + c.phoneCallCount,
        avgPositiveFeedback: s.avgPositiveFeedback + c.positiveFeedbackPercent,
        avgNegativeFeedback: s.avgNegativeFeedback + c.negativeFeedbackPercent,
      }),
      {
        totalCompliance: 0,
        totalIssues: 0,
        totalImprovement: 0,
        totalPhoneCalls: 0,
        avgPositiveFeedback: 0,
        avgNegativeFeedback: 0,
      }
    );
    const len = list.length || 1;
    return {
      ...acc,
      avgPositiveFeedback: Math.round(acc.avgPositiveFeedback / len),
      avgNegativeFeedback: Math.round(acc.avgNegativeFeedback / len),
    };
  }, [selectedDistrict]);

  const phoneCallDatas = {
    day: [
      { time: "9AM", calls: 809 },
      { time: "12PM", calls: 335 },
      { time: "3PM", calls: 552 },
      { time: "6PM", calls: 310 }
    ],
    week: [
      { day: "Mon", calls: 1825 },
      { day: "Tue", calls: 1542 },
      { day: "Wed", calls: 1438 },
      { day: "Thu", calls: 1245 },
      { day: "Fri", calls: 1140 }
    ],
    month: [
      { week: "Week 1", calls: 9250 },
      { week: "Week 2", calls: 7180 },
      { week: "Week 3", calls: 8165 },
      { week: "Week 4", calls: 9175 }
    ]
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
  }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="bg-white p-3 border rounded shadow-lg">
        <p className="font-semibold">{payload[0].payload.fullName || label}</p>
        {payload.map((e, i) => (
          <p key={i} style={{ color: e.color }}>
            {e.name}: {e.value}
          </p>
        ))}
      </div>
    );
  };

  const getCardBackgroundColor = (pos: number, neg: number) => {
    if (pos > neg) return "bg-green-100 border-green-300";
    if (neg > pos) return "bg-red-100 border-red-300";
    if (pos === neg) return "bg-yellow-100 border-yellow-300";
    return "bg-gray-50 border-gray-200";
  };

  if (!selectedDistrict) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-xl shadow-sm border p-8 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No District Selected</h3>
          <p>Please select a district to view constituency data.</p>
        </div>
      </div>
    );
  }

  const getImprovementColor = (improvement: string) => {
    return "bg-gray-50 text-gray-900 border-gray-200";
  };

  return (
    <Container className="min-h-screen bg-white">
      <PageTitle title={`${selectedDistrict.name} District`} description={` ${selectedDistrict?.constituencies?.length} constituencies`}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/operationTvk/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage>
                Constituency
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </PageTitle>
      
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">
                          Total Feedback
                        </CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">
                          {totalFeedback}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Across all constituencies
                        </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-gray-600">
                            Positive Feedback
                          </CardTitle>
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">
                            {totals.avgPositiveFeedback}%
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Satisfaction 
                          </p>
                        </CardContent>
                      </Card>


                      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-gray-600">
                            Negative Feedback
                          </CardTitle>
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-red-600">
                            {totals.avgNegativeFeedback}%
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Issues 
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-gray-600">
                            Phone Interactions
                          </CardTitle>
                          <Phone className="h-4 w-4 text-purple-600" />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-purple-600">
                            {totals.totalPhoneCalls.toLocaleString()}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Engagement 
                          </p>
                        </CardContent>
                      </Card>  
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="constituencies" className="w-full">
          <TabsList className="grid w-fit grid-cols-2">
            
            <TabsTrigger
              value="constituencies"
              className="flex items-center gap-2"
            >
              Constituencies
            </TabsTrigger>

            <TabsTrigger value="analytics" className="flex items-center gap-2">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            {/* Charts */}
            <div className="grid grid-cols-1  gap-6 mb-8">
              {/* Compliance vs Issues Bar Chart */}
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Constituencies Feedback
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Positive and Negative Feedback by Constituency
                      </p>
                    </div>
                    <Tabs 
                      value={timeRange}
                      onValueChange={(value) => setTimeRange(value as "day" | "week" | "month")}
                      className="w-fit"
                    >
                      <TabsList>
                        <TabsTrigger value="day">Day</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  {!selectedDistrict || !selectedDistrict.constituencies ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Loading ward data...</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={filterDataByTimeRange(selectedDistrict.constituencies, timeRange)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 10 }}
                          angle={-30}
                          textAnchor="end"
                          interval={0}
                        />
                        <YAxis />
                        <Tooltip/>
                        <Bar
                          dataKey="positiveFeedbackPercent"
                          name="Positive"
                          stackId="a"
                          fill="#22c55e"
                          barSize={50}
                        />
                        <Bar
                          dataKey="negativeFeedbackPercent"
                          name="Negative"
                          stackId="a"
                          fill="#ef4444"
                          barSize={50}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold">
                        Phone Call Analysis
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Citizen engagement through phone calls
                      </p>
                    </div>
                    <Tabs 
                      value={timePeriod}
                      onValueChange={(value) => setTimePeriod(value as "day" | "week" | "month")}
                      className="w-fit"
                    >
                      <TabsList>
                        <TabsTrigger value="day">Day</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={phoneCallDatas[timePeriod]}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey={timePeriod === "day" ? "time" : timePeriod === "week" ? "day" : "week"} 
                        />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <Tooltip 
                          formatter={(value) => [`${value} calls`, "Phone Calls"]}
                          labelFormatter={(label) => timePeriod === "day" ? `Time: ${label}` : 
                                            timePeriod === "week" ? `Day: ${label}` : `Week: ${label}`}
                        />
                        <Area
                          type="monotone"
                          dataKey="calls"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#colorCalls)"
                          activeDot={{ r: 8 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="constituencies" className="space-y-6">
            {/* Constituency Cards */}
            <Card>
              <CardHeader>
                <div className="w-full flex justify-between">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Constituencies ({filteredConstituencies.length})
                    </h2>
                    {searchTerm && (
                      <p className="text-sm text-gray-500">
                        Showing results for "{searchTerm}"
                      </p>
                    )}
                  </div>
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search constituencies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full md:w-80"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {filteredConstituencies.length === 0 ? (
                  <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-8 text-center">
                      <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        No constituencies found matching your search criteria.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredConstituencies.map((constituency: any) => (
                      <Card
                        key={constituency.constituency_id}
                        className={`hover:shadow-md transition-shadow cursor-pointer ${getCardBackgroundColor(
                          constituency.positiveFeedbackPercent,
                          constituency.negativeFeedbackPercent
                        )}`}
                        onClick={() =>
                          router.push(
                            `/operationTvk/tvkCategory?districtId=${districtId}&constituency_id=${constituency.constituency_id}`
                          )
                        }
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-semibold text-slate-900">
                              {constituency.name}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className="text-xs border-gray-500"
                            >
                              {constituency.constituency_id}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between items-center mb-4">
                            <div className="text-center flex-1 px-2">
                              <div className="text-base font-bold text-orange-600">
                                {constituency.issueCount}
                              </div>
                              <div className="text-xs text-orange-700">
                                Feedbacks
                              </div>
                            </div>
                            <div className="text-center flex-1 px-2 border-l border-slate-200">
                              <div className="text-base font-semibold text-green-600">
                                {constituency.positiveFeedbackPercent}%
                              </div>
                              <div className="text-xs text-slate-600">
                                Positive
                              </div>
                            </div>
                            <div className="text-center flex-1 px-2 border-l border-slate-200">
                              <div className="text-base font-semibold text-red-600">
                                {constituency.negativeFeedbackPercent}%
                              </div>
                              <div className="text-xs text-slate-600">
                                Negative
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-200 border-opacity-50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-600">
                                Priority Focus:
                              </span>
                              <Activity className="h-4 w-4 text-slate-600" />
                            </div>
                            <Badge
                              variant="outline"
                              className={`text-xs px-3 py-1 ${getImprovementColor(
                                constituency.improvementNeeded
                              )}`}
                            >
                              {constituency.improvementNeeded}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading Dashboard...</div>}>
      <ConstituencyDashboard />
    </Suspense>
  );
}