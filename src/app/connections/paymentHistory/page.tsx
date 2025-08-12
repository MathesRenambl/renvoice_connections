'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Download, Filter, Search, Bolt, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTitle from '@/components/ui/pageTitle';

interface requestBody {
    orgId : string,
    page : number,
    licenseId? : string,
    paymentType? : string,
    status? : string,
    months? : string,
    year? : string
}

interface filters {
    searchTerm? : string,
    paymentType? : string,
    status? : string,
    months? : string,
    year? : string
}

const PaymentHistory = () => {
    const [paymentData, setPaymentData] = useState([]);
    const [yearsData, setYearsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [monthFilter, setMonthFilter] = useState('all');
    const [yearFilter, setYearFilter] = useState('all');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pagination, setPagination] = useState({
        "totalPages": 0,
        "startItem": 0,
        "endItem": 0,
        "currentPage": 0,
        "limit": 0
    });
    const [error, setError] = useState(null);

    // API call function - Fixed to properly handle data clearing
    const fetchLicenses = useCallback(async (page = 1, filters:filters = {}) => {
        setLoading(true);
        setError(null);

        // Clear existing data when starting a new fetch to prevent old data showing
        if (page === 1) {
            setPaymentData([]);
            setTotalCount(0);
        }

        try {
            const requestBody:requestBody = {
                orgId: "ORG17537870059048",
                page: page
            };

            // Add filters to request body if they exist
            if (filters.searchTerm && filters.searchTerm.trim()) {
                requestBody.licenseId = filters.searchTerm.trim();
            }

            if (filters.paymentType && filters.paymentType !== "all") {
                requestBody.paymentType = filters.paymentType;
            }

            if (filters.status && filters.status !== "all") {
                requestBody.status = filters.status;
            }

            if (filters.months && filters.months !== "all") {
                requestBody.months = filters.months;
            }

            if (filters.year && filters.year !== "all") {
                requestBody.year = filters.year;
            }

            console.log("Request Body:", requestBody);

            const response = await fetch('http://192.168.1.31:8000/payments/getPayment', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhZHJ1IiwiYWdlIjoiMTgiLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE3NzE0MjY3MDd9.0g4t7HMzscJhxbom0GbrptlOpfMkTCkT9tvNJ-RZ4fA",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log("API Response:", data);

            if (data.success) {
                const payments = data.data[0]?.data || [];
                const totalCountData = data.data[0]?.totalCount?.[0]?.count || 0;
                const paginationData = data.pagination || {};
                const filterYears = data.data[0]?.years?.[0]?.years || [];

                setPaymentData(payments);
                setYearsData(filterYears);
                setTotalCount(totalCountData);
                setPagination(paginationData);

                // Clear any previous errors on successful fetch
                setError(null);
            } else {
                // Handle no data case - clear everything
                setPaymentData([]);
                setYearsData([]);
                setTotalCount(0);
                setPagination({
                    "totalPages": 0,
                    "startItem": 0,
                    "endItem": 0,
                    "currentPage": 0,
                    "limit": 0
                });

                // Set appropriate error message
                if (data.data === "No data Found." || !data.data || (Array.isArray(data.data) && data.data.length === 0)) {
                    setError("No payment records found matching your criteria.");
                } else {
                    setError("Failed to fetch payment records. Please try again.");
                }
            }
        } catch (err) {
            console.error('Error fetching payment records:', err);
            setError('Failed to fetch payment records. Please try again.');
            // Clear data on error
            setPaymentData([]);
            setYearsData([]);
            setTotalCount(0);
            setPagination({
                "totalPages": 0,
                "startItem": 0,
                "endItem": 0,
                "currentPage": 0,
                "limit": 0
            });
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
            searchTerm: searchTerm,
            paymentType: paymentTypeFilter,
            status: statusFilter,
            months: monthFilter,
            year: yearFilter
        };
    }, [searchTerm, paymentTypeFilter, statusFilter, monthFilter, yearFilter]);

    // Handle search button click
    const handleSearch = () => {
        setCurrentPage(1);

        const filters = {
            searchTerm: searchTerm,
            paymentType: paymentTypeFilter,
            status: statusFilter,
            months: monthFilter,
            year: yearFilter
        };

        fetchLicenses(1, filters);
    };

    // Handle Enter key press in search input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // Handle filter changes - Fixed to properly reset pagination
    const handlePaymentType = (value) => {
        setPaymentTypeFilter(value);
        setCurrentPage(1);

        const filters = {
            searchTerm: searchTerm,
            paymentType: value,
            status: statusFilter,
            months: monthFilter,
            year: yearFilter
        };

        fetchLicenses(1, filters);
    };

    const handleStatus = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);

        const filters = {
            searchTerm: searchTerm,
            paymentType: paymentTypeFilter,
            status: value,
            months: monthFilter,
            year: yearFilter
        };

        fetchLicenses(1, filters);
    };

    const handleMonths = (value) => {
        setMonthFilter(value);
        setCurrentPage(1);

        const filters = {
            searchTerm: searchTerm,
            paymentType: paymentTypeFilter,
            status: statusFilter,
            months: value,
            year: yearFilter
        };

        fetchLicenses(1, filters);
    };

    const handleYear = (value) => {
        setYearFilter(value);
        setCurrentPage(1);

        const filters = {
            searchTerm: searchTerm,
            paymentType: paymentTypeFilter,
            status: statusFilter,
            months: monthFilter,
            year: value
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
        setPaymentTypeFilter("all");
        setStatusFilter("all");
        setMonthFilter("all");
        setYearFilter("all");
        setCurrentPage(1);
        setError(null);
        // Fetch with cleared filters
        fetchLicenses(1, {
            searchTerm: "",
            paymentType: "all",
            status: "all",
            months: "all",
            year: "all"
        });
    };

    // Check if any filters are active
    const hasActiveFilters = searchTerm || paymentTypeFilter !== "all" || statusFilter !== "all" || monthFilter !== "all" || yearFilter !== "all";

    // Fixed status badge function to handle all status cases
    const getStatusBadge = (status) => {
        console.log(status);
        const variants = {
            PAID: 'bg-green-100 text-green-800 hover:bg-green-100',
            PENDING: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
            FAILED: 'bg-red-100 text-red-800 hover:bg-red-100',
            INITIATED: 'bg-orange-100 text-orange-800 hover:bg-orange-100',
            REFUND: 'bg-purple-100 text-purple-800 hover:bg-purple-100'
        };
        return (
            <Badge className={variants[status] || 'bg-gray-100 text-gray-800 hover:bg-gray-100'}>
                {status?.charAt(0).toUpperCase() + status?.slice(1).toLowerCase() || 'Unknown'}
            </Badge>
        );
    };

    const formatCurrency = (money) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(money || 0);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Fixed viewInvoice function to actually open the invoice
    const viewInvoice = (invoiceUrl) => {
        if (invoiceUrl) {
            window.open(invoiceUrl, '_blank');
        }
    };

    // Get month name from number
    const getMonthName = (monthNumber) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months[parseInt(monthNumber) - 1] || monthNumber;
    };

    return (
        <div className="container mx-auto space-y-6">
            <PageTitle title="Payment History" description="View and manage your business's past and recent payment records, including invoices, statuses, and transaction details.">
                {/* <Button className="bg-black text-white hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button> */}
            </PageTitle>
           
            {/* Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col justify-between lg:flex-row gap-4 items-start lg:items-center">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Filter className="w-4 h-4" />
                            Filters:
                        </div>
                        <div className="flex flex-col justify-end sm:flex-row gap-4 flex-1">
                            <div className="relative flex-1 max-w-sm">
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Search by License ID"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyPress={handleKeyPress}
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

                            <Select value={paymentTypeFilter} onValueChange={handlePaymentType}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Payment Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Payment Types</SelectItem>
                                    <SelectItem value="CREDIT">Credit</SelectItem>
                                    <SelectItem value="MONEY">Money</SelectItem>
                                </SelectContent>
                            </Select>
                           
                            <Select value={statusFilter} onValueChange={handleStatus}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="INITIATED">Initiated</SelectItem>
                                    <SelectItem value="PAID">Paid</SelectItem>
                                    <SelectItem value="FAILED">Failed</SelectItem>
                                    <SelectItem value="REFUND">Refund</SelectItem>
                                </SelectContent>
                            </Select>
                           
                            <Select value={monthFilter} onValueChange={handleMonths}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Months</SelectItem>
                                    <SelectItem value='1'>January</SelectItem>
                                    <SelectItem value='2'>February</SelectItem>
                                    <SelectItem value='3'>March</SelectItem>
                                    <SelectItem value='4'>April</SelectItem>
                                    <SelectItem value='5'>May</SelectItem>
                                    <SelectItem value='6'>June</SelectItem>
                                    <SelectItem value='7'>July</SelectItem>
                                    <SelectItem value='8'>August</SelectItem>
                                    <SelectItem value='9'>September</SelectItem>
                                    <SelectItem value='10'>October</SelectItem>
                                    <SelectItem value='11'>November</SelectItem>
                                    <SelectItem value='12'>December</SelectItem>
                                </SelectContent>
                            </Select>
                           
                            <Select value={yearFilter} onValueChange={handleYear}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Years</SelectItem>
                                    {yearsData.map((year, index) => (
                                        <SelectItem key={index} value={year}>{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                           
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
                    </div>
                   
                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-600">Active Filters:</span>
                                {searchTerm && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                        Search: "{searchTerm}"
                                    </Badge>
                                )}
                                {paymentTypeFilter !== "all" && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        Payment Type: {paymentTypeFilter}
                                    </Badge>
                                )}
                                {statusFilter !== "all" && (
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                                        Status: {statusFilter}
                                    </Badge>
                                )}
                                {monthFilter !== "all" && (
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                        Month: {getMonthName(monthFilter)}
                                    </Badge>
                                )}
                                {yearFilter !== "all" && (
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                        Year: {yearFilter}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
           
            {/* Payment Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Records ({totalCount})</CardTitle>
                </CardHeader>
                <CardContent className='p-0'>
                    {error && (
                        <div className="text-center py-8 text-red-500">
                            <p className="text-lg font-medium mb-2">No Payment's Found.</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                   
                    {loading && paymentData.length === 0 && (
                        <div className="text-center py-12">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
                            <p className="text-gray-500">Loading payment records...</p>
                        </div>
                    )}
                   
                    {!loading && !error && (
                        <div className="overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr className="border-b border-gray-200 text-center">
                                        <th className="py-3 px-4 font-medium text-gray-900">License ID</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">No of Connections</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Pay Date</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Payment Type</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Price</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Status</th>
                                        <th className="py-3 px-4 font-medium text-gray-900">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white text-center">
                                    {paymentData.map((item, index) => (
                                        <tr
                                            key={item.licenseId + index}
                                            className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                                        >
                                            <td className="py-4 px-4 text-center text-gray-600">{item.licenseId}</td>
                                            <td className="py-4 px-4 text-center text-gray-600">{item.noOfConnections}</td>
                                            <td className="py-4 px-4 text-center text-gray-600">{formatDate(item.dateOfPurchased)}</td>
                                            <td className="py-4 px-4 text-center font-semibold text-gray-900">{item.paymentType}</td>
                                            <td className="py-4 px-4 text-center font-semibold text-gray-900">
                                                <div className="flex items-center justify-center">
                                                    {item.paymentType === "CREDIT" ? (
                                                        <>
                                                            <Bolt size={20} className="inline-block mr-1" />
                                                            {item.amount}
                                                        </>
                                                    ) : (
                                                        formatCurrency(item.amount)
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {getStatusBadge(item.paymentStatus)}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {item.invoiceUrl ? (
                                                    <Button
                                                        variant="link"
                                                        className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                                                        onClick={() => viewInvoice(item.invoiceUrl)}
                                                    >
                                                        View Invoice
                                                    </Button>
                                                ) : (
                                                    <span className="text-gray-400">N/A</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                           
                            {paymentData.length === 0 && !loading && !error && (
                                <div className="text-center py-12 text-gray-500">
                                    <p className="text-lg font-medium mb-2">No payment records found</p>
                                    <p className="text-sm">Try adjusting your filters or search terms</p>
                                </div>
                            )}
                           
                            {paymentData.length > 0 && (
                                <div className="flex items-center justify-between mt-6 p-4 border-t">
                                    <div className="text-sm text-gray-600">
                                        Showing {pagination.startItem} to {pagination.endItem} of {totalCount} payments
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            disabled={currentPage === 1 || loading}
                                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Previous
                                        </Button>
                                        <span className="text-sm text-gray-600">
                                            Page {pagination.currentPage} of {pagination.totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === pagination.totalPages || loading}
                                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                        >
                                            Next
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentHistory;