"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Filter, ChevronLeft, ChevronRight, Clock, Wifi, RotateCcw, Square, Play, MoreHorizontal, PlayCircle, StopCircle, Loader2, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { getConnection } from "@/app/api/page";

interface payload {
    orgId: string;
    page: number;
    limit: number;
    licenseId?: string;
    connectionStatus?: string;
    lastUsageFilter?: string;
}

const formatTimeAgo = (dateString: any) => {
    if (!dateString) return "Never";
    const now: any = new Date();
    const past: any = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 5) return "just now";

    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
};

const calculateTotalCredits = (featureUsage: any) => {
    if (!featureUsage || !Array.isArray(featureUsage)) return 0;
    return featureUsage.reduce((total, feature) => total + (feature.usedCredits || 0), 0);
};

const getUsageCategory = (lastUsageDate: any) => {
    if (!lastUsageDate) return 'oldUsage';
    const now: any = new Date();
    const lastUsage: any = new Date(lastUsageDate);
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    return (now - lastUsage) <= sevenDaysInMs ? 'recentUsage' : 'oldUsage';
};

const LicenseUsagePage = () => {
    const searchParams = useSearchParams();
    const licenseIdFromParams = searchParams.get('licenseId');

    const [licenses, setLicenses] = useState([]);
    const [connections, setConnections] = useState([]);
    const [totalConnections, setTotalConnections] = useState(0);
    const [uniqueLicenseIds, setUniqueLicenseIds] = useState([]);
    const [licenseIdsLoaded, setLicenseIdsLoaded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedLicense, setSelectedLicense] = useState("all");
    const [selectedConnectionStatus, setSelectedConnectionStatus] = useState("all");
    const [selectedLastUsage, setSelectedLastUsage] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedAction, setSelectedAction] = useState(null);
    const [selectedConnection, setSelectedConnection] = useState(null);

    const recordsPerPage = 10;

    const ORG_ID = "ORG17537870059048";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhZHJ1IiwiYWdlIjoiMTgiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzE0MjcxMzB9.Eq2LRxmI9-m5LBhlHAKomP9ZUQVSsxoapr-xxoEuhOE";

    // Load only license IDs initially
    const fetchLicenseIds = async () => {
    try {
        const payLoad = {
            orgId: ORG_ID,
            includeLicenseIds: true,
        };
        const response = await getConnection(payLoad);
    
        if (response.Success && response.Success.licenseIds) {
            setUniqueLicenseIds(response.Success.licenseIds);
            setLicenseIdsLoaded(true);

            if (licenseIdFromParams && response.Success.licenseIds.includes(licenseIdFromParams)) {
                setSelectedLicense(licenseIdFromParams);
            }
        } else {
            console.error("API returned an error:", response.Error || "Unknown error");
            setUniqueLicenseIds([]);
            setError("Failed to load license IDs");
        }
    } catch (error) {
        console.error("Failed to fetch license IDs:", error);
        setUniqueLicenseIds([]);
        setError("Failed to fetch license IDs. Please try again.");
    }
};

    //         const response = await fetch('http://192.168.1.31:8000/connection/getConnection', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify(payload),
    //         });

    //         if (!response.ok) {
    //             throw new Error(`API Error: ${response.status} ${response.statusText}`);
    //         }
    //         const result = await response.json();

    //         if (result.Success && result.Success.licenseIds) {
    //             setUniqueLicenseIds(result.Success.licenseIds);
    //             setLicenseIdsLoaded(true);

    //             // Set license from URL parameter if it exists and is valid
    //             if (licenseIdFromParams && result.Success.licenseIds.includes(licenseIdFromParams)) {
    //                 setSelectedLicense(licenseIdFromParams);
    //             }
    //         } else {
    //             console.error("API returned an error:", result.Error || "Unknown error");
    //             setUniqueLicenseIds([]);
    //             setError("Failed to load license IDs");
    //         }
    //     } catch (error) {
    //         console.error("Failed to fetch license IDs:", error);
    //         setUniqueLicenseIds([]);
    //         setError("Failed to fetch license IDs. Please try again.");
    //     }
    // };

    // Fetch connections based on selected filters
    const fetchLicenses = async () => {
        setLoading(true);
        setError(null);


        setConnections([]);
        setTotalConnections(0);
        setLicenses([]);

        try {
            const payload: payload = {
                orgId: ORG_ID,
                page: currentPage,
                limit: recordsPerPage,
            };

            if (selectedLicense !== "all") {
                payload.licenseId = selectedLicense;
            }
            if (selectedConnectionStatus !== "all") {
                payload.connectionStatus = selectedConnectionStatus;
            }
            if (selectedLastUsage !== "all") {
                payload.lastUsageFilter = selectedLastUsage;
            }


            const result= await getConnection(payload);;
            console.log("API Response:", result);

            if (result.Success) {
                const responseData = result.Success;
                const licensesData = Array.isArray(responseData.data) ? responseData.data : [];

                setLicenses(licensesData);

                const allConnections = [];
                licensesData.forEach(license => {
                    if (license.connections && Array.isArray(license.connections)) {
                        license.connections.forEach(connection => {
                            allConnections.push({
                                ...connection,
                                licenseId: license.licenseId,
                                licenseName: license.licenseName,
                                orgId: license.orgId,
                                paymentId: license.paymentId,
                                startDate: license.startDate,
                                endDate: license.endDate
                            });
                        });
                    }
                });

                console.log("Frontend - Connection statuses in response:",
                    [...new Set(allConnections.map(conn => conn.connectionStatus))]);
                console.log("Frontend - All connections:", allConnections);

                setConnections(allConnections);

                const actualTotal = responseData.total || allConnections.length;
                setTotalConnections(actualTotal);


                setError(null);

            } else {

                setLicenses([]);
                setConnections([]);
                setTotalConnections(0);


                if (result.Error === "No data Found." || !result.Success) {
                    setError("No connections found matching your criteria.");
                } else {
                    setError("Failed to fetch connections. Please try again.");
                }
            }
        } catch (error) {
            console.error("Failed to fetch licenses:", error);
            setLicenses([]);
            setConnections([]);
            setTotalConnections(0);
            setError('Failed to fetch connections. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Load license IDs on component mount
    useEffect(() => {
        fetchLicenseIds();
    }, []);


    useEffect(() => {
        if (licenseIdsLoaded && selectedLicense !== "all") {
            fetchLicenses();
        } else if (selectedLicense === "all") {

            setConnections([]);
            setTotalConnections(0);
            setLicenses([]);
            setError(null);
        }
    }, [selectedLicense, selectedConnectionStatus, selectedLastUsage, currentPage, licenseIdsLoaded]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedLicense, selectedConnectionStatus, selectedLastUsage]);

    const handleActionClick = (action, connection) => {
        setSelectedAction(action);
        setSelectedConnection(connection);
        setShowConfirmDialog(true);
    };

    const handleConfirmAction = async () => {
        console.log(`Performing ${selectedAction} on connection:`, selectedConnection.connectionId);

        // Here you would make the API call to perform the action
        try {
            // Example API call structure
            // const response = await fetch(`http://192.168.1.31:8000/connection/${selectedAction}`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            //     body: JSON.stringify({
            //         connectionId: selectedConnection.connectionId,
            //         licenseId: selectedConnection.licenseId
            //     })
            // });

            // For demo purposes, just show success
            alert(`${selectedAction} action completed for connection ${selectedConnection.connectionId}`);

        } catch (error) {
            console.error(`Failed to ${selectedAction} connection:`, error);
            alert(`Failed to ${selectedAction} connection. Please try again.`);
        }

        setShowConfirmDialog(false);
        setSelectedAction(null);
        setSelectedConnection(null);
    };

    const getActionIcon = (action) => {
        switch (action) {
            case 'start': return <PlayCircle className="w-4 h-4" />;
            case 'stop': return <StopCircle className="w-4 h-4" />;
            case 'restart': return <RotateCcw className="w-4 h-4" />;
            default: return null;
        }
    };

    const getActionColor = (action) => {
        switch (action) {
            case 'start': return 'text-green-600';
            case 'stop': return 'text-red-600';
            case 'restart': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    // Apply search filter to connections (this is frontend-only filtering)
    const paginatedConnections = useMemo(() => {
        if (!searchTerm) return connections;

        return connections.filter(connection =>
            (connection.clientId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (connection.connectionId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (connection.licenseId?.toLowerCase() || '').includes(searchTerm.toLowerCase())
        );
    }, [connections, searchTerm]);

    const totalPages = Math.ceil(totalConnections / recordsPerPage);


    const getEmptyStateMessage = () => {
        if (selectedLicense === "all") {
            return {
                title: "Select a License",
                subtitle: "Please select a specific license from the dropdown to view its connections."
            };
        } else {
            return {
                title: "No Connections Found",
                subtitle: "Try adjusting your search or filter criteria."
            };
        }
    };

    const emptyState = getEmptyStateMessage();

    // Clear all filters
    const handleClearFilters = () => {
        setSearchTerm("");
        setSelectedLicense("all");
        setSelectedConnectionStatus("all");
        setSelectedLastUsage("all");
        setCurrentPage(1);
        setError(null);
    };


    const hasActiveFilters = searchTerm || selectedLicense !== "all" || selectedConnectionStatus !== "all" || selectedLastUsage !== "all";

    const totalRound=(value) =>{
        return  Math.round(value * 1000)/1000;
    }

    return (
        <div className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
                <h1 className="text-3xl font-bold text-gray-900">License Usage Management</h1>
                <p className="text-gray-600 mt-1">Monitor and manage license usage across all connections.</p>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Search and Filters
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by License
                            </label>
                            <Select
                                value={selectedLicense}
                                onValueChange={setSelectedLicense}
                                disabled={!licenseIdsLoaded}
                            >
                                <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                                    <SelectValue placeholder={!licenseIdsLoaded ? "Loading licenses..." : "Select license"} />
                                </SelectTrigger>
                                <SelectContent className="max-h-60 overflow-y-auto"> 
                                    <SelectItem value="all">All Licenses</SelectItem>
                                    {uniqueLicenseIds.map(id => (
                                        <SelectItem key={id} value={id}>
                                            {id}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Connection Status
                            </label>
                            <Select value={selectedConnectionStatus} onValueChange={setSelectedConnectionStatus} disabled={loading}>
                                <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="IN_ACTIVE">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Last Usage
                            </label>
                            <Select value={selectedLastUsage} onValueChange={setSelectedLastUsage} disabled={loading}>
                                <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                                    <SelectValue placeholder="Select usage range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Usage</SelectItem>
                                    <SelectItem value="recentUsage">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-green-500" /> Recent (≤7 days)
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="oldUsage">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-orange-500" /> Older ({">"}7 days)
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mt-7 w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                            <Button
                                variant="outline"
                                onClick={handleClearFilters}
                                className="w-auto"
                                disabled={loading}
                            >
                                Clear All Filters
                            </Button>
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                                {searchTerm && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        Search: "{searchTerm}"
                                    </Badge>
                                )}
                                {selectedLicense !== "all" && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        License: {selectedLicense}
                                    </Badge>
                                )}
                                {selectedConnectionStatus !== "all" && (
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                        Status: {selectedConnectionStatus}
                                    </Badge>
                                )}
                                {selectedLastUsage !== "all" && (
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                        Usage: {selectedLastUsage === "recentUsage" ? "Recent (≤7 days)" : "Older (>7 days) / Never Used"}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Error Display */}
            {error && !loading && (
                <Card className="mb-6 border-red-200 bg-red-50">
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2 text-red-700">
                            <XCircle className="w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Loading Overlay */}
            {loading && (
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-center space-x-2 text-gray-600">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Loading connections...</span>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Table - Only show when not loading */}
            {!loading && (
                <div className="border border-gray-200 rounded-lg overflow-x-auto bg-white">
                    <table className="w-full min-w-max">
                        <thead className="bg-gray-50">
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Client ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Connection ID</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Connection Status</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Usage Credits</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Last Used</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!error && paginatedConnections.length > 0 ? (
                                paginatedConnections.map((conn, index) => (
                                    <tr key={`${conn.connectionId}-${index}`} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4 text-sm font-mono text-gray-800">{conn.clientId}</td>
                                        <td className="py-3 px-4 text-sm font-mono text-gray-800">{conn.connectionId}</td>
                                        <td className="py-3 px-4 text-center">
                                            <Badge variant="outline" className={`capitalize ${conn.connectionStatus === 'ACTIVE' ? 'border-green-200 text-green-800 bg-green-100' : 'border-red-200 text-red-800 bg-red-100'}`}>
                                                <Wifi className="w-3 h-3 mr-1.5" />
                                                {conn.connectionStatus.replace('_', ' ').toLowerCase()}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-800 text-center">{totalRound(calculateTotalCredits(conn.featureUsage))}</td>
                                        <td className="py-3 px-4 text-sm text-gray-600 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Clock className={`w-4 h-4 ${getUsageCategory(conn.lastUsageDate) === 'recentUsage' ? 'text-green-500' : 'text-orange-500'}`} />
                                                <span>{formatTimeAgo(conn.lastUsageDate)}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => handleActionClick('start', conn)}
                                                        className="cursor-pointer"
                                                    >
                                                        <PlayCircle className="mr-2 h-4 w-4 text-black" />
                                                        <span className="text-black">Start</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleActionClick('stop', conn)}
                                                        className="cursor-pointer"
                                                    >
                                                        <StopCircle className="mr-2 h-4 w-4 text-black" />
                                                        <span className="text-black">Stop</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleActionClick('restart', conn)}
                                                        className="cursor-pointer"
                                                    >
                                                        <RotateCcw className="mr-2 h-4 w-4 text-black" />
                                                        <span className="text-black">Restart</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-16 text-gray-500">
                                        <Network className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-lg font-medium text-gray-600">{emptyState.title}</p>
                                        <p className="text-sm">{emptyState.subtitle}</p>
                                        {/* {hasActiveFilters && !error && (
                                            <Button 
                                                variant="outline" 
                                                onClick={handleClearFilters}
                                                className="mt-4"
                                            >
                                                Clear All Filters
                                            </Button>
                                        )} */}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}


            {totalConnections > 0 && totalPages > 1 && !loading && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                        Showing <strong>{(currentPage - 1) * recordsPerPage + 1}</strong> to <strong>{Math.min(currentPage * recordsPerPage, totalConnections)}</strong> of <strong>{totalConnections}</strong> connections
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
                            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                        </Button>
                        <span className="text-sm text-gray-700 font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
                            Next <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}


            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            {selectedAction && getActionIcon(selectedAction)}
                            <span className={getActionColor(selectedAction)}>
                                Confirm {selectedAction?.charAt(0).toUpperCase() + selectedAction?.slice(1)} Action
                            </span>
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to <strong>{selectedAction}</strong> the connection <strong>{selectedConnection?.connectionId}</strong>?
                            {selectedAction === 'stop' && (
                                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-800 text-sm">
                                    <strong>Warning:</strong> <p>This will immediately terminate the connection and may interrupt ongoing operations.</p>
                                </div>
                            )}
                            {selectedAction === 'restart' && (
                                <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-orange-800 text-sm">
                                    <strong>Note:</strong> <p>This will stop and then start the connection. There may be a brief interruption.</p>
                                </div>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmAction}
                            className={`${selectedAction === 'start' ? 'bg-green-600 hover:bg-green-700' :
                                    selectedAction === 'stop' ? 'bg-red-600 hover:bg-red-700' :
                                        selectedAction === 'restart' ? 'bg-orange-600 hover:bg-orange-700' :
                                            'bg-gray-600 hover:bg-gray-700'
                                }`}
                        >
                            {selectedAction === 'start' && <Play className="w-4 h-4 mr-1" />}
                            {selectedAction === 'stop' && <Square className="w-4 h-4 mr-1" />}
                            {selectedAction === 'restart' && <RotateCcw className="w-4 h-4 mr-1" />}
                            Confirm {selectedAction?.charAt(0).toUpperCase() + selectedAction?.slice(1)}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );

};

export default LicenseUsagePage;