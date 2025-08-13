"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Calendar, Wifi, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { getOrgdashboard } from "@/app/api/page";
import { useCredit } from "@/context/creditContext";

const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// License Usage Analytics Component
const LicenseUsageAnalytics = ({ licenses, onLicenseClick }) => {
    const [selectedLicense, setSelectedLicense] = useState(null);
    // Process data to extract usage information for line chart
    const processUsageData = () => {
        if (!licenses || !Array.isArray(licenses)) return [];

        return licenses.map((license, index) => ({
            index: index + 1,
            licenseId: license.licenseId,
            usage: license.usedCredits || 0,
            maxCredits: license.maxCredits || 0,
            usagePercentage: license.maxCredits ? (license.usedCredits / license.maxCredits * 100) : 0
        })).sort((a, b) => b.usage - a.usage);
    };

    // Process data for pie chart
    const processPieData = () => {
        if (!licenses || !Array.isArray(licenses)) return [];

        return licenses.map((license, index) => ({
            name: license.licenseId,
            used: license.usedCredits || 0,
            remaining: Math.max(0, (license.maxCredits || 0) - (license.usedCredits || 0)),
            maxCredits: license.maxCredits || 0,
            usagePercentage: license.maxCredits ? (license.usedCredits / license.maxCredits * 100) : 0
        })).sort((a, b) => b.used - a.used);
    };

    const lineChartData = processUsageData();
    const pieChartData = processPieData();

    // Colors for pie chart
    const PIE_COLORS = [
        '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
        '#14b8a6', '#f43f5e', '#8b5cf6', '#22c55e', '#eab308'
    ];

    // Custom tooltip for line chart
    const CustomLineTooltip = ({ active, payload, label } : {
        active? : any,
        payload? : any,
        label? : any
    }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm bg-white/95 max-w-sm w-56">
                    <div className="border-b border-gray-100 pb-3 mb-3">
                        <p className="font-bold text-gray-900 text-lg">{data.licenseId}</p>
                    </div>

                    <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Used Credits:</span>
                            <span className="font-bold text-blue-600 text-lg">{data.usage}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Max Credits:</span>
                            <span className="font-semibold text-gray-700">{data.maxCredits}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Usage:</span>
                            <span className="font-semibold text-orange-600">
                                {data.usagePercentage.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom tooltip for pie chart
    const CustomPieTooltip = ({ active, payload } : {
        active? : any,
        payload? : any
    }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm bg-white/95 max-w-sm w-64">
                    <div className="border-b border-gray-100 pb-3 mb-3">
                        <p className="font-bold text-gray-900 text-lg">{data.name}</p>
                    </div>

                    <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Used Credits:</span>
                            <span className="font-bold text-blue-600 text-lg">{data.used}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Remaining:</span>
                            <span className="font-semibold text-green-600">{data.remaining}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Max Credits:</span>
                            <span className="font-semibold text-gray-700">{data.maxCredits}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Usage:</span>
                            <span className="font-semibold text-orange-600">
                                {data.usagePercentage.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Custom dot for line chart
    const CustomDot = (props) => {
        const { cx, cy, payload } = props;
        return (
            <circle
                cx={cx}
                cy={cy}
                r={4}
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth={2}
                style={{ cursor: 'pointer' }}
                onClick={() => onLicenseClick && onLicenseClick(payload.licenseId)}
            />
        );
    };

    if (!licenses || licenses.length === 0) {
        return (
            <Card className="border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-black">
                        License Usage Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                        No license data available
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                        No data to display
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6 mt-6">
            {/* Side-by-side Layout for Line Chart and Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Enhanced Line Chart - Takes 2/3 of the space */}
                <Card className="lg:col-span-2 border-gray-200 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="bg-gradient-to-r from-white to-white rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-black">
                            License Usage Trend
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Credit usage pattern across licenses (hover on points for details)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[450px] w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={lineChartData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 40,
                                    }}
                                >
                                    <defs>
                                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#1d4ed8" stopOpacity={1} />
                                        </linearGradient>
                                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="2 2"
                                        stroke="#f1f5f9"
                                        strokeOpacity={0.8}
                                        horizontal={true}
                                        vertical={false}
                                    />
                                    <XAxis
                                        dataKey="index"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#64748b' }}
                                        tickMargin={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#64748b' }}
                                        tickMargin={10}
                                    />
                                    <Tooltip
                                        content={<CustomLineTooltip />}
                                        cursor={false}
                                    />
                                    <Line
                                        type="cardinal"
                                        dataKey="usage"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3b82f6', stroke: '#ffffff', strokeWidth: 2, r: 4 }}
                                        activeDot={{ r: 6, stroke: '#1d4ed8', strokeWidth: 2, fill: '#3b82f6' }}
                                        connectNulls={false}
                                        onClick={(data) => onLicenseClick && onLicenseClick(data.licenseId)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        
                        {/* Enhanced Legend */}
                        <div className="flex items-center justify-between mt-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">Used Credits Trend</span>
                            </div>
                            <div className="text-xs text-gray-500">
                                Click on points for details
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart - Takes 1/3 of the space */}
                <Card className="border-gray-200 bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="bg-gradient-to-r from-white to-white rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-black">
                            Usage Distribution
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Credit breakdown by license
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="h-[300px] w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={100}
                                        paddingAngle={1}
                                        dataKey="used"
                                        onClick={(data) => onLicenseClick && onLicenseClick(data.name)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {pieChartData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={PIE_COLORS[index % PIE_COLORS.length]}
                                                stroke="#ffffff"
                                                strokeWidth={1}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomPieTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        
                        {/* Compact Pie Chart Legend */}
                        <div className="mt-4 bg-gray-50 rounded-lg p-3">
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                                {pieChartData.slice(0, 8).map((entry, index) => (
                                    <div key={entry.name} className="flex items-center justify-between space-x-2">
                                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                                            <div 
                                                className="w-3 h-3 rounded-full flex-shrink-0"
                                                style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
                                            ></div>
                                            <span className="text-xs font-medium text-gray-700 truncate">
                                                {entry.name}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-500 flex-shrink-0">
                                            {entry.usagePercentage.toFixed(0)}%
                                        </span>
                                    </div>
                                ))}
                            </div>
                            {pieChartData.length > 8 && (
                                <div className="text-center mt-2 pt-2 border-t border-gray-200">
                                    <span className="text-xs text-gray-500">
                                        +{pieChartData.length - 8} more licenses
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const ConnectionsDashboard = () => {
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setCredits } = useCredit();

    useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const payLoad = {
                orgId: "ORG17537870059048"
            }
            const data = await getOrgdashboard(payLoad);

            console.log('Dashboard data:', data);
            if(data.Success) {
                setDashboardData(data);
                setCredits(data.orgData.credits)
            }
            else {
                setDashboardData({})
                setCredits(0)
            }
            
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);

    //             const res = await fetch("http://192.168.1.31:8000/license/getOrgDashboard", {
    //                 method: "POST",
    //                 headers: {
    //                     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhZHJ1IiwiYWdlIjoiMTgiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzE0MjY3MDd9.0g4t7HMzscJhxbom0GbrptlOpfMkTCkT9tvNJ-RZ4fA",
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify({ orgId: "ORG17537870059048" })
    //             });

    //             if (!res.ok) {
    //                 throw new Error(`HTTP error! status: ${res.status}`);
    //             }

    //             const data = await res.json();
    //             console.log('Dashboard data:', data);
    //             setDashboardData(data);
    //         } catch (err) {
    //             console.error('Error fetching dashboard data:', err);
    //             setError(err.message);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // Handle license click to navigate to usage page
    const handleLicenseClick = (licenseId) => {
        router.push(`/connections/licenseUsage?licenseId=${licenseId}`);
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading dashboard data...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle className="text-red-600">Error Loading Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // No data state
    if (!dashboardData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-600">No Data Available</h2>
                    <p className="text-gray-500 mt-2">Unable to load dashboard information</p>
                </div>
            </div>
        );
    }

    const { stats, licenses } = dashboardData;

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
                  <Link href="/connections/licenseOverview" className="block focus:outline-none focus:ring-2 focus:ring-blue-100 rounded-md">
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
                            <div className="text-2xl font-bold text-gray-900">
                                {stats?.totalLicenses || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                All registered licenses
                            </p>
                        </CardContent>
                    </Card>
                    </Link>

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
                            <div className="text-2xl font-bold text-green-600">
                                {stats?.activeLicenses || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Currently active licenses
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-200">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium text-gray-600">
                                    Inactive Licenses
                                </CardTitle>
                                <Wifi className="h-4 w-4 text-gray-400" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">
                                {stats?.inactiveLicenses || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Currently inactive
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
                            <div className="text-2xl font-bold text-orange-600">
                                {stats?.expiringSoonLicenses || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Within 30 days
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* License Analytics Section */}
                <LicenseUsageAnalytics
                    licenses={licenses}
                    onLicenseClick={handleLicenseClick}
                />
            </div>
        </div>
    );
};

export default ConnectionsDashboard;