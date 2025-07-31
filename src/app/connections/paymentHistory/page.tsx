'use client';
import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Download, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageTitle from '@/components/ui/pageTitle';

// Types
interface PaymentRecord {
    id: string;
    connectionCount: number;
    payDate: string;
    amount: number;
    status: 'paid' | 'pending' | 'failed';
    invoice: string;
    businessName: string;
}

// Mock data - replace with your API call
const mockPaymentData: PaymentRecord[] = [
    {
        id: '1',
        connectionCount: 150,
        payDate: '2024-12-15',
        amount: 2500.00,
        status: 'paid',
        invoice: 'INV-2024-001',
        businessName: 'TechCorp Solutions'
    },
    {
        id: '2',
        connectionCount: 87,
        payDate: '2024-12-01',
        amount: 1450.00,
        status: 'pending',
        invoice: 'INV-2024-002',
        businessName: 'Digital Dynamics'
    },
    {
        id: '3',
        connectionCount: 203,
        payDate: '2024-11-20',
        amount: 3375.50,
        status: 'paid',
        invoice: 'INV-2024-003',
        businessName: 'Global Enterprises'
    },
    {
        id: '4',
        connectionCount: 45,
        payDate: '2024-11-15',
        amount: 750.00,
        status: 'failed',
        invoice: 'INV-2024-004',
        businessName: 'StartUp Hub'
    },
    {
        id: '5',
        connectionCount: 312,
        payDate: '2024-10-30',
        amount: 5200.00,
        status: 'failed',
        invoice: 'INV-2024-005',
        businessName: 'Enterprise Plus'
    }
];

