"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js 13+ App Router
// import { useRouter } from "next/router"; // Next.js 12 Pages Router
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Activity, XCircle, Search, FileDown, Users, Clock, Filter, ChevronLeft, ChevronRight, Calendar, CreditCard, Wifi, ChevronDown, ChevronUp, TrendingUp, BarChart3, CheckCircle } from "lucide-react";

// Updated license data with licenseStatus field
const licenseData = [
  {
    org_id: "ORG12345",
    paymentId: "PAY123456",
    clientId: "CLIENT56789",
    licenseId: "LIC12345",
    licenseName: "Premium Enterprise License",
    licenseStatus: "ACTIVE",
    startDate: "2024-01-15T00:00:00.000Z",
    endDate: "2025-01-15T00:00:00.000Z",
    usage: [],
    connections: [
      {
        connectionId: "CONN98765",
        clientId: "CLIENT56789",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T09:00:00.000Z", end: "2024-08-01T10:30:00.000Z", sessionId: "SESSION001" },
          { start: "2024-08-01T14:00:00.000Z", end: "2024-08-01T15:45:00.000Z", sessionId: "SESSION002" }
        ]
      },
      {
        connectionId: "CONN98766",
        clientId: "CLIENT56790",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T11:00:00.000Z", end: "2024-08-01T12:00:00.000Z", sessionId: "SESSION003" }
        ]
      },
      {
        connectionId: "CONN98767",
        clientId: "CLIENT56791",
        connectionStatus: "IN_ACTIVE",
        usage: []
      }
    ],
    overallUsage: "225",
    lastUsage: "2024-08-01T15:45:00.000Z"
  },
  {
    org_id: "ORG12346",
    paymentId: "PAY123457",
    clientId: "CLIENT56792",
    licenseId: "LIC12346",
    licenseName: "Standard Business License",
    licenseStatus: "ACTIVE",
    startDate: "2024-02-01T00:00:00.000Z",
    endDate: "2025-02-01T00:00:00.000Z",
    usage: [],
    connections: [
      {
        connectionId: "CONN98768",
        clientId: "CLIENT56792",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T08:00:00.000Z", end: "2024-08-01T09:15:00.000Z", sessionId: "SESSION004" }
        ]
      }
    ],
    overallUsage: "75",
    lastUsage: "2024-08-01T09:15:00.000Z"
  },
  {
    org_id: "ORG12347",
    paymentId: "PAY123458",
    clientId: "CLIENT56793",
    licenseId: "LIC12347",
    licenseName: "Enterprise Plus License",
    licenseStatus: "ACTIVE",
    startDate: "2024-03-01T00:00:00.000Z",
    endDate: "2025-03-01T00:00:00.000Z",
    usage: [],
    connections: [
      {
        connectionId: "CONN98769",
        clientId: "CLIENT56793",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T10:00:00.000Z", end: "2024-08-01T12:30:00.000Z", sessionId: "SESSION005" }
        ]
      },
      {
        connectionId: "CONN98770",
        clientId: "CLIENT56794",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T13:00:00.000Z", end: "2024-08-01T14:45:00.000Z", sessionId: "SESSION006" }
        ]
      },
      {
        connectionId: "CONN98771",
        clientId: "CLIENT56795",
        connectionStatus: "IN_ACTIVE",
        usage: []
      },
      {
        connectionId: "CONN98772",
        clientId: "CLIENT56796",
        connectionStatus: "IN_ACTIVE",
        usage: []
      }
    ],
    overallUsage: "255",
    lastUsage: "2024-08-01T14:45:00.000Z"
  },
  {
    org_id: "ORG12348",
    paymentId: "PAY123459",
    clientId: "CLIENT56797",
    licenseId: "LIC12348",
    licenseName: "Starter License",
    licenseStatus: "IN_ACTIVE",
    startDate: "2024-04-01T00:00:00.000Z",
    endDate: "2024-11-01T00:00:00.000Z",
    usage: [],
    connections: [
      {
        connectionId: "CONN98773",
        clientId: "CLIENT56797",
        connectionStatus: "IN_ACTIVE",
        usage: []
      }
    ],
    overallUsage: "0",
    lastUsage: "2024-07-15T10:00:00.000Z"
  },
  {
    org_id: "ORG12349",
    paymentId: "PAY123460",
    clientId: "CLIENT56798",
    licenseId: "LIC12349",
    licenseName: "Professional License",
    licenseStatus: "ACTIVE",
    startDate: "2024-05-01T00:00:00.000Z",
    endDate: "2024-10-15T00:00:00.000Z",
    usage: [],
    connections: Array.from({ length: 8 }, (_, i) => ({
      connectionId: `CONN9877${4 + i}`,
      clientId: `CLIENT5679${8 + i}`,
      connectionStatus: i < 5 ? "ACTIVE" : "IN_ACTIVE",
      usage: i < 5 ? [
        { start: "2024-08-01T09:00:00.000Z", end: "2024-08-01T10:30:00.000Z", sessionId: `SESSION00${7 + i}` }
      ] : []
    })),
    overallUsage: "450",
    lastUsage: "2024-08-01T16:30:00.000Z"
  },
  {
    org_id: "ORG12350",
    paymentId: "PAY123461",
    clientId: "CLIENT56799",
    licenseId: "LIC12350",
    licenseName: "Basic License",
    licenseStatus: "IN_ACTIVE",
    startDate: "2024-06-01T00:00:00.000Z",
    endDate: "2025-06-01T00:00:00.000Z",
    usage: [],
    connections: [
      {
        connectionId: "CONN98781",
        clientId: "CLIENT56799",
        connectionStatus: "IN_ACTIVE",
        usage: []
      },
      {
        connectionId: "CONN98782",
        clientId: "CLIENT56800",
        connectionStatus: "IN_ACTIVE",
        usage: []
      }
    ],
    overallUsage: "180",
    lastUsage: "2024-07-20T12:00:00.000Z"
  }
];

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    credit: '2-digit'
  });
};

const getDaysUntilExpiry = (endDate) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Updated function to use licenseStatus field
const isLicenseActive = (license) => {
  return license.licenseStatus === 'ACTIVE';
};

// License Usage Analytics Component
const LicenseUsageAnalytics = ({ onLicenseClick }) => {
  // Process data to extract usage and connection information
  const processUsageData = () => {
    return licenseData.map(license => {
      const usageCredits = parseInt(license.overallUsage) || 0;
      const totalConnections = license.connections.length;
      const activeConnections = license.connections.filter(conn => conn.connectionStatus === 'ACTIVE').length;
      const inactiveConnections = license.connections.filter(conn => conn.connectionStatus === 'IN_ACTIVE').length;
      const licenseIsActive = isLicenseActive(license);
      
      return {
        licenseId: license.licenseId,
        licenseName: license.licenseName,
        clientId: license.clientId,
        usage: usageCredits,
        totalConnections,
        activeConnections,
        inactiveConnections,
        connections: license.connections,
        lastUsage: license.lastUsage,
        endDate: license.endDate,
        isActive: licenseIsActive,
        licenseStatus: license.licenseStatus
      };
    }).sort((a, b) => b.usage - a.usage);
  };

  const chartData = processUsageData();

  // Updated Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm bg-white/95 max-w-sm">
          <div className="border-b border-gray-100 pb-3 mb-3">
            <p className="font-bold text-gray-900 text-lg">{label}</p>
            <p className="text-sm text-gray-600 mt-1">{data.licenseName}</p>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Usage:</span>
              <span className="font-bold text-blue-600 text-lg">{data.usage} Credits</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">License Status:</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                data.licenseStatus === 'ACTIVE'
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-1 ${
                  data.licenseStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                {data.licenseStatus}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Active Connections:</span>
              <span className="font-semibold text-green-600">{data.activeConnections}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Inactive Connections:</span>
              <span className="font-semibold text-red-600">{data.inactiveConnections}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-2 mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Last Activity:</span>
              <span className="text-gray-700 font-medium">{formatDateTime(data.lastUsage)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Enhanced Bar Chart */}
      <Card className="border-gray-200 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-white to-white rounded-t-lg">
          <CardTitle className="text-3xl font-bold text-black">
            License Usage Analytics
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            Interactive usage breakdown by license ID with connection details
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <div className="h-[500px] w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 30,
                  right: 40,
                  left: 30,
                  bottom: 80,
                }}
                barCategoryGap="30%"
                maxBarSize={60}
              >
                <defs>
                  <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  strokeOpacity={0.6}
                  vertical={false}
                />
                <XAxis 
                  dataKey="licenseId" 
                  angle={360}
                  textAnchor="middle"
                  height={100}
                  fontSize={11}
                  fontWeight="500"
                  stroke="#374151"
                  tick={{ fill: '#374151' }}
                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                  tickLine={{ stroke: '#d1d5db' }}
                />
                <YAxis 
                  stroke="#374151"
                  fontSize={12}
                  fontWeight="500"
                  tick={{ fill: '#374151' }}
                  axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
                  tickLine={{ stroke: '#d1d5db' }}
                  label={{ 
                    value: 'Usage (Credits)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#374151', fontWeight: '600' }
                  }}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)', radius: 4 }}
                />
                <Bar 
                  dataKey="usage" 
                  name="Usage (Credits)"
                  radius={[6, 6, 0, 0]}
                  fill="url(#usageGradient)"
                  stroke="#1d4ed8"
                  strokeWidth={0.5}
                />
              </BarChart>
            </ResponsiveContainer>
          {/* Enhanced Legend */}
          <div className="flex items-center justify-center -mt-28 space-x-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-medium text-gray-700">Usage (Credit's)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-medium text-gray-700">Active License</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-sm"></div>
              <span className="text-sm font-medium text-gray-700">Inactive License</span>
            </div>
          </div>
          </div>
          
        </CardContent>
      </Card>

      
    </div>
  );
};

