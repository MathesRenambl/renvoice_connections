"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Network, Activity, XCircle, Search, Clock, Filter, Calendar, CheckCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { getLicenses } from "@/app/api/page";

export interface LicenseFilters {
  searchTerm?: string;
  overallUsage?: string;
  expiryRange?: string;
  status?: string;
}

export interface LicenseRequestBody {
  orgId: string;
  page: number;
  licenseId?: string;
  licenseName?: string;
  overallUsage?: string;
  licenseEndDate?: string;
  status?: string;
}

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

// License Usage Analytics Component
const LicenseUsageAnalytics = ({ onLicenseClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLicense, setSearchLicense] = useState("");
  const [selectedUsageRange, setSelectedUsageRange] = useState("all");
  const [selectedExpiryRange, setSelectedExpiryRange] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);

  const itemsPerPage = 10; // You can adjust this as needed

  // API call function - Fixed to properly handle data clearing
  const fetchLicenses = useCallback(async (page = 1, filters: LicenseFilters = {}) => {
    setLoading(true);
    setError(null);
    
    // Clear existing data when starting a new fetch to prevent old data showing
    if (page === 1) {
      setLicenses([]);
      setTotalCount(0);
    }
    
    try {
      const requestBody: LicenseRequestBody = {
        orgId: "ORG17537870059048",
        page: page
      };

      // Add filters to request body if they exist
    //   if (filters.searchTerm && filters.searchTerm.trim()) {
    //     requestBody.licenseName = filters.searchTerm.trim();
    //   }

    //   if (filters.searchTerm && filters.searchTerm.trim()) {
    //     requestBody.licenseId = filters.searchTerm.trim();
    //   }

      if (filters.searchTerm && filters.searchTerm.trim()) {
        const searchTerm = filters.searchTerm.trim();

        if (searchTerm.startsWith("LIC-")) {
            requestBody.licenseId = searchTerm;
        } else {
            requestBody.licenseName = searchTerm;
        }
    }

      
      if (filters.overallUsage && filters.overallUsage !== "all") {
        requestBody.overallUsage = filters.overallUsage;
      }
      
      if (filters.expiryRange && filters.expiryRange !== "all") {
        requestBody.licenseEndDate = filters.expiryRange;
      }

      if (filters.status && filters.status !== "all") {
        requestBody.status = filters.status;
      }

      console.log("Request Body:", requestBody);

      const data = await getLicenses(requestBody);

    //   const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        const licenseData = data.data[0]?.data || [];
        const totalCountData = data.data[0]?.totalCount?.[0]?.count || 0;
        
        // Transform API data to match your component's expected format
        // const transformedLicenses = licenseData.map(license => ({
        //   licenseId: license.licenseId,
        //   licenseName: license.licenseName,
        // //   clientId: license.clientId || 'N/A',
        //   totalUsedCredits: license.totalUsedCredits || 0,
        //   totalConnections: license.totalConnections || 0,
        //   activeConnections: license.activeConnections || 0,
        //   inactiveConnections: license.inactiveConnections || 0,
        // //   connections: license.connections || [],
        // //   lastUsage: license.lastUsage || new Date().toISOString(),
        //   endDate: license.endDate,
        //   startDate: license.startDate,
        //   status: license.status,
        //   daysUntilExpiry: license.daysUntilExpiry
        // }));

        setLicenses(licenseData);
        setTotalCount(totalCountData);
        
        // Clear any previous errors on successful fetch
        setError(null);
      } else {
        // Handle no data case - clear everything
        setLicenses([]);
        setTotalCount(0);
        
        // Set appropriate error message
        if (data.data === "No data Found." || !data.data || (Array.isArray(data.data) && data.data.length === 0)) {
          setError("No licenses found matching your criteria.");
        } else {
          setError("Failed to fetch licenses. Please try again.");
        }
      }
    } catch (err) {
      console.error('Error fetching licenses:', err);
      setError('Failed to fetch licenses. Please try again.');
      // Clear data on error
      setLicenses([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchLicenses(1);
  }, [fetchLicenses]);

  // Helper function to get current filter state
  const getCurrentFilters = useCallback(() => {
    return {
      searchTerm: searchLicense,
      overallUsage: selectedUsageRange,
      expiryRange: selectedExpiryRange,
      status: selectedStatus
    };
  }, [searchLicense, selectedUsageRange, selectedExpiryRange, selectedStatus]);

  // Handle search button click
  const handleSearch = () => {
    setSearchLicense(searchTerm);
    setCurrentPage(1);
    
    const filters = {
      searchTerm: searchTerm,
      overallUsage: selectedUsageRange,
      expiryRange: selectedExpiryRange,
      status: selectedStatus
    };
    
    fetchLicenses(1, filters);
  };

  const totalCredits = (value) => {
    return  Math.round(value * 1000)/1000;
  }

  // Handle Enter key press in search input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle filter changes - Fixed to properly reset pagination
  const handleUsageRangeChange = (value) => {
    setSelectedUsageRange(value);
    setCurrentPage(1);
    
    const filters = {
      searchTerm: searchLicense,
      overallUsage: value,
      expiryRange: selectedExpiryRange,
      status: selectedStatus
    };
    
    fetchLicenses(1, filters);
  };

  const handleExpiryRangeChange = (value) => {
    setSelectedExpiryRange(value);
    setCurrentPage(1);
    
    const filters = {
      searchTerm: searchLicense,
      overallUsage: selectedUsageRange,
      expiryRange: value,
      status: selectedStatus
    };
    
    fetchLicenses(1, filters);
  };

  const handleStatus = (value) => {
    setSelectedStatus(value);
    setCurrentPage(1);
    
    const filters = {
      searchTerm: searchLicense,
      overallUsage: selectedUsageRange,
      expiryRange: selectedExpiryRange,
      status: value
    };
    
    fetchLicenses(1, filters);
  };

  // Handle pagination - Fixed to use current filters
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchLicenses(newPage, getCurrentFilters());
  };

  // Clear all filters - Fixed to properly reset everything
  const handleClearFilters = () => {
    setSearchTerm("");
    setSearchLicense("");
    setSelectedUsageRange("all");
    setSelectedExpiryRange("all");
    setSelectedStatus("all");
    setCurrentPage(1);
    setError(null);
    
    // Fetch with cleared filters
    fetchLicenses(1, {
      searchTerm: "",
      overallUsage: "all",
      expiryRange: "all",
      status: "all"
    });
  };

  // Calculate pagination info
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startItem = totalCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalCount);

  // Check if any filters are active
  const hasActiveFilters = searchLicense || selectedUsageRange !== "all" || selectedExpiryRange !== "all" || selectedStatus !== "all";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
                  disabled={loading}
                />
                <Button 
                  onClick={handleSearch}
                  className="bg-gray-900 hover:bg-gray-700 text-white px-4"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Usage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Overall Usage
              </label>
              <Select value={selectedUsageRange} onValueChange={handleUsageRangeChange} disabled={loading}>
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
                  <SelectItem value="10000">10000+ Credits</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Expiry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by License End Date
              </label>
              <Select value={selectedExpiryRange} onValueChange={handleExpiryRangeChange} disabled={loading}>
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

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by License Status
              </label>
              <Select value={selectedStatus} onValueChange={handleStatus} disabled={loading}>
                <SelectTrigger className="w-full border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="IN_ACTIVE">INACTIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="w-full"
                disabled={loading}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
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
                    Usage: {selectedUsageRange === "10000" ? "10000+ Credits" : `${selectedUsageRange} - ${parseInt(selectedUsageRange) + 999} Credits`}
                  </Badge>
                )}
                {selectedExpiryRange !== "all" && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    Expiry: Within {selectedExpiryRange} days
                  </Badge>
                )}
                {selectedStatus !== "all" && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    Status: {selectedStatus}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary and Pagination Info */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-gray-600">
          {loading ? (
            "Loading..."
          ) : error ? (
            "No results to display"
          ) : totalCount > 0 ? (
            `Showing ${startItem} to ${endItem} of ${totalCount} licenses`
          ) : (
            "No licenses found"
          )}
        </p>
        
        {/* Pagination Controls - Only show when we have data and multiple pages */}
        {totalPages > 1 && !loading && !error && totalCount > 0 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
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
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

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
              <span>Loading licenses...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* License Cards - Only show when we have data and no error */}
      {!loading && !error && licenses.length > 0 && (
        <CardContent className="px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {licenses.map((item, index) => {
              const daysUntilExpiry = item.daysUntilExpiry;
              const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
              const isExpired = daysUntilExpiry <= 0;
              const globalIndex = (currentPage - 1) * itemsPerPage + index + 1;

              return (
                <div key={index} className="border border-gray-200 rounded-lg p-8 bg-white hover:bg-gray-50 transition-colors duration-200 min-h-80  shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                        {globalIndex}
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <p
                            className="font-bold text-gray-900 text-lg cursor-pointer hover:text-blue-600 hover:underline transition-colors duration-200"
                            onClick={() => onLicenseClick(item.licenseId)}
                            title="Click to view detailed license usage"
                          >
                            {item.licenseId}
                          </p>
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${item.status === 'ACTIVE'
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${item.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                            {item.status ? item.status : '-'}
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
                        <p className="text-sm text-gray-600 font-medium mb-1">{item.licenseName}</p>
                        <p className="text-xs text-gray-500">Client: <span className="font-medium">{item.clientId}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-gray-900">{totalCredits(item.totalUsedCredits)} <span className="text-xl text-gray-900 font-normal">credits</span></p>
                      <p className="text-sm text-gray-900">Total Usage</p>
                    </div>
                  </div>

                  {/* Connection Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
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
                          <span className="text-sm text-gray-600 font-medium">Active Connections</span>
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
                          <span className="text-sm text-gray-600 font-medium">Inactive Connections</span>
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
                    <div className="flex justify-between gap-4 ">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-black">Last Activity:</span>
                        <span className="text-sm font-bold text-gray-900">{formatDateTime(item.lastUsage)}</span>
                      </div>
                      <div className="flex items-center space-x-2 ml-10">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-black">Expires:</span>
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
            })}
          </div>
        </CardContent>
      )}

      {/* No Data State - Only show when not loading, no error, but no licenses */}
      {!loading && !error && licenses.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No licenses found matching your search and filter criteria.</p>
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  onClick={handleClearFilters}
                  className="mt-4"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const LicenseOverview = () => {
  const router = useRouter();

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