"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import datas from '@/data/tvk.json'
import { Button } from '@/components/ui/button';
import {
  Phone,
  PhoneCall,
  PhoneMissed,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Users,
  Activity,
  TrendingUp,
  Calendar,
  PhoneOff,
  MessageCircle,
  CheckCircle,
  Volume2,
  Download,
  AudioWaveform,
  User,
  Star,
  X,
  Ban
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Container from '@/components/ui/container';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption } from '@/components/ui/table'
import CallDetailsModal from '@/components/callData/callDetailsModal';
import { CallData } from '@/components/callData/callDetailsModal';
import { useAppContext } from '@/hooks/context';
import { Alert } from '@/components/ui/alert';
import { useAlert } from '@/hooks/alertHook';

type PhoneNumber = {
  number: string;
  boothcamp_id: string;
  sim_id: string;
  network: string;
  call_logs: CallLog[];
};

type Constituency = {
  name: string;
  code: number;
  district: string;
  numbers: PhoneNumber[];
};

type CallLog = {
  call_id: string;
  start_time: string;
  end_time: string;
  duration_seconds: number;
  call_type: "incoming" | "outgoing";
  status: "completed" | "missed" | "dropped";
  contact_name: string;
  tower_location: string;
};

export default function AgentCallLog() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'calllogs' | 'analytics'>('calllogs');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const recordsPerPage = 10;

  // Normalize the data on component mount
  const [constituencyData, setConstituencyData] = useState<Constituency[]>([]);

  useEffect(() => {
    const normalized: Constituency[] = datas.map(c => ({
      ...c,
      numbers: c.numbers.map(n => ({
        ...n,
        call_logs: n.call_logs.map(call => ({
          ...call,
          call_type: call.call_type.toLowerCase() as 'incoming' | 'outgoing',
          status: call.status.toLowerCase() as 'completed' | 'missed' | 'dropped'
        }))
      }))
    }));
    setConstituencyData(normalized);
  }, []);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return constituencyData;
    const term = searchTerm.toLowerCase();
    return constituencyData.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.code.toString().includes(term) ||
      item.district.toLowerCase().includes(term)
    );
  }, [constituencyData, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Calculate analytics for the dashboard
  const totalConstituencies = constituencyData.length;
  const totalNumbers = constituencyData.reduce((sum, c) => sum + c.numbers.length, 0);
  const totalCalls = constituencyData.reduce((sum, c) => 
    sum + c.numbers.reduce((numSum, num) => numSum + num.call_logs.length, 0), 0);

  const openModal = (call: CallData) => {
    setSelectedCall(call);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCall(null);
  };

  return (
    <Container>
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-md md:shadow-md border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Agent Call Log
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mt-2 flex justify-center sm:justify-start items-center gap-2">
                  <Users className="w-5 h-5" />
                  Monitor and analyze agent call performance
                </p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTab('calllogs')}
                  className={`flex items-center gap-2 ${selectedTab === 'calllogs' ? 'bg-gray-100' : ''}`}
                >
                  <Phone className="w-4 h-4" />
                  Call Logs
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTab('analytics')}
                  className={`flex items-center gap-2 ${selectedTab === 'analytics' ? 'bg-gray-100' : ''}`}
                >
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards Section */}
        <div className="max-w-7xl mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Constituencies</p>
                    <p className="text-2xl font-bold text-gray-900">{totalConstituencies}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Phone Numbers</p>
                    <p className="text-2xl font-bold text-gray-900">{totalNumbers}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PhoneIncoming className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Calls</p>
                    <p className="text-2xl font-bold text-gray-900">{totalCalls}</p>
                  </div>
                  <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PhoneOutgoing className="h-6 w-6 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Conditional Content */}
        <div className="pb-10 max-w-7xl mx-auto space-y-8">
          {/* 📊 Analytics Tab */}
          {selectedTab === 'analytics' && (
            <>
              {/* Your analytics charts here */}
            </>
          )}

          {/* Numbers Tab */}
          {selectedTab === 'calllogs' && (
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle className="text-lg">Constitute Details</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search constituencies..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page when searching
                      }}
                    />
                    <svg
                      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Constitute</TableHead>
                        <TableHead className="w-[120px]">Code</TableHead>
                        <TableHead className="w-[140px]">District</TableHead>
                        <TableHead className="w-[140px]">Total Calls</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {currentData.map((d, index) => (
                        <TableRow 
                          className='hover:bg-gray-50 cursor-pointer' 
                          onClick={() => router.push(`/operationTvk/TvkInsights/${d.code}`)} 
                          key={index}
                        >
                          <TableCell className='font-mono text-sm'>{d.name}</TableCell>
                          <TableCell className='font-mono text-sm'>{d.code}</TableCell>
                          <TableCell className='font-mono text-sm'>{d.district}</TableCell>
                          <TableCell className='font-mono text-sm'>
                            {d.numbers.reduce((total, item) => total + item.call_logs.length, 0)}
                          </TableCell>
                          <TableCell className='font-mono text-sm'>
                            <span className='bg-green-300 text-green-900 p-2 rounded-full'>Active</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {filteredData.length > 0 && (
                  <div className="flex items-center justify-between mt-6 pt-4 border-t">
                    <div className="text-sm text-gray-600">
                      Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <CallDetailsModal
        isOpen={isModalOpen}
        call={selectedCall}
        onClose={closeModal}
      />
    </Container>
  );
}