const ConnectionsDashboard = () => {
  const router = useRouter();

  // Calculate statistics from licenseData
  const totalLicenses = licenseData.length;
  
  // Updated to use licenseStatus field
  const activeLicenses = licenseData.filter(license => license.licenseStatus === 'ACTIVE').length;
  
  const connectedDevices = licenseData.reduce((total, license) => {
    return total + license.connections.filter(conn => conn.connectionStatus === 'ACTIVE').length;
  }, 0);
  
  const expiringInNext30Days = licenseData.filter(license => {
    const daysToExpiry = getDaysUntilExpiry(license.endDate);
    return daysToExpiry <= 30 && daysToExpiry > 0;
  }).length;

  // Handle license click to navigate to usage page
  const handleLicenseClick = (licenseId) => {
    // METHOD 1: URL Parameters (Query String) - Recommended
    router.push(`/connections/licenseUsage?licenseId=${licenseId}`);
    
    // METHOD 2: Dynamic Route Parameters (if your route is /license-usage/[licenseId])
    // router.push(`/license-usage/${licenseId}`);
    
    // METHOD 3: Programmatic navigation with state
    // router.push({
    //   pathname: '/license-usage',
    //   query: { licenseId: licenseId }
    // });
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Overview of licenses, connections, and usage analytics
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Licenses
                </CardTitle>
                <Network className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalLicenses}</div>
              <p className="text-xs text-gray-500 mt-1">
                All registered licenses
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Licenses
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeLicenses}</div>
              <p className="text-xs text-gray-500 mt-1">
                Currently active licenses
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Connected Devices
                </CardTitle>
                <Wifi className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{connectedDevices}</div>
              <p className="text-xs text-gray-500 mt-1">
                Currently online
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Expiring Soon
                </CardTitle>
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{expiringInNext30Days}</div>
              <p className="text-xs text-gray-500 mt-1">
                Within 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* License Analytics Section */}
        <LicenseUsageAnalytics onLicenseClick={handleLicenseClick} />
      </div>
    </div>
  );
};

export default ConnectionsDashboard;