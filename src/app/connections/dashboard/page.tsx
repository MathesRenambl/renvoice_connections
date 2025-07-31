"use client";
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Network, Activity, XCircle, Search, FileDown, Eye, Users, Clock, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const connectionHistory = [
  {
    id: 'Client-001',
    // name: 'John Doe',
    status: 'active',
    lastActive: '2024-06-15',
    invoiceFile: 'invoice-CL-001.pdf',
    connectionTime: '2h 34m',
    dataUsage: '1.2 GB'
  },
  {
    id: 'Client-002',
    // name: 'Jane Smith',
    status: 'inactive',
    lastActive: '2024-06-10',
    invoiceFile: 'invoice-CL-002.pdf',
    connectionTime: '45m',
    dataUsage: '340 MB'
  },

  {
    id: 'Client-003',
    // name: 'Michael Johnson',
    status: 'active',
    lastActive: '2024-06-14',
    invoiceFile: 'invoice-CL-003.pdf',
    connectionTime: '3h 12m',
    dataUsage: '2.1 GB'
  },
  {
    id: 'Client-004',
    // name: 'Emily Davis',
    status: 'inactive',
    lastActive: '2024-06-05',
    invoiceFile: 'invoice-CL-004.pdf',
    connectionTime: '1h 23m',
    dataUsage: '890 MB'
  },
  {
    id: 'Client-005',
    // name: 'Chris Lee',
    status: 'active',
    lastActive: '2024-06-13',
    invoiceFile: 'invoice-CL-005.pdf',
    connectionTime: '4h 05m',
    dataUsage: '3.4 GB'
  },
  {
    id: 'Client-006',
    // name: 'Jane Smith',
    status: 'active',
    lastActive: '2024-06-10',
    invoiceFile: 'invoice-CL-002.pdf',
    connectionTime: '45m',
    dataUsage: '340 MB'
  },
  {
    id: 'Client-007',
    // name: 'Jane Smith',
    status: 'inactive',
    lastActive: '2024-06-10',
    invoiceFile: 'invoice-CL-002.pdf',
    connectionTime: '45m',
    dataUsage: '340 MB'
  },
  {
    id: 'Client-008',
    // name: 'Jane Smith',
    status: 'active',
    lastActive: '2024-06-10',
    invoiceFile: 'invoice-CL-002.pdf',
    connectionTime: '45m',
    dataUsage: '340 MB'
  },
  {
    id: 'Client-009',
    // name: 'Jane Smith',
    status: 'active',
    lastActive: '2024-06-10',
    invoiceFile: 'invoice-CL-002.pdf',
    connectionTime: '45m',
    dataUsage: '340 MB'
  },
  {
    id: 'Client-010',
    // name: 'Jane Smith',
    status: 'inactive',
    lastActive: '2024-06-10',
    invoiceFile: 'invoice-CL-002.pdf',
    connectionTime: '45m',
    dataUsage: '340 MB'
  },
];

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const ConnectionsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // You can adjust this number

  const filteredConnections = connectionHistory.filter(connection => {
    const matchesSearch = connection.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || connection.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredConnections.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedConnections = filteredConnections.slice(startIndex, startIndex + recordsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus]);

  const activeConnections = connectionHistory.filter(c => c.status === 'active').length;
  const inactiveConnections = connectionHistory.filter(c => c.status === 'inactive').length;

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of total connections, their active/inactive status, and detailed connection metrics </p>
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
                Currently online
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Inactive Connections
                </CardTitle>
                <XCircle className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{inactiveConnections}</div>
              <p className="text-xs text-gray-500 mt-1">
                Currently offline
              </p>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Average Session
                </CardTitle>
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">2h 23m</div>
              <p className="text-xs text-gray-500 mt-1">
                Per connection
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
                <span className="text-sm text-gray-500">{filteredConnections.length} results</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search ID"
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
                <thead className="bg-gray-50 ">
                  <tr className="border-b border-gray-200 ">
                    <th className="text-center py-3 px-4 font-medium text-gray-900 ">Client ID</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Last Active</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Session Time</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Data Usage</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Invoice </th>
                  </tr>
                </thead>
                <tbody className="bg-white text-center">
                  {paginatedConnections.map((client, index) => (
                    <tr
                      key={client.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                        }`}
                    >
                      <td className="py-3 px-4 text-center">
                        <div className="text-sm text-black">{client.id}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant="outline"
                          className={`${client.status === 'active'
                            ? ' border-green-300 text-gray-700 bg-green-200'
                            : 'border-red-300 text-red-500 bg-red-200'
                            }`}
                        >

                          {client.status === 'active' ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-black">
                        <div className="text-sm">
                          {formatDate(client.lastActive)}
                          
                        </div>
                        {/* <div className="text-xs text-gray-400">
                          {new Date(client.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div> */}
                      </td>
                      <td className="py-3 px-4 text-black text-sm">
                        {client.connectionTime}
                      </td>
                      <td className="py-3 px-4 text-black text-sm">
                        {client.dataUsage}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1">
                          {client.invoiceFile && (
                            <Button

                            >
                              <a
                                href={`/invoices/${client.invoiceFile}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                <FileDown className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
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