const PaymentHistory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [monthFilter, setMonthFilter] = useState<string>('all');
    const [yearFilter, setYearFilter] = useState<string>('all');

    // Generate years and months for filters
    const availableYears = useMemo(() => {
        const years = new Set(mockPaymentData.map(record => new Date(record.payDate).getFullYear()));
        return Array.from(years).sort((a, b) => b - a);
    }, []);

    const months = [
        { value: '1', label: 'January' },
        { value: '2', label: 'February' },
        { value: '3', label: 'March' },
        { value: '4', label: 'April' },
        { value: '5', label: 'May' },
        { value: '6', label: 'June' },
        { value: '7', label: 'July' },
        { value: '8', label: 'August' },
        { value: '9', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];

    // Filter data based on search and filters
    const filteredData = useMemo(() => {
        return mockPaymentData.filter(record => {
            const date = new Date(record.payDate);
            const recordMonth = date.getMonth() + 1;
            const recordYear = date.getFullYear();

            // Search filter
            const matchesSearch = searchTerm === '' ||
                record.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.invoice.toLowerCase().includes(searchTerm.toLowerCase());

            // Status filter
            const matchesStatus = statusFilter === 'all' || record.status === statusFilter;

            // Month filter
            const matchesMonth = monthFilter === 'all' || recordMonth.toString() === monthFilter;

            // Year filter
            const matchesYear = yearFilter === 'all' || recordYear.toString() === yearFilter;

            return matchesSearch && matchesStatus && matchesMonth && matchesYear;
        });
    }, [searchTerm, statusFilter, monthFilter, yearFilter]);

    // Calculate summary statistics
    const totalAmount = filteredData.reduce((sum, record) => sum + record.amount, 0);
    const totalConnections = filteredData.reduce((sum, record) => sum + record.connectionCount, 0);

    const getStatusBadge = (status: string) => {
        const variants: Record<string, string> = {
            paid: 'bg-green-100 text-green-800 hover:bg-green-100',
            pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
            failed: 'bg-red-100 text-red-800 hover:bg-red-100',
            // overdue: 'bg-orange-100 text-orange-800 hover:bg-orange-100'
        };

        return (
            <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const exportData = () => {
        // Implement export functionality
        console.log('Exporting payment data...', filteredData);
    };

    const viewInvoice = (invoice: string) => {
        // Implement view invoice functionality
        console.log('Viewing invoice:', invoice);
    };

    return (
        <div className="container mx-auto space-y-6">
            <PageTitle title="Payment History" description="View and manage your business’s past and recent payment records, including invoices, statuses, and transaction details.">
                <Button className="bg-black text-white hover:bg-gray-800">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                </Button>
            </PageTitle>

            {/* Summary Cards
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground">From {filteredData.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConnections.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all businesses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average per Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalConnections > 0 ? formatCurrency(totalAmount / totalConnections) : '$0.00'}
            </div>
            <p className="text-xs text-muted-foreground">Revenue per connection</p>
          </CardContent>
        </Card>
      </div> */}

            {/* Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col justify-between lg:flex-row gap-4 items-start lg:items-center">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Filter className="w-4 h-4" />
                            Filters:
                        </div>
                        <div className="flex flex-col justify-end sm:flex-row gap-4 flex-1">
                            {/* <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by business or invoice..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div> */}
                            {/* <div className='flex'> */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                    {/* <SelectItem value="overdue">Overdue</SelectItem> */}
                                </SelectContent>
                            </Select>
                            <Select value={monthFilter} onValueChange={setMonthFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Month" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Months</SelectItem>
                                    {months.map(month => (
                                        <SelectItem key={month.value} value={month.value}>
                                            {month.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={yearFilter} onValueChange={setYearFilter}>
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Year" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Years</SelectItem>
                                    {availableYears.map(year => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    {/* </div> */}
                </CardContent>
            </Card>

            {/* Payment Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Records ({filteredData.length})</CardTitle>
                </CardHeader>
                <CardContent className='p-0'>
                    <div className="overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr className="border-b border-gray-200 text-center">
                                    {/* <th className="py-3 px-4 font-medium text-gray-900">Business Name</th> */}
                                    <th className="py-3 px-4 font-medium text-gray-900">No of Connections</th>
                                    <th className="py-3 px-4 font-medium text-gray-900">Pay Date</th>
                                    <th className="py-3 px-4 font-medium text-gray-900">Amount</th>
                                    <th className="py-3 px-4 font-medium text-gray-900">Status</th>
                                    <th className="py-3 px-4 font-medium text-gray-900">Invoice</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-center">
                                {filteredData.map((record, index) => (
                                    <tr
                                        key={record.id}
                                        className={`border-b border-gray-100 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}
                                    >
                                        {/* <td className="py-4 px-4 text-center text-sm text-black">{record.businessName}</td> */}
                                        <td className="py-4 px-4 text-center text-gray-600">{record.connectionCount.toLocaleString()}</td>
                                        <td className="py-4 px-4 text-center text-gray-600">{formatDate(record.payDate)}</td>
                                        <td className="py-4 px-4 text-center font-semibold text-gray-900">{formatCurrency(record.amount)}</td>
                                        <td className="py-4 px-4 text-center">
                                            {getStatusBadge(record.status)}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <Button
                                                variant="link"
                                                className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                                                onClick={() => viewInvoice(record.invoice)}
                                            >
                                                {record.invoice}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredData.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg font-medium mb-2">No payment records found</p>
                                <p className="text-sm">Try adjusting your filters or search terms</p>
                            </div>
                        )}

                        {/* Pagination component example (optional) */}
                        {/* Replace filteredData with paginatedData, and add your pagination logic */}
                        {filteredData.length > 0 && (
                            <div className="flex items-center justify-between mt-6 p-4 border-t">
                                <div className="text-sm text-gray-600">
                                    Showing 1 to {filteredData.length} of {filteredData.length} payments
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                        Previous
                                    </Button>
                                    <span className="text-sm text-gray-600">Page 1 of 1</span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Payment Table */}
            {/* <Card>
  <CardHeader>
    <CardTitle>Payment Records ({filteredData.length})</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-left py-3 px-4 font-medium text-gray-600">No of Connections</TableHead>
            <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Pay Date</TableHead>
            <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Amount</TableHead>
            <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Status</TableHead>
            <TableHead className="text-left py-3 px-4 font-medium text-gray-600">Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.map((record) => (
            <TableRow key={record.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="py-4 px-4 text-gray-600">{record.connectionCount.toLocaleString()}</TableCell>
              <TableCell className="py-4 px-4 text-md">{formatDate(record.payDate)}</TableCell>
              <TableCell className="font-semibold py-4 px-4">{formatCurrency(record.amount)}</TableCell>
              <TableCell className="py-4 px-4">{getStatusBadge(record.status)}</TableCell>
              <TableCell className="py-4 px-4">
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium text-blue-600 hover:text-blue-800"
                  onClick={() => viewInvoice(record.invoice)}
                >
                  {record.invoice}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No payment records found</div>
          <div className="text-gray-400">Try adjusting your filters or search terms</div>
        </div>
      )}
    </div>
  </CardContent>
</Card> */}

        </div>
    );
};

export default PaymentHistory;