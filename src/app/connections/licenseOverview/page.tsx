"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Activity, XCircle, Search, FileDown, Users, Clock, Filter, ChevronLeft, ChevronRight, Calendar, CreditCard, Wifi, ChevronDown, ChevronUp, TrendingUp, BarChart3, CheckCircle } from "lucide-react";

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
    minute: '2-digit'
  });
};

const getDaysUntilExpiry = (endDate) => {
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const isLicenseActive = (license) => {
  return license.licenseStatus === 'ACTIVE';
};

// License Usage Analytics Component
const LicenseUsageAnalytics = ({ onLicenseClick }) => {
  // Process data to extract usage and connection information
  const processUsageData = () => {
    return licenseData.map(license => {
      const usageMinutes = parseInt(license.overallUsage) || 0;
      const totalConnections = license.connections.length;
      const activeConnections = license.connections.filter(conn => conn.connectionStatus === 'ACTIVE').length;
      const inactiveConnections = license.connections.filter(conn => conn.connectionStatus === 'IN_ACTIVE').length;
      const licenseIsActive = isLicenseActive(license);
      
      return {
        licenseId: license.licenseId,
        licenseName: license.licenseName,
        clientId: license.clientId,
        usage: usageMinutes,
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

  // Custom tooltip
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
              <span className="font-bold text-blue-600 text-lg">{data.usage} minutes</span>
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
    <div>
        <div className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                License Overview
              </h1>
              <p className="text-gray-600 mt-1">
                Detailed breakdown of licenses with connection information
              </p>
            </div>
          </div>
        </div>
      
        
        <CardContent className="px-0">
          <div className="space-y-4 ">
            {chartData.map((item, index) => (
              <div key={item.licenseId} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p 
                          className="font-bold text-gray-900 text-lg cursor-pointer hover:text-blue-600 hover:underline transition-colors duration-200"
                          onClick={() => onLicenseClick(item.licenseId)}
                          title="Click to view detailed license usage"
                        >
                          {item.licenseId}
                        </p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                          item.licenseStatus === 'ACTIVE'
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-red-100 text-red-700 border border-red-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-1 ${
                            item.licenseStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          {item.licenseStatus}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{item.licenseName}</p>
                      <p className="text-xs text-gray-500">Client: {item.clientId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-2xl text-blue-600">{item.usage} min</p>
                    <p className="text-sm text-gray-500">Total Usage</p>
                  </div>
                </div>
                
                {/* Connection Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Connections</span>
                      <span className="font-semibold text-gray-900">{item.totalConnections}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Active</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                        <div className="w-2 h-2 rounded-full mr-1 bg-green-500"></div>
                        {item.activeConnections}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Inactive</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        <div className="w-2 h-2 rounded-full mr-1 bg-red-500"></div>
                        {item.inactiveConnections}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
                  <span>Last Activity: {formatDateTime(item.lastUsage)}</span>
                  <span>Expires: {formatDate(item.endDate)} ({getDaysUntilExpiry(item.endDate)} days)</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
    </div>
  );
};

const LicenseOverview = () => {
  const router = useRouter();

  // Calculate statistics from licenseData
  const totalLicenses = licenseData.length;
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
    router.push(`/connections/licenseUsage?licenseId=${licenseId}`);
  };

  return (
    <div className="space-y-6">
      

      {/* License Usage Analytics */}
      <LicenseUsageAnalytics onLicenseClick={handleLicenseClick} />
    </div>
  );
};

export default LicenseOverview;