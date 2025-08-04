"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Network,
  Activity,
  XCircle,
  Search,
  FileDown,
  Users,
  Clock,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CreditCard,
  Wifi,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  BarChart3,
  CheckCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const licenseData = [
  {
    org_id: "ORG12345",
    paymentId: "PAY123456",
    clientId: "CLIENT56789",
    licenseId: "LIC12345",
    licenseName: "Premium Enterprise License",
    licenseStatus: "ACTIVE",
    startDate: "2024-01-15T00:00:00.000Z",
    endDate: "2024-01-15T00:00:00.000Z",
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
    licenseStatus: "IN_ACTIVE",
    startDate: "2024-03-01T00:00:00.000Z",
    endDate: "2025-03-01T00:00:00.000Z",
    usage: [],
    connections: [
      {
        connectionId: "CONN98769",
        clientId: "CLIENT56793",
        connectionStatus: "IN_ACTIVE",
        usage: [
          { start: "2024-08-01T10:00:00.000Z", end: "2024-08-01T12:30:00.000Z", sessionId: "SESSION005" }
        ]
      },
      {
        connectionId: "CONN98770",
        clientId: "CLIENT56794",
        connectionStatus: "IN_ACTIVE",
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
    endDate: "2025-10-15T00:00:00.000Z",
    usage: [],
    connections: [
      {
        connectionId: "CONN98774",
        clientId: "CLIENT56798",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T09:00:00.000Z", end: "2024-08-01T10:30:00.000Z", sessionId: "SESSION007" }
        ]
      },
      {
        connectionId: "CONN98775",
        clientId: "CLIENT56799",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T11:00:00.000Z", end: "2024-08-01T12:30:00.000Z", sessionId: "SESSION008" }
        ]
      },
      {
        connectionId: "CONN98776",
        clientId: "CLIENT56800",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T13:00:00.000Z", end: "2024-08-01T14:30:00.000Z", sessionId: "SESSION009" }
        ]
      },
      {
        connectionId: "CONN98777",
        clientId: "CLIENT56801",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T15:00:00.000Z", end: "2024-08-01T16:30:00.000Z", sessionId: "SESSION010" }
        ]
      },
      {
        connectionId: "CONN98778",
        clientId: "CLIENT56802",
        connectionStatus: "ACTIVE",
        usage: [
          { start: "2024-08-01T17:00:00.000Z", end: "2024-08-01T18:30:00.000Z", sessionId: "SESSION011" }
        ]
      },
      {
        connectionId: "CONN98779",
        clientId: "CLIENT56803",
        connectionStatus: "IN_ACTIVE",
        usage: []
      },
      {
        connectionId: "CONN98780",
        clientId: "CLIENT56804",
        connectionStatus: "IN_ACTIVE",
        usage: []
      },
      {
        connectionId: "CONN98781",
        clientId: "CLIENT56805",
        connectionStatus: "IN_ACTIVE",
        usage: []
      }
    ],
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
        connectionId: "CONN98782",
        clientId: "CLIENT56806",
        connectionStatus: "IN_ACTIVE",
        usage: []
      },
      {
        connectionId: "CONN98783",
        clientId: "CLIENT56807",
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
  if (!endDate) return 0;

  const end = new Date(endDate);
  const now = new Date();

  // Set end date to end of day for accurate calculation
  end.setHours(23, 59, 59, 999);

  if (isNaN(end.getTime())) {
    return 0;
  }

  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

const isLicenseActive = (license) => {
  return license.licenseStatus === 'ACTIVE';
};

// License Usage Analytics Component
const LicenseUsageAnalytics = ({ onLicenseClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLicense, setSearchLicense] = useState("");
  const [selectedUsageRange, setSelectedUsageRange] = useState("all");
  const [selectedExpiryRange, setSelectedExpiryRange] = useState("all");

  // Handle search button click
  const handleSearch = () => {
    setSearchLicense(searchTerm);
  };

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Process and filter data
  const filteredData = useMemo(() => {
    let filtered = licenseData
      .map(license => {
        const usageMinutes = parseInt(license.overallUsage) || 0;
        const totalConnections = license.connections.length;
        const activeConnections = license.connections.filter(conn => conn.connectionStatus === 'ACTIVE').length;
        const inactiveConnections = license.connections.filter(conn => conn.connectionStatus === 'IN_ACTIVE').length;
        const licenseIsActive = isLicenseActive(license);
        const daysUntilExpiry = getDaysUntilExpiry(license.endDate);

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
          licenseStatus: license.licenseStatus,
          daysUntilExpiry,
          overallUsage: usageMinutes
        };
      });

    // Filter by usage range
    if (selectedUsageRange !== "all") {
      const usageThreshold = parseInt(selectedUsageRange);
      if (selectedUsageRange === "10000+") {
        filtered = filtered.filter(license => license.overallUsage >= 10000);
      } else {
        const nextThreshold = usageThreshold + 1000;
        filtered = filtered.filter(license => 
          license.overallUsage >= usageThreshold && license.overallUsage < nextThreshold
        );
      }
    }

    // Filter by expiry range
    if (selectedExpiryRange !== "all") {
      const daysThreshold = parseInt(selectedExpiryRange);
      filtered = filtered.filter(license => 
        license.daysUntilExpiry <= daysThreshold && license.daysUntilExpiry > 0
      );
    }

    // Filter by search term (only when search button is clicked)
    if (searchLicense) {
      filtered = filtered.filter(license =>
        license.licenseId.toLowerCase().includes(searchLicense.toLowerCase()) ||
        license.licenseName.toLowerCase().includes(searchLicense.toLowerCase()) ||
        license.clientId.toLowerCase().includes(searchLicense.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.usage - a.usage);
  }, [selectedUsageRange, selectedExpiryRange, searchLicense]);

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

      {/* Search and Filters Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Search and Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Licenses
              </label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Search by License ID, Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Usage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Overall Usage
              </label>
              <Select value={selectedUsageRange} onValueChange={setSelectedUsageRange}>
                <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                  <SelectValue placeholder="Select usage range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Usage</SelectItem>
                  <SelectItem value="0">0 - 999 Credits</SelectItem>
                  <SelectItem value="1000">1000 - 1999 Credits</SelectItem>
                  <SelectItem value="2000">2000 - 2999 Credits</SelectItem>
                  <SelectItem value="3000">3000 - 3999 Credits</SelectItem>
                  <SelectItem value="4000">4000 - 4999 Credits</SelectItem>
                  <SelectItem value="5000">5000 - 5999 Credits</SelectItem>
                  <SelectItem value="6000">6000 - 6999 Credits</SelectItem>
                  <SelectItem value="7000">7000 - 7999 Credits</SelectItem>
                  <SelectItem value="8000">8000 - 8999 Credits</SelectItem>
                  <SelectItem value="9000">9000 - 9999 Credits</SelectItem>
                  <SelectItem value="10000+">10000+ Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Expiry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by License End Date
              </label>
              <Select value={selectedExpiryRange} onValueChange={setSelectedExpiryRange}>
                <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                  <SelectValue placeholder="Select expiry range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Dates</SelectItem>
                  <SelectItem value="7">Within 7 days</SelectItem>
                  <SelectItem value="14">Within 14 days</SelectItem>
                  <SelectItem value="21">Within 21 days</SelectItem>
                  <SelectItem value="28">Within 28 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setSearchLicense("");
                  setSelectedUsageRange("all");
                  setSelectedExpiryRange("all");
                }}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchLicense || selectedUsageRange !== "all" || selectedExpiryRange !== "all") && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                {searchLicense && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Search: "{searchLicense}"
                  </Badge>
                )}
                {selectedUsageRange !== "all" && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Usage: {selectedUsageRange === "10000+" ? "10000+ Credits" : `${selectedUsageRange} - ${parseInt(selectedUsageRange) + 999} Credits`}
                  </Badge>
                )}
                {selectedExpiryRange !== "all" && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Expiry: Within {selectedExpiryRange} days
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredData.length} of {licenseData.length} licenses
        </p>
      </div>

      <CardContent className="px-0">
        <div className="space-y-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No licenses found matching your search and filter criteria.</p>
            </div>
          ) : (
            filteredData.map((item, index) => {
              const daysUntilExpiry = item.daysUntilExpiry;
              const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
              const isExpired = daysUntilExpiry <= 0;

              return (
                <div key={item.licenseId} className="border border-gray-200 rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors duration-200">
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
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${item.licenseStatus === 'ACTIVE'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                            <div className={`w-2 h-2 rounded-full mr-1 ${item.licenseStatus === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                            {item.licenseStatus}
                          </span>
                          {isExpiringSoon && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
                              <Clock className="w-3 h-3 mr-1" />
                              Expiring Soon
                            </span>
                          )}
                          {isExpired && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                              <XCircle className="w-3 h-3 mr-1" />
                              Expired
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{item.licenseName}</p>
                        <p className="text-xs text-gray-500">Client: <span className="font-medium">{item.clientId}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-indigo-600">{item.usage} <span className="text-xl text-indigo-600 font-normal">credits</span></p>
                      <p className="text-sm text-gray-900">Total Usage</p>
                    </div>
                  </div>

                  {/* Connection Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white rounded-lg p-3 border shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Network className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600 font-medium">Total Connections</span>
                        </div>
                        <span className="font-bold text-gray-900 text-lg">{item.totalConnections}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600 font-medium">Active</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-bold bg-green-100 text-green-700">
                          <div className="w-2 h-2 rounded-full mr-1 bg-green-500"></div>
                          {item.activeConnections}
                        </span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 border shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-600 font-medium">Inactive</span>
                        </div>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-sm font-bold bg-red-100 text-red-700">
                          <div className="w-2 h-2 rounded-full mr-1 bg-red-500"></div>
                          {item.inactiveConnections}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Additional Info */}
                  <div className="bg-white rounded-lg p-3 border shadow-sm">

                    <div className="flex justify-between gap-4">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-gray-600">Last Activity:</span>
                        <span className="text-sm font-bold text-gray-900">{formatDateTime(item.lastUsage)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-600">Expires:</span>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-bold text-gray-900">{formatDate(item.endDate)}</span>
                          <span className={`text-sm font-bold px-2 py-1 rounded-full ${isExpired
                              ? 'bg-red-100 text-red-700'
                              : isExpiringSoon
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                            {isExpired
                              ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                              : `${daysUntilExpiry} days`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
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