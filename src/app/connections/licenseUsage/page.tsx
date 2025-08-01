// "use client";
// import React, { useState, useMemo } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Network, Search, Filter, ChevronLeft, ChevronRight, Calendar, Wifi } from "lucide-react";

// // Sample license data with connections
// const licensesData = [
//     {
//         org_id: "ORG12345",
//         paymentId: "PAY123456",
//         clientId: "CLIENT56789",
//         licenseId: "LIC12345",
//         licenseName: "Premium Enterprise License",
//         startDate: "2024-01-15T00:00:00.000Z",
//         endDate: "2025-01-15T00:00:00.000Z",
//         usage: [],
//         connections: [
//             {
//                 connectionId: "CONN98765",
//                 clientId: "CLIENT56789",
//                 status: "ACTIVE",
//                 connectionStatus: "ACTIVE",
//                 usage: [
//                     { start: "2024-08-01T09:00:00.000Z", end: "2024-08-01T10:30:00.000Z", sessionId: "SESSION001" },
//                     { start: "2024-08-01T14:00:00.000Z", end: "2024-08-01T15:45:00.000Z", sessionId: "SESSION002" }
//                 ]
//             },
//             {
//                 connectionId: "CONN98766",
//                 clientId: "CLIENT56790",
//                 status: "ACTIVE",
//                 connectionStatus: "INACTIVE",
//                 usage: [
//                     { start: "2024-08-01T11:00:00.000Z", end: "2024-08-01T12:15:00.000Z", sessionId: "SESSION003" }
//                 ]
//             }
//         ],
//         overallUsage: "195",
//         lastUsage: "2024-07-20T11:15:00.000Z"
//     },
//     {
//         org_id: "ORG12346",
//         paymentId: "PAY123457",
//         clientId: "CLIENT56791",
//         licenseId: "LIC12346",
//         licenseName: "Standard Business License",
//         startDate: "2024-02-01T00:00:00.000Z",
//         endDate: "2025-02-01T00:00:00.000Z",
//         usage: [],
//         connections: [
//             {
//                 connectionId: "CONN98767",
//                 clientId: "CLIENT56791",
//                 status: "ACTIVE",
//                 connectionStatus: "ACTIVE",
//                 usage: [
//                     { start: "2024-08-01T08:00:00.000Z", end: "2024-08-01T09:30:00.000Z", sessionId: "SESSION004" }
//                 ]
//             },
//             {
//                 connectionId: "CONN98768",
//                 clientId: "CLIENT56792",
//                 status: "INACTIVE",
//                 connectionStatus: "INACTIVE",
//                 usage: []
//             },
//             {
//                 connectionId: "CONN98769",
//                 clientId: "CLIENT56793",
//                 status: "ACTIVE",
//                 connectionStatus: "ACTIVE",
//                 usage: [
//                     { start: "2024-08-01T10:00:00.000Z", end: "2024-08-01T11:45:00.000Z", sessionId: "SESSION005" },
//                     { start: "2024-08-01T16:00:00.000Z", end: "2024-08-01T17:30:00.000Z", sessionId: "SESSION006" }
//                 ]
//             }
//         ],
//         overallUsage: "280",
//         lastUsage: "2024-07-21T14:30:00.000Z"
//     },
//     {
//         org_id: "ORG12347",
//         paymentId: "PAY123458",
//         clientId: "CLIENT56794",
//         licenseId: "LIC12347",
//         licenseName: "Basic Starter License",
//         startDate: "2024-03-10T00:00:00.000Z",
//         endDate: "2024-12-10T00:00:00.000Z",
//         usage: [],
//         connections: [
//             {
//                 connectionId: "CONN98770",
//                 clientId: "CLIENT56794",
//                 status: "ACTIVE",
//                 connectionStatus: "ACTIVE",
//                 usage: [
//                     { start: "2024-08-01T13:00:00.000Z", end: "2024-08-01T14:00:00.000Z", sessionId: "SESSION007" }
//                 ]
//             }
//         ],
//         overallUsage: "120",
//         lastUsage: "2024-07-19T16:45:00.000Z"
//     },
//     {
//         org_id: "ORG12348",
//         paymentId: "PAY123459",
//         clientId: "CLIENT56795",
//         licenseId: "LIC12348",
//         licenseName: "Professional License",
//         startDate: "2024-04-05T00:00:00.000Z",
//         endDate: "2025-04-05T00:00:00.000Z",
//         usage: [],
//         connections: [
//             {
//                 connectionId: "CONN98771",
//                 clientId: "CLIENT56795",
//                 status: "ACTIVE",
//                 connectionStatus: "ACTIVE",
//                 usage: [
//                     { start: "2024-08-01T07:30:00.000Z", end: "2024-08-01T09:00:00.000Z", sessionId: "SESSION008" }
//                 ]
//             },
//             {
//                 connectionId: "CONN98772",
//                 clientId: "CLIENT56796",
//                 status: "ACTIVE",
//                 connectionStatus: "INACTIVE",
//                 usage: [
//                     { start: "2024-08-01T12:00:00.000Z", end: "2024-08-01T13:30:00.000Z", sessionId: "SESSION009" }
//                 ]
//             },
//             {
//                 connectionId: "CONN98773",
//                 clientId: "CLIENT56797",
//                 status: "INACTIVE",
//                 connectionStatus: "INACTIVE",
//                 usage: []
//             }
//         ],
//         overallUsage: "240",
//         lastUsage: "2024-07-22T10:20:00.000Z"
//     },
//     {
//         org_id: "ORG12349",
//         paymentId: "PAY123460",
//         clientId: "CLIENT56798",
//         licenseId: "LIC12349",
//         licenseName: "Enterprise Plus License",
//         startDate: "2024-05-20T00:00:00.000Z",
//         endDate: "2025-05-20T00:00:00.000Z",
//         usage: [],
//         connections: [
//             {
//                 connectionId: "CONN98774",
//                 clientId: "CLIENT56798",
//                 status: "ACTIVE",
//                 connectionStatus: "ACTIVE",
//                 usage: [
//                     { start: "2024-08-01T06:00:00.000Z", end: "2024-08-01T08:00:00.000Z", sessionId: "SESSION010" },
//                     { start: "2024-08-01T15:00:00.000Z", end: "2024-08-01T17:00:00.000Z", sessionId: "SESSION011" }
//                 ]
//             },
//             {
//                 connectionId: "CONN98775",
//                 clientId: "CLIENT56799",
//                 status: "ACTIVE",
//                 connectionStatus: "ACTIVE",
//                 usage: [
//                     { start: "2024-08-01T09:30:00.000Z", end: "2024-08-01T11:00:00.000Z", sessionId: "SESSION012" }
//                 ]
//             }
//         ],
//         overallUsage: "350",
//         lastUsage: "2024-07-23T18:15:00.000Z"
//     }
// ];

// const formatDateTime = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//     });
// };

// const formatDate = (date) => {
//     return new Date(date).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//     });
// };

// const calculateUsageMinutes = (usage) => {
//     if (!usage || usage.length === 0) return 0;

//     return usage.reduce((total, session) => {
//         const start = new Date(session.start);
//         const end = new Date(session.end);
//         const diffMinutes = Math.round((end - start) / (1000 * 60));
//         return total + diffMinutes;
//     }, 0);
// };

// const LicenseUsagePage = () => {
//     const [selectedLicense, setSelectedLicense] = useState("all");
//     const [selectedConnectionStatus, setSelectedConnectionStatus] = useState("all");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [editingLicense, setEditingLicense] = useState(null);
//     const [licensesState, setLicensesState] = useState([]);
//     const recordsPerPage = 10;

//     // Flatten all connections from all licenses for the table
//     const allConnections = useMemo(() => {
//         const connections = [];
//         licensesData.forEach(license => {
//             license.connections.forEach(connection => {
//                 connections.push({
//                     ...connection,
//                     licenseId: license.licenseId,
//                     licenseName: license.licenseName,
//                     licenseEndDate: license.endDate,
//                     overallUsage: calculateUsageMinutes(connection.usage)
//                 });
//             });
//         });
//         return connections;
//     }, [licensesState]);

//     // Filter connections based on selected license and search term
//     const filteredConnections = useMemo(() => {
//         let filtered = allConnections;

//         // Filter by selected license
//         if (selectedLicense !== "all") {
//             filtered = filtered.filter(connection => connection.licenseId === selectedLicense);
//         }

//         // Filter by connection status
//         if (selectedConnectionStatus !== "all") {
//             filtered = filtered.filter(connection => connection.connectionStatus === selectedConnectionStatus);
//         }

//         // Filter by search term
//         if (searchTerm) {
//             filtered = filtered.filter(connection =>
//                 connection.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 connection.connectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 connection.licenseId.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         return filtered;
//     }, [allConnections, selectedLicense, selectedConnectionStatus, searchTerm]);

//     // Pagination
//     const totalPages = Math.ceil(filteredConnections.length / recordsPerPage);
//     const startIndex = (currentPage - 1) * recordsPerPage;
//     const paginatedConnections = filteredConnections.slice(startIndex, startIndex + recordsPerPage);

//     // Reset to page 1 when filters change
//     React.useEffect(() => {
//         setCurrentPage(1);
//     }, [selectedLicense, selectedConnectionStatus, searchTerm]);

//     // Handle license name edit
//     const handleLicenseNameEdit = (licenseId, newName) => {
//         setLicensesState(prev =>
//             prev.map(license =>
//                 license.licenseId === licenseId
//                     ? { ...license, licenseName: newName }
//                     : license
//             )
//         );
//         setEditingLicense(null);
//     };

//     // Handle license name click
//     const handleLicenseNameClick = (licenseId) => {
//         setEditingLicense(licenseId);
//     };

//     // Handle license name key press
//     const handleLicenseNameKeyPress = (e, licenseId, currentName) => {
//         if (e.key === 'Enter') {
//             handleLicenseNameEdit(licenseId, e.target.value);
//         } else if (e.key === 'Escape') {
//             setEditingLicense(null);
//         }
//     };
//     console.log(selectedLicense)

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="border-b border-gray-200 pb-4">
//                 <div className="flex items-center justify-between">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-900">License Usage Management</h1>
//                         <p className="text-gray-600 mt-1">
//                             Monitor and manage license usage across all connections
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             {/* Filters */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Filter by License
//                     </label>
//                     <Select value={selectedLicense} onValueChange={setSelectedLicense}>
//                         <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
//                             <SelectValue placeholder="Select a license" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Licenses</SelectItem>
//                             {licensesState.map(license => (
//                                 <SelectItem key={license.licenseId} value={license.licenseId}>
//                                     {license.licenseId}
//                                 </SelectItem>
//                             ))}
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Filter by Connection Status
//                     </label>
//                     <Select value={selectedConnectionStatus} onValueChange={setSelectedConnectionStatus}>
//                         <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
//                             <SelectValue placeholder="Select connection status" />
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectItem value="all">All Statuses</SelectItem>
//                             <SelectItem value="ACTIVE">Active</SelectItem>
//                             <SelectItem value="INACTIVE">Inactive</SelectItem>
//                         </SelectContent>
//                     </Select>
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Search
//                     </label>
//                     <div className="relative">
//                         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                         <Input
//                             placeholder="Search Client ID, Connection ID, or License ID"
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Results Summary */}
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//                 <div className="flex gap-2 items-center">
//                     <Filter className="h-4 w-4 text-gray-400" />
//                     <span>
//                         Showing {filteredConnections.length} connection{filteredConnections.length !== 1 ? 's' : ''}
//                         {selectedLicense !== "all" && (
//                             <span className="ml-1">
//                                 for {selectedLicense}
//                             </span>
//                         )}
//                         {selectedConnectionStatus !== "all" && (
//                             <span className="ml-1">
//                                 with {selectedConnectionStatus.toLowerCase()} status
//                             </span>
//                         )}
//                     </span>
//                 </div>
                
//                 {/* Add the License End Date if there filter by License */}
//             </div>

//             {/* Table */}
//             <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
//                 <table className="w-full">
//                     <thead className="bg-gray-50">
//                         <tr className="border-b border-gray-200">
//                             <th className="text-center py-3 px-4 font-medium text-gray-900">Client ID</th>
//                             <th className="text-center py-3 px-4 font-medium text-gray-900">Connection ID</th>
//                             <th className="text-center py-3 px-4 font-medium text-gray-900">Connection Status</th>
//                             <th className="text-center py-3 px-4 font-medium text-gray-900">Overall Usage</th>
//                             {/* <th className="text-center py-3 px-4 font-medium text-gray-900">Last Active</th> */}
//                             <th className="text-center py-3 px-4 font-medium text-gray-900">License End Date</th>
//                             <th className="text-center py-3 px-4 font-medium text-gray-900">License</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white text-center">
//                         {paginatedConnections.map((connection, index) => (
//                             <tr
//                                 key={`${connection.licenseId}-${connection.connectionId}`}
//                                 className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
//                             >
//                                 <td className="py-3 px-4 text-center">
//                                     <div className="text-sm text-black">{connection.clientId}</div>
//                                 </td>
//                                 <td className="py-3 px-4 text-center">
//                                     <div className="text-sm text-black">{connection.connectionId}</div>
//                                 </td>
//                                 <td className="py-3 px-4">
//                                     <Badge
//                                         variant="outline"
//                                         className={`${connection.connectionStatus === 'ACTIVE'
//                                             ? 'border-green-300 text-gray-700 bg-green-200'
//                                             : 'border-red-300 text-red-500 bg-red-200'
//                                             }`}
//                                     >
//                                         <Wifi className="w-3 h-3 mr-1" />
//                                         {connection.connectionStatus}
//                                     </Badge>
//                                 </td>
//                                 <td className="py-3 px-4 text-black text-sm">
//                                     {connection.overallUsage} minutes
//                                 </td>
//                                 <td className="py-3 px-4 text-black text-sm">
//                                     {formatDate(connection.licenseEndDate)}
//                                 </td>
//                                 <td className="py-3 px-4 text-black text-sm">
//                                     <div className="text-xs text-gray-500">{connection.licenseId}</div>
//                                     <div className="text-sm font-medium">
//                                         {editingLicense === connection.licenseId ? (
//                                             <Input
//                                                 defaultValue={connection.licenseName}
//                                                 autoFocus
//                                                 onBlur={(e) => handleLicenseNameEdit(connection.licenseId, e.target.value)}
//                                                 onKeyDown={(e) => handleLicenseNameKeyPress(e, connection.licenseId, connection.licenseName)}
//                                                 className="h-6 text-sm py-0 px-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                                             />
//                                         ) : (
//                                             <span
//                                                 onClick={() => handleLicenseNameClick(connection.licenseId)}
//                                                 className="cursor-pointer hover:text-blue-600 hover:underline"
//                                                 title="Click to edit license name"
//                                             >
//                                                 {connection.licenseName}
//                                             </span>
//                                         )}
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Pagination */}
//             {filteredConnections.length > 0 && (
//                 <div className="flex items-center justify-between mt-6 pt-4 border-t">
//                     <div className="text-sm text-gray-600">
//                         Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredConnections.length)} of {filteredConnections.length} connections
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//                             disabled={currentPage === 1}
//                             className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                         >
//                             <ChevronLeft className="w-4 h-4" />
//                             Previous
//                         </Button>
//                         <span className="text-sm text-gray-600">
//                             Page {currentPage} of {totalPages}
//                         </span>
//                         <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//                             disabled={currentPage === totalPages}
//                             className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                         >
//                             Next
//                             <ChevronRight className="w-4 h-4" />
//                         </Button>
//                     </div>
//                 </div>
//             )}

//             {/* Empty State */}
//             {filteredConnections.length === 0 && (
//                 <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
//                     <Network className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                     <p className="text-lg font-medium mb-2 text-gray-600">No connections found</p>
//                     <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default LicenseUsagePage;

"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Next.js 13+ App Router
// import { useRouter } from "next/router"; // Next.js 12 Pages Router
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Search, Filter, ChevronLeft, ChevronRight, Calendar, Wifi, ArrowLeft } from "lucide-react";

// Sample license data with connections
const licensesData = [
    {
        org_id: "ORG12345",
        paymentId: "PAY123456",
        clientId: "CLIENT56789",
        licenseId: "LIC12345",
        licenseName: "Premium Enterprise License",
        startDate: "2024-01-15T00:00:00.000Z",
        endDate: "2025-01-15T00:00:00.000Z",
        usage: [],
        connections: [
            {
                connectionId: "CONN98765",
                clientId: "CLIENT56789",
                status: "ACTIVE",
                connectionStatus: "ACTIVE",
                usage: [
                    { start: "2024-08-01T09:00:00.000Z", end: "2024-08-01T10:30:00.000Z", sessionId: "SESSION001" },
                    { start: "2024-08-01T14:00:00.000Z", end: "2024-08-01T15:45:00.000Z", sessionId: "SESSION002" }
                ]
            },
            {
                connectionId: "CONN98766",
                clientId: "CLIENT56790",
                status: "ACTIVE",
                connectionStatus: "INACTIVE",
                usage: [
                    { start: "2024-08-01T11:00:00.000Z", end: "2024-08-01T12:15:00.000Z", sessionId: "SESSION003" }
                ]
            }
        ],
        overallUsage: "195",
        lastUsage: "2024-08-01T11:15:00.000Z"
    },
    {
        org_id: "ORG12346",
        paymentId: "PAY123457",
        clientId: "CLIENT56791",
        licenseId: "LIC12346",
        licenseName: "Standard Business License",
        startDate: "2024-02-01T00:00:00.000Z",
        endDate: "2025-02-01T00:00:00.000Z",
        usage: [],
        connections: [
            {
                connectionId: "CONN98767",
                clientId: "CLIENT56791",
                status: "ACTIVE",
                connectionStatus: "ACTIVE",
                usage: [
                    { start: "2024-08-01T08:00:00.000Z", end: "2024-08-01T09:30:00.000Z", sessionId: "SESSION004" }
                ]
            },
            {
                connectionId: "CONN98768",
                clientId: "CLIENT56792",
                status: "INACTIVE",
                connectionStatus: "INACTIVE",
                usage: []
            },
            {
                connectionId: "CONN98769",
                clientId: "CLIENT56793",
                status: "ACTIVE",
                connectionStatus: "ACTIVE",
                usage: [
                    { start: "2024-08-01T10:00:00.000Z", end: "2024-08-01T11:45:00.000Z", sessionId: "SESSION005" },
                    { start: "2024-08-01T16:00:00.000Z", end: "2024-08-01T17:30:00.000Z", sessionId: "SESSION006" }
                ]
            }
        ],
        overallUsage: "280",
        lastUsage: "2024-07-31T14:30:00.000Z"
    },
    {
        org_id: "ORG12347",
        paymentId: "PAY123458",
        clientId: "CLIENT56794",
        licenseId: "LIC12347",
        licenseName: "Basic Starter License",
        startDate: "2024-03-10T00:00:00.000Z",
        endDate: "2024-12-10T00:00:00.000Z",
        usage: [],
        connections: [
            {
                connectionId: "CONN98770",
                clientId: "CLIENT56794",
                status: "ACTIVE",
                connectionStatus: "ACTIVE",
                usage: [
                    { start: "2024-08-01T13:00:00.000Z", end: "2024-08-01T14:00:00.000Z", sessionId: "SESSION007" }
                ]
            }
        ],
        overallUsage: "120",
        lastUsage: "2024-07-30T16:45:00.000Z"
    },
    {
        org_id: "ORG12348",
        paymentId: "PAY123459",
        clientId: "CLIENT56795",
        licenseId: "LIC12348",
        licenseName: "Professional License",
        startDate: "2024-04-05T00:00:00.000Z",
        endDate: "2025-04-05T00:00:00.000Z",
        usage: [],
        connections: [
            {
                connectionId: "CONN98771",
                clientId: "CLIENT56795",
                status: "ACTIVE",
                connectionStatus: "ACTIVE",
                usage: [
                    { start: "2024-08-01T07:30:00.000Z", end: "2024-08-01T09:00:00.000Z", sessionId: "SESSION008" }
                ]
            },
            {
                connectionId: "CONN98772",
                clientId: "CLIENT56796",
                status: "ACTIVE",
                connectionStatus: "INACTIVE",
                usage: [
                    { start: "2024-08-01T12:00:00.000Z", end: "2024-08-01T13:30:00.000Z", sessionId: "SESSION009" }
                ]
            },
            {
                connectionId: "CONN98773",
                clientId: "CLIENT56797",
                status: "INACTIVE",
                connectionStatus: "INACTIVE",
                usage: []
            }
        ],
        overallUsage: "240",
        lastUsage: "2024-07-29T10:20:00.000Z"
    },
    {
        org_id: "ORG12349",
        paymentId: "PAY123460",
        clientId: "CLIENT56798",
        licenseId: "LIC12349",
        licenseName: "Enterprise Plus License",
        startDate: "2024-05-20T00:00:00.000Z",
        endDate: "2025-05-20T00:00:00.000Z",
        usage: [],
        connections: [
            {
                connectionId: "CONN98774",
                clientId: "CLIENT56798",
                status: "ACTIVE",
                connectionStatus: "ACTIVE",
                usage: [
                    { start: "2024-08-01T06:00:00.000Z", end: "2024-08-01T08:00:00.000Z", sessionId: "SESSION010" },
                    { start: "2024-08-01T15:00:00.000Z", end: "2024-08-01T17:00:00.000Z", sessionId: "SESSION011" }
                ]
            },
            {
                connectionId: "CONN98775",
                clientId: "CLIENT56799",
                status: "ACTIVE",
                connectionStatus: "ACTIVE",
                usage: [
                    { start: "2024-08-01T09:30:00.000Z", end: "2024-08-01T11:00:00.000Z", sessionId: "SESSION012" }
                ]
            }
        ],
        overallUsage: "350",
        lastUsage: "2024-08-01T18:15:00.000Z"
    }
];

const formatDateTime = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffInMs = now - past;
    
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
};

const calculateUsageMinutes = (usage) => {
    if (!usage || usage.length === 0) return 0;

    return usage.reduce((total, session) => {
        const start = new Date(session.start);
        const end = new Date(session.end);
        const diffMinutes = Math.round((end - start) / (1000 * 60));
        return total + diffMinutes;
    }, 0);
};

const LicenseUsagePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); // For Next.js 13+ App Router
    // const router = useRouter(); // For Next.js 12 Pages Router - use router.query.licenseId
    
    const [selectedLicense, setSelectedLicense] = useState("all");
    const [selectedConnectionStatus, setSelectedConnectionStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingLicense, setEditingLicense] = useState(null);
    const [licensesState, setLicensesState] = useState(licensesData);
    const recordsPerPage = 10;

    // Handle URL parameters on component mount
    useEffect(() => {
        // For Next.js 13+ App Router
        const licenseIdFromUrl = searchParams.get('licenseId');
        
        // For Next.js 12 Pages Router, use:
        // const licenseIdFromUrl = router.query.licenseId;
        
        if (licenseIdFromUrl) {
            setSelectedLicense(licenseIdFromUrl);
            // Optionally set the search term to the license ID as well
            setSearchTerm(licenseIdFromUrl);
        }
    }, [searchParams]); // For Next.js 12, use [router.query]

    // Navigate back to dashboard
   

    // Flatten all connections from all licenses for the table
    const allConnections = useMemo(() => {
        const connections = [];
        licensesState.forEach(license => {
            license.connections.forEach(connection => {
                connections.push({
                    ...connection,
                    licenseId: license.licenseId,
                    licenseName: license.licenseName,
                    licenseEndDate: license.endDate,
                    lastUsage: license.lastUsage,
                    overallUsage: calculateUsageMinutes(connection.usage)
                });
            });
        });
        return connections;
    }, [licensesState]);

    // Filter connections based on selected license and search term
    const filteredConnections = useMemo(() => {
        let filtered = allConnections;

        // Filter by selected license
        if (selectedLicense !== "all") {
            filtered = filtered.filter(connection => connection.licenseId === selectedLicense);
        }

        // Filter by connection status
        if (selectedConnectionStatus !== "all") {
            filtered = filtered.filter(connection => connection.connectionStatus === selectedConnectionStatus);
        }

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(connection =>
                connection.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                connection.connectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                connection.licenseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                connection.licenseName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    }, [allConnections, selectedLicense, selectedConnectionStatus, searchTerm]);

    // Get selected license details for display
    const selectedLicenseDetails = useMemo(() => {
        if (selectedLicense === "all") return null;
        return licensesState.find(license => license.licenseId === selectedLicense);
    }, [selectedLicense, licensesState]);

    // Pagination
    const totalPages = Math.ceil(filteredConnections.length / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const paginatedConnections = filteredConnections.slice(startIndex, startIndex + recordsPerPage);

    // Reset to page 1 when filters change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [selectedLicense, selectedConnectionStatus, searchTerm]);

    // Handle license name edit
    const handleLicenseNameEdit = (licenseId, newName) => {
        setLicensesState(prev =>
            prev.map(license =>
                license.licenseId === licenseId
                    ? { ...license, licenseName: newName }
                    : license
            )
        );
        setEditingLicense(null);
    };

    // Handle license name click
    const handleLicenseNameClick = (licenseId) => {
        setEditingLicense(licenseId);
    };

    // Handle license name key press
    const handleLicenseNameKeyPress = (e, licenseId, currentName) => {
        if (e.key === 'Enter') {
            handleLicenseNameEdit(licenseId, e.target.value);
        } else if (e.key === 'Escape') {
            setEditingLicense(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between">
                    <div>
                        {/* <div className="flex items-center space-x-4 mb-2">
                            
                            {selectedLicenseDetails && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1">
                                    <span className="text-sm font-medium text-blue-700">
                                        Viewing: {selectedLicenseDetails.licenseId}
                                    </span>
                                </div>
                            )}
                        </div> */}
                        <h1 className="text-3xl font-bold text-gray-900">License Usage Management</h1>
                        <p className="text-gray-600 mt-1">
                            Monitor and manage license usage across all connections
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by License
                    </label>
                    <Select value={selectedLicense} onValueChange={setSelectedLicense}>
                        <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            <SelectValue placeholder="Select a license" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Licenses</SelectItem>
                            {licensesState.map(license => (
                                <SelectItem key={license.licenseId} value={license.licenseId}>
                                    {license.licenseId}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Filter by Connection Status
                    </label>
                    <Select value={selectedConnectionStatus} onValueChange={setSelectedConnectionStatus}>
                        <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            <SelectValue placeholder="Select connection status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Search
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search Client ID, Connection ID, or License ID"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                        />
                    </div>
                </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex gap-2 items-center">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <span>
                        Showing {filteredConnections.length} connection{filteredConnections.length !== 1 ? 's' : ''}
                        {selectedLicense !== "all" && (
                            <span className="ml-1">
                                for {selectedLicense}
                            </span>
                        )}
                        {selectedConnectionStatus !== "all" && (
                            <span className="ml-1">
                                with {selectedConnectionStatus.toLowerCase()} status
                            </span>
                        )}
                        {selectedLicenseDetails && (
                            <span className="ml-2 text-blue-600 font-medium">
                                • License expires on {formatDate(selectedLicenseDetails.endDate)}
                            </span>
                        )}
                    </span>
                </div>
            </div>

            {/* Table */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr className="border-b border-gray-200">
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Client ID</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Connection ID</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Connection Status</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Overall Usage</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">Last Usage</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">License End Date</th>
                            <th className="text-center py-3 px-4 font-medium text-gray-900">License</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white text-center">
                        {paginatedConnections.map((connection, index) => (
                            <tr
                                key={`${connection.licenseId}-${connection.connectionId}`}
                                className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                            >
                                <td className="py-3 px-4 text-center">
                                    <div className="text-sm text-black">{connection.clientId}</div>
                                </td>
                                <td className="py-3 px-4 text-center">
                                    <div className="text-sm text-black">{connection.connectionId}</div>
                                </td>
                                <td className="py-3 px-4">
                                    <Badge
                                        variant="outline"
                                        className={`${connection.connectionStatus === 'ACTIVE'
                                            ? 'border-green-300 text-gray-700 bg-green-200'
                                            : 'border-red-300 text-red-500 bg-red-200'
                                            }`}
                                    >
                                        <Wifi className="w-3 h-3 mr-1" />
                                        {connection.connectionStatus}
                                    </Badge>
                                </td>
                                <td className="py-3 px-4 text-black text-sm">
                                    {connection.overallUsage} minutes
                                </td>
                                <td className="py-3 px-4 text-black text-sm">
                                    {formatTimeAgo(connection.lastUsage)}
                                </td>
                                <td className="py-3 px-4 text-black text-sm">
                                    {formatDate(connection.licenseEndDate)}
                                </td>
                                <td className="py-3 px-4 text-black text-sm">
                                    <div className="text-xs text-gray-500">{connection.licenseId}</div>
                                    <div className="text-sm font-medium">
                                        {editingLicense === connection.licenseId ? (
                                            <Input
                                                defaultValue={connection.licenseName}
                                                autoFocus
                                                onBlur={(e) => handleLicenseNameEdit(connection.licenseId, e.target.value)}
                                                onKeyDown={(e) => handleLicenseNameKeyPress(e, connection.licenseId, connection.licenseName)}
                                                className="h-6 text-sm py-0 px-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        ) : (
                                            <span
                                                onClick={() => handleLicenseNameClick(connection.licenseId)}
                                                className="cursor-pointer hover:text-blue-600 hover:underline"
                                                title="Click to edit license name"
                                            >
                                                {connection.licenseName}
                                            </span>
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
                <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-gray-200">
                    <Network className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2 text-gray-600">No connections found</p>
                    <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    );
};

export default LicenseUsagePage;