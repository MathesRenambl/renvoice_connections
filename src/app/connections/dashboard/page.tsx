"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Activity, XCircle, Search, FileDown, Users, Clock, Filter, ChevronLeft, ChevronRight, Calendar, CreditCard, Wifi } from "lucide-react";


const connectionHistory = [
  {
    _id: "688866d1480f165d9825f849",
    org_id: "ORG12346",
    connection_id: "CONN131102",
    client_id: "CLIENT13221",
    license_id: "LIC12346",
    status: "active",
    paymentID: "PAY123456",
    createdDate: "2024-08-01T10:00:00",
    liscenceStart: "2024-08-10T00:00:00",
    liscenceEnd: "2025-09-10T00:00:00",
    usage: [],
    phoneNumber: "9943310704",
    connectionStatus: "connected",
    overallUsage: "0 minutes",
    lastDate: "2024-09-20T11:15:00"
  },
  {
    _id: "688866d1480f165d9825f850",
    org_id: "ORG12346", 
    connection_id: "CONN131103",
    client_id: "CLIENT13222",
    license_id: "LIC12347",
    status: "active",
    paymentID: "PAY123457",
    createdDate: "2024-07-15T09:30:00",
    liscenceStart: "2024-07-20T00:00:00",
    liscenceEnd: "2025-07-20T00:00:00",
    usage: [],
    phoneNumber: "9943310705",
    connectionStatus: "connected",
    overallUsage: "45 minutes",
    lastDate: "2024-09-21T14:30:00"
  },
  {
    _id: "688866d1480f165d9825f851",
    org_id: "ORG12346",
    connection_id: "CONN131104",
    client_id: "CLIENT13223",
    license_id: "LIC12348",
    status: "inactive",
    paymentID: "PAY123458",
    createdDate: "2024-06-01T08:00:00",
    liscenceStart: "2024-06-05T00:00:00",
    liscenceEnd: "2024-12-05T00:00:00",
    usage: [],
    phoneNumber: "9943310706",
    connectionStatus: "disconnected",
    overallUsage: "120 minutes",
    lastDate: "2024-09-19T16:45:00"
  },
  {
    _id: "688866d1480f165d9825f852",
    org_id: "ORG12347",
    connection_id: "CONN131105",
    client_id: "CLIENT13224",
    license_id: "LIC12349",
    status: "active",
    paymentID: "PAY123459",
    createdDate: "2024-09-01T12:00:00",
    liscenceStart: "2024-09-05T00:00:00",
    liscenceEnd: "2025-09-05T00:00:00",
    usage: [],
    phoneNumber: "9943310707",
    connectionStatus: "connected",
    overallUsage: "30 minutes",
    lastDate: "2024-09-22T09:30:00"
  },
  {
    _id: "688866d1480f165d9825f853",
    org_id: "ORG12347",
    connection_id: "CONN131106",
    client_id: "CLIENT13225",
    license_id: "LIC12350",
    status: "inactive",
    paymentID: "PAY123460",
    createdDate: "2024-05-15T14:20:00",
    liscenceStart: "2024-05-20T00:00:00",
    liscenceEnd: "2024-11-20T00:00:00",
    usage: [],
    phoneNumber: "9943310708",
    connectionStatus: "disconnected",
    overallUsage: "200 minutes",
    lastDate: "2024-09-18T18:45:00"
  },
  {
    _id: "688866d1480f165d9825f854",
    org_id: "ORG12348",
    connection_id: "CONN131107",
    client_id: "CLIENT13226",
    license_id: "LIC12351",
    status: "active",
    paymentID: "PAY123461",
    createdDate: "2024-09-10T15:30:00",
    liscenceStart: "2024-09-15T00:00:00",
    liscenceEnd: "2025-09-15T00:00:00",
    usage: [],
    phoneNumber: "9943310709",
    connectionStatus: "connected",
    overallUsage: "75 minutes",
    lastDate: "2024-09-23T10:20:00"
  },
  {
    _id: "688866d1480f165d9825f855",
    org_id: "ORG12348",
    connection_id: "CONN131108",
    client_id: "CLIENT13227",
    license_id: "LIC12352",
    status: "inactive",
    paymentID: "PAY123462",
    createdDate: "2024-04-20T11:45:00",
    liscenceStart: "2024-04-25T00:00:00",
    liscenceEnd: "2024-10-25T00:00:00",
    usage: [],
    phoneNumber: "9943310710",
    connectionStatus: "disconnected",
    overallUsage: "300 minutes",
    lastDate: "2024-09-15T13:30:00"
  },
  {
    _id: "688866d1480f165d9825f856",
    org_id: "ORG12349",
    connection_id: "CONN131109",
    client_id: "CLIENT13228",
    license_id: "LIC12353",
    status: "active",
    paymentID: "PAY123463",
    createdDate: "2024-08-15T09:00:00",
    liscenceStart: "2024-08-20T00:00:00",
    liscenceEnd: "2025-08-20T00:00:00",
    usage: [],
    phoneNumber: "9943310711",
    connectionStatus: "connected",
    overallUsage: "150 minutes",
    lastDate: "2024-09-24T16:45:00"
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

const ConnectionsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const filteredConnections = connectionHistory.filter(connection => {
    const matchesSearch = 
      connection.client_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.connection_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.license_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.phoneNumber.includes(searchTerm);
    const matchesFilter = filterStatus === "all" || connection.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredConnections.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedConnections = filteredConnections.slice(startIndex, startIndex + recordsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const activeConnections = connectionHistory.filter(c => c.status === 'active').length;
  const inactiveConnections = connectionHistory.filter(c => c.status === 'inactive').length;
  const connectedDevices = connectionHistory.filter(c => c.connectionStatus === 'connected').length;
  const expiringInNext30Days = connectionHistory.filter(c => {
    const daysToExpiry = getDaysUntilExpiry(c.liscenceEnd);
    return daysToExpiry <= 30 && daysToExpiry > 0;
  }).length;

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Overview of total connections, their active/inactive status, and detailed connection metrics
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
                  Total Connections
                </CardTitle>
                <Network className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{connectionHistory.length}</div>
              <p className="text-xs text-gray-500 mt-1">
                All registered clients
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Connections
                </CardTitle>
                <Activity className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeConnections}</div>
              <p className="text-xs text-gray-500 mt-1">
                Currently active
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

        {/* Main Table Card */}
        <Card className="border-gray-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-gray-900">Connection Management</CardTitle>
                <CardDescription className="text-gray-500">
                  Manage all active and inactive connections
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {filteredConnections.length} results
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search Client ID, Connection ID, License ID, or Phone Number"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                  className={filterStatus === "all" ? "bg-gray-900 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "active" ? "default" : "outline"}
                  onClick={() => setFilterStatus("active")}
                  size="sm"
                  className={filterStatus === "active" ? "bg-gray-900 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === "inactive" ? "default" : "outline"}
                  onClick={() => setFilterStatus("inactive")}
                  size="sm"
                  className={filterStatus === "inactive" ? "bg-gray-900 hover:bg-gray-800" : "border-gray-300 text-gray-700 hover:bg-gray-50"}
                >
                  Inactive
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Client ID</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Connection ID</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">License ID</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Phone Number</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Connection Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Overall Usage</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Last Active</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Days to Expiry</th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center">
                  {paginatedConnections.map((connection, index) => {
                    const daysToExpiry = getDaysUntilExpiry(connection.liscenceEnd);
                    return (
                      <tr
                        key={connection._id}
                        className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                      >
                        <td className="py-3 px-4 text-center">
                          <div className="text-sm text-black">{connection.client_id}</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="text-sm text-black">{connection.connection_id}</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="text-sm text-black">{connection.license_id}</div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <div className="text-sm text-black">{connection.phoneNumber}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`${connection.status === 'active'
                              ? 'border-green-300 text-gray-700 bg-green-200'
                              : 'border-red-300 text-red-500 bg-red-200'
                            }`}
                          >
                            {connection.status === 'active' ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`${connection.connectionStatus === 'connected'
                              ? 'border-green-300 text-gray-700 bg-green-200'
                              : 'border-red-300 text-red-500 bg-red-200'
                            }`}
                          >
                            <Wifi className="w-3 h-3 mr-1" />
                            {connection.connectionStatus}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-black text-sm">
                          {connection.overallUsage}
                        </td>
                        <td className="py-3 px-4 text-black text-sm">
                          {formatDateTime(connection.lastDate)}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant="outline"
                            className={`${daysToExpiry <= 7 
                              ? 'border-red-300 text-red-700 bg-red-100'
                              : daysToExpiry <= 30 
                                ? 'border-yellow-300 text-yellow-700 bg-yellow-100'
                                : 'border-green-300 text-green-700 bg-green-100'
                            }`}
                          >
                            {daysToExpiry > 0 ? `${daysToExpiry} days` : 'Expired'}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredConnections.length > 0 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredConnections.length)} of {filteredConnections.length} connections
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Empty State */}
            {filteredConnections.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Network className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2 text-gray-600">No connections found</p>
                <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConnectionsDashboard;