"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Network, Calendar, Wifi, CheckCircle, Loader2 } from "lucide-react";

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
    // Process data to extract usage information
    const processUsageData = () => {
        if (!licenses || !Array.isArray(licenses)) return [];
        
        return licenses.map(license => ({
            licenseId: license.licenseId,
            usage: license.usedCredits || 0,
            maxCredits: license.maxCredits || 0,
            usagePercentage: license.maxCredits ? (license.usedCredits / license.maxCredits * 100) : 0
        })).sort((a, b) => b.usage - a.usage);
    };

    const chartData = processUsageData();

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="bg-white p-4 border border-gray-200 rounded-xl shadow-lg backdrop-blur-sm bg-white/95 max-w-sm w-56">
                    <div className="border-b border-gray-100 pb-3 mb-3">
                        <p className="font-bold text-gray-900 text-lg">{label}</p>
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

                        {/* <div className="flex items-center justify-between">
                            <span className="text-gray-600 text-sm">Usage:</span>
                            <span className="font-semibold text-orange-600">
                                {data.usagePercentage.toFixed(1)}%
                            </span>
                        </div> */}
                    </div>
                </div>
            );
        }
        return null;
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
            {/* Enhanced Bar Chart */}
            <Card className="border-gray-200 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="bg-gradient-to-r from-white to-white rounded-t-lg">
                    <CardTitle className="text-3xl font-bold text-black">
                        License Usage Analytics
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-lg">
                        Credit usage breakdown by license ID
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
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.8} />
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
                                        value: 'Used Credits',
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
                                    name="Used Credits"
                                    radius={[6, 6, 0, 0]}
                                    fill="url(#usageGradient)"
                                    stroke="#1d4ed8"
                                    strokeWidth={0.5}
                                    onClick={(data) => onLicenseClick && onLicenseClick(data.licenseId)}
                                    style={{ cursor: 'pointer' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                        {/* Enhanced Legend */}
                        <div className="flex items-center justify-center -mt-24 space-x-8 p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
                                <span className="text-sm font-medium text-gray-700">Used Credits</span>
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
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const res = await fetch("http://127.0.0.1:8000/license/getOrgDashboard", {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhZHJ1IiwiYWdlIjoiMTgiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzE0MjY3MDd9.0g4t7HMzscJhxbom0GbrptlOpfMkTCkT9tvNJ-RZ4fA",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ orgId: "ORG12350" })
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log('Dashboard data:', data);
                setDashboardData(data);